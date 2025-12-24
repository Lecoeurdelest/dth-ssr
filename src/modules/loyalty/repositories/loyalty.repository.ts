import { LoyaltyData } from '../types/loyalty.types';

export interface LoyaltyRepository {
  getLoyaltyData(): Promise<LoyaltyData>;
}

export class MockLoyaltyRepository implements LoyaltyRepository {
  private loyaltyData: LoyaltyData;

  constructor(loyaltyData: LoyaltyData) {
    this.loyaltyData = loyaltyData;
  }

  async getLoyaltyData(): Promise<LoyaltyData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.loyaltyData;
  }
}
