// Profile module types

export interface ProfileInfo {
  name: string;
  birthdate: string;
  phone: string;
  email: string;
  address?: string;
  avatar?: string;
}

export interface AccountSettings {
  notificationsEnabled: boolean;
  language: string;
}

