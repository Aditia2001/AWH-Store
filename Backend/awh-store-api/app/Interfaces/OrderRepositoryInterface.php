<?php

namespace App\Interfaces;

interface OrderRepositoryInterface
{
    public function createOrder(array $data);

    public function createOrderItem(array $data);

    public function getUserOrders(int $userId);

    public function findById(int $id, ?int $userId = null);
}