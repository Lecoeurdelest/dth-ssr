// Placeholder - will be implemented in Phase 4
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Service Detail</h1>
          <p className="text-gray-600">Service ID: {serviceId}</p>
          <p className="text-gray-600 mt-2">Route structure created. Will be implemented in Phase 4.</p>
        </div>
      </main>
    </div>
  );
}

