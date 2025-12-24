"use client";

import { useState, useEffect } from "react";
import { ProfessionalTeamSection } from "./components/ProfessionalTeamSection";
import { ServiceCategories } from "./components/ServiceCategories";
import { ServiceWorkerSelector } from "./components/ServiceWorkerSelector";
import { ServiceGallery } from "./components/ServiceGallery";
import { ServicePricingTabs } from "./components/ServicePricingTabs";
import { ServiceReviews } from "./components/ServiceReviews";
import { Button } from "@/shared/components/ui/button";
import { Phone, MessageSquare, Loader2, AlertCircle } from "lucide-react";
import { getServices } from "./api/services.api";
import Link from "next/link";

export function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (err: any) {
        console.error('Failed to load services:', err);
        setError('Không thể tải danh sách dịch vụ. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Use first service as mock data for static sections if services are loaded
  const mockService = services[0];
  const mockDetails = mockService?.details || {
    title: "Dịch vụ sửa chữa",
    pricingCategories: [],
    images: [],
    reviews: [],
  };

  // Calculate average rating and total reviews for reviews section
  const totalReviews = mockDetails.reviews?.length || 0;
  const averageRating =
    totalReviews > 0
      ? mockDetails.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 4.8;

  if (loading) {
    return (
      <div className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-cyan-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải danh sách dịch vụ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">⚠️ {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero / Banner Section */}
      <ProfessionalTeamSection />

      {/* Service Categories Section */}
      <ServiceCategories />

      {/* Professional Team / Worker Selector Section */}
      <ServiceWorkerSelector />

      {/* Service Gallery Section - Static placeholder */}
      {mockDetails.images && mockDetails.images.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <ServiceGallery
              images={mockDetails.images}
              serviceTitle={mockDetails.title}
            />
          </div>
        </div>
      )}

      {/* Pricing Tabs Section - Static placeholder */}
      {mockDetails.pricingCategories &&
        mockDetails.pricingCategories.length > 0 && (
          <div className="bg-white py-16">
            <div className="container mx-auto px-4 max-w-6xl">
              <ServicePricingTabs
                categories={mockDetails.pricingCategories}
                serviceName={mockDetails.title}
              />
            </div>
          </div>
        )}

      {/* Reviews Section - Static placeholder */}
      {mockDetails.reviews && mockDetails.reviews.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <ServiceReviews
              reviews={mockDetails.reviews}
              totalReviews={totalReviews}
              averageRating={averageRating}
            />
          </div>
        </div>
      )}

      {/* CTA / Booking Button Section - Static placeholder */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sẵn sàng đặt dịch vụ?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Liên hệ ngay với chúng tôi để được tư vấn và báo giá miễn phí. Đội
            ngũ chuyên nghiệp sẵn sàng hỗ trợ bạn 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:09xxxxxx">
              <Button className="bg-white hover:bg-gray-100 text-cyan-600 px-8 py-6 text-lg font-bold rounded-xl shadow-xl">
                <Phone className="w-5 h-5 mr-2" />
                Gọi điện ngay
              </Button>
            </a>
            <Link href="/contact">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-xl border-2 border-white">
                <MessageSquare className="w-5 h-5 mr-2" />
                Liên hệ ngay
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
