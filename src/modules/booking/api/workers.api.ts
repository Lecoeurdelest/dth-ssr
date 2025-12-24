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
  available?: boolean;
}

// Convert backend WorkerDto to frontend Worker interface
function mapWorkerDtoToWorker(dto: WorkerDto): Worker {
  const fullName = `${dto.firstName} ${dto.lastName}`.trim();

  // Generate more realistic data based on worker ID for demo purposes
  const workerId = dto.id;
  const experienceYears = Math.floor(workerId % 5) + 1; // 1-5 years experience
  const baseRating = 4.0 + (workerId % 10) * 0.1; // 4.0-4.9 rating
  const reviewCount = Math.floor(workerId * 2.5) + 5; // 5+ reviews

  // Always show workers as available for booking, regardless of backend status
  const available = true;

  // Parse skills to determine location/specialty
  let location = "Ninh Bình";
  try {
    const skills = dto.skills ? JSON.parse(dto.skills) : [];
    if (skills.includes("Điện nước") || skills.includes("Điện lạnh")) {
      location = "Ninh Bình";
    } else if (skills.includes("Sửa chữa") || skills.includes("Lắp đặt")) {
      location = "Ninh Bình";
    }
  } catch (error) {
    // Use default location
  }

  // Calculate distance based on worker ID
  const distanceKm = Math.floor(workerId % 15) + 2; // 2-16 km
  const distance = `${distanceKm}-${distanceKm + 2} km`;

  return {
    id: dto.id.toString(),
    name: fullName || dto.username,
    rating: Math.round(baseRating * 10) / 10, // Round to 1 decimal
    reviews: reviewCount,
    location: location,
    distance: distance,
    available: available,
    avatar: dto.avatarUrl || `/images/avatar-placeholder.jpg`,
    experience: experienceYears,
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
    const response = await apiClient.get<WorkerDto>(`/api/workers/${id}`);
    return mapWorkerDtoToWorker(response);
  } catch (error) {
    console.error('Error fetching worker by ID:', error);
    return null;
  }
}
