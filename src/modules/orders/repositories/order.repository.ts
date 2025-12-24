import { Order } from '../types/order.types';

export interface OrderRepository {
  getOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | null>;
}

export class MockOrderRepository implements OrderRepository {
  private orders: Order[];

  constructor(orders: Order[]) {
    this.orders = orders;
  }

  async getOrders(): Promise<Order[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.orders;
  }

  async getOrderById(id: string): Promise<Order | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.orders.find(o => o.id === id) || null;
  }
}
