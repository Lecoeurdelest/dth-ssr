"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Calendar, Clock, User, Phone, Mail, MapPin, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface BookServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

export function BookServiceModal({ isOpen, onClose, serviceName }: BookServiceModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    serviceDate: '',
    serviceTime: '',
    description: '',
    contactMethod: 'phone'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (formData.phone.length < 10) {
      toast.error('Số điện thoại không hợp lệ');
      return;
    }

    // Mock submit
    toast.success('Đặt dịch vụ thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
    
    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      serviceDate: '',
      serviceTime: '',
      description: '',
      contactMethod: 'phone'
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyan-600">
            Đặt dịch vụ: {serviceName}
          </DialogTitle>
          <DialogDescription>
            Điền thông tin bên dưới để đặt lịch. Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Thông tin khách hàng */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-900 border-b pb-2">
              Thông tin khách hàng
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-600" />
                  Họ và tên <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-600" />
                  Số điện thoại <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0987654321"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-600" />
                  Email (không bắt buộc)
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-600" />
                  Địa chỉ <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="address"
                  placeholder="Nhập địa chỉ chi tiết (số nhà, tên đường, phường/xã, quận/huyện)"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>

          {/* Thời gian dự kiến */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-900 border-b pb-2">
              Thời gian dự kiến
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceDate" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-600" />
                  Ngày
                </Label>
                <Input
                  id="serviceDate"
                  type="date"
                  value={formData.serviceDate}
                  onChange={(e) => handleInputChange('serviceDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceTime" className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-600" />
                  Khung giờ
                </Label>
                <Select onValueChange={(value) => handleInputChange('serviceTime', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn khung giờ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Buổi sáng (8:00 - 12:00)</SelectItem>
                    <SelectItem value="afternoon">Buổi chiều (13:00 - 17:00)</SelectItem>
                    <SelectItem value="evening">Buổi tối (17:00 - 20:00)</SelectItem>
                    <SelectItem value="flexible">Linh động (cả ngày)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
              ℹ️ Nếu không chọn thời gian, chúng tôi sẽ liên hệ để sắp xếp lịch phù hợp với bạn.
            </p>
          </div>

          {/* Mô tả chi tiết */}
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-600" />
              Mô tả chi tiết vấn đề
            </Label>
            <Textarea
              id="description"
              placeholder="Mô tả chi tiết vấn đề cần sửa chữa để chúng tôi chuẩn bị tốt hơn..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
            />
          </div>

          {/* Phương thức liên hệ */}
          <div className="space-y-2">
            <Label className="font-semibold">Phương thức liên hệ ưu tiên</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="contactMethod"
                  value="phone"
                  checked={formData.contactMethod === 'phone'}
                  onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                  className="text-cyan-600"
                />
                <Phone className="w-4 h-4" />
                Điện thoại
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="contactMethod"
                  value="email"
                  checked={formData.contactMethod === 'email'}
                  onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                  className="text-cyan-600"
                />
                <Mail className="w-4 h-4" />
                Email
              </label>
            </div>
          </div>

          {/* Lưu ý */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-lg border-l-4 border-cyan-500">
            <h4 className="font-semibold text-gray-900 mb-2">📝 Lưu ý:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Chúng tôi sẽ liên hệ trong vòng 15-30 phút sau khi nhận yêu cầu</li>
              <li>• Báo giá cụ thể sẽ được thông báo sau khi khảo sát thực tế</li>
              <li>• Hỗ trợ khẩn cấp 24/7, vui lòng gọi hotline: 09xxxxxx</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            >
              Xác nhận đặt dịch vụ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

