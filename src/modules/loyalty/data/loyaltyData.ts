import { LoyaltyData, PromotionTier } from '../types/loyalty.types';

// Mock promotion tiers
export const promotionTiers: PromotionTier[] = [
  {
    points: 50,
    discount: 20000,
    description: 'Giảm 20.000đ',
    icon: '🎁'
  },
  {
    points: 100,
    discount: 50000,
    description: 'Giảm 50.000đ',
    icon: '🎉'
  },
  {
    points: 200,
    discount: 120000,
    description: 'Giảm 120.000đ',
    icon: '🎊'
  },
  {
    points: 300,
    discount: 200000,
    description: 'Giảm 200.000đ',
    icon: '🏆'
  }
];

// Mock loyalty data
export const mockLoyaltyData: LoyaltyData = {
  totalPoints: 120,
  pointHistory: [
    {
      id: '1',
      orderCode: 'DH001234',
      serviceType: 'Sửa điện tại nhà',
      orderDate: '12/12/2024',
      points: 35,
      status: 'earned'
    },
    {
      id: '2',
      orderCode: 'DH001236',
      serviceType: 'Sửa chữa đồ mộc',
      orderDate: '11/12/2024',
      points: 42,
      status: 'earned'
    },
    {
      id: '3',
      orderCode: 'DH001240',
      serviceType: 'Đa dịch vụ sửa chữa nhà cửa',
      orderDate: '08/12/2024',
      points: 43,
      status: 'earned'
    }
  ],
  promotionTiers
};
