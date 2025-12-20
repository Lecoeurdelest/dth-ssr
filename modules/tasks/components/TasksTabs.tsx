"use client";

import { User, Package, Gift } from 'lucide-react';
import { TabType } from '../types/tasks.types';

interface TasksTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TasksTabs({ activeTab, onTabChange }: TasksTabsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="flex border-b overflow-x-auto">
        <button
          onClick={() => onTabChange('profile')}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-cyan-600 text-cyan-600'
              : 'border-transparent text-gray-600 hover:text-cyan-600'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Thông tin cá nhân</span>
        </button>
        <button
          onClick={() => onTabChange('orders')}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'orders'
              ? 'border-cyan-600 text-cyan-600'
              : 'border-transparent text-gray-600 hover:text-cyan-600'
          }`}
        >
          <Package className="w-5 h-5" />
          <span>Lịch sử đặt hàng</span>
        </button>
        <button
          onClick={() => onTabChange('promotions')}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'promotions'
              ? 'border-cyan-600 text-cyan-600'
              : 'border-transparent text-gray-600 hover:text-cyan-600'
          }`}
        >
          <Gift className="w-5 h-5" />
          <span>Khuyến mãi</span>
        </button>
      </div>
    </div>
  );
}

