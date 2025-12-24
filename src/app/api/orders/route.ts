import { NextResponse } from 'next/server';
import { OrderService } from '@/modules/orders/services/order.service';
import { MockOrderRepository } from '@/modules/orders/repositories/order.repository';
import { ordersData } from '@/modules/orders/data/ordersData';

// Initialize dependencies
const orderRepository = new MockOrderRepository(ordersData);
const orderService = new OrderService(orderRepository);

export async function GET() {
  try {
    const orders = await orderService.getOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
