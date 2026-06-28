<?php

namespace App\Repositories;

use App\Interfaces\OrderRepositoryInterface;
use App\Models\Order;
use App\Models\OrderItem;

class OrderRepository implements OrderRepositoryInterface
{
    public function createOrder(array $data)
    {
        return Order::create($data);
    }

    public function createOrderItem(array $data)
    {
        return OrderItem::create($data);
    }

    public function getUserOrders(int $userId)
    {
        return Order::with('items.product')
            ->where('user_id', $userId)
            ->latest()
            ->paginate(10);
    }

     function findById(int $id, ?int $userId = null)
      {
          $query = Order::with('items.product', 'user');

          if ($userId !== null) {
              $query->where('user_id', $userId);
          }

          return $query->find($id);
      }
}