// Order types for Orders module

export type OrderStatus = 'pending' | 'processing' | 'repairing' | 'completed' | 'cancelled';

export interface TimelineStep {
  status: string;
  time: string;
  completed: boolean;
  description?: string;
}

export interface CostDetail {
  item: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface TechnicianInfo {
  id: string;
  name: string;
  avatar: string;
  experience: number;
  rating: number;
  phone: string;
}

export interface InvoiceInfo {
  invoiceNumber: string;
  issueDate: string;
  status: 'issued' | 'not_issued';
  warrantyNote?: string;
}

export interface Order {
  id: string;
  orderCode: string;
  serviceType: string;
  serviceIcon: 'electric' | 'water' | 'wood' | 'moving' | 'installation' | 'multi';
  orderDate: string;
  status: OrderStatus;
  address: string;
  totalCost: number;
  customerName: string;
  customerPhone: string;
  issueDescription: string;
  issueImages?: string[];
  technician?: TechnicianInfo;
  timeline: TimelineStep[];
  costDetails: CostDetail[];
  paymentMethod: string;
  notes?: string;
  canReview: boolean;
  reviewSubmitted?: boolean;
  invoice?: InvoiceInfo;
}

export interface ReviewData {
  orderId: string;
  rating: number;
  comment: string;
  images: string[];
}

// Helper functions
export const getStatusText = (status: OrderStatus): string => {
  const statusMap: Record<OrderStatus, string> = {
    pending: 'Chờ xử lý',
    processing: 'Đang xử lý',
    repairing: 'Đang sửa',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy'
  };
  return statusMap[status];
};

export const getStatusColor = (status: OrderStatus): string => {
  const colorMap: Record<OrderStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    repairing: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-gray-100 text-gray-800'
  };
  return colorMap[status];
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

