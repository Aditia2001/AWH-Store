<?php

namespace App\Services;

use App\Interfaces\ProductRepositoryInterface;

class ProductService
{
    public function __construct(
        protected ProductRepositoryInterface $productRepository
    ) {}

    public function getAll(array $filters = [])
    {
        return $this->productRepository->getAll($filters);
    }

    public function getById(int $id)
    {
        return $this->productRepository->find($id);
    }

    public function create(array $data)
    {
        return $this->productRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->productRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->productRepository->delete($id);
    }
}