import { ServiceDetailPage } from "@/modules/services";

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;
  return <ServiceDetailPage serviceId={serviceId} />;
}

