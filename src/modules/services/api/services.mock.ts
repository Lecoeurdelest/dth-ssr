// Mock API for Services module
import { Service } from '../types/service.types';
// Import from original data file for now
import { servicesData } from '../data/servicesData';

// This will be replaced with actual API calls later
export async function getServices(): Promise<Service[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return servicesData;
}

export async function getServiceById(id: string): Promise<Service | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return servicesData.find(s => s.id === id) || null;
}

export { servicesData };

