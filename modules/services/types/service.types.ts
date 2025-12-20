// Service module types

export interface PricingCategory {
  category: string;
  items: { item: string; price: string }[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  serviceRating: number;
  technicianRating: number;
}

export interface ServiceDetail {
  title: string;
  description: string;
  headerImage: string;
  subServices: string[];
  pricingCategories: PricingCategory[];
  commitments: string[];
  videoUrl?: string;
  images?: string[];
  reviews: Review[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  serviceCount: number;
  details: ServiceDetail;
}

