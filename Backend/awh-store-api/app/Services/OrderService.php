<?php

namespace App\Services;

use App\Interfaces\OrderRepositoryInterface;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class OrderService
{
    public function __construct(
        private OrderRepositoryInterface $orderRepository
    ) {}

    public function checkout(array $data, int $userId)
    {
        return DB::transaction(function () use ($data, $userId) {
            $totalAmount = 0;
            $orderItems = [];

            foreach ($data['items'] as $item) {
                $product = Product::find($item['product_id']);

                if (!$product) {
                    throw new \Exception('Product not found');
                }

                if ($product->stock < $item['quantity']) {
                    throw new \Exception('Insufficient stock for product: ' . $product->name);
                }

                $subtotal = $product->price * $item['quantity'];
                $totalAmount += $subtotal;

                $orderItems[] = [
                    'product' => $product,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'subtotal' => $subtotal,
                ];
            }

            $order = $this->orderRepository->createOrder([
                'user_id' => $userId,
                'total_amount' => $totalAmount,
                'status' => 'pending',
            ]);

            foreach ($orderItems as $item) {
                $this->orderRepository->createOrderItem([
                    'order_id' => $order->id,
                    'product_id' => $item['product']->id,
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'subtotal' => $item['subtotal'],
                ]);

                $item['product']->decrement('stock', $item['quantity']);
            }

            return $this->orderRepository->findById($order->id);
        });
    }

    public function getUserOrders(int $userId)
    {
        return $this->orderRepository->getUserOrders($userId);
    }

    public function getOrderDetail(int $id, int $userId)
    {
        return $this->orderRepository->findById($id, $userId);
    }
} 