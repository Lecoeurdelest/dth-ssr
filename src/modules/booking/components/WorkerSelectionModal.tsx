"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Star, MapPin, Ruler, AlertCircle, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { Worker } from '../types/booking.types';
import { getWorkers } from '../api/workers.api';
import { toast } from 'sonner';

interface WorkerSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string;
  onWorkerSelected: (workerId: string) => void;
}

export function WorkerSelectionModal({ isOpen, onClose, serviceType, onWorkerSelected }: WorkerSelectionModalProps) {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchWorkers();
    }
  }, [isOpen, serviceType]);

  const fetchWorkers = async () => {
    setLoading(true);
    setError(null);
    try {
      const workerData = await getWorkers(serviceType);
      setWorkers(workerData);
    } catch (err: any) {
      console.error('Failed to load workers:', err);

      // Handle specific error types
      if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
        setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      } else if (err.message?.includes('network') || err.message?.includes('fetch')) {
        setError('Lỗi kết nối mạng. Vui lòng kiểm tra kết nối và thử lại.');
      } else {
        setError('Không thể tải danh sách thợ. Vui lòng thử lại.');
      }

      toast.error('Không thể tải danh sách thợ');
    } finally {
      setLoading(false);
    }
  };
  const handleSelectWorker = (workerId: string) => {
    onWorkerSelected(workerId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <span className="text-blue-600">⚡</span>
            {serviceType}
          </DialogTitle>
          <p className="text-gray-600 text-sm">
            Chọn thợ phù hợp với nhu cầu của bạn
          </p>
        </DialogHeader>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Đang tải danh sách thợ...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
            <Button
              onClick={fetchWorkers}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              Thử lại
            </Button>
          </div>
        )}

        {/* Workers List */}
        {!loading && !error && (
          <div className="space-y-4 mt-4">
            {workers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Không tìm thấy thợ nào cho dịch vụ này.</p>
                <p className="text-sm mt-2">Vui lòng thử lại sau hoặc liên hệ hotline để được hỗ trợ.</p>
              </div>
            ) : (
              workers.map((worker) => (
                <div
                  key={worker.id}
                  className={`border-2 rounded-xl p-6 transition-all duration-300 ${
                    worker.available
                      ? 'border-blue-200 hover:border-blue-500 hover:shadow-lg cursor-pointer'
                      : 'border-gray-200 bg-gray-50 opacity-75'
                  }`}
                  onClick={() => worker.available && handleSelectWorker(worker.id)}
                >
                  {/* Worker Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">{worker.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-gray-900">{worker.rating}/5</span>
                        </div>
                        <span className="text-gray-600 text-sm">
                          (Đánh giá: {worker.reviews} | {worker.experience} năm kinh nghiệm)
                        </span>
                      </div>
                    </div>
                    {worker.available ? (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectWorker(worker.id);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-lg"
                      >
                        Chọn thợ
                      </Button>
                    ) : (
                      <span className="text-red-600 font-semibold text-sm">Bận</span>
                    )}
                  </div>

                  {/* Worker Info */}
                  <div className="space-y-2">
                    {/* Location */}
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-700 font-medium">Địa điểm: </span>
                        <span className="text-blue-600 font-semibold">{worker.location}</span>
                      </div>
                    </div>

                    {/* Distance */}
                    <div className="flex items-start gap-2">
                      <Ruler className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-gray-700 font-medium">Khoảng cách ước tính: </span>
                        <span className="text-orange-600 font-semibold">{worker.distance}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-start gap-2">
                      {worker.available ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-gray-700 font-medium">Trạng thái: </span>
                            <span className="text-green-600 font-semibold">✓ Không bận</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-gray-700 font-medium">Trạng thái: </span>
                            <span className="text-red-600 font-semibold">✗ Bận</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

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

