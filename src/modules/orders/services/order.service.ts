import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../types/order.types';

export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async getOrders(): Promise<Order[]> {
    return this.orderRepository.getOrders();
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.getOrderById(id);
  }
}

