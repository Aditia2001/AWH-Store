<?php

namespace App\Interfaces;

interface ReportRepositoryInterface
{
    public function getSalesSummary(): array;

    public function getTopProducts(int $limit = 5): array;

    public function getRecentOrders(int $limit = 5): array;
}