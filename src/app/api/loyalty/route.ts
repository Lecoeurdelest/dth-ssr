import { NextResponse } from 'next/server';
import { LoyaltyService } from '@/modules/loyalty/services/loyalty.service';
import { MockLoyaltyRepository } from '@/modules/loyalty/repositories/loyalty.repository';
import { mockLoyaltyData } from '@/modules/loyalty/data/loyaltyData';

// Initialize dependencies
const loyaltyRepository = new MockLoyaltyRepository(mockLoyaltyData);
const loyaltyService = new LoyaltyService(loyaltyRepository);

export async function GET() {
  try {
    const loyaltyData = await loyaltyService.getLoyaltyData();
    return NextResponse.json(loyaltyData);
  } catch (error) {
    console.error('Error fetching loyalty data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch loyalty data' },
      { status: 500 }
    );
  }
}
