"use client";

import { UserCircle, Star, Gift } from 'lucide-react';
import { useProfile } from './hooks/useProfile';
import Link from 'next/link';

export function ProfilePage() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center py-20">
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center py-20">
            <p className="text-gray-600">Không tìm thấy thông tin</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <UserCircle className="w-16 h-16 text-cyan-600" />
              </div>
              <div>
                <h1 className="text-white mb-1">Thông tin cá nhân</h1>
                <p className="text-cyan-100">Quản lý thông tin tài khoản của bạn</p>
              </div>
            </div>
          </div>
        </div>

        {/* Điểm tích lũy Card */}
        <Link href="/loyalty-points">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-2xl shadow-xl p-6 mb-8 cursor-pointer hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-95">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-10 h-10 text-yellow-500 fill-yellow-500" />
                </div>
                <div className="text-white">
                  <h2 className="text-white mb-1">Điểm Tích Lũy</h2>
                  <p className="text-white/90 text-sm">Xem điểm và nhận ưu đãi</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Gift className="w-8 h-8 text-white" />
                <span className="text-white" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  →
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Profile Information - READ ONLY */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Họ và tên</label>
                <p className="text-gray-800 bg-gray-50 px-4 py-3 rounded-lg">
                  {profile.name || 'Chưa cập nhật'}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500">Ngày sinh</label>
                <p className="text-gray-800 bg-gray-50 px-4 py-3 rounded-lg">
                  {profile.birthdate ? new Date(profile.birthdate).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500">Số điện thoại</label>
                <p className="text-gray-800 bg-gray-50 px-4 py-3 rounded-lg">
                  {profile.phone || 'Chưa cập nhật'}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500">Email</label>
                <p className="text-gray-800 bg-gray-50 px-4 py-3 rounded-lg break-all">
                  {profile.email || 'Chưa cập nhật'}
                </p>
              </div>

              {profile.address && (
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-gray-500">Địa chỉ</label>
                  <p className="text-gray-800 bg-gray-50 px-4 py-3 rounded-lg">
                    {profile.address}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-blue-800 mb-2 flex items-center gap-2">
            <span className="text-2xl">ℹ️</span>
            Lưu ý
          </h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Vui lòng cập nhật đầy đủ thông tin để chúng tôi có thể phục vụ bạn tốt hơn</li>
            <li>• Số điện thoại và email được sử dụng để liên hệ khi có đơn hàng</li>
            <li>• Thông tin của bạn được bảo mật và không chia sẻ cho bên thứ ba</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

