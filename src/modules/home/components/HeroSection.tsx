"use client";

import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { ImageWithFallback } from '@/shared/components/figma/ImageWithFallback';
import { useRouter } from 'next/navigation';
import { useChat } from '@/shared/hooks/useChat';

export function HeroSection() {
  const router = useRouter();
  const { openChat } = useChat();

  return (
    <section className="relative bg-gray-900 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="/images/image26.png"         
          alt="Thợ sửa chữa chuyên nghiệp"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay - đen mờ nhạt dần từ trái sang phải */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            DỊCH VỤ SỬA CHỮA ĐIỆN-NƯỚC VÀ BẢO TRÌ NHÀ CỬA TẠI TỈNH NINH BÌNH
          </h1>
          
          <p className="text-xl md:text-2xl text-cyan-400 italic mb-6 font-semibold">
            "Chất lượng – Uy tín – Nhanh chóng"
          </p>
          
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Đội ngũ thợ lành nghề, hỗ trợ nhanh và đúng hẹn. Cam kết minh bạch giá, phục vụ tận tâm cho mọi gia đình.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={() => router.push('/contact')}
            >
              <Phone className="w-5 h-5 mr-2" />
              ĐẶT LỊCH NGAY
            </Button>
            <Button 
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={openChat}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              NHẮN TIN
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

