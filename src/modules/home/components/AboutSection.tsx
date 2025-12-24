"use client";

import {
  CheckCircle,
  Award,
  Shield,
  Headphones,
  Users,
  DollarSign,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { ImageWithFallback } from "@/shared/components/figma/ImageWithFallback";
import { useRouter } from "next/navigation";

export function AboutSection() {
  const router = useRouter();

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* About Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Team Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1589559375424-c3fa757c3094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWludGVuYW5jZSUyMHdvcmtlcnMlMjBncm91cCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjU4ODEyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Đội ngũ nhân viên Sửa Chữa Nhỏ"
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Badge */}
            <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-xl px-6 py-4 border-2 border-cyan-500">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    Đội ngũ chuyên nghiệp
                  </p>
                  <p className="text-sm text-gray-600">Kinh nghiệm 10+ năm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <p className="text-cyan-600 uppercase tracking-wider font-semibold text-lg">
              VỀ CHÚNG TÔI
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Đơn vị SỬA CHỮA NHỎ
              <br />
              Hàng đầu tại Ninh Bình
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Chúng tôi là đội ngũ thợ chuyên nghiệp với nhiều năm kinh nghiệm
              trong lĩnh vực sửa chữa điện nước và bảo trì nhà cửa tại tỉnh Ninh
              Bình. Cam kết mang đến dịch vụ chất lượng cao, giá cả minh bạch và
              sự hài lòng tuyệt đối cho khách hàng.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Với phương châm "Chất lượng - Uy tín - Nhanh chóng", chúng tôi
              luôn đặt lợi ích khách hàng lên hàng đầu, phục vụ tận tâm cho mọi
              gia đình tại Ninh Bình và các vùng lân cận.
            </p>
            <Button
              onClick={() => router.push("/news")}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg font-semibold transition-all shadow-lg"
            >
              TÌM HIỂU THÊM
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="text-center bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all">
            <p className="text-4xl md:text-5xl font-bold text-cyan-600 mb-2">
              10+
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-tight">
              Năm kinh nghiệm phục vụ
            </p>
          </div>
          <div className="text-center bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all">
            <p className="text-4xl md:text-5xl font-bold text-cyan-600 mb-2">
              5000+
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-tight">
              Khách hàng tin tưởng
            </p>
          </div>
          <div className="text-center bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all">
            <p className="text-4xl md:text-5xl font-bold text-cyan-600 mb-2">
              24/7
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-tight">
              Hỗ trợ mọi lúc mọi nơi
            </p>
          </div>
          <div className="text-center bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all">
            <p className="text-4xl md:text-5xl font-bold text-cyan-600 mb-2">
              98%
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-tight">
              Khách hàng hài lòng
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 - Hỗ Trợ 24/7 */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-cyan-100">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 bg-cyan-500 rounded-full">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Hỗ Trợ 24/7
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Luôn sẵn sàng tiếp nhận và xử lý các yêu cầu sửa chữa khẩn cấp
                  bất kể ngày đêm, kể cả ngày lễ và cuối tuần.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 - Đội Thợ Chuyên Nghiệp */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-cyan-100">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 bg-cyan-500 rounded-full">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Đội Thợ Chuyên Nghiệp
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Đội ngũ thợ lành nghề, được đào tạo bài bản, có chứng chỉ hành
                  nghề và nhiều năm kinh nghiệm thực tế.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 - Giá Cả Minh Bạch */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-cyan-100">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 bg-cyan-500 rounded-full">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Giá Cả Minh Bạch
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Báo giá rõ ràng trước khi thực hiện, không phát sinh chi phí
                  ngoài, cam kết giá cả hợp lý nhất thị trường.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
