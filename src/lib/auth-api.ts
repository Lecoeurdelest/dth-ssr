/**
 * Auth API service
 */

import { apiClient } from "./api-client";

export interface UserDto {
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    enabled: boolean;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    firstName?: string;
    lastName?: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: UserDto;
}

export const authApi = {
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        return apiClient.post<AuthResponse>("/api/auth/login", credentials);
    },

    async register(data: RegisterRequest): Promise<AuthResponse> {
        return apiClient.post<AuthResponse>("/api/auth/register", data);
    },

    async logout(): Promise<void> {
        return apiClient.post<void>("/api/auth/logout-cookie");
    },

    async refreshToken(refreshToken: string): Promise<AuthResponse> {
        return apiClient.post<AuthResponse>("/api/auth/refresh", {
            refreshToken,
        });
    },
};
