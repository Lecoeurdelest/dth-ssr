"use client";

import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Bell, 
  Shield, 
  Globe, 
  HelpCircle, 
  LogOut, 
  Trash2,
  TrendingUp,
  Edit2
} from 'lucide-react';
import { useProfile } from '@/modules/profile';
import { useLoyalty } from '@/modules/loyalty';

export function ProfileTab() {
  const { profile, settings, loading: profileLoading } = useProfile();
  const { data: loyaltyData, loading: loyaltyLoading } = useLoyalty();

  if (profileLoading || loyaltyLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Đang tải...</p>
      </div>
    );
  }

  if (!profile || !settings) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Không tìm thấy thông tin</p>
      </div>
    );
  }

  const points = loyaltyData?.totalPoints || 0;

  return (
    <>
      {/* Basic Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-800">Thông tin cơ bản</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Họ và tên
            </label>
            <p className="text-gray-800 bg-gray-50 px-4 py-2 rounded-lg">
              {profile.name || 'Chưa cập nhật'}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Số điện thoại
            </label>
            <p className="text-gray-800 bg-gray-50 px-4 py-2 rounded-lg">
              {profile.phone || 'Chưa cập nhật'}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <p className="text-gray-800 bg-gray-50 px-4 py-2 rounded-lg break-all">
              {profile.email || 'Chưa cập nhật'}
            </p>
          </div>

          {profile.address && (
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Địa chỉ
              </label>
              <p className="text-gray-800 bg-gray-50 px-4 py-2 rounded-lg">
                {profile.address}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Points Display */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg shadow-md p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 mb-1">Điểm tích lũy</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{points}</span>
              <span className="text-xl">điểm</span>
            </div>
          </div>
          <TrendingUp className="w-12 h-12 text-white/80" />
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm text-white/80">
            Tích thêm 50 điểm để nhận voucher 100.000đ
          </p>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-gray-800 mb-6">Cài đặt tài khoản</h2>

        <div className="space-y-4">
          {/* Notifications */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-gray-800">Thông báo</p>
                <p className="text-sm text-gray-600">
                  Nhận thông báo về đơn hàng và khuyến mãi
                </p>
              </div>
            </div>
            <div className={`relative w-12 h-6 rounded-full ${settings.notificationsEnabled ? 'bg-cyan-600' : 'bg-gray-300'}`}>
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.notificationsEnabled ? 'translate-x-6' : ''
                }`}
              />
            </div>
          </div>

          {/* Privacy */}
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <p className="text-gray-800">Quyền riêng tư</p>
                <p className="text-sm text-gray-600">
                  Quản lý thông tin cá nhân và bảo mật
                </p>
              </div>
            </div>
            <Edit2 className="w-5 h-5 text-gray-400" />
          </button>

          {/* Language */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-gray-800">Ngôn ngữ</p>
                <p className="text-sm text-gray-600">Chọn ngôn ngữ hiển thị</p>
              </div>
            </div>
            <div className="px-3 py-1 border rounded-lg bg-gray-50 text-gray-700">
              {settings.language === 'vi' ? 'Tiếng Việt' : 'English'}
            </div>
          </div>

          {/* Support */}
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <p className="text-gray-800">Trung tâm hỗ trợ</p>
                <p className="text-sm text-gray-600">Liên hệ khi cần giúp đỡ</p>
              </div>
            </div>
            <Edit2 className="w-5 h-5 text-gray-400" />
          </button>

          {/* Logout */}
          <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-red-600" />
              <div className="text-left">
                <p className="text-red-700">Đăng xuất</p>
                <p className="text-sm text-red-600">Đăng xuất khỏi tài khoản</p>
              </div>
            </div>
          </button>

          {/* Delete Account */}
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <p className="text-gray-800">Xóa tài khoản</p>
                <p className="text-sm text-gray-600">
                  Xóa vĩnh viễn tài khoản và dữ liệu
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
