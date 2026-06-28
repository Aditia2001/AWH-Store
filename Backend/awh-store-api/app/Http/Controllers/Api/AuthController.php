<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Exception;

class AuthController extends Controller
{
    public function __construct(
        protected AuthService $authService
    ) {}

    public function register(RegisterRequest $request)
    {
        try {
            $result = $this->authService->register($request->validated());

            return ApiResponse::success($result, 'Register successful', 201);
        } catch (Exception $e) {
            return ApiResponse::error('Register failed', 500, $e->getMessage());
        }
    }

    public function login(LoginRequest $request)
    {
        $result = $this->authService->login($request->validated());

        if (!$result) {
            return ApiResponse::error('Invalid email or password', 401);
        }

        return ApiResponse::success($result, 'Login successful');
    }

    public function logout()
    {
        $this->authService->logout();

        return ApiResponse::success(null, 'Logout successful');
    }

    public function me()
    {
        return ApiResponse::success($this->authService->me(), 'User profile retrieved');
    }
}