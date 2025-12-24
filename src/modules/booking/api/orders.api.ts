import { apiClient } from '@/lib/api-client';

// Types for backend API
interface CreateOrderRequest {
  serviceId: number;
  workerId?: number;
  scheduledAt?: string; // ISO string
  durationMinutes?: number;
  addressLine: string;
  district?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  notes?: string;
}

interface OrderDto {
  id: number;
  serviceId: number;
  workerId?: number;
  customerId: number;
  status: string;
  scheduledAt?: string;
  durationMinutes?: number;
  addressLine: string;
  district?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Convert frontend booking data to backend CreateOrderRequest
export function mapBookingToCreateOrderRequest(
  serviceId: string,
  formData: any
): CreateOrderRequest {
  // Parse serviceTime to get approximate duration and schedule time
  let scheduledAt: string | undefined;
  let durationMinutes = 120; // Default 2 hours

  if (formData.serviceDate && formData.serviceTime) {
    const date = new Date(formData.serviceDate);
    let hour = 8; // Default morning

    switch (formData.serviceTime) {
      case 'morning':
        hour = 8;
        break;
      case 'afternoon':
        hour = 13;
        break;
      case 'evening':
        hour = 17;
        break;
      case 'flexible':
        // Keep default
        break;
    }

    date.setHours(hour, 0, 0, 0);
    scheduledAt = date.toISOString();
  }

  return {
    serviceId: parseInt(serviceId),
    workerId: formData.selectedWorkerId ? parseInt(formData.selectedWorkerId) : undefined,
    scheduledAt,
    durationMinutes,
    addressLine: formData.address,
    district: 'Ninh Bình', // Default for now
    city: 'Ninh Bình',
    country: 'Vietnam',
    notes: formData.description || undefined
  };
}

export async function createOrder(orderData: CreateOrderRequest): Promise<OrderDto> {
  try {
    const response = await apiClient.post<OrderDto>('/api/orders', orderData);
    return response;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function getUserOrders(page = 0, size = 10): Promise<any> {
  try {
    const response = await apiClient.get(`/api/orders?page=${page}&size=${size}&sortBy=createdAt&sortDir=desc`);
    return response;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}

export async function getOrderById(orderId: string): Promise<OrderDto> {
  try {
    const response = await apiClient.get<OrderDto>(`/api/orders/${orderId}`);
    return response;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}
