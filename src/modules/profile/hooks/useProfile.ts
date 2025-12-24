"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { profileApi } from "@/lib/profile-api";
import { getAccountSettings } from "../api/profile.mock";
import { ProfileInfo, AccountSettings } from "../types/profile.types";

export function useProfile() {
    const { userInfo, isLoggedIn } = useAuth();
    const [profile, setProfile] = useState<ProfileInfo | null>(null);
    const [settings, setSettings] = useState<AccountSettings | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                if (isLoggedIn && userInfo) {
                    try {
                        // Try to get profile from backend API
                        const backendProfile = await profileApi.getProfile();

                        const fullName =
                            backendProfile.firstName && backendProfile.lastName
                                ? `${backendProfile.firstName} ${backendProfile.lastName}`
                                : backendProfile.firstName ||
                                  backendProfile.lastName ||
                                  userInfo.name ||
                                  userInfo.username ||
                                  "Chưa cập nhật";

                        const profileData: ProfileInfo = {
                            name: fullName,
                            birthdate: userInfo.birthdate || "",
                            phone: userInfo.phone || "",
                            email: userInfo.email || "",
                            address: undefined,
                            avatar: backendProfile.avatarUrl || undefined,
                        };
                        setProfile(profileData);
                    } catch (error) {
                        // If API fails, fallback to auth context data
                        console.warn(
                            "Failed to load profile from API, using auth data:",
                            error
                        );
                        const profileData: ProfileInfo = {
                            name:
                                userInfo.name ||
                                userInfo.username ||
                                "Chưa cập nhật",
                            birthdate: userInfo.birthdate || "",
                            phone: userInfo.phone || "",
                            email: userInfo.email || "",
                            address: undefined,
                            avatar: undefined,
                        };
                        setProfile(profileData);
                    }
                } else {
                    setProfile(null);
                }

                // Get settings (still from mock for now)
                const settingsData = await getAccountSettings();
                setSettings(settingsData);
            } catch (error) {
                console.error("Failed to load profile:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [isLoggedIn, userInfo]);

    return {
        profile,
        settings,
        loading,
    };
}
