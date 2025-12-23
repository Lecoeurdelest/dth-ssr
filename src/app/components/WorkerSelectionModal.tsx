import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Star, MapPin, Ruler, AlertCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Worker {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  available: boolean;
}

interface WorkerSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  onWorkerSelected?: (workerId: string) => void;
}

export function WorkerSelectionModal({ isOpen, onClose, serviceId, onWorkerSelected }: WorkerSelectionModalProps) {
  const [loading, setLoading] = useState(false);
  const [serviceName, setServiceName] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    // Backend currently does not expose workers per service in this version.
    // Fetch service info for display instead.
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
      .finally(() => setLoading(false));
  }, [isOpen, serviceId]);

  const handleContinueWithoutWorker = () => {
    if (onWorkerSelected) onWorkerSelected('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <span className="text-blue-600">⚡</span>
            {serviceType}
          </DialogTitle>
          <p className="text-gray-600 text-sm">
            Chọn thợ phù hợp với nhu cầu của bạn
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="p-6 border rounded-lg bg-gray-50">
                <h3 className="font-bold text-lg">{serviceName || `Dịch vụ ${serviceId}`}</h3>
                <p className="text-sm text-gray-600 mt-2">Hiện tại hệ thống chưa có danh sách thợ công khai — bạn có thể tiếp tục đặt dịch vụ mà không chọn thợ.</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleContinueWithoutWorker} className="flex-1 bg-blue-600 text-white">Tiếp tục không chọn thợ</Button>
                <Button variant="outline" onClick={onClose} className="flex-1">Hủy</Button>
              </div>
            </>
          )}
        </div>

        {/* Close Button */}
        <div className="mt-6 pt-4 border-t">
          <Button 
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
