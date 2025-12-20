"use client";

import { ImageWithFallback } from '@/src/app/components/figma/ImageWithFallback';

interface ServiceGalleryProps {
  images: string[];
  serviceTitle: string;
}

export function ServiceGallery({ images, serviceTitle }: ServiceGalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        📸 Hình ảnh dịch vụ
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
            <ImageWithFallback 
              src={image}
              alt={`${serviceTitle} - Hình ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

