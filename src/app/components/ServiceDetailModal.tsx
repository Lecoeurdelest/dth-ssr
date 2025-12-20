import { X, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ServiceDetail {
  title: string;
  description: string;
  headerImage: string;
  issues: string[];
  pricing: {
    item: string;
    price: string;
  }[];
  commitments: string[];
}

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetail | null;
}

export function ServiceDetailModal({ isOpen, onClose, service }: ServiceDetailModalProps) {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header Image */}
        <div className="relative h-48 bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-t-3xl overflow-hidden">
          <ImageWithFallback 
            src={service.headerImage}
            alt={service.title}
            className="w-full h-full object-cover opacity-80"
          />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
          >
            <X className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
              {service.title}
            </h2>
            <p className="text-gray-600 mt-2">
              {service.description}
            </p>
          </div>

          {/* Issues Section */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">
              Các vấn đề xử lý
            </h3>
            <div className="space-y-2 bg-blue-50/50 rounded-xl p-4">
              {service.issues.map((issue, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">–</span>
                  <span className="text-gray-700">{issue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Table */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">
              Bảng giá chi tiết
            </h3>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200">
                <div className="p-3 font-bold text-gray-900">Hạng mục</div>
                <div className="p-3 font-bold text-gray-900 text-right">Giá</div>
              </div>
              
              {/* Table Rows */}
              {service.pricing.map((item, index) => (
                <div 
                  key={index} 
                  className={`grid grid-cols-2 ${index !== service.pricing.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <div className="p-3 text-gray-700">{item.item}</div>
                  <div className="p-3 text-gray-700 text-right">{item.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Commitments */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 mb-3">Cam kết:</h3>
            <div className="space-y-2">
              {service.commitments.map((commitment, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">–</span>
                  <span className="text-gray-700">{commitment}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Book Service Button */}
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" />
            Đặt dịch vụ
          </button>
        </div>
      </div>
    </div>
  );
}
