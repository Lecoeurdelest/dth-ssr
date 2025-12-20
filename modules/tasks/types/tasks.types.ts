// Tasks module types

export type TabType = 'profile' | 'orders' | 'promotions';

export interface Promotion {
  id: string;
  code: string;
  discount: string;
  minOrder: string;
  expiryDate: string;
  serviceType: string;
  description: string;
  type: 'new-user' | 'birthday' | 'loyalty' | 'event';
}

export interface ProfileData {
  fullName: string;
  phone: string;
  address: string;
  email: string;
  points: number;
}

