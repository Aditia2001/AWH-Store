<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Services\ProductService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Exception;

class ProductController extends Controller
{
    public function __construct(
        protected ProductService $productService
    ) {}

    public function index(Request $request)
    {
        try {
            $products = $this->productService->getAll($request->only(['search']));

            return ApiResponse::success($products, 'Products retrieved successfully');
        } catch (Exception $e) {
            return ApiResponse::error('Failed to retrieve products', 500, $e->getMessage());
        }
    }

    public function show(int $id)
    {
        try {
            $product = $this->productService->getById($id);

            return ApiResponse::success($product, 'Product detail retrieved successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Product not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Failed to retrieve product detail', 500, $e->getMessage());
        }
    }

    public function store(StoreProductRequest $request)
    {
        try {
            $product = $this->productService->create($request->validated());

            return ApiResponse::success($product, 'Product created successfully', 201);
        } catch (Exception $e) {
            return ApiResponse::error('Failed to create product', 500, $e->getMessage());
        }
    }

    public function update(UpdateProductRequest $request, int $id)
    {
        try {
            $product = $this->productService->update($id, $request->validated());

            return ApiResponse::success($product, 'Product updated successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Product not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Failed to update product', 500, $e->getMessage());
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->productService->delete($id);

            return ApiResponse::success(null, 'Product deleted successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::error('Product not found', 404);
        } catch (Exception $e) {
            return ApiResponse::error('Failed to delete product', 500, $e->getMessage());
        }
    }
}