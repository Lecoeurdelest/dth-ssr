"use client";

import { Zap, Droplet, Hammer, Truck, Wrench, Home, FileText, Download, Star } from 'lucide-react';
import { Order, getStatusText, getStatusColor, formatCurrency, formatDate } from '../types/order.types';
import { useRouter } from 'next/navigation';

interface OrderItemProps {
  order: Order;
  onReview?: () => void;
}

const iconMap = {
  electric: Zap,
  water: Droplet,
  wood: Hammer,
  moving: Truck,
  installation: Wrench,
  multi: Home
};

export function OrderItem({ order, onReview }: OrderItemProps) {
  const router = useRouter();
  const Icon = iconMap[order.serviceIcon] || Home; // Default to Home icon if serviceIcon not found

  const handleViewDetails = () => {
    router.push(`/orders/${order.id}`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 mb-1 truncate">{order.serviceType}</h3>
            <p className="text-sm text-gray-500">Mã đơn: {order.orderCode}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm flex-shrink-0 ${getStatusColor(order.status)}`}>
          {getStatusText(order.status)}
        </span>
      </div>

      {/* Thông tin */}
      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-gray-600">{formatDate(order.orderDate)}</span>
        </div>
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm text-gray-600">{order.address}</span>
        </div>
        {/* Trạng thái hóa đơn */}
        {order.status === 'completed' && order.invoice && (
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-green-600">Có hóa đơn</span>
          </div>
        )}
        {/* Trạng thái đánh giá */}
        {order.reviewSubmitted && (
          <div className="flex items-start gap-2">
            <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0 fill-yellow-500" />
            <span className="text-sm text-yellow-600">Đã đánh giá</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <p className="text-sm text-gray-500 mb-1">Tổng chi phí</p>
          <p className="text-blue-600">{order.totalCost > 0 ? formatCurrency(order.totalCost) : 'Chưa có'}</p>
        </div>
        <button
          onClick={handleViewDetails}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Xem chi tiết
        </button>
      </div>
      
      {/* Nút đánh giá - hiển thị nổi bật cho đơn hoàn thành chưa đánh giá */}
      {order.status === 'completed' && order.canReview && !order.reviewSubmitted && onReview && (
        <div className="mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReview();
            }}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg group"
          >
            <Star className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Đánh giá dịch vụ</span>
          </button>
        </div>
      )}
      
      {/* Nút tải hóa đơn - hiển thị nổi bật cho đơn hoàn thành */}
      {order.status === 'completed' && order.invoice && (
        <div className="mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="w-full py-3 bg-green-50 border-2 border-green-200 text-green-700 rounded-lg hover:bg-green-100 transition-all flex items-center justify-center gap-2 group"
          >
            <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Tải hóa đơn PDF</span>
          </button>
        </div>
      )}
    </div>
  );
}

