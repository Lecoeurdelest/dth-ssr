import { apiClient } from '@/lib/api-client';

// Types for backend API responses
interface ServiceDto {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  category: string;
  details: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// Convert backend ServiceDto to frontend Service interface
function mapServiceDtoToService(dto: ServiceDto): any {
  return {
    id: dto.id.toString(),
    title: dto.name,
    description: dto.description,
    image: dto.imageUrl || '/images/default-service.jpg',
    rating: 4.5, // TODO: Calculate from reviews API
    reviews: 0,   // TODO: Get from reviews API
    serviceCount: 1, // Default for now
    details: {
      title: dto.name,
      description: dto.description,
      headerImage: dto.imageUrl || '/images/default-service.jpg',
      subServices: [], // TODO: Parse from details JSON
      pricingCategories: [], // TODO: Parse from details JSON
      commitments: [
        "Đảm bảo chất lượng dịch vụ",
        "Thợ có chuyên môn cao",
        "Giá cả cạnh tranh",
        "Hỗ trợ 24/7"
      ],
      videoUrl: null,
      images: [],
      reviews: [] // TODO: Get from reviews API
    }
  };
}

export async function getServices(page = 0, size = 20): Promise<any[]> {
  try {
    const response = await apiClient.get<PageResponse<ServiceDto>>(`/api/services?page=${page}&size=${size}&sortBy=id&sortDir=asc`);
    return response.content.map(mapServiceDtoToService);
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
}

export async function getServiceById(id: string): Promise<any | null> {
  try {
    const response = await apiClient.get<ServiceDto>(`/api/services/${id}`);
    return mapServiceDtoToService(response);
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

export async function getServicesByCategory(category: string): Promise<any[]> {
  try {
    const response = await apiClient.get<ServiceDto[]>(`/api/services/category/${category}`);
    return response.map(mapServiceDtoToService);
  } catch (error) {
    console.error('Error fetching services by category:', error);
    throw error;
  }
}
