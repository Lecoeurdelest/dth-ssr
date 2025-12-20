// Mock API for Orders module
import { Order } from '../types/order.types';
// Import from original data file for now
import { ordersData as originalOrdersData } from '@/src/app/data/ordersData';

// This will be replaced with actual API calls later
export async function getOrders(): Promise<Order[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return ordersData;
}

export async function getOrderById(id: string): Promise<Order | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return ordersData.find(o => o.id === id) || null;
}

export const ordersData: Order[] = originalOrdersData;

