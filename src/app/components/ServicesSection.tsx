import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, ArrowRight, Zap, CheckCircle2, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { servicesData } from '../data/servicesData';
import { useNavigate } from 'react-router-dom';

export function ServicesSection() {
  const navigate = useNavigate();

  const handleViewDetails = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <section className="bg-gradient-to-b from-cyan-50 via-blue-50 to-white py-16 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full mb-4">
            <Zap className="w-4 h-4" />
            <span className="font-semibold">Dịch vụ chuyên nghiệp</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Dịch vụ của <span className="text-cyan-600">chúng tôi</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Đội ngũ thợ giàu kinh nghiệm, tận tâm với công việc. Báo giá minh bạch, 
            không phát sinh chi phí. Hỗ trợ 24/7.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600">5+</div>
              <div className="text-sm text-gray-600">Dịch vụ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600">500+</div>
              <div className="text-sm text-gray-600">Khách hàng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600">4.8★</div>
              <div className="text-sm text-gray-600">Đánh giá TB</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600">24/7</div>
              <div className="text-sm text-gray-600">Hỗ trợ</div>
            </div>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {servicesData.map((service) => {
            return (
              <Card
                key={service.id}
                className="group overflow-hidden border-2 border-gray-200 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl cursor-pointer"
                onClick={() => handleViewDetails(service.id)}
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-cyan-100 to-blue-100">
                  <ImageWithFallback 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900">{service.rating}</span>
                  </div>

                  {/* Service Count Badge */}
                  <div className="absolute bottom-4 left-4 bg-cyan-600/90 backdrop-blur-sm text-white rounded-full px-3 py-1.5 shadow-lg">
                    <span className="text-sm font-semibold">{service.serviceCount} dịch vụ</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-2 min-h-[48px]">
                    {service.description}
                  </p>

                  {/* Reviews and Rating */}
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
                      ({service.reviews} đánh giá)
                    </span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {service.details.subServices.slice(0, 2).map((subService, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{subService}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(service.id);
                    }}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg group/btn"
                  >
                    <span>Xem chi tiết & Đặt dịch vụ</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-lg opacity-90">
              Cam kết mang đến dịch vụ tốt nhất cho khách hàng
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Phản hồi nhanh</h3>
              <p className="text-sm opacity-90">Có mặt trong 30-60 phút tại khu vực nội thành</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Thợ chuyên nghiệp</h3>
              <p className="text-sm opacity-90">Đội ngũ có chứng chỉ, kinh nghiệm lâu năm</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Giá minh bạch</h3>
              <p className="text-sm opacity-90">Báo giá trước, không phát sinh thêm chi phí</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Bảo hành dài hạn</h3>
              <p className="text-sm opacity-90">Bảo hành 3-6 tháng cho mọi dịch vụ</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Bạn cần hỗ trợ ngay?
          </h3>
          <p className="text-gray-600 mb-6">
            Liên hệ với chúng tôi để được tư vấn và báo giá miễn phí
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:09xxxxxx">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-bold shadow-lg">
                📞 Gọi ngay: 09xxxxxx
              </Button>
            </a>
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-6 text-lg font-bold shadow-lg"
            >
              ✉️ Gửi yêu cầu tư vấn
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
