import { NextResponse } from 'next/server';
import { ServiceService } from '@/modules/services/services/service.service';
import { MockServiceRepository } from '@/modules/services/repositories/service.repository';
import { servicesData } from '@/modules/services/data/servicesData';

// Initialize dependencies
const serviceRepository = new MockServiceRepository(servicesData);
const serviceService = new ServiceService(serviceRepository);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const service = await serviceService.getServiceById(params.id);

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}
