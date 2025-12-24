import { NextResponse } from 'next/server';
import { ServiceService } from '@/modules/services/services/service.service';
import { MockServiceRepository } from '@/modules/services/repositories/service.repository';
import { servicesData } from '@/modules/services/data/servicesData';

// Initialize dependencies
const serviceRepository = new MockServiceRepository(servicesData);
const serviceService = new ServiceService(serviceRepository);

export async function GET() {
  try {
    const services = await serviceService.getServices();
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
