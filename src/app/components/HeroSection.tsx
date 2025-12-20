import { Phone, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';

export function HeroSection() {
  const navigate = useNavigate();
  const { openChat } = useChat();

  return (
    <section className="relative bg-gray-900 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHJlcGFpciUyMGhvbWUlMjBvcmFuZ2UlMjB1bmlmb3JtfGVufDF8fHx8MTc2NTg4MDkxOHww&ixlib=rb-4.1.0&q=80&w=1080"
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
              onClick={() => navigate('/contact')}
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