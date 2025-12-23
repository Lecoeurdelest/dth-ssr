// Services API client
import { Service } from '../types/service.types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

function mapDtoToService(dto: any): Service {
  return {
    id: String(dto.id),
    title: dto.name,
    description: dto.description || '',
    image: dto.imageUrl || '',
    rating: dto.rating || 4.8,
    reviews: dto.reviewCount || 0,
    serviceCount: dto.serviceCount || 1,
    details: dto.details ? (typeof dto.details === 'string' ? JSON.parse(dto.details) : dto.details) : {
      title: dto.name,
      description: dto.description || '',
      headerImage: dto.imageUrl || '',
      subServices: [],
      pricingCategories: [],
      commitments: [],
      images: [],
      reviews: []
    }
  };
}

export async function getServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error('Network error');
    const payload = await res.json();
    const dtos = payload?.data?.content || payload?.data || [];
    return dtos.map(mapDtoToService);
  } catch (e) {
    // No hard-coded fallback — return empty list so UI uses API only
    return [];
  }
}

export async function getServiceById(id: string): Promise<Service | null> {
  try {
    const res = await fetch(`${API_BASE}/services/${id}`);
    if (!res.ok) throw new Error('Network error');
    const payload = await res.json();
    const dto = payload?.data || null;
    if (!dto) return null;
    return mapDtoToService(dto);
  } catch (e) {
    return null;
  }
}

