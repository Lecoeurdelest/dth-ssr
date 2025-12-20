// Profile module - mock API (read-only)

import { ProfileInfo, AccountSettings } from '../types/profile.types';

// Mock profile data
const mockProfile: ProfileInfo = {
  name: 'Nguyễn Văn A',
  birthdate: '1990-01-15',
  phone: '0901234567',
  email: 'nguyenvana@email.com',
  address: '123 Đường ABC, Quận 1, TP.HCM',
  avatar: undefined
};

const mockAccountSettings: AccountSettings = {
  notificationsEnabled: true,
  language: 'vi'
};

export async function getProfile(): Promise<ProfileInfo> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockProfile;
}

export async function getAccountSettings(): Promise<AccountSettings> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockAccountSettings;
}

