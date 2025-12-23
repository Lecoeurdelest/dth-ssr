"use client";

import { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types/order.types';

async function fetchMyOrders(): Promise<Order[]> {
  const res = await fetch('http://localhost:8080/orders', { credentials: 'include' });
  const json = await res.json();
  if (!res.ok || !json?.success) throw new Error(json?.error || json?.message || 'Failed to fetch orders');
  return json.data || [];
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMyOrders();
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

