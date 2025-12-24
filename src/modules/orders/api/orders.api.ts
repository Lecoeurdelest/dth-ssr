import { apiClient } from '@/lib/api-client';

// Types for backend API responses
interface OrderDto {
  id: number;
  userId: number;
  serviceId: number;
  workerId?: number;
  status: string;
  totalAmount: number;
  scheduledAt?: string;
  durationMinutes?: number;
  addressLine?: string;
  district?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
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

// Convert backend OrderDto to frontend Order interface
function mapOrderDtoToOrder(dto: OrderDto): any {
  // Map serviceId to serviceIcon (simple mapping based on service name patterns)
  const getServiceIcon = (serviceId: number): 'electric' | 'water' | 'wood' | 'moving' | 'installation' | 'multi' => {
    // This is a simple mapping - in real app, you'd fetch service details
    // For now, we'll cycle through available icons based on serviceId
    const icons: ('electric' | 'water' | 'wood' | 'moving' | 'installation' | 'multi')[] = [
      'electric', 'water', 'wood', 'moving', 'installation', 'multi'
    ];
    return icons[serviceId % icons.length];
  };

  // Build address string from components
  const buildAddress = (dto: OrderDto): string => {
    const parts = [];
    if (dto.addressLine) parts.push(dto.addressLine);
    if (dto.district) parts.push(`Quận ${dto.district}`);
    if (dto.city) parts.push(dto.city);
    return parts.join(', ') || 'Chưa cập nhật địa chỉ';
  };

  return {
    id: dto.id.toString(),
    orderCode: `ORD-${dto.id.toString().padStart(6, '0')}`,
    serviceType: 'Dịch vụ sửa chữa', // TODO: Fetch from service API
    serviceIcon: getServiceIcon(dto.serviceId),
    orderDate: dto.createdAt,
    status: mapOrderStatus(dto.status),
    address: buildAddress(dto),
    totalCost: dto.totalAmount || 0,
    customerName: 'Khách hàng', // TODO: Fetch from user API
    customerPhone: '0123456789', // TODO: Fetch from user API
    issueDescription: dto.notes || '',
    technician: dto.workerId ? {
      id: dto.workerId.toString(),
      name: 'Thợ chuyên nghiệp',
      avatar: '/images/avatar-placeholder.jpg',
      experience: 5,
      rating: 4.8,
      phone: '0987654321'
    } : undefined,
    timeline: [], // TODO: Build from order status history
    costDetails: [], // TODO: Build from service pricing
    paymentMethod: 'cash',
    notes: dto.notes,
    canReview: dto.status === 'COMPLETED',
    reviewSubmitted: false, // TODO: Check if review exists
    invoice: dto.status === 'COMPLETED' ? {
      invoiceNumber: `INV-${dto.id.toString().padStart(6, '0')}`,
      issueDate: dto.updatedAt,
      status: 'issued' as const
    } : undefined
  };
}

function mapOrderStatus(status: string): string {
  const statusMap: { [key: string]: string } = {
    'PENDING': 'pending',
    'CONFIRMED': 'confirmed',
    'PROCESSING': 'processing',
    'REPAIRING': 'repairing',
    'COMPLETED': 'completed',
    'CANCELLED': 'cancelled'
  };
  return statusMap[status] || 'pending';
}

export async function getUserOrders(page = 0, size = 20): Promise<any[]> {
  try {
    const response = await apiClient.get<PageResponse<OrderDto>>(`/api/orders?page=${page}&size=${size}&sortBy=createdAt&sortDir=desc`);
    return response.content.map(mapOrderDtoToOrder);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}

export async function getOrderById(orderId: string): Promise<any> {
  try {
    const response = await apiClient.get<OrderDto>(`/api/orders/${orderId}`);
    return mapOrderDtoToOrder(response);
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

export async function getOrdersByStatus(status: string): Promise<any[]> {
  try {
    const response = await apiClient.get<any[]>(`/api/orders/status/${status}`);
    return response.map(mapOrderDtoToOrder);
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    throw error;
  }
}
