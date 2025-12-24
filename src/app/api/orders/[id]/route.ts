import { NextResponse } from 'next/server';
import { OrderService } from '@/modules/orders/services/order.service';
import { MockOrderRepository } from '@/modules/orders/repositories/order.repository';
import { ordersData } from '@/modules/orders/data/ordersData';

// Initialize dependencies
const orderRepository = new MockOrderRepository(ordersData);
const orderService = new OrderService(orderRepository);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const order = await orderService.getOrderById(params.id);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

