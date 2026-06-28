<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Api\ReportController;

Route::prefix('auth')->group(function () {

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});


// Public
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Admin only
Route::middleware(['auth:api', 'role:admin'])->group(function () {
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    Route::get('/reports/sales', [ReportController::class, 'salesReport']);
});


// Customer/User only
Route::middleware(['auth:api', 'role:customer'])->group(function () {

    Route::post('/checkout', [OrderController::class, 'checkout']);

    Route::get('/orders', [OrderController::class, 'myOrders']);

    Route::get('/orders/{id}', [OrderController::class, 'show']);
});