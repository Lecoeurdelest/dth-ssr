/**
 * Profile API service
 */

import { apiClient } from "./api-client";

export interface ProfileDto {
    id: number;
    userId: number;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    bio?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    bio?: string;
}

export const profileApi = {
    async getProfile(): Promise<ProfileDto> {
        return apiClient.get<ProfileDto>("/api/profile");
    },

    async updateProfile(data: UpdateProfileRequest): Promise<ProfileDto> {
        return apiClient.put<ProfileDto>("/api/profile", data);
    },
};
