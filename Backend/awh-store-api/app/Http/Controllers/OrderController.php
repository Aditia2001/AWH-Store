<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\CheckoutRequest;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Throwable;

class OrderController extends Controller
{
    public function __construct(
        private OrderService $orderService
    ) {}

    public function checkout(CheckoutRequest $request)
    {
        try {
            $order = $this->orderService->checkout(
                $request->validated(),
                auth('api')->id()
            );

            return ApiResponse::success($order, 'Checkout successful', 201);
        } catch (Throwable $e) {
            return ApiResponse::error($e->getMessage(), 400);
        }
    }

    public function myOrders()
    {
        try {
            $orders = $this->orderService->getUserOrders(auth('api')->id());

            return ApiResponse::success($orders, 'Orders retrieved successfully');
        } catch (Throwable $e) {
            return ApiResponse::error($e->getMessage(), 500);
        }
    }

    public function show(int $id)
    {
        try {
            $userId = auth('api')->user()->id;

            $order = $this->orderService->getOrderDetail($id, $userId);

            if (!$order) {
                return ApiResponse::error('Order not found', 404);
            }

            return ApiResponse::success($order, 'Order detail retrieved successfully');
        } catch (Throwable $e) {
            return ApiResponse::error($e->getMessage(), 500);
        }
    }
    }