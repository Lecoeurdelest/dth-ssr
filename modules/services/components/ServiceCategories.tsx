"use client";

import { ImageWithFallback } from '@/src/app/components/figma/ImageWithFallback';
import { Star } from 'lucide-react';
import { Button } from '@/src/app/components/ui/button';
import { servicesData } from '../api/services.mock';
import { useRouter } from 'next/navigation';

export function ServiceCategories() {
  const router = useRouter();

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

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {servicesData.map((service) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}

