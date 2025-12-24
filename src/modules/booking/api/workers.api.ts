import { apiClient } from '@/lib/api-client';
import { Worker } from '../types/booking.types';

// Types for backend API responses
interface WorkerDto {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatarUrl: string;
  skills: string; // JSON string
}

// Convert backend WorkerDto to frontend Worker interface
function mapWorkerDtoToWorker(dto: WorkerDto): Worker {
  const fullName = `${dto.firstName} ${dto.lastName}`.trim();

  return {
    id: dto.id.toString(),
    name: fullName || dto.username,
    rating: 4.5, // TODO: Calculate from actual ratings
    reviews: 5,   // TODO: Get from actual review count
    location: "Ninh Bình", // TODO: Get from actual location data
    distance: "5-10 km", // TODO: Calculate based on user location
    available: Math.random() > 0.3, // TODO: Get from actual availability
    avatar: dto.avatarUrl,
    experience: 3, // TODO: Calculate from actual experience
    phone: dto.phone
  };
}

export async function getWorkers(serviceType?: string): Promise<Worker[]> {
  try {
    const url = serviceType ? `/api/workers?service=${encodeURIComponent(serviceType)}` : '/api/workers';
    const response = await apiClient.get<WorkerDto[]>(url);
    return response.map(mapWorkerDtoToWorker);
  } catch (error) {
    console.error('Error fetching workers:', error);
    throw error;
  }
}

export async function getWorkerById(id: string): Promise<Worker | null> {
  try {
    const workers = await getWorkers();
    return workers.find(w => w.id === id) || null;
  } catch (error) {
    console.error('Error fetching worker by ID:', error);
    return null;
  }
}
