<?php

namespace App\Interfaces;

interface ProductRepositoryInterface extends BaseRepositoryInterface
{
    public function getAll(array $filters = []);
}