import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Eye, EyeOff, Chrome, Facebook, Apple, Mail, Phone, User, Lock, Calendar, Shield } from 'lucide-react';
import { toast } from 'sonner';

export function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    captcha: '',
    agreeTerms: false,
    rememberMe: false,
    enable2FA: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const [captchaCode] = useState(generateCaptcha());

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

    if (!formData.fullName) {
      toast.error('Vui lòng nhập họ và tên');
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
      toast.success('Đăng ký thành công! Đang chuyển hướng...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Đang kết nối với ${provider}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Đăng Ký Tài Khoản</h1>
            <p className="text-cyan-100">Tạo tài khoản để trải nghiệm dịch vụ sửa chữa điện-nước tốt nhất</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Social Login Options */}
            <div className="mb-8">
              <p className="text-center text-gray-600 mb-4">Đăng ký nhanh với</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin('Google')}
                  className="w-full"
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin('Facebook')}
                  className="w-full"
                >
                  <Facebook className="w-5 h-5 mr-2" />
                  Facebook
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin('Apple')}
                  className="w-full"
                >
                  <Apple className="w-5 h-5 mr-2" />
                  Apple
                </Button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Thông tin bắt buộc */}
              <div className="space-y-4 md:col-span-2">
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

              {/* Thông tin định danh */}
              <div className="space-y-4 md:col-span-2 mt-4">
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
                <div className="space-y-2 md:col-span-2">
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
                <div className="space-y-2 md:col-span-2">
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

              {/* Thông tin cá nhân */}
              <div className="space-y-4 md:col-span-2 mt-4">
                <h3 className="font-bold text-lg text-cyan-700 border-b pb-2">3. Thông tin cá nhân</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-600" />
                  Ngày sinh
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-600" />
                  Giới tính
                </Label>
                <Select onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bảo mật & xác thực */}
              <div className="space-y-4 md:col-span-2 mt-4">
                <h3 className="font-bold text-lg text-cyan-700 border-b pb-2">4. Bảo mật & xác thực</h3>
              </div>

              <div className="space-y-2 md:col-span-2">
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

              {/* Tiện ích nâng cao */}
              <div className="space-y-4 md:col-span-2 mt-4">
                <h3 className="font-bold text-lg text-cyan-700 border-b pb-2">5. Tùy chọn nâng cao</h3>
              </div>

              <div className="space-y-4 md:col-span-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeTerms', checked as boolean)}
                  />
                  <Label htmlFor="agreeTerms" className="cursor-pointer">
                    Tôi đồng ý với{' '}
                    <Link to="/terms" className="text-cyan-600 hover:underline">
                      Điều khoản sử dụng
                    </Link>{' '}
                    và{' '}
                    <Link to="/privacy" className="text-cyan-600 hover:underline">
                      Chính sách bảo mật
                    </Link>{' '}
                    <span className="text-red-500">*</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                  />
                  <Label htmlFor="rememberMe" className="cursor-pointer">
                    Ghi nhớ đăng nhập
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="enable2FA"
                    checked={formData.enable2FA}
                    onCheckedChange={(checked) => handleInputChange('enable2FA', checked as boolean)}
                  />
                  <Label htmlFor="enable2FA" className="cursor-pointer">
                    Bật xác thực 2 lớp (2FA) để tăng cường bảo mật
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 mt-6">
                <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-6">
                  Đăng Ký Ngay
                </Button>
              </div>

              <div className="md:col-span-2 text-center">
                <p className="text-gray-600">
                  Đã có tài khoản?{' '}
                  <Link to="/login" className="text-cyan-600 hover:underline font-semibold">
                    Đăng nhập ngay
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
