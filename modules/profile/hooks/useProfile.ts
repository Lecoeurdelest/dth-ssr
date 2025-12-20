"use client";

import { useState, useEffect } from 'react';
import { getProfile, getAccountSettings } from '../api/profile.mock';
import { ProfileInfo, AccountSettings } from '../types/profile.types';

export function useProfile() {
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [settings, setSettings] = useState<AccountSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [profileData, settingsData] = await Promise.all([
          getProfile(),
          getAccountSettings()
        ]);
        setProfile(profileData);
        setSettings(settingsData);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    profile,
    settings,
    loading
  };
}

