"use client";

import { useState } from 'react';
import { TasksTabs } from './components/TasksTabs';
import { ProfileTab } from './components/ProfileTab';
import { OrdersTab } from './components/OrdersTab';
import { PromotionsTab } from './components/PromotionsTab';
import { TabType } from './types/tasks.types';

export function TasksPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-cyan-600 mb-2">Tài khoản của tôi</h1>
          <p className="text-gray-600">Quản lý thông tin cá nhân và đơn hàng</p>
        </div>

        {/* Tabs */}
        <TasksTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'promotions' && <PromotionsTab />}
        </div>
      </div>
    </div>
  );
}

