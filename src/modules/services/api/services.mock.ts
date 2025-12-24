// API for Services module - Real API calls
import { Service } from '../types/service.types';
import { getServices as getServicesApi, getServiceById as getServiceByIdApi, getServicesByCategory as getServicesByCategoryApi } from './services.api';

// Fallback to mock data if API fails
import { servicesData } from '../data/servicesData';

export async function getServices(): Promise<Service[]> {
  try {
    return await getServicesApi();
  } catch (error) {
    console.warn('API call failed, falling back to mock data:', error);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return servicesData;
  }
}

export async function getServiceById(id: string): Promise<Service | null> {
  try {
    return await getServiceByIdApi(id);
  } catch (error) {
    console.warn('API call failed, falling back to mock data:', error);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return servicesData.find(s => s.id === id) || null;
  }
}

export async function getServicesByCategory(category: string): Promise<Service[]> {
  try {
    return await getServicesByCategoryApi(category);
  } catch (error) {
    console.warn('API call failed, falling back to mock data:', error);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return servicesData.filter(s => s.details.pricingCategories.some(pc => pc.category.toLowerCase().includes(category.toLowerCase())));
  }
}

// Keep mock data for backward compatibility
export { servicesData };

