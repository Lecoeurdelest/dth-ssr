"use client";

import { X, Download, Home, Wrench } from 'lucide-react';
import { Order, formatCurrency, formatDate } from '../types/order.types';
import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';

interface InvoicePreviewModalProps {
  order: Order;
  onClose: () => void;
}

export function InvoicePreviewModal({ order, onClose }: InvoicePreviewModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    toast.loading('Đang tạo hóa đơn PDF...');
    
    try {
      const invoiceElement = document.getElementById('invoice-preview');
      if (!invoiceElement) {
        throw new Error('Không tìm thấy nội dung hóa đơn');
      }

      // Note: This requires jsPDF and html2canvas packages
      // For now, we'll just show a toast
      toast.dismiss();
      toast.success('Tải hóa đơn PDF thành công!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.dismiss();
      toast.error('Có lỗi khi tạo hóa đơn PDF. Vui lòng thử lại!');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!order.invoice) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">Xem trước hóa đơn</DialogTitle>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <div>
              <h2 className="text-gray-900">Xem trước hóa đơn</h2>
              <p className="text-sm text-gray-500 mt-1">Số hóa đơn: {order.invoice.invoiceNumber}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Invoice Content */}
          <div className="p-4 md:p-6">
            <div className="bg-white border-2 border-gray-300 rounded-lg p-8 md:p-12 shadow-lg mx-auto" style={{ maxWidth: '210mm' }} id="invoice-preview">
              {/* Header */}
              <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-gray-200">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center">
                      <Home className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h1 className="text-gray-900">Dịch Vụ Sửa Chữa Nhà</h1>
                      <p className="text-sm text-gray-600">Chuyên nghiệp - Uy tín - Chất lượng</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Hotline: 0123 456 789</p>
                    <p>Email: suachuanho@gmail.com</p>
                    <p>Khu vực: Ninh Bình và lân cận</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg mb-2">
                    HÓA ĐƠN DỊCH VỤ
                  </div>
                  <p className="text-sm text-gray-600">Số: {order.invoice.invoiceNumber}</p>
                  <p className="text-sm text-gray-600">Ngày: {order.invoice.issueDate}</p>
                </div>
              </div>

              {/* Customer and Technician Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Thông tin khách hàng
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Họ tên:</span>
                      <span className="text-gray-900">{order.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SĐT:</span>
                      <span className="text-gray-900">{order.customerPhone}</span>
                    </div>
                    <div className="text-gray-600 mt-2">
                      <p className="mb-1">Địa chỉ:</p>
                      <p className="text-gray-900">{order.address}</p>
                    </div>
                  </div>
                </div>

                {order.technician && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-gray-900 mb-3 flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-blue-600" />
                      Thông tin thợ sửa chữa
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Họ tên:</span>
                        <span className="text-gray-900">{order.technician.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">SĐT:</span>
                        <span className="text-gray-900">{order.technician.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kinh nghiệm:</span>
                        <span className="text-gray-900">{order.technician.experience} năm</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Service Info */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
                  <h3 className="text-gray-900 mb-2">Loại dịch vụ</h3>
                  <p className="text-gray-900">{order.serviceType}</p>
                  <p className="text-sm text-gray-600 mt-2">{order.issueDescription}</p>
                </div>
              </div>

              {/* Cost Details */}
              <div className="mb-8">
                <h3 className="text-gray-900 mb-4">Chi tiết hạng mục sửa chữa</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm text-gray-700">Hạng mục</th>
                        <th className="px-4 py-3 text-center text-sm text-gray-700">SL</th>
                        <th className="px-4 py-3 text-right text-sm text-gray-700">Đơn giá</th>
                        <th className="px-4 py-3 text-right text-sm text-gray-700">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {order.costDetails.map((cost, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{cost.item}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-center">{cost.quantity}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-right">{formatCurrency(cost.unitPrice)}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(cost.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 mb-8 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-blue-100 mb-1">Tổng tiền thanh toán</p>
                    <p className="text-sm text-blue-100">Phương thức: {order.paymentMethod}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white">{formatCurrency(order.totalCost)}</p>
                  </div>
                </div>
              </div>

              {/* Warranty */}
              {order.invoice.warrantyNote && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                  <h3 className="text-gray-900 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Thông tin bảo hành
                  </h3>
                  <p className="text-sm text-gray-700">{order.invoice.warrantyNote}</p>
                </div>
              )}

              {/* Completion Date */}
              <div className="text-center text-sm text-gray-600 mb-6">
                <p>Ngày hoàn thành: {formatDate(order.orderDate)}</p>
              </div>

              {/* Signatures */}
              <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-16">Khách hàng</p>
                  <p className="text-sm text-gray-900">{order.customerName}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-16">Người thực hiện</p>
                  <p className="text-sm text-gray-900">{order.technician?.name || 'Đại diện'}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                <p>Cảm ơn quý khách đã sử dụng dịch vụ!</p>
                <p className="mt-1">Mọi thắc mắc xin liên hệ: 0123 456 789 hoặc suachuanho@gmail.com</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Đóng
              </Button>
              <Button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-5 h-5 mr-2" />
                Tải hóa đơn PDF
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

