"use client";

import { useState, useEffect } from 'react';
import { ImageWithFallback } from '@/shared/components/figma/ImageWithFallback';
import { Star, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { getServices } from '../api/services.mock';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  serviceCount: number;
  details: any;
}

export function ServiceCategories() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const servicesData = await getServices();
      setServices(servicesData);
      setError(null);
    } catch (err) {
      console.error('Failed to load services:', err);
      setError('Không thể tải danh sách dịch vụ. Hiển thị dữ liệu mẫu.');

      // Fallback to mock data
      try {
        const { servicesData: mockData } = await import('../data/servicesData');
        setServices(mockData);
      } catch (fallbackErr) {
        console.error('Failed to load fallback data:', fallbackErr);
        setServices([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (serviceId: string) => {
    router.push(`/services/${serviceId}`);
    window.scrollTo(0, 0);
  };

  return (
    <section id="services-section" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold mb-2">Dịch vụ của chúng tôi</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Các Dịch Vụ Của Chúng Tôi
          </h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Đang tải danh sách dịch vụ...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Service Cards */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {services.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                <p>Không có dịch vụ nào để hiển thị.</p>
              </div>
            ) : (
              services.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              onClick={() => handleViewDetails(service.id)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <ImageWithFallback 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                  {service.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(service.rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {service.rating} ({service.reviews} đánh giá)
                  </span>
                </div>

                {/* Button */}
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(service.id);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Xem chi tiết
                </Button>
              </div>
              </div>
            ))
          )}
          </div>
        )}
      </div>
    </section>
  );
}

