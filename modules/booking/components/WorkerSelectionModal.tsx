"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/src/app/components/ui/dialog';
import { Button } from '@/src/app/components/ui/button';
import { Star, MapPin, Ruler, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Worker } from '../types/booking.types';

interface WorkerSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId?: string;
  onWorkerSelected: (workerId: string) => void;
}

const fetchWorkers = async (serviceId?: string) => {
  // Workers endpoint not implemented on BE yet; return empty list
  return [];
};

export function WorkerSelectionModal({ isOpen, onClose, serviceId, onWorkerSelected }: WorkerSelectionModalProps) {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(false);
  const [serviceName, setServiceName] = useState<string | null>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    // Attempt to fetch service info for display
    fetch(`http://localhost:8080/services/${serviceId}`)
      .then(res => res.json())
      .then(json => {
        if (json?.success && json.data) {
          setServiceName(json.data.title || json.data.name || `Service ${serviceId}`);
        } else {
          setServiceName(null);
        }
      })
      .catch(() => setServiceName(null))
      .finally(() => {
        fetchWorkers(serviceId).then(list => setWorkers(list)).finally(() => setLoading(false));
      });
  }, [isOpen, serviceId]);

  const handleSelectWorker = (workerId: string) => {
    onWorkerSelected(workerId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <span className="text-blue-600">⚡</span>
            {serviceName || `Dịch vụ ${serviceId}`}
          </DialogTitle>
          <p className="text-gray-600 text-sm">
            Chọn thợ phù hợp với nhu cầu của bạn (nếu có)
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {loading ? (
            <div>Loading...</div>
          ) : workers.length === 0 ? (
            <div className="p-6 border rounded-lg bg-gray-50">
              <p className="text-gray-700">Hiện chưa có danh sách thợ cho dịch vụ này. Bạn có thể tiếp tục đặt dịch vụ mà không chọn thợ.</p>
              <div className="mt-4 flex gap-3">
                <Button className="flex-1 bg-blue-600 text-white" onClick={() => handleSelectWorker('')}>Tiếp tục không chọn thợ</Button>
                <Button variant="outline" className="flex-1" onClick={onClose}>Hủy</Button>
              </div>
            </div>
          ) : (
            workers.map(worker => (
              <div key={worker.id} className="border-2 rounded-xl p-6 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{worker.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">{worker.rating}/5</span>
                      </div>
                      <span className="text-gray-600 text-sm">(Đánh giá: {worker.reviews})</span>
                    </div>
                  </div>
                  <Button onClick={() => handleSelectWorker(worker.id)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-lg">Chọn thợ</Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t flex gap-3">
          <Button 
            onClick={onClose}
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

