<?php

namespace App\Services;

use App\Interfaces\ReportRepositoryInterface;

class ReportService
{
    protected ReportRepositoryInterface $reportRepository;

    public function __construct(ReportRepositoryInterface $reportRepository)
    {
        $this->reportRepository = $reportRepository;
    }

    public function getSalesReport(): array
    {
        return [
            'summary' => $this->reportRepository->getSalesSummary(),
            'top_products' => $this->reportRepository->getTopProducts(),
            'recent_orders' => $this->reportRepository->getRecentOrders(),
        ];
    }
}