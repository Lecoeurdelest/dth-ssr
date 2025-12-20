"use client";

import { useState, useEffect } from 'react';
import { getLoyaltyData } from '../api/loyalty.mock';
import { LoyaltyData } from '../types/loyalty.types';

export function useLoyalty() {
  const [data, setData] = useState<LoyaltyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const loyaltyData = await getLoyaltyData();
        setData(loyaltyData);
      } catch (error) {
        console.error('Failed to load loyalty data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    data,
    loading
  };
}

