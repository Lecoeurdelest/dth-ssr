import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { PricingCategory } from '../data/servicesData';
import { AlertCircle, Phone, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';

interface ServicePricingTabsProps {
  categories: PricingCategory[];
  serviceName: string;
}

export function ServicePricingTabs({ categories, serviceName }: ServicePricingTabsProps) {
  const [activeTab, setActiveTab] = useState('tab-0');

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Các hạng mục dịch vụ
        </h2>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b bg-gray-50 px-6 py-2">
          <TabsList className="bg-transparent gap-2 h-auto p-0 flex flex-wrap justify-start">
            {categories.map((category, index) => (
              <TabsTrigger
                key={index}
                value={`tab-${index}`}
                className="px-6 py-3 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700 font-semibold border-2 data-[state=active]:border-blue-600 data-[state=inactive]:border-gray-200"
              >
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab Content */}
        {categories.map((category, index) => (
          <TabsContent key={index} value={`tab-${index}`} className="p-6 m-0">
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex}
                  className="flex justify-between items-center p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200"
                >
                  <span className="text-gray-800 font-medium flex-1">
                    {item.item}
                  </span>
                  <span className="text-blue-600 font-bold text-lg whitespace-nowrap ml-4">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Important Notes */}
      <div className="bg-blue-50 border-t border-blue-100 p-6">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          Cần lưu ý
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Mỗi loại hạng mục có riêng – không phụ thuộc vào lĩnh vực</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Chi phí không – Khi xác nhận 24/7</span>
          </li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-center">
        <h3 className="text-white text-2xl font-bold mb-3">
          HÃY LIÊN HỆ NGAY CHO CHÚNG TÔI
        </h3>
        <p className="text-white/90 mb-6 text-sm">
          Liên hệ ngay – và chúng tôi sẽ giúp giải quyết vấn đề – Chúng tôi sẵn sàng hỗ trợ khách hàng
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:09xxxxxx">
            <Button className="bg-white hover:bg-gray-100 text-blue-700 px-8 py-3 font-bold rounded-lg shadow-lg">
              <Phone className="w-5 h-5 mr-2" />
              Gọi điện
            </Button>
          </a>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 font-bold rounded-lg shadow-lg border-2 border-white">
            <MessageSquare className="w-5 h-5 mr-2" />
            Nhắn tin
          </Button>
        </div>
      </div>
    </div>
  );
}
