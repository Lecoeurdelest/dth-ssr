"use client";

import { X, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Order } from '../types/order.types';

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onConfirm: () => void;
}

export function CancelOrderModal({ isOpen, onClose, order, onConfirm }: CancelOrderModalProps) {
  if (!order) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Xác nhận hủy đơn hàng
          </DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn hủy đơn hàng <strong>{order.orderCode}</strong>?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              ⚠️ Lưu ý: Hành động này không thể hoàn tác. Đơn hàng sẽ được đánh dấu là đã hủy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Không, giữ lại đơn hàng
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              Có, hủy đơn hàng
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

