"use client";

import { Gift, DollarSign, Tag, Calendar, History } from 'lucide-react';
import { Button } from '@/src/app/components/ui/button';
import { useLoyalty } from '@/modules/loyalty';
import { useProfile } from '@/modules/profile';

export function PromotionsTab() {
  const { data: loyaltyData, loading: loyaltyLoading } = useLoyalty();
  const { profile, loading: profileLoading } = useProfile();

  if (loyaltyLoading || profileLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Đang tải...</p>
      </div>
    );
  }

  if (!loyaltyData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Không tìm thấy dữ liệu</p>
      </div>
    );
  }

  const { totalPoints, pointHistory, promotionTiers } = loyaltyData;

  const getPromoTypeColor = (type: string) => {
    // Map promotion tier to color based on description
    if (type.includes('new-user') || type.includes('mới')) {
      return 'bg-purple-100 text-purple-700';
    }
    if (type.includes('birthday') || type.includes('sinh nhật')) {
      return 'bg-pink-100 text-pink-700';
    }
    if (type.includes('loyalty') || type.includes('thân thiết')) {
      return 'bg-amber-100 text-amber-700';
    }
    return 'bg-cyan-100 text-cyan-700';
  };

  // Convert promotionTiers to promotions format for display
  const promotions = promotionTiers.map((tier, index) => ({
    id: `PROMO${index + 1}`,
    code: `TIER${tier.points}`,
    discount: tier.description,
    minOrder: `${tier.discount.toLocaleString('vi-VN')}đ`,
    expiryDate: '31/12/2025',
    serviceType: 'Tất cả dịch vụ',
    description: tier.description,
    type: tier.points >= 300 ? 'loyalty' : tier.points >= 200 ? 'event' : tier.points >= 100 ? 'birthday' : 'new-user'
  }));

  return (
    <>
      {/* Points Summary */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md p-6 text-white">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/80 mb-1">Tổng điểm</p>
            <p className="text-3xl font-bold">{totalPoints}</p>
          </div>
          <div>
            <p className="text-white/80 mb-1">Đã tiết kiệm</p>
            <p className="text-3xl font-bold">320.000đ</p>
          </div>
          <div>
            <p className="text-white/80 mb-1">Mã khả dụng</p>
            <p className="text-3xl font-bold">{promotions.length}</p>
          </div>
        </div>
      </div>

      {/* Available Promotions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-gray-800 mb-6">Mã giảm giá khả dụng</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-cyan-500 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs mb-2 ${getPromoTypeColor(
                      promo.type
                    )}`}
                  >
                    {promo.description}
                  </span>
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-5 h-5 text-cyan-600" />
                    <span className="text-gray-800 font-bold">{promo.code}</span>
                  </div>
                  <p className="text-2xl font-bold text-cyan-600 mb-2">
                    {promo.discount}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Đơn tối thiểu: {promo.minOrder}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span>{promo.serviceType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>HSD: {promo.expiryDate}</span>
                </div>
              </div>

              <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                Sử dụng ngay
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Points Rewards */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-gray-800 mb-4">Đổi điểm nhận quà</h2>
        <p className="text-gray-600 mb-6">
          Sử dụng điểm tích lũy để đổi lấy voucher hoặc ưu đãi đặc biệt
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="text-center mb-3">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Gift className="w-8 h-8 text-amber-600" />
              </div>
              <p className="text-gray-800">Voucher 50.000đ</p>
            </div>
            <p className="text-center text-cyan-600 mb-3">200 điểm</p>
            <Button className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300">
              Đổi ngay
            </Button>
          </div>

          <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="text-center mb-3">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Gift className="w-8 h-8 text-amber-600" />
              </div>
              <p className="text-gray-800">Voucher 100.000đ</p>
            </div>
            <p className="text-center text-cyan-600 mb-3">350 điểm</p>
            <Button className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300">
              Đổi ngay
            </Button>
          </div>

          <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="text-center mb-3">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Gift className="w-8 h-8 text-amber-600" />
              </div>
              <p className="text-gray-800">Voucher 200.000đ</p>
            </div>
            <p className="text-center text-cyan-600 mb-3">600 điểm</p>
            <Button className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300">
              Đổi ngay
            </Button>
          </div>
        </div>
      </div>

      {/* Usage History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-gray-800 mb-4">Lịch sử sử dụng</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <History className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-800">GIAM20</p>
                <p className="text-sm text-gray-600">Đã sử dụng - 12/12/2024</p>
              </div>
            </div>
            <span className="text-green-600 font-semibold">-40.000đ</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <History className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-800">NEWUSER50</p>
                <p className="text-sm text-gray-600">Đã sử dụng - 05/12/2024</p>
              </div>
            </div>
            <span className="text-green-600 font-semibold">-75.000đ</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg opacity-50">
            <div className="flex items-center gap-3">
              <History className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-800">WINTER30</p>
                <p className="text-sm text-gray-600">Đã hết hạn - 01/12/2024</p>
              </div>
            </div>
            <span className="text-gray-400">Hết hạn</span>
          </div>
        </div>
      </div>
    </>
  );
}
