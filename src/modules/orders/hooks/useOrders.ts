"use client";

import { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types/order.types';
import { getUserOrders } from '../api/orders.api';
import { ordersData } from '../api/orders.mock';
import { useAuth } from '@/shared/hooks/useAuth';

export function useOrders() {
  const { isLoggedIn, accessToken } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);

      // Check if user is logged in
      if (!isLoggedIn || !accessToken) {
        setError('Vui lòng đăng nhập để xem lịch sử đơn hàng.');
        setOrders([]); // Clear any existing orders
        setIsLoading(false);
        return;
      }

      try {
        const ordersData = await getUserOrders();
        setOrders(ordersData);
      } catch (error: any) {
        console.error('Error fetching orders:', error);

        // Handle specific authentication errors
        if (error.message?.includes('403') || error.message?.includes('Forbidden')) {
          setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        } else if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
          setError('Bạn cần đăng nhập để xem lịch sử đơn hàng.');
        } else {
          setError('Không thể tải danh sách đơn hàng. Hiển thị dữ liệu mẫu.');
          // Fallback to mock data for demo purposes
          setOrders(ordersData);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isLoggedIn, accessToken]);

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, ...updates } : order
      )
    );
  };

  return {
    orders,
    filteredOrders,
    isLoading,
    error,
    filterStatus,
    setFilterStatus,
    updateOrder
  };
}

