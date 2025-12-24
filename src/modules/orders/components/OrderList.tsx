"use client";

import { Order } from '../types/order.types';
import { OrderItem } from './OrderItem';

interface OrderListProps {
  orders: Order[];
  onReview?: (order: Order) => void;
}

export function OrderList({ orders, onReview }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-gray-900 mb-2">Không có đơn hàng</h3>
        <p className="text-gray-600">Bạn chưa có đơn hàng nào</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {orders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          onReview={onReview ? () => onReview(order) : undefined}
        />
      ))}
    </div>
  );
}

