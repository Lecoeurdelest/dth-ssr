"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getServices, getServiceById, servicesData } from './api/services.mock';
import { ImageWithFallback } from '@/shared/components/figma/ImageWithFallback';
import { ArrowLeft, Check, Star, PlayCircle, Phone, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { BookServiceModal, useBooking } from '@/modules/booking';
import { ServicePricingTabs } from './components/ServicePricingTabs';
import { ServiceGallery } from './components/ServiceGallery';
import { ServiceReviews } from './components/ServiceReviews';
import Link from 'next/link';

interface ServiceDetailPageProps {
  serviceId: string;
}

export function ServiceDetailPage({ serviceId }: ServiceDetailPageProps) {
  const router = useRouter();
  const { isBookModalOpen, handleBookService, closeBookModal } = useBooking();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch service data
  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        const serviceData = await getServiceById(serviceId);
        setService(serviceData);
      } catch (err) {
        console.error('Failed to load service:', err);
        setError('Không thể tải thông tin dịch vụ. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

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

  // Redirect if service not found after loading
  useEffect(() => {
    if (!loading && !service && !error) {
      router.push('/services');
    }
  }, [loading, service, error, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-cyan-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải thông tin dịch vụ...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">⚠️ {error}</div>
          <button
            onClick={() => router.push('/services')}
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Quay lại danh sách dịch vụ
          </button>
        </div>
      </div>
    );
  }

  // Redirect if service not found
  if (!service) {
    return null;
  }

  const { details } = service;

  const handleBackClick = () => {
    router.back();
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
          <ServiceGallery images={details.images} serviceTitle={details.title} />
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
        <ServiceReviews 
          reviews={details.reviews}
          totalReviews={service.reviews}
          averageRating={service.rating}
        />

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
            <Button 
              onClick={handleBookService}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-bold"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Đặt dịch vụ
            </Button>
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
            {/* Load related services - for now using mock data */}
            {servicesData
              .filter(s => s.id !== serviceId)
              .slice(0, 3)
              .map((relatedService) => (
                <Link 
                  key={relatedService.id} 
                  href={`/services/${relatedService.id}`}
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
        onClose={closeBookModal}
        serviceName={details.title}
        serviceId={serviceId}
      />
    </div>
  );
}

