<?php

namespace App\Repositories;

use App\Interfaces\ReportRepositoryInterface;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;

class ReportRepository implements ReportRepositoryInterface
{
    public function getSalesSummary(): array
    {
        return [
            'total_orders' => Order::count(),
            'total_revenue' => Order::sum('total_amount'),
            'total_items_sold' => OrderItem::sum('quantity'),
        ];
    }

    public function getTopProducts(int $limit = 5): array
    {
        return OrderItem::query()
            ->select(
                'products.id',
                'products.name',
                DB::raw('SUM(order_items.quantity) as total_sold'),
                DB::raw('SUM(order_items.quantity * order_items.price) as total_revenue')
            )
            ->join('products', 'products.id', '=', 'order_items.product_id')
            ->groupBy('products.id', 'products.name')
            ->orderByDesc('total_sold')
            ->limit($limit)
            ->get()
            ->toArray();
    }

    public function getRecentOrders(int $limit = 5): array
    {
        return Order::query()
            ->with('user:id,name,email')
            ->select('id', 'user_id', 'total_amount', 'status', 'created_at')
            ->latest()
            ->limit($limit)
            ->get()
            ->toArray();
    }
}