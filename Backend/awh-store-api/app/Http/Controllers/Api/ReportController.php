<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Services\ReportService;
use Illuminate\Http\JsonResponse;
use Exception;

class ReportController extends Controller
{
    protected ReportService $reportService;

    public function __construct(ReportService $reportService)
    {
        $this->reportService = $reportService;
    }

    public function salesReport(): JsonResponse
    {
        try {
            $report = $this->reportService->getSalesReport();

            return ApiResponse::success(
                $report,
                'Sales report retrieved successfully.'
            );
        } catch (Exception $e) {
            return ApiResponse::error(
                'Failed to retrieve sales report.',
                500,
                $e->getMessage()
            );
        }
    }
}