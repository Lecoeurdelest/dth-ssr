"use client";

import { useState } from 'react';
import { Zap, Droplet, Hammer, Package, Settings, Sun } from 'lucide-react';
import { Button } from '@/src/app/components/ui/button';
import { WorkerSelectionModal } from './WorkerSelectionModal';

interface ServiceType {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const serviceTypes: ServiceType[] = [
  {
    id: 'dien',
    title: 'Thợ sửa điện',
    icon: <Zap className="w-8 h-8" />,
    description: '⚡ Sửa chữa điện'
  },
  {
    id: 'nuoc',
    title: 'Thợ sửa nước',
    icon: <Droplet className="w-8 h-8" />,
    description: '💧 Sửa chữa nước'
  },
  {
    id: 'do-moc',
    title: 'Thợ sửa đồ mộc',
    icon: <Hammer className="w-8 h-8" />,
    description: '🔨 Sửa chữa đồ gỗ'
  },
  {
    id: 'chuyen-khoan-vac',
    title: 'Thợ tiện chuyên - khoản vác',
    icon: <Package className="w-8 h-8" />,
    description: '📦 Vận chuyển'
  },
  {
    id: 'lap-dat',
    title: 'Thợ lắp đặt đồ dụng dụng',
    icon: <Settings className="w-8 h-8" />,
    description: '🔧 Lắp đặt'
  },
  {
    id: 'da-nang',
    title: 'Thợ đa năng',
    icon: <Sun className="w-8 h-8" />,
    description: '⭐ Đa năng'
  }
];

export function ServiceWorkerSelector() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <section id="worker-selector" className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              DỊCH VỤ CHỌN THỢ
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Tìm kiếm và lựa chọn thợ chuyên nghiệp gần bạn. Chúng tôi giúp bạn kết nối với các thợ uy tín, tay nghề cao.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {serviceTypes.map((service) => (
              <div 
                key={service.id}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleServiceClick(service.id)}
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <div className="text-blue-600 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>

                {/* Button */}
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleServiceClick(service.id);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Xem chi tiết
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Worker Selection Modal */}
      {selectedService && (
        <WorkerSelectionModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          serviceType={serviceTypes.find(s => s.id === selectedService)?.title || ''}
        />
      )}
    </>
  );
}

