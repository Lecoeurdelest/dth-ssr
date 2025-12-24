"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Star, MapPin, Ruler, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Worker } from '../types/booking.types';

interface WorkerSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string;
  onWorkerSelected: (workerId: string) => void;
}

// Mock data cho các thợ
const mockWorkers: Worker[] = [
  {
    id: '1',
    name: 'Lê Hữu C',
    rating: 4.9,
    reviews: 10,
    location: 'Huyện Nho Quan, Ninh Bình',
    distance: '8.2 km',
    available: false,
    experience: 8,
    phone: '0987654321'
  },
  {
    id: '2',
    name: 'Lê Hữu C',
    rating: 4.9,
    reviews: 10,
    location: 'Thành phố Ninh Bình, Ninh Bình',
    distance: '1.8 km',
    available: true,
    experience: 8,
    phone: '0987654321'
  },
  {
    id: '3',
    name: 'Phạm Công D',
    rating: 4.6,
    reviews: 5,
    location: 'Huyện Gia Viễn, Ninh Bình',
    distance: '12.5 km',
    available: false,
    experience: 5,
    phone: '0976543210'
  },
  {
    id: '4',
    name: 'Vũ Đức E',
    rating: 4.8,
    reviews: 7,
    location: 'Huyện Yên Khánh, Ninh Bình',
    distance: '15.3 km',
    available: true,
    experience: 12,
    phone: '0965432109'
  }
];

export function WorkerSelectionModal({ isOpen, onClose, serviceType, onWorkerSelected }: WorkerSelectionModalProps) {
  const handleSelectWorker = (workerId: string) => {
    onWorkerSelected(workerId);
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

        {/* Workers List */}
        <div className="space-y-4 mt-4">
          {mockWorkers.map((worker) => (
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
                      (Đánh giá: {worker.reviews} Năm kinh nghiệm)
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
          ))}
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

