"use client";

import { Order } from '../types/order.types';

interface OrderPaymentSectionProps {
  order: Order;
}

export function OrderPaymentSection({ order }: OrderPaymentSectionProps) {
  return (
    <div>
      <h3 className="text-gray-900 mb-3">Phương thức thanh toán</h3>
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-gray-700">{order.paymentMethod}</p>
      </div>
    </div>
  );
}

