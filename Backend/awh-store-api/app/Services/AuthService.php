<?php

namespace App\Services;

use App\Interfaces\AuthRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function __construct(
        protected AuthRepositoryInterface $authRepository
    ) {}

    public function register(array $data)
    {
        $user = $this->authRepository->create($data);

        $token = Auth::guard('api')->login($user);

        return [
            'user' => $user,
            'token' => $token,
            'token_type' => 'bearer',
        ];
    }

    public function login(array $credentials)
    {
        $token = Auth::guard('api')->attempt($credentials);

        if (!$token) {
            return null;
        }

        return [
            'user' => Auth::guard('api')->user(),
            'token' => $token,
            'token_type' => 'bearer',
        ];
    }

    public function logout(): void
    {
        Auth::guard('api')->logout();
    }

    public function me()
    {
        return Auth::guard('api')->user();
    }
}