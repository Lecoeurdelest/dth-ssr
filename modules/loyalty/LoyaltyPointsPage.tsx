"use client";

import { 
  Star, 
  Gift, 
  TrendingUp, 
  Calendar, 
  Tag, 
  ArrowRight,
  CheckCircle,
  Info,
  Sparkles,
  Award
} from 'lucide-react';
import { useLoyalty } from './hooks/useLoyalty';
import Link from 'next/link';

export function LoyaltyPointsPage() {
  const { data, loading } = useLoyalty();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center py-20">
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center py-20">
            <p className="text-gray-600">Không tìm thấy dữ liệu</p>
          </div>
        </div>
      </div>
    );
  }

  const { totalPoints, pointHistory, promotionTiers } = data;

  // Tính điểm cần để đạt mốc tiếp theo
  const getNextTierInfo = () => {
    for (const tier of promotionTiers) {
      if (totalPoints < tier.points) {
        return {
          pointsNeeded: tier.points - totalPoints,
          discount: tier.discount
        };
      }
    }
    return null;
  };

  const nextTier = getNextTierInfo();

  // Xác định mốc hiện tại đã đạt
  const getCurrentTier = () => {
    for (let i = promotionTiers.length - 1; i >= 0; i--) {
      if (totalPoints >= promotionTiers[i].points) {
        return promotionTiers[i];
      }
    }
    return null;
  };

  const currentTier = getCurrentTier();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="p-6 md:p-10 text-white">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex-1 min-w-[250px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Star className="w-8 h-8 md:w-10 md:h-10 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div>
                    <h1 className="text-white mb-0">Điểm Tích Lũy</h1>
                    <p className="text-blue-100 text-sm md:text-base">Nhận ưu đãi hấp dẫn</p>
                  </div>
                </div>
              </div>

              {/* Tổng điểm hiện tại */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 border-2 border-white/30 min-w-[200px]">
                <p className="text-blue-100 text-sm mb-2">Tổng điểm của bạn</p>
                <div className="flex items-end gap-2">
                  <span className="text-white" style={{ fontSize: '2.5rem', lineHeight: '1', fontWeight: 'bold' }}>
                    {totalPoints}
                  </span>
                  <span className="text-blue-100 mb-2">điểm</span>
                </div>
                {currentTier && (
                  <div className="mt-3 flex items-center gap-2 bg-yellow-400/30 rounded-lg px-3 py-2">
                    <Award className="w-5 h-5 text-yellow-300" />
                    <span className="text-white text-sm">Đã đạt mốc {currentTier.points} điểm</span>
                  </div>
                )}
              </div>
            </div>

            {/* Ghi chú */}
            <div className="mt-6 flex items-start gap-2 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <Info className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
              <p className="text-blue-100 text-sm">
                Điểm được cộng tự động sau khi hoàn thành dịch vụ. Mỗi 10.000đ chi tiêu = 1 điểm.
              </p>
            </div>
          </div>
        </div>

        {/* Thông báo tiến độ */}
        {nextTier && (
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-300 rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-7 h-7 text-orange-600" />
              <h2 className="text-orange-900 mb-0">Sắp nhận ưu đãi!</h2>
            </div>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-orange-800">Bạn cần thêm <strong>{nextTier.pointsNeeded} điểm</strong></span>
                <span className="text-orange-800">để nhận <strong>ưu đãi {nextTier.discount.toLocaleString('vi-VN')}đ</strong></span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-white rounded-full h-4 shadow-inner overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ 
                    width: `${Math.min((totalPoints / (totalPoints + nextTier.pointsNeeded)) * 100, 100)}%` 
                  }}
                >
                  <TrendingUp className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <p className="text-orange-700 text-sm">
              💡 Đặt thêm dịch vụ để tích điểm nhanh hơn!
            </p>
          </div>
        )}

        {/* Quy đổi điểm - Khuyến mãi */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Gift className="w-8 h-8 text-blue-600" />
            <h2 className="text-gray-900 mb-0">Quy Đổi Điểm – Khuyến Mãi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {promotionTiers.map((tier, index) => {
              const isAchieved = totalPoints >= tier.points;
              return (
                <div
                  key={index}
                  className={`relative rounded-2xl p-5 border-2 transition-all duration-300 ${
                    isAchieved
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400 shadow-lg'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  {/* Icon và badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-4xl">{tier.icon}</span>
                    {isAchieved && (
                      <div className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Đã đạt</span>
                      </div>
                    )}
                  </div>

                  {/* Thông tin */}
                  <div className="mb-2">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span 
                        className={`${isAchieved ? 'text-green-700' : 'text-gray-700'}`}
                        style={{ fontSize: '1.5rem', fontWeight: 'bold', lineHeight: '1.2' }}
                      >
                        {tier.points}
                      </span>
                      <span className={`${isAchieved ? 'text-green-600' : 'text-gray-600'}`}>
                        điểm
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className={`w-5 h-5 ${isAchieved ? 'text-green-600' : 'text-gray-500'}`} />
                      <span 
                        className={`${isAchieved ? 'text-green-700' : 'text-gray-700'}`}
                        style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
                      >
                        {tier.description}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar cho tier chưa đạt */}
                  {!isAchieved && totalPoints > 0 && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${Math.min((totalPoints / tier.points) * 100, 100)}%` 
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Còn {tier.points - totalPoints} điểm
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Ghi chú sử dụng điểm */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-blue-900 mb-2">
                  <strong>Cách sử dụng điểm:</strong>
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Điểm dùng để giảm trực tiếp vào hóa đơn khi đặt lịch mới</li>
                  <li>• Điểm không được quy đổi thành tiền mặt</li>
                  <li>• Điểm có hiệu lực trong vòng 12 tháng kể từ ngày tích</li>
                  <li>• Mỗi đơn hàng chỉ áp dụng một mốc khuyến mãi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Lịch sử tích điểm */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h2 className="text-gray-900 mb-0">Lịch Sử Tích Điểm</h2>
          </div>

          <div className="space-y-3">
            {pointHistory.map((history) => (
              <div
                key={history.id}
                className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 md:p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                        {history.orderCode}
                      </span>
                      {history.status === 'earned' && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <p className="text-gray-800 mb-1">{history.serviceType}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {history.orderDate}
                    </p>
                  </div>

                  {/* Điểm tích lũy */}
                  <div className="bg-white rounded-xl px-4 py-3 border-2 border-green-400 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span 
                        className="text-green-600"
                        style={{ fontSize: '1.5rem', fontWeight: 'bold', lineHeight: '1' }}
                      >
                        +{history.points}
                      </span>
                      <span className="text-green-600">điểm</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pointHistory.length === 0 && (
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Chưa có lịch sử tích điểm</p>
              <p className="text-sm text-gray-400 mt-2">Đặt dịch vụ để bắt đầu tích điểm nhé!</p>
            </div>
          )}
        </div>

        {/* Nút hành động */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/services">
            <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-5 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-cyan-700 active:scale-95 transition-all flex items-center justify-center gap-3">
              <Calendar className="w-6 h-6" />
              <span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
                Đặt Lịch Để Tích Điểm
              </span>
            </button>
          </Link>

          <Link href="/services">
            <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-5 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:from-orange-600 hover:to-yellow-600 active:scale-95 transition-all flex items-center justify-center gap-3">
              <Gift className="w-6 h-6" />
              <span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
                Sử Dụng Điểm Cho Đơn Tiếp Theo
              </span>
            </button>
          </Link>
        </div>

        {/* Lưu ý cuối trang */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-purple-900 mb-3">Điều Khoản Chương Trình Tích Điểm</h3>
              <ul className="text-sm text-purple-800 space-y-2">
                <li>• Chương trình tích điểm áp dụng cho tất cả dịch vụ sửa chữa điện nước và bảo trì nhà cửa</li>
                <li>• Điểm tích lũy = Tổng giá trị đơn hàng chia cho 10.000 (làm tròn xuống)</li>
                <li>• Điểm chỉ được cộng sau khi đơn hàng hoàn thành và thanh toán đầy đủ</li>
                <li>• Điểm có thời hạn sử dụng 12 tháng kể từ ngày tích lũy</li>
                <li>• Công ty có quyền điều chỉnh chương trình mà không cần báo trước</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

