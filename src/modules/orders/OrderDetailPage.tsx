"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, Check, Star, Phone, MessageSquare, FileText, Eye, Download, RotateCw } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { ImageWithFallback } from '@/shared/components/figma/ImageWithFallback';
import { getOrderById } from './api/orders.api';
import { Order, getStatusText, getStatusColor, formatCurrency, formatDate, ReviewData } from './types/order.types';
import { OrderSummary } from './components/OrderSummary';
import { OrderPaymentSection } from './components/OrderPaymentSection';
import { InvoicePreviewModal } from './components/InvoicePreviewModal';
import { ReviewModal } from './components/ReviewModal';
import { CancelOrderModal } from './components/CancelOrderModal';
import { useAuth } from '@/shared/hooks/useAuth';
import { useAuthModal } from '@/shared/hooks/useAuthModal';
import { toast } from 'sonner';

interface OrderDetailPageProps {
  orderId: string;
}

export function OrderDetailPage({ orderId }: OrderDetailPageProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { openLogin } = useAuthModal();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        const data = await getOrderById(orderId);
        if (!data) {
          router.push('/orders');
          return;
        }
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
        router.push('/orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [orderId]);

  const handleBackClick = () => {
    router.back();
  };

  const handleReorder = () => {
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    toast.success('Đã tạo yêu cầu đặt lại dịch vụ!');
    router.push('/services');
  };

  const handleCallSupport = () => {
    window.location.href = 'tel:0123456789';
  };

  const handleDownloadInvoice = () => {
    setShowInvoicePreview(true);
  };

  const handleCancelOrder = () => {
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    if (order) {
      // Update order status to cancelled
      setOrder({ ...order, status: 'cancelled' });
      toast.success('Đơn hàng đã được hủy');
    }
  };

  const handleSubmitReview = (reviewData: ReviewData) => {
    if (order) {
      setOrder({ ...order, reviewSubmitted: true });
      toast.success('Cảm ơn bạn đã đánh giá dịch vụ!');
      setShowReviewModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <Button 
          onClick={handleBackClick}
          variant="outline" 
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách dịch vụ
        </Button>

        {/* Header Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl mb-8">
          <ImageWithFallback 
            src={order.issueImages?.[0] || 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800'}
            alt={order.serviceType}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Title and Rating */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-600 mb-4">
            {order.serviceType}
          </h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(4.8) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="font-semibold text-gray-800">4.8</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{order.orderCode}</span>
          </div>

          {/* Status */}
          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Trạng thái đơn hàng</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Ngày đặt</p>
                <p className="text-gray-900">{formatDate(order.orderDate)}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            {order.issueDescription}
          </p>

          {/* Issue Images */}
          {order.issueImages && order.issueImages.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              {order.issueImages.map((img, index) => (
                <ImageWithFallback
                  key={index}
                  src={img}
                  alt={`Hình ảnh sự cố ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <h3 className="text-gray-900 mb-3">Thông tin khách hàng</h3>
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Họ tên:</span>
              <span className="text-gray-900">{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Số điện thoại:</span>
              <span className="text-gray-900">{order.customerPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Địa chỉ:</span>
              <span className="text-gray-900 text-right max-w-xs">{order.address}</span>
            </div>
          </div>
        </div>

        {/* Technician Info */}
        {order.technician && (
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
            <h3 className="text-gray-900 mb-3">Thông tin thợ sửa chữa</h3>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
              <div className="flex items-center gap-4 mb-4">
                <ImageWithFallback
                  src={order.technician.avatar}
                  alt={order.technician.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">{order.technician.name}</h4>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">
                      {order.technician.experience} năm kinh nghiệm
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-900">{order.technician.rating}</span>
                    </div>
                  </div>
                </div>
                <a
                  href={`tel:${order.technician.phone}`}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition-colors"
                >
                  <Phone className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <h3 className="text-gray-900 mb-3">Tiến trình sửa chữa</h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="space-y-4">
              {order.timeline.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      {step.completed && (
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {index < order.timeline.length - 1 && (
                      <div className={`w-0.5 h-12 ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className={`mb-1 ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.status}
                    </p>
                    {step.time && (
                      <p className="text-sm text-gray-500">{step.time}</p>
                    )}
                    {step.description && (
                      <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cost Summary */}
        {order.costDetails.length > 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
            <OrderSummary order={order} />
          </div>
        )}

        {/* Payment Section */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <OrderPaymentSection order={order} />
        </div>

        {/* Invoice Section */}
        {order.status === 'completed' && order.invoice && (
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
            <h3 className="text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Hóa đơn dịch vụ
            </h3>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Số hóa đơn:</span>
                  <span className="text-gray-900">{order.invoice.invoiceNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ngày xuất hóa đơn:</span>
                  <span className="text-gray-900">{order.invoice.issueDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trạng thái hóa đơn:</span>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {order.invoice.status === 'issued' ? 'Đã xuất' : 'Chưa xuất'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-green-200">
                  <span className="text-gray-900">Tổng tiền thanh toán:</span>
                  <span className="text-blue-600">{formatCurrency(order.totalCost)}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowInvoicePreview(true)}
                    className="flex items-center justify-center gap-2"
                  >
                    <Eye className="w-5 h-5" />
                    Xem hóa đơn
                  </Button>
                  <Button
                    onClick={handleDownloadInvoice}
                    className="flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Tải hóa đơn PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review Section */}
        {order.canReview && !order.reviewSubmitted && (
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
            <Button
              onClick={() => {
                if (!isLoggedIn) {
                  openLogin();
                  return;
                }
                setShowReviewModal(true);
              }}
              className="w-full py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
            >
              <Star className="w-5 h-5" />
              Đánh giá dịch vụ
            </Button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            onClick={handleReorder}
            className="flex items-center justify-center gap-2"
          >
            <RotateCw className="w-5 h-5" />
            Đặt lại dịch vụ
          </Button>
          <Button
            onClick={handleCallSupport}
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Gọi hỗ trợ
          </Button>
          {order.status !== 'completed' && order.status !== 'cancelled' && (
            <Button
              onClick={handleCancelOrder}
              variant="outline"
              className="flex items-center justify-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
            >
              Hủy đơn hàng
            </Button>
          )}
        </div>
      </div>

      {/* Modals */}
      {showInvoicePreview && (
        <InvoicePreviewModal
          order={order}
          onClose={() => setShowInvoicePreview(false)}
        />
      )}
      {showReviewModal && (
        <ReviewModal
          order={order}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleSubmitReview}
        />
      )}
      {showCancelModal && (
        <CancelOrderModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          order={order}
          onConfirm={handleConfirmCancel}
        />
      )}
    </div>
  );
}

