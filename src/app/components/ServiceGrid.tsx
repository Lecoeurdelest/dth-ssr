import { Star, Zap, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { servicesData } from "../data/servicesData";

const services = [
  {
    id: 'sua-dien-tai-nha',
    title: "Sửa điện tại nhà",
    desc: "Kiểm tra, sửa chữa – thay thế lắp đặt hệ thống điện",
    bgColor: "bg-black",
    iconColor: "text-cyan-400",
    iconType: "zap",
    rating: 5,
    reviews: 3,
    count: "8 dịch vụ",
    // Icon representation - using colored blocks for electric theme
    customIcon: (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          {/* Blue diagonal stripe */}
          <path d="M 20 30 L 50 10 L 60 20 L 30 40 Z" fill="#3B82F6" />
          <path d="M 30 40 L 60 20 L 70 30 L 40 50 Z" fill="#60A5FA" />
          {/* Red lightning bolt */}
          <path d="M 55 30 L 65 30 L 50 55 L 55 45 L 45 45 L 60 20 Z" fill="#EF4444" />
        </svg>
      </div>
    ),
  },
  {
    id: 'sua-nuoc-thong-tac',
    title: "Sửa nước tại nhà",
    desc: "Sửa chữa hệ thống nước, thông tắc cống rãnh, hút bể phốt",
    bgColor: "bg-blue-500",
    iconColor: "text-white",
    iconType: "sparkles",
    rating: 5,
    reviews: 2,
    count: "8 dịch vụ",
    customIcon: (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          {/* Wrench icon */}
          <circle cx="50" cy="50" r="35" fill="#60A5FA" opacity="0.3" />
          <path d="M 40 35 L 45 30 L 55 40 L 65 30 L 70 35 L 60 45 L 70 55 L 65 60 L 55 50 L 45 60 L 40 55 L 50 45 Z" fill="white" />
          <circle cx="50" cy="50" r="8" fill="white" />
        </svg>
      </div>
    ),
  },
  {
    id: 'sua-chua-do-moc',
    title: "Sửa chữa đồ mộc",
    desc: "Sửa chữa, bảo dưỡng các thiết bị gia dụng bằng gỗ",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-800",
    iconType: "sparkles",
    rating: 5,
    reviews: 3,
    count: "8 dịch vụ",
    customIcon: (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          {/* Door with wood grain */}
          <circle cx="50" cy="50" r="40" stroke="#D4A574" strokeWidth="2" fill="none" strokeDasharray="3,3" />
          <circle cx="50" cy="50" r="30" fill="#8B5A2B" />
          <rect x="45" y="25" width="10" height="50" fill="#A0764A" rx="2" />
          <rect x="35" y="48" width="5" height="4" fill="#6B4423" rx="1" />
        </svg>
      </div>
    ),
  },
  {
    id: 'van-chuyen-khuan-vac',
    title: "Vận chuyển – khuân vác",
    desc: "Lắp đặt và sửa chữa các thiết bị gia dụng trong nhà",
    bgColor: "bg-amber-50",
    iconColor: "text-gray-800",
    iconType: "zap",
    rating: 5,
    reviews: 1,
    count: "7 dịch vụ",
    customIcon: (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 120 80" className="w-36 h-24">
          {/* Truck */}
          <rect x="10" y="30" width="60" height="30" fill="#1F2937" rx="2" />
          <rect x="70" y="35" width="30" height="25" fill="#374151" rx="2" />
          <circle cx="30" cy="62" r="6" fill="#1F2937" />
          <circle cx="80" cy="62" r="6" fill="#1F2937" />
          <rect x="20" y="20" width="15" height="12" fill="#4B5563" />
          <rect x="40" y="20" width="15" height="12" fill="#4B5563" />
        </svg>
      </div>
    ),
  },
  {
    id: 'lap-dat-do-gia-dung',
    title: "Lắp đặt đồ gia dụng",
    desc: "Sửa chữa và làm mới đồ gỗ, nội thất trong nhà",
    bgColor: "bg-red-600",
    iconColor: "text-white",
    iconType: "sparkles",
    rating: 5,
    reviews: 1,
    count: "7 dịch vụ",
    customIcon: (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          {/* Washing machine/appliance */}
          <circle cx="50" cy="50" r="35" fill="#7C2D12" />
          <rect x="30" y="30" width="40" height="40" fill="#1F2937" rx="3" />
          <circle cx="50" cy="50" r="15" fill="#374151" />
          <circle cx="50" cy="50" r="12" fill="#4B5563" />
          <rect x="35" y="25" width="8" height="3" fill="#6B7280" rx="1" />
          <rect x="55" y="25" width="8" height="3" fill="#6B7280" rx="1" />
        </svg>
      </div>
    ),
  },
  {
    id: 'lap-rap-noi-that',
    title: "Vận chuyển – khuân vác – lắp ráp nội thất",
    desc: "Dịch vụ chuyển nhà, khuân vác và lắp ráp đồ đạc",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-900",
    iconType: "zap",
    rating: 5,
    reviews: 1,
    count: "7 dịch vụ",
    customIcon: (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          {/* Table/furniture */}
          <rect x="20" y="45" width="60" height="3" fill="#60A5FA" />
          <rect x="22" y="48" width="4" height="30" fill="#3B82F6" />
          <rect x="74" y="48" width="4" height="30" fill="#3B82F6" />
          <path d="M 25 50 L 35 40 L 65 40 L 75 50 Z" fill="#93C5FD" />
        </svg>
      </div>
    ),
  },
];

export function ServiceGrid() {
  const navigate = useNavigate();

  const handleViewDetails = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xs text-gray-400 mb-2 tracking-wide">Generated Design</h2>
          <div className="h-2 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-sm" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
              onClick={() => handleViewDetails(service.id)}
            >
              {/* Icon/Image Section */}
              <div className={`relative ${service.bgColor} h-44 flex items-center justify-center`}>
                {service.customIcon}
                
                {/* Badge Icon */}
                <div className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-sm">
                  {service.iconType === "zap" ? (
                    <Zap className="w-3.5 h-3.5 text-gray-700" fill="currentColor" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-gray-700" fill="currentColor" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-2 text-base">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                  {service.desc}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(service.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-gray-900 text-gray-900"
                    />
                  ))}
                  <span className="text-xs text-gray-600 ml-1.5">
                    ({service.reviews} đánh giá)
                  </span>
                </div>

                {/* Service count */}
                <p className="text-xs text-gray-400 mb-4">{service.count}</p>

                {/* Button */}
                <button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(service.id);
                  }}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}