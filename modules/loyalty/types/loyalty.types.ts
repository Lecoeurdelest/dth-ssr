// Loyalty module types

export interface LoyaltyPointHistory {
  id: string;
  orderCode: string;
  serviceType: string;
  orderDate: string;
  points: number;
  status: 'earned' | 'pending';
}

export interface PromotionTier {
  points: number;
  discount: number;
  description: string;
  icon: string;
}

export interface LoyaltyData {
  totalPoints: number;
  pointHistory: LoyaltyPointHistory[];
  promotionTiers: PromotionTier[];
}

