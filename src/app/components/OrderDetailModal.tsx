import { X, Phone, Star, Download, RotateCw, MessageCircle, FileText, Eye } from 'lucide-react';
import { Order, getStatusText, getStatusColor, formatCurrency, formatDate } from '../data/ordersData';
import { useState } from 'react';
import { toast } from 'sonner';
import { InvoicePreviewModal } from './InvoicePreviewModal';
import { ReviewModal, ReviewData } from './ReviewModal';

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
  onReviewSubmit?: (reviewData: ReviewData) => void;
}

export function OrderDetailModal({ order, onClose, onReviewSubmit }: OrderDetailModalProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);
  const [isDownloadingInvoice, setIsDownloadingInvoice] = useState(false);

  const handleReorder = () => {
    toast.success('Đã tạo yêu cầu đặt lại dịch vụ!');
    onClose();
  };

  const handleCallSupport = () => {
    window.location.href = 'tel:0123456789';
  };

  const handleDownloadInvoice = () => {
    setIsDownloadingInvoice(true);
    setShowInvoicePreview(true);
    setTimeout(() => {
      setIsDownloadingInvoice(false);
    }, 1000);
  };

  const handleSubmitReview = (reviewData: ReviewData) => {
    toast.success('Cảm ơn bạn đã đánh giá dịch vụ!');
    setShowReviewModal(false);
    if (onReviewSubmit) {
      onReviewSubmit(reviewData);
    }
    // Đóng modal sau khi gửi đánh giá thành công
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
        <div 
          className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <div>
              <h2 className="text-gray-900">Chi tiết đơn hàng</h2>
              <p className="text-sm text-gray-500 mt-1">Mã đơn: {order.orderCode}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-4 md:p-6 space-y-6">
            {/* Trạng thái */}
            <div className="bg-blue-50 rounded-xl p-4">
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

            {/* Thông tin khách hàng */}
            <div>
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

            {/* Mô tả sự cố */}
            <div>
              <h3 className="text-gray-900 mb-3">Mô tả sự cố</h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-700">{order.issueDescription}</p>
                {order.issueImages && order.issueImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {order.issueImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Hình ảnh sự cố ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Thông tin thợ */}
            {order.technician && (
              <div>
                <h3 className="text-gray-900 mb-3">Thông tin thợ sửa chữa</h3>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <img
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
            <div>
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

            {/* Chi tiết chi phí */}
            {order.costDetails.length > 0 && (
              <div>
                <h3 className="text-gray-900 mb-3">Chi tiết chi phí</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="space-y-3">
                    {order.costDetails.map((cost, index) => (
                      <div key={index} className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-gray-900">{cost.item}</p>
                          <p className="text-sm text-gray-500">
                            {cost.quantity} × {formatCurrency(cost.unitPrice)}
                          </p>
                        </div>
                        <p className="text-gray-900">{formatCurrency(cost.total)}</p>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-900">Tổng cộng</p>
                        <p className="text-blue-600">{formatCurrency(order.totalCost)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Phương thức thanh toán */}
            <div>
              <h3 className="text-gray-900 mb-3">Phương thức thanh toán</h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-700">{order.paymentMethod}</p>
              </div>
            </div>

            {/* Hóa đơn dịch vụ */}
            {order.status === 'completed' && order.invoice && (
              <div>
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
                      <button
                        onClick={() => setShowInvoicePreview(true)}
                        className="py-3 px-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="w-5 h-5" />
                        Xem hóa đơn
                      </button>
                      <button
                        onClick={handleDownloadInvoice}
                        className="py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Tải hóa đơn PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Ghi chú */}
            {order.notes && (
              <div>
                <h3 className="text-gray-900 mb-3">Ghi chú</h3>
                <div className="bg-yellow-50 rounded-xl p-4">
                  <p className="text-gray-700">{order.notes}</p>
                </div>
              </div>
            )}

            {/* Form đánh giá */}
            {order.canReview && !order.reviewSubmitted && (
              <div>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="w-full py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Star className="w-5 h-5" />
                  Đánh giá dịch vụ
                </button>
              </div>
            )}

            {/* Đã đánh giá */}
            {order.reviewSubmitted && (
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <p className="text-gray-900 mb-1">Đã đánh giá dịch vụ</p>
                    <p className="text-sm text-gray-600">Cảm ơn bạn đã gửi đánh giá!</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={handleReorder}
                className="py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCw className="w-5 h-5" />
                Đặt lại dịch vụ
              </button>
              <button
                onClick={handleCallSupport}
                className="py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Gọi hỗ trợ
              </button>
              {order.status === 'completed' && (
                <button
                  onClick={handleDownloadInvoice}
                  className="py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Tải hóa đơn
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
}