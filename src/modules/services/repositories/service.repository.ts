import { Service } from '../types/service.types';

export interface ServiceRepository {
  getServices(): Promise<Service[]>;
  getServiceById(id: string): Promise<Service | null>;
}

export class MockServiceRepository implements ServiceRepository {
  private services: Service[];

  constructor(services: Service[]) {
    this.services = services;
  }

  async getServices(): Promise<Service[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.services;
  }

  async getServiceById(id: string): Promise<Service | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.services.find(s => s.id === id) || null;
  }
}
