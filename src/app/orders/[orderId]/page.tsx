import { OrderDetailPage } from "@/modules/orders";

export default async function OrderDetail({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  return <OrderDetailPage orderId={orderId} />;
}

