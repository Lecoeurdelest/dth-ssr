import { LoyaltyRepository } from '../repositories/loyalty.repository';
import { LoyaltyData } from '../types/loyalty.types';

export class LoyaltyService {
  constructor(private loyaltyRepository: LoyaltyRepository) {}

  async getLoyaltyData(): Promise<LoyaltyData> {
    return this.loyaltyRepository.getLoyaltyData();
  }
}

