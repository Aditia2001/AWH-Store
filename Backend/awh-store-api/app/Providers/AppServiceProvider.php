<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\AuthRepositoryInterface;
use App\Interfaces\ProductRepositoryInterface;
use App\Repositories\AuthRepository;
use App\Repositories\ProductRepository;
use App\Interfaces\OrderRepositoryInterface;
use App\Repositories\OrderRepository;
use App\Interfaces\ReportRepositoryInterface;
use App\Repositories\ReportRepository;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(AuthRepositoryInterface::class, AuthRepository::class);

        $this->app->bind(ProductRepositoryInterface::class, ProductRepository::class);
        
        $this->app->bind(OrderRepositoryInterface::class, OrderRepository::class);
        
        $this->app->bind(ReportRepositoryInterface::class,ReportRepository::class);
    }

    public function boot(): void
    {
        //
    }
}