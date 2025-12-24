"use client";

import { Order, formatCurrency } from '../types/order.types';

interface OrderSummaryProps {
  order: Order;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  return (
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
  );
}

