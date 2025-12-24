import { ServiceRepository } from '../repositories/service.repository';
import { Service } from '../types/service.types';

export class ServiceService {
  constructor(private serviceRepository: ServiceRepository) {}

  async getServices(): Promise<Service[]> {
    return this.serviceRepository.getServices();
  }

  async getServiceById(id: string): Promise<Service | null> {
    return this.serviceRepository.getServiceById(id);
  }
}
