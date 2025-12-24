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

  // Map serviceId to service name (simple mapping)
  const getServiceName = (serviceId: number): string => {
    const serviceNames: { [key: number]: string } = {
      1: 'Sửa chữa điện',
      2: 'Sửa chữa nước',
      3: 'Sửa chữa gỗ',
      4: 'Vận chuyển đồ đạc',
      5: 'Lắp đặt thiết bị',
      6: 'Dịch vụ đa năng'
    };
    return serviceNames[serviceId] || 'Dịch vụ sửa chữa';
  };

  // Since backend doesn't store address fields in OrderDto, we'll use a default
  // In a real implementation, these would be stored in the order or fetched separately
  const defaultAddress = 'Ninh Bình, Việt Nam';

  // Generate mock technician data based on order ID if workerId exists
  const generateTechnicianData = (orderId: number, workerId?: number) => {
    if (!workerId) return undefined;

    const technicianNames = [
      'Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E'
    ];
    const name = technicianNames[orderId % technicianNames.length];
    const experience = Math.floor(orderId % 5) + 1;
    const rating = 4.0 + (orderId % 5) * 0.2;

    return {
      id: workerId.toString(),
      name: name,
      avatar: `/images/avatar-placeholder.jpg`,
      experience: experience,
      rating: Math.round(rating * 10) / 10,
      phone: `098${orderId.toString().padStart(7, '0')}`
    };
  };

  // Build timeline based on status and dates
  const buildTimeline = (status: string, createdAt: string, updatedAt: string) => {
    const timeline = [
      {
        id: '1',
        status: 'pending',
        title: 'Đơn hàng đã được tạo',
        description: 'Đơn hàng của bạn đã được hệ thống ghi nhận',
        timestamp: createdAt,
        completed: true
      }
    ];

    if (['CONFIRMED', 'PROCESSING', 'REPAIRING', 'COMPLETED'].includes(status)) {
      timeline.push({
        id: '2',
        status: 'confirmed',
        title: 'Đơn hàng đã được xác nhận',
        description: 'Thợ sẽ liên hệ với bạn trong thời gian sớm nhất',
        timestamp: createdAt,
        completed: true
      });
    }

    if (['PROCESSING', 'REPAIRING', 'COMPLETED'].includes(status)) {
      timeline.push({
        id: '3',
        status: 'processing',
        title: 'Đang xử lý đơn hàng',
        description: 'Thợ đang trên đường đến địa điểm của bạn',
        timestamp: createdAt,
        completed: true
      });
    }

    if (['REPAIRING', 'COMPLETED'].includes(status)) {
      timeline.push({
        id: '4',
        status: 'repairing',
        title: 'Đang thực hiện dịch vụ',
        description: 'Thợ đang thực hiện công việc sửa chữa',
        timestamp: updatedAt,
        completed: true
      });
    }

    if (status === 'COMPLETED') {
      timeline.push({
        id: '5',
        status: 'completed',
        title: 'Hoàn thành dịch vụ',
        description: 'Dịch vụ đã được hoàn thành thành công',
        timestamp: updatedAt,
        completed: true
      });
    }

    return timeline;
  };

  return {
    id: dto.id.toString(),
    orderCode: `ORD-${dto.id.toString().padStart(6, '0')}`,
    serviceType: getServiceName(dto.serviceId),
    serviceIcon: getServiceIcon(dto.serviceId),
    orderDate: dto.createdAt,
    status: mapOrderStatus(dto.status),
    address: defaultAddress, // Backend doesn't store address in OrderDto
    totalCost: dto.totalAmount || 0,
    customerName: 'Khách hàng', // TODO: Fetch from user API
    customerPhone: '0123456789', // TODO: Fetch from user API
    issueDescription: dto.notes || '',
    technician: generateTechnicianData(dto.id, dto.workerId),
    timeline: buildTimeline(dto.status, dto.createdAt, dto.updatedAt),
    costDetails: [
      {
        id: '1',
        description: 'Phí dịch vụ cơ bản',
        amount: dto.totalAmount ? dto.totalAmount * 0.8 : 0,
        type: 'service'
      },
      {
        id: '2',
        description: 'Phí di chuyển',
        amount: dto.totalAmount ? dto.totalAmount * 0.2 : 0,
        type: 'transport'
      }
    ],
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

export async function createReview(orderId: string, reviewData: {
  rating: number;
  comment: string;
  images?: string[];
}): Promise<any> {
  try {
    const response = await apiClient.post(`/api/orders/${orderId}/reviews`, {
      rating: reviewData.rating,
      comment: reviewData.comment,
      images: reviewData.images || []
    });
    return response;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
}
