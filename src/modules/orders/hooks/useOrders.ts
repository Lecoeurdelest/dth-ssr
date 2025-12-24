"use client";

import { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types/order.types';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
    filterStatus,
    setFilterStatus,
    updateOrder
  };
}

