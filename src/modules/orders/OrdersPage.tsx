"use client";

import { useState } from 'react';
import { Star, Filter, Loader2, AlertCircle, LogIn, Lock } from 'lucide-react';
import { useOrders } from './hooks/useOrders';
import { OrderList } from './components/OrderList';
import { OrderStatusFilter } from './components/OrderStatusFilter';
import { Order, ReviewData } from './types/order.types';
import { ReviewModal } from './components/ReviewModal';
import { useAuth } from '@/shared/hooks/useAuth';
import { useAuthModal } from '@/shared/hooks/useAuthModal';

export function OrdersPage() {
  const { isLoggedIn } = useAuth();
  const { openLogin } = useAuthModal();
  const { filteredOrders, orders, isLoading, error, filterStatus, setFilterStatus, updateOrder } = useOrders();
  const [reviewingOrder, setReviewingOrder] = useState<Order | null>(null);
  const [showGuide, setShowGuide] = useState(true);

  const handleReviewSubmit = async (reviewData: ReviewData) => {
    try {
      // Import the API function
      const { createReview } = await import('./api/orders.api');

      // Create review via API
      await createReview(reviewData.orderId, {
        rating: reviewData.rating,
        comment: reviewData.comment,
        images: reviewData.images
      });

      // Cập nhật trạng thái đơn hàng thành "Đã đánh giá"
      updateOrder(reviewData.orderId, { reviewSubmitted: true });

      // Lưu đánh giá vào localStorage (backup)
      const existingReviews = JSON.parse(localStorage.getItem('serviceReviews') || '[]');
      const newReview = {
        ...reviewData,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('serviceReviews', JSON.stringify([...existingReviews, newReview]));

      toast.success('Cảm ơn bạn đã đánh giá dịch vụ!');
      // Đóng modal đánh giá
      setReviewingOrder(null);
    } catch (error: any) {
      console.error('Error submitting review:', error);
      toast.error('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.');
    }
  };

  const handleReviewClick = (order: Order) => {
    setReviewingOrder(order);
  };

  // Show login prompt if user is not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Đăng nhập để xem đơn hàng</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Bạn cần đăng nhập để xem lịch sử đặt dịch vụ và theo dõi trạng thái đơn hàng của mình.
            </p>
            <button
              onClick={openLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
            >
              <LogIn className="w-5 h-5" />
              Đăng nhập ngay
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Chưa có tài khoản? <button onClick={() => openLogin()} className="text-blue-600 hover:underline">Đăng ký</button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-gray-900 mb-2">Lịch sử đặt dịch vụ</h1>
            <p className="text-gray-600">Quản lý và theo dõi các đơn hàng của bạn</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Đang tải danh sách đơn hàng...</span>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className={`border rounded-lg p-4 mb-6 max-w-2xl mx-auto ${
            error.includes('đăng nhập') || error.includes('hết hạn')
              ? 'bg-yellow-50 border-yellow-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className={`flex items-center gap-2 ${
              error.includes('đăng nhập') || error.includes('hết hạn')
                ? 'text-yellow-700'
                : 'text-red-700'
            }`}>
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
            {(error.includes('đăng nhập') || error.includes('hết hạn')) && (
              <button
                onClick={openLogin}
                className="mt-3 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Đăng nhập lại
              </button>
            )}
          </div>
        )}

        {/* Main Content - Only show if logged in and no auth errors */}
        {!isLoading && !error && isLoggedIn && (
          <>
            {/* Hướng dẫn đánh giá */}
            {showGuide && orders.some(o => o.status === 'completed' && o.canReview && !o.reviewSubmitted) && (
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-2xl p-4 md:p-6 mb-6 shadow-lg relative">
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">🎉 Bạn có đơn hàng chờ đánh giá!</h3>
                <p className="text-gray-700 mb-4">
                  Hãy chia sẻ trải nghiệm của bạn để giúp chúng tôi cải thiện chất lượng dịch vụ
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs">1</div>
                    <div>
                      <p className="text-gray-900">Tìm đơn hoàn thành</p>
                      <p className="text-gray-600 text-xs">Có nút vàng "Đánh giá dịch vụ"</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs">2</div>
                    <div>
                      <p className="text-gray-900">Chọn số sao & nhận xét</p>
                      <p className="text-gray-600 text-xs">Tối thiểu 10 ký tự</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs">3</div>
                    <div>
                      <p className="text-gray-900">Thêm ảnh (tùy chọn)</p>
                      <p className="text-gray-600 text-xs">Tối đa 5 ảnh</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter */}
        <OrderStatusFilter filterStatus={filterStatus} onFilterChange={setFilterStatus} />

        {/* Thống kê nhanh */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <p className="text-gray-600 text-sm mb-1">Tổng đơn hàng</p>
            <p className="text-gray-900 text-2xl">{orders.length}</p>
          </div>
          <div className="bg-green-50 rounded-xl border border-green-200 shadow-sm p-4">
            <p className="text-green-700 text-sm mb-1">Hoàn thành</p>
            <p className="text-green-900 text-2xl">
              {orders.filter(o => o.status === 'completed').length}
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl border border-blue-200 shadow-sm p-4">
            <p className="text-blue-700 text-sm mb-1">Đang xử lý</p>
            <p className="text-blue-900 text-2xl">
              {orders.filter(o => o.status === 'processing' || o.status === 'repairing').length}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-xl border border-yellow-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-yellow-700 text-sm">Chờ đánh giá</p>
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            </div>
            <p className="text-yellow-900 text-2xl">
              {orders.filter(o => o.status === 'completed' && o.canReview && !o.reviewSubmitted).length}
            </p>
          </div>
        </div>

            {/* Danh sách đơn hàng */}
            <OrderList orders={filteredOrders} onReview={handleReviewClick} />
          </>
        )}
      </div>

      {/* Modal đánh giá */}
      {reviewingOrder && (
        <ReviewModal
          order={reviewingOrder}
          onClose={() => setReviewingOrder(null)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
}

