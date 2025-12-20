"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/src/app/components/ui/button';
import { Input } from '@/src/app/components/ui/input';
import { Label } from '@/src/app/components/ui/label';
import { Checkbox } from '@/src/app/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/src/app/components/ui/dialog';
import { Eye, EyeOff, Mail, Phone, User, Lock, Shield } from 'lucide-react';
import { GoogleLogo, FacebookLogo } from 'phosphor-react';
import { toast } from 'sonner';
import { useAuthModal } from '@/shared/hooks/useAuthModal';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const { openLogin } = useAuthModal();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    captcha: '',
    agreeTerms: false,
  });

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        captcha: '',
        agreeTerms: false,
      });
      setVerificationMethod('email');
      setShowPassword(false);
      setShowConfirmPassword(false);
      setCaptchaCode(generateCaptcha());
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.username || formData.username.length < 4) {
      toast.error('Tên đăng nhập phải có ít nhất 4 ký tự');
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return false;
    }

    if (verificationMethod === 'email' && !formData.email.includes('@')) {
      toast.error('Email không hợp lệ');
      return false;
    }

    if (verificationMethod === 'phone' && formData.phone.length < 10) {
      toast.error('Số điện thoại không hợp lệ');
      return false;
    }


    if (!formData.captcha || formData.captcha.toUpperCase() !== captchaCode) {
      toast.error('Mã xác minh không đúng');
      return false;
    }

    if (!formData.agreeTerms) {
      toast.error('Vui lòng đồng ý với điều khoản sử dụng');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast.success('Đăng ký thành công!');
      onClose();
      setTimeout(() => {
        openLogin();
      }, 500);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Đang kết nối với ${provider}...`);
  };

  const handleSwitchToLogin = () => {
    onClose();
    setTimeout(() => {
      openLogin();
    }, 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">Đăng Ký Tài Khoản</DialogTitle>
        <div className="bg-white rounded-2xl overflow-hidden">
          {/* Header - Empty (logo removed) */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Đăng Ký Tài Khoản</h1>
            <p className="text-cyan-100">Tạo tài khoản để trải nghiệm dịch vụ sửa chữa điện-nước tốt nhất</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Social Login Options */}
            <div className="mb-8">
              <p className="text-center text-gray-600 mb-4">Đăng ký nhanh với</p>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-cyan-500 flex items-center justify-center transition-colors hover:bg-gray-50"
                  aria-label="Đăng ký với Google"
                >
                  <GoogleLogo className="w-6 h-6 text-gray-700" weight="fill" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Facebook')}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-cyan-500 flex items-center justify-center transition-colors hover:bg-gray-50"
                  aria-label="Đăng ký với Facebook"
                >
                  <FacebookLogo className="w-6 h-6 text-gray-700" weight="fill" />
                </button>
              </div>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Hoặc đăng ký với email/số điện thoại</span>
                </div>
              </div>
            </div>

            {/* Main Form */}
            <div className="space-y-6">
              {/* Thông tin đăng nhập */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-cyan-700 border-b pb-2">1. Thông tin đăng nhập</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-600" />
                  Tên đăng nhập <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyan-600" />
                  Mật khẩu <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyan-600" />
                  Xác nhận mật khẩu <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Nhập lại mật khẩu"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Thông tin liên hệ */}
              <div className="space-y-4 mt-4">
                <h3 className="font-bold text-lg text-cyan-700 border-b pb-2">2. Thông tin liên hệ</h3>
                <div className="flex items-center gap-4 bg-cyan-50 p-3 rounded-lg">
                  <Label className="text-sm text-gray-700">Phương thức xác minh:</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="verificationMethod"
                        checked={verificationMethod === 'email'}
                        onChange={() => setVerificationMethod('email')}
                        className="text-cyan-600"
                      />
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="verificationMethod"
                        checked={verificationMethod === 'phone'}
                        onChange={() => setVerificationMethod('phone')}
                        className="text-cyan-600"
                      />
                      <Phone className="w-4 h-4" />
                      Số điện thoại
                    </label>
                  </div>
                </div>
              </div>

              {verificationMethod === 'email' ? (
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-600" />
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500">Email sẽ được dùng để xác minh tài khoản và khôi phục mật khẩu</p>
                </div>
              ) : (
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
                  <p className="text-xs text-gray-500">Số điện thoại sẽ nhận mã OTP để xác minh tài khoản</p>
                </div>
              )}

              {/* Bảo mật & xác thực */}
              <div className="space-y-4 mt-4">
                <h3 className="font-bold text-lg text-cyan-700 border-b pb-2">3. Bảo mật & xác thực</h3>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-600" />
                  Mã xác minh (CAPTCHA) <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-3 items-center">
                  <div className="bg-gradient-to-r from-cyan-100 to-blue-100 px-6 py-3 rounded-lg border-2 border-cyan-300 select-none">
                    <span className="text-2xl font-bold tracking-widest text-cyan-800 line-through decoration-wavy">
                      {captchaCode}
                    </span>
                  </div>
                  <Input
                    type="text"
                    placeholder="Nhập mã xác minh"
                    value={formData.captcha}
                    onChange={(e) => handleInputChange('captcha', e.target.value)}
                    className="max-w-xs"
                    required
                  />
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="space-y-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeTerms', checked as boolean)}
                  />
                  <Label htmlFor="agreeTerms" className="cursor-pointer">
                    Tôi đồng ý với{' '}
                    <button
                      type="button"
                      onClick={() => toast.info('Điều khoản sử dụng')}
                      className="text-cyan-600 hover:underline"
                    >
                      Điều khoản sử dụng
                    </button>{' '}
                    và{' '}
                    <button
                      type="button"
                      onClick={() => toast.info('Chính sách bảo mật')}
                      className="text-cyan-600 hover:underline"
                    >
                      Chính sách bảo mật
                    </button>{' '}
                    <span className="text-red-500">*</span>
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-6">
                  Đăng Ký Ngay
                </Button>
              </div>

              <div className="md:col-span-2 text-center">
                <p className="text-gray-600">
                  Đã có tài khoản?{' '}
                  <button
                    type="button"
                    onClick={handleSwitchToLogin}
                    className="text-cyan-600 hover:underline font-semibold"
                  >
                    Đăng nhập ngay
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

