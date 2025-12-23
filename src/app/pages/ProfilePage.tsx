import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { UserCircle, Edit, Save, X, Star, Gift } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ProfilePage() {
  const { userInfo, updateUserInfo, isLoggedIn } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(userInfo);
  const router = useRouter();

  // Redirect if not logged in
  if (!isLoggedIn) {
    router.push('/');
    return null;
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditedInfo(userInfo);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedInfo(userInfo);
  };

  const handleSave = () => {
    updateUserInfo(editedInfo);
    setIsEditing(false);
  };

  const handleGoToLoyaltyPoints = () => {
    router.push('/loyalty-points');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

        {/* Điểm tích lũy Card - NEW */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-2xl shadow-xl p-6 mb-8 cursor-pointer hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-95"
             onClick={handleGoToLoyaltyPoints}>
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

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!isEditing ? (
            // View Mode
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Họ và tên</label>
                  <p className="text-gray-800 bg-gray-50 px-4 py-3 rounded-lg">
                    {userInfo.name || 'Chưa cập nhật'}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Ngày sinh</label>
                  <p className="text-gray-800 bg-gray-50 px-4 py-3 rounded-lg">
                    {userInfo.birthdate ? new Date(userInfo.birthdate).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Số điện thoại</label>
                  <p className="text-gray-800 bg-gray-50 px-4 py-3 rounded-lg">
                    {userInfo.phone || 'Chưa cập nhật'}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="text-gray-800 bg-gray-50 px-4 py-3 rounded-lg break-all">
                    {userInfo.email || 'Chưa cập nhật'}
                  </p>
                </div>
              </div>

              {/* Edit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={handleEdit}
                  className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 active:scale-95 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Edit className="w-5 h-5" />
                  Chỉnh sửa thông tin
                </button>
              </div>
            </div>
          ) : (
            // Edit Mode
            <div className="space-y-6">
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-cyan-800 flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Bạn đang ở chế độ chỉnh sửa. Vui lòng cập nhật thông tin và nhấn "Lưu".
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editedInfo.name}
                    onChange={(e) => setEditedInfo({ ...editedInfo, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Ngày sinh <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={editedInfo.birthdate}
                    onChange={(e) => setEditedInfo({ ...editedInfo, birthdate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={editedInfo.phone}
                    onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="0123456789"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={editedInfo.email}
                    onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 active:scale-95 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Lưu thay đổi
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-8 rounded-lg font-semibold hover:bg-gray-300 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Hủy
                </button>
              </div>
            </div>
          )}
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