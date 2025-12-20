import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { servicesData } from '../data/servicesData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowLeft, Check, Star, PlayCircle, ChevronDown, ChevronUp, Phone, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { BookServiceModal } from '../components/BookServiceModal';
import { ServicePricingTabs } from '../components/ServicePricingTabs';

export function ServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Tìm dịch vụ theo ID
  const service = servicesData.find(s => s.id === serviceId);

  // Scroll to top when service changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  // Save scroll position before navigating
  useEffect(() => {
    return () => {
      sessionStorage.setItem('serviceDetailScrollPosition', window.pageYOffset.toString());
    };
  }, []);

  // Restore scroll position when returning
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('serviceDetailScrollPosition');
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
      sessionStorage.removeItem('serviceDetailScrollPosition');
    }
  }, []);

  // Nếu không tìm thấy dịch vụ, chuyển về trang dịch vụ
  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const { details } = service;

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Nút quay lại */}
        <Button 
          onClick={handleBackClick}
          variant="outline" 
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách dịch vụ
        </Button>

        {/* Header Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl mb-8">
          <ImageWithFallback 
            src={details.headerImage}
            alt={details.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Title and Rating */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-600 mb-4">
            {details.title}
          </h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(service.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="font-semibold text-gray-800">{service.rating}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">
              ({service.reviews} đánh giá)
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">
              {service.serviceCount} dịch vụ
            </span>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {details.description}
          </p>

          {/* Sub Services */}
          {details.subServices && details.subServices.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Các dịch vụ bao gồm:</h3>
              <div className="flex flex-wrap gap-2">
                {details.subServices.map((subService, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
                  >
                    {subService}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bảng giá theo danh mục */}
        <div className="mb-8">
          <ServicePricingTabs 
            categories={details.pricingCategories}
            serviceName={details.title}
          />
        </div>

        {/* Cam kết */}
        <div className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-3xl p-8 shadow-lg text-white mb-8">
          <h2 className="text-3xl font-bold mb-6">
            ✅ Cam kết của chúng tôi
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {details.commitments.map((commitment, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/10 p-4 rounded-xl">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{commitment}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hình ảnh dịch vụ */}
        {details.images && details.images.length > 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              📸 Hình ảnh dịch vụ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {details.images.map((image, index) => (
                <div key={index} className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <ImageWithFallback 
                    src={image}
                    alt={`${details.title} - Hình ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video giới thiệu (nếu có) */}
        {details.videoUrl && (
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🎥 Video giới thiệu
            </h2>
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video bg-gray-900 flex items-center justify-center">
              <PlayCircle className="w-20 h-20 text-white opacity-80" />
              <p className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-3 py-1 rounded">
                Video sẽ đưc cập nhật sớm
              </p>
            </div>
          </div>
        )}

        {/* Đánh giá khách hàng */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            ⭐ Đánh giá từ khách hàng
          </h2>
          
          {/* Tổng quan đánh giá */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-cyan-600 mb-2">
                  {service.rating}
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(service.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600">{service.reviews} đánh giá</p>
              </div>
              
              <div className="flex-1 w-full">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const percentage = star === 5 ? 85 : star === 4 ? 12 : 3;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 w-12">{star} sao</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Danh sách đánh giá */}
          <div className="space-y-4">
            {details.reviews.map((review) => (
              <Card key={review.id} className="border-2 border-gray-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="flex-1">
                      {/* User Info */}
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Comment */}
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      
                      {/* Rating Details */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Dịch vụ:</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < review.serviceRating ? 'fill-cyan-500 text-cyan-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Thợ:</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < review.technicianRating ? 'fill-cyan-500 text-cyan-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Nút xem thêm đánh giá */}
          {service.reviews > details.reviews.length && (
            <div className="text-center mt-6">
              <Button variant="outline" className="border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50">
                Xem thêm {service.reviews - details.reviews.length} đánh giá
              </Button>
            </div>
          )}
        </div>

        {/* Call to Action - Đặt dịch vụ */}
        <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl p-8 shadow-2xl text-white text-center mb-8">
          <h3 className="text-3xl font-bold mb-4">
            Cần {details.title} ngay?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Liên hệ với chúng tôi để được tư vấn miễn phí và báo giá chi tiết
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:09xxxxxx">
              <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold shadow-lg">
                <Phone className="w-5 h-5 mr-2" />
                Gọi ngay: 09xxxxxx
              </Button>
            </a>
            <Link to="/contact">
              <Button 
                onClick={() => setIsBookModalOpen(true)}
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-bold"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Đặt dịch vụ
              </Button>
            </Link>
          </div>
          <p className="text-sm mt-4 opacity-80">
            ⏰ Hỗ trợ 24/7 • 🚀 Có mặt nhanh chóng • ✅ Báo giá miễn phí
          </p>
        </div>

        {/* Các dịch vụ liên quan */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Dịch vụ khác bạn có thể quan tâm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {servicesData
              .filter(s => s.id !== serviceId)
              .slice(0, 3)
              .map((relatedService) => (
                <Link 
                  key={relatedService.id} 
                  to={`/services/${relatedService.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all border-2 border-transparent hover:border-cyan-500">
                    <div className="relative h-40 overflow-hidden">
                      <ImageWithFallback 
                        src={relatedService.image}
                        alt={relatedService.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                        {relatedService.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedService.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
      
      {/* Book Service Modal */}
      <BookServiceModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        serviceName={details.title}
      />
    </div>
  );
}