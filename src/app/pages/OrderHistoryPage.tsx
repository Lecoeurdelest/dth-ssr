import { useState } from 'react';
import { OrderCard } from '../components/OrderCard';
import { OrderDetailModal } from '../components/OrderDetailModal';
import { ordersData, Order, OrderStatus, getStatusText } from '../data/ordersData';
import { Filter, Star, Camera, MessageSquare, Info } from 'lucide-react';
import { ReviewData, ReviewModal } from '../components/ReviewModal';

export function OrderHistoryPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const [orders, setOrders] = useState<Order[]>(ordersData);
  const [reviewingOrder, setReviewingOrder] = useState<Order | null>(null);
  const [showGuide, setShowGuide] = useState(true);

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const statusFilters: Array<{ value: OrderStatus | 'all'; label: string }> = [
    { value: 'all', label: 'Tất cả' },
    { value: 'pending', label: 'Chờ xử lý' },
    { value: 'processing', label: 'Đang xử lý' },
    { value: 'repairing', label: 'Đang sửa' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'cancelled', label: 'Đã hủy' }
  ];

  const handleReviewSubmit = (reviewData: ReviewData) => {
    // Cập nhật trạng thái đơn hàng thành "Đã đánh giá"
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === reviewData.orderId 
          ? { ...order, reviewSubmitted: true }
          : order
      )
    );

    // Cập nhật selectedOrder để modal hiển thị trạng thái mới
    if (selectedOrder && selectedOrder.id === reviewData.orderId) {
      setSelectedOrder({ ...selectedOrder, reviewSubmitted: true });
    }

    // Lưu đánh giá vào localStorage
    const existingReviews = JSON.parse(localStorage.getItem('serviceReviews') || '[]');
    const newReview = {
      ...reviewData,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('serviceReviews', JSON.stringify([...existingReviews, newReview]));

    console.log('Review submitted:', newReview);
    
    // Đóng modal đánh giá
    setReviewingOrder(null);
  };

  const handleReviewClick = (order: Order) => {
    setReviewingOrder(order);
  };

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
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex items-center gap-2 text-gray-700">
              <Filter className="w-5 h-5" />
              <span className="whitespace-nowrap">Lọc theo trạng thái:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {statusFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterStatus(filter.value)}
                  className={`px-4 py-2 rounded-lg transition-all text-sm md:text-base ${
                    filterStatus === filter.value
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

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
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-gray-900 mb-2">Không có đơn hàng</h3>
            <p className="text-gray-600">
              {filterStatus === 'all' 
                ? 'Bạn chưa có đơn hàng nào' 
                : `Không có đơn hàng với trạng thái "${statusFilters.find(f => f.value === filterStatus)?.label}"`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={() => setSelectedOrder(order)}
                onReview={() => handleReviewClick(order)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal chi tiết */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onReviewSubmit={handleReviewSubmit}
        />
      )}

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