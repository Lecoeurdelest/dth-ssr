// Booking types for Booking module

export interface Worker {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  available: boolean;
  avatar?: string;
  experience?: number;
  phone?: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  serviceDate: string;
  serviceTime: string;
  description: string;
  contactMethod: 'phone' | 'email';
  selectedWorkerId?: string;
  paymentMethod?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface BookingSummary {
  serviceName: string;
  serviceId: string;
  basePrice: number;
  workerFee?: number;
  totalPrice: number;
  estimatedDuration?: string;
}

