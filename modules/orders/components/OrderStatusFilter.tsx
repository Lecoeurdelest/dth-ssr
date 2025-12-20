"use client";

import { Filter } from 'lucide-react';
import { OrderStatus } from '../types/order.types';

interface OrderStatusFilterProps {
  filterStatus: OrderStatus | 'all';
  onFilterChange: (status: OrderStatus | 'all') => void;
}

const statusFilters: Array<{ value: OrderStatus | 'all'; label: string }> = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ xử lý' },
  { value: 'processing', label: 'Đang xử lý' },
  { value: 'repairing', label: 'Đang sửa' },
  { value: 'completed', label: 'Hoàn thành' },
  { value: 'cancelled', label: 'Đã hủy' }
];

export function OrderStatusFilter({ filterStatus, onFilterChange }: OrderStatusFilterProps) {
  return (
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
              onClick={() => onFilterChange(filter.value)}
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
  );
}

