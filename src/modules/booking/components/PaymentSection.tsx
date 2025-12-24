"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { ArrowLeft, CreditCard, Wallet, Smartphone, CheckCircle } from 'lucide-react';
import { BookingSummary, PaymentMethod } from '../types/booking.types';

interface PaymentSectionProps {
  isOpen: boolean;
  onClose: () => void;
  bookingSummary: BookingSummary;
  selectedWorkerId?: string;
  onPaymentMethodSelected: (method: string) => void;
  selectedPaymentMethod?: string;
  onSubmit: () => void;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'cash',
    name: 'Tiền mặt',
    icon: '💵',
    description: 'Thanh toán khi thợ đến'
  },
  {
    id: 'bank_transfer',
    name: 'Chuyển khoản',
    icon: '🏦',
    description: 'Chuyển khoản qua ngân hàng'
  },
  {
    id: 'momo',
    name: 'Ví MoMo',
    icon: '📱',
    description: 'Thanh toán qua ví điện tử MoMo'
  },
  {
    id: 'vnpay',
    name: 'VNPay',
    icon: '💳',
    description: 'Thanh toán qua VNPay'
  }
];

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

export function PaymentSection({
  isOpen,
  onClose,
  bookingSummary,
  selectedWorkerId,
  onPaymentMethodSelected,
  selectedPaymentMethod,
  onSubmit
}: PaymentSectionProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyan-600">
            Thanh toán
          </DialogTitle>
          <p className="text-gray-600 text-sm">
            Chọn phương thức thanh toán và xác nhận đặt dịch vụ
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Booking Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-100">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Tóm tắt đơn hàng</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Dịch vụ:</span>
                <span className="font-semibold text-gray-900">{bookingSummary.serviceName}</span>
              </div>
              {bookingSummary.estimatedDuration && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Thời gian dự kiến:</span>
                  <span className="text-gray-900">{bookingSummary.estimatedDuration}</span>
                </div>
              )}
              <div className="border-t border-blue-200 pt-3 mt-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Giá dịch vụ:</span>
                  <span className="text-gray-900">{formatCurrency(bookingSummary.basePrice)}</span>
                </div>
                {bookingSummary.workerFee && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Phí thợ:</span>
                    <span className="text-gray-900">{formatCurrency(bookingSummary.workerFee)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-blue-200">
                  <span className="font-bold text-lg text-gray-900">Tổng cộng:</span>
                  <span className="font-bold text-xl text-cyan-600">{formatCurrency(bookingSummary.totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">Phương thức thanh toán</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => onPaymentMethodSelected(method.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedPaymentMethod === method.id
                      ? 'border-cyan-500 bg-cyan-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{method.icon}</div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{method.name}</h4>
                        {selectedPaymentMethod === method.id && (
                          <CheckCircle className="w-5 h-5 text-cyan-600" />
                        )}
                      </div>
                      {method.description && (
                        <p className="text-sm text-gray-600">{method.description}</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Info Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              💡 <strong>Lưu ý:</strong> Báo giá trên chỉ là ước tính. Giá chính xác sẽ được xác nhận sau khi thợ khảo sát thực tế.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              variant="outline"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Button>
            <Button 
              onClick={onSubmit}
              disabled={!selectedPaymentMethod}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white disabled:opacity-50"
            >
              Xác nhận đặt dịch vụ
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

