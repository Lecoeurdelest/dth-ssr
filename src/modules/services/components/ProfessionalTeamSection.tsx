"use client";

import { Zap, Shield, DollarSign } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export function ProfessionalTeamSection() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWorkerSelector = () => {
    const workerSelector = document.getElementById('worker-selector');
    if (workerSelector) {
      workerSelector.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            ĐỘI NGŨ SỬA CHỮA CHUYÊN NGHIỆP
          </h1>
          <p className="text-white/90 text-lg max-w-3xl mx-auto">
            Đội thợ được kiểm định và tuyển chọn kĩ càng bởi kĩ sư QC - chúng tôi luôn sẵn sàng phục vụ quý khách hàng trong mọi trường hợp theo yêu cầu
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {/* Ưu Tiên */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">Ưu tiên</h3>
            <p className="text-gray-600 text-sm">
              Ưu tiên gọi điện
            </p>
          </div>

          {/* Cam Chứng Lập Phiếu */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">Cam kết lập phiếu</h3>
            <p className="text-gray-600 text-sm">
              Luôn sẵn sàng
            </p>
          </div>

          {/* Báo Trước Số Tiền */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">Báo trước số tiền phạm</h3>
            <p className="text-gray-600 text-sm">
              Cam kết minh bạch
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={scrollToServices}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all"
          >
            ⚡ Gọi Lại Ngay
          </Button>
          <Button 
            onClick={scrollToWorkerSelector}
            className="bg-white hover:bg-gray-100 text-blue-700 px-8 py-6 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all border-2 border-white"
          >
            📋 Nhận tin
          </Button>
        </div>
      </div>
    </section>
  );
}

