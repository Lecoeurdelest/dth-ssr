import { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  HelpCircle, 
  LogOut, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin,
  Edit2,
  Save,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Gift,
  TrendingUp,
  Percent,
  Calendar,
  Tag,
  History,
  AlertCircle,
  MessageSquare,
  DollarSign,
  Camera
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

type TabType = 'profile' | 'orders' | 'promotions';

interface Order {
  id: string;
  serviceType: string;
  serviceImage: string;
  date: string;
  time: string;
  totalPrice: string;
  status: 'pending' | 'inprogress' | 'completed' | 'cancelled';
  worker: {
    name: string;
    image: string;
    rating: number;
    phone: string;
  };
  location: string;
  notes: string;
  paymentMethod: string;
  serviceFee: string;
  extraFee: string;
  promoCode?: string;
  promoDiscount?: string;
}

interface Promotion {
  id: string;
  code: string;
  discount: string;
  minOrder: string;
  expiryDate: string;
  serviceType: string;
  description: string;
  type: 'new-user' | 'birthday' | 'loyalty' | 'event';
}

export function TasksPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('vi');

  // User profile data
  const [profileData, setProfileData] = useState({
    fullName: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    email: 'nguyenvana@email.com',
    points: 450
  });

  // Mock orders data
  const orders: Order[] = [
    {
      id: 'DH001',
      serviceType: 'Sửa chữa điện',
      serviceImage: 'https://images.unsplash.com/photo-1632733711679-529326f6db12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwcmVwYWlyJTIwc2VydmljZXxlbnwxfHx8fDE3NjU2MjQyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '12/12/2024',
      time: '14:30',
      totalPrice: '250.000đ',
      status: 'completed',
      worker: {
        name: 'Trần Văn B',
        image: 'https://images.unsplash.com/photo-1697181775774-c87e11b0a521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrZXIlMjB0ZWNobmljaWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY1NjI0MjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.8,
        phone: '0912345678'
      },
      location: '123 Đường ABC, Quận 1, TP.HCM',
      notes: 'Sửa công tắc và ổ cắm phòng khách',
      paymentMethod: 'Tiền mặt',
      serviceFee: '200.000đ',
      extraFee: '50.000đ',
      promoCode: 'GIAM20',
      promoDiscount: '40.000đ'
    },
    {
      id: 'DH002',
      serviceType: 'Thông tắc cống',
      serviceImage: 'https://images.unsplash.com/photo-1760571327612-8ab776dcd462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHJlcGFpciUyMGhvbWV8ZW58MXx8fHwxNzY1NjI0MjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '10/12/2024',
      time: '09:00',
      totalPrice: '300.000đ',
      status: 'inprogress',
      worker: {
        name: 'Lê Văn C',
        image: 'https://images.unsplash.com/photo-1697181775774-c87e11b0a521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrZXIlMjB0ZWNobmljaWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY1NjI0MjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.9,
        phone: '0923456789'
      },
      location: '456 Đường XYZ, Quận 3, TP.HCM',
      notes: 'Cống nhà tắm bị tắc nghẽn',
      paymentMethod: 'Chuyển khoản',
      serviceFee: '250.000đ',
      extraFee: '50.000đ'
    },
    {
      id: 'DH003',
      serviceType: 'Vệ sinh máy lạnh',
      serviceImage: 'https://images.unsplash.com/photo-1632733711679-529326f6db12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwcmVwYWlyJTIwc2VydmljZXxlbnwxfHx8fDE3NjU2MjQyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '08/12/2024',
      time: '15:00',
      totalPrice: '180.000đ',
      status: 'pending',
      worker: {
        name: 'Phạm Văn D',
        image: 'https://images.unsplash.com/photo-1697181775774-c87e11b0a521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrZXIlMjB0ZWNobmljaWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY1NjI0MjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.7,
        phone: '0934567890'
      },
      location: '789 Đường DEF, Quận 5, TP.HCM',
      notes: 'Vệ sinh 2 cục máy lạnh',
      paymentMethod: 'Tiền mặt',
      serviceFee: '180.000đ',
      extraFee: '0đ'
    }
  ];

  // Mock promotions data
  const promotions: Promotion[] = [
    {
      id: 'PROMO1',
      code: 'NEWUSER50',
      discount: 'Giảm 50%',
      minOrder: '100.000đ',
      expiryDate: '31/12/2024',
      serviceType: 'Tất cả dịch vụ',
      description: 'Ưu đãi dành cho khách hàng mới',
      type: 'new-user'
    },
    {
      id: 'PROMO2',
      code: 'GIAM30',
      discount: 'Giảm 30.000đ',
      minOrder: '200.000đ',
      expiryDate: '25/12/2024',
      serviceType: 'Sửa điện',
      description: 'Giảm giá dịch vụ sửa điện',
      type: 'event'
    },
    {
      id: 'PROMO3',
      code: 'BIRTHDAY20',
      discount: 'Giảm 20%',
      minOrder: '0đ',
      expiryDate: '31/01/2025',
      serviceType: 'Tất cả dịch vụ',
      description: 'Ưu đãi sinh nhật',
      type: 'birthday'
    },
    {
      id: 'PROMO4',
      code: 'LOYAL100',
      discount: 'Giảm 100.000đ',
      minOrder: '500.000đ',
      expiryDate: '31/03/2025',
      serviceType: 'Tất cả dịch vụ',
      description: 'Tri ân khách hàng thân thiết',
      type: 'loyalty'
    }
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'inprogress':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'inprogress':
        return 'Đang thực hiện';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'inprogress':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getPromoTypeColor = (type: Promotion['type']) => {
    switch (type) {
      case 'new-user':
        return 'bg-purple-100 text-purple-700';
      case 'birthday':
        return 'bg-pink-100 text-pink-700';
      case 'loyalty':
        return 'bg-amber-100 text-amber-700';
      case 'event':
        return 'bg-cyan-100 text-cyan-700';
    }
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-cyan-600 mb-2">Tài khoản của tôi</h1>
          <p className="text-gray-600">Quản lý thông tin cá nhân và đơn hàng</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'border-cyan-600 text-cyan-600'
                  : 'border-transparent text-gray-600 hover:text-cyan-600'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Thông tin cá nhân</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'border-cyan-600 text-cyan-600'
                  : 'border-transparent text-gray-600 hover:text-cyan-600'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Lịch sử đặt hàng</span>
            </button>
            <button
              onClick={() => setActiveTab('promotions')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'promotions'
                  ? 'border-cyan-600 text-cyan-600'
                  : 'border-transparent text-gray-600 hover:text-cyan-600'
              }`}
            >
              <Gift className="w-5 h-5" />
              <span>Khuyến mãi</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <>
              {/* Basic Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-800">Thông tin cơ bản</h2>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Chỉnh sửa
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setIsEditing(false)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Lưu
                    </Button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, fullName: e.target.value })
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, phone: e.target.value })
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-100"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) =>
                        setProfileData({ ...profileData, address: e.target.value })
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Points Display */}
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg shadow-md p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 mb-1">Điểm tích lũy</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{profileData.points}</span>
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
                    <button
                      onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notificationsEnabled ? 'bg-cyan-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notificationsEnabled ? 'translate-x-6' : ''
                        }`}
                      />
                    </button>
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
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                    </select>
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
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <>
              {!selectedOrder ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Image */}
                        <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={order.serviceImage}
                            alt={order.serviceType}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-gray-800 mb-1">{order.serviceType}</h3>
                              <p className="text-sm text-gray-600">Mã đơn: {order.id}</p>
                            </div>
                            <span
                              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {getStatusIcon(order.status)}
                              {getStatusText(order.status)}
                            </span>
                          </div>

                          <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {order.date} - {order.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4" />
                              <span className="text-cyan-600 font-semibold">
                                {order.totalPrice}
                              </span>
                            </div>
                          </div>

                          {order.promoCode && (
                            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-lg w-fit">
                              <Tag className="w-4 h-4" />
                              <span>
                                Đã giảm {order.promoDiscount} với mã {order.promoCode}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Order Detail */
                <div className="bg-white rounded-lg shadow-md p-6">
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="flex items-center text-cyan-600 hover:text-cyan-700 mb-6"
                  >
                    <Edit2 className="w-5 h-5 rotate-180 mr-2" />
                    Quay lại danh sách
                  </button>

                  <div className="space-y-6">
                    {/* Order Header */}
                    <div className="pb-6 border-b">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-gray-800 mb-2">{selectedOrder.serviceType}</h2>
                          <p className="text-gray-600">Mã đơn hàng: {selectedOrder.id}</p>
                        </div>
                        <span
                          className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(
                            selectedOrder.status
                          )}`}
                        >
                          {getStatusIcon(selectedOrder.status)}
                          {getStatusText(selectedOrder.status)}
                        </span>
                      </div>

                      <div className="w-full h-64 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={selectedOrder.serviceImage}
                          alt={selectedOrder.serviceType}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Worker Info */}
                    <div className="pb-6 border-b">
                      <h3 className="text-gray-800 mb-4">Thông tin nhân viên</h3>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <ImageWithFallback
                            src={selectedOrder.worker.image}
                            alt={selectedOrder.worker.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 mb-1">{selectedOrder.worker.name}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{selectedOrder.worker.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              <span>{selectedOrder.worker.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="pb-6 border-b">
                      <h3 className="text-gray-800 mb-4">Thông tin dịch vụ</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Địa điểm làm việc</p>
                            <p className="text-gray-800">{selectedOrder.location}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Thời gian</p>
                            <p className="text-gray-800">
                              {selectedOrder.date} - {selectedOrder.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Ghi chú</p>
                            <p className="text-gray-800">{selectedOrder.notes}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Phương thức thanh toán</p>
                            <p className="text-gray-800">{selectedOrder.paymentMethod}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div className="pb-6 border-b">
                      <h3 className="text-gray-800 mb-4">Chi tiết thanh toán</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-gray-600">
                          <span>Phí dịch vụ</span>
                          <span>{selectedOrder.serviceFee}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Phụ phí</span>
                          <span>{selectedOrder.extraFee}</span>
                        </div>
                        {selectedOrder.promoCode && (
                          <div className="flex justify-between text-green-600">
                            <span>
                              Giảm giá ({selectedOrder.promoCode})
                            </span>
                            <span>-{selectedOrder.promoDiscount}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-cyan-600 pt-2 border-t">
                          <span>Tổng cộng</span>
                          <span className="text-xl">{selectedOrder.totalPrice}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid md:grid-cols-3 gap-3">
                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Báo vấn đề
                      </Button>
                      <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Liên hệ hỗ trợ
                      </Button>
                      <Button className="bg-gray-600 hover:bg-gray-700 text-white">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Yêu cầu hoàn tiền
                      </Button>
                    </div>

                    {/* Before/After Photos */}
                    <div>
                      <h3 className="text-gray-800 mb-4">Ảnh công việc</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Trước khi sửa</p>
                          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                            <Camera className="w-12 h-12 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Sau khi sửa</p>
                          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                            <Camera className="w-12 h-12 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Promotions Tab */}
          {activeTab === 'promotions' && (
            <>
              {/* Points Summary */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md p-6 text-white">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-white/80 mb-1">Tổng điểm</p>
                    <p className="text-3xl font-bold">{profileData.points}</p>
                  </div>
                  <div>
                    <p className="text-white/80 mb-1">Đã tiết kiệm</p>
                    <p className="text-3xl font-bold">320.000đ</p>
                  </div>
                  <div>
                    <p className="text-white/80 mb-1">Mã khả dụng</p>
                    <p className="text-3xl font-bold">{promotions.length}</p>
                  </div>
                </div>
              </div>

              {/* Available Promotions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-gray-800 mb-6">Mã giảm giá khả dụng</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {promotions.map((promo) => (
                    <div
                      key={promo.id}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-cyan-500 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs mb-2 ${getPromoTypeColor(
                              promo.type
                            )}`}
                          >
                            {promo.description}
                          </span>
                          <div className="flex items-center gap-2 mb-2">
                            <Gift className="w-5 h-5 text-cyan-600" />
                            <span className="text-gray-800 font-bold">{promo.code}</span>
                          </div>
                          <p className="text-2xl font-bold text-cyan-600 mb-2">
                            {promo.discount}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span>Đơn tối thiểu: {promo.minOrder}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          <span>{promo.serviceType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>HSD: {promo.expiryDate}</span>
                        </div>
                      </div>

                      <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                        Sử dụng ngay
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Points Rewards */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-gray-800 mb-4">Đổi điểm nhận quà</h2>
                <p className="text-gray-600 mb-6">
                  Sử dụng điểm tích lũy để đổi lấy voucher hoặc ưu đãi đặc biệt
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <div className="text-center mb-3">
                      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Gift className="w-8 h-8 text-amber-600" />
                      </div>
                      <p className="text-gray-800">Voucher 50.000đ</p>
                    </div>
                    <p className="text-center text-cyan-600 mb-3">200 điểm</p>
                    <Button className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300">
                      Đổi ngay
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <div className="text-center mb-3">
                      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Gift className="w-8 h-8 text-amber-600" />
                      </div>
                      <p className="text-gray-800">Voucher 100.000đ</p>
                    </div>
                    <p className="text-center text-cyan-600 mb-3">350 điểm</p>
                    <Button className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300">
                      Đổi ngay
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <div className="text-center mb-3">
                      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Gift className="w-8 h-8 text-amber-600" />
                      </div>
                      <p className="text-gray-800">Voucher 200.000đ</p>
                    </div>
                    <p className="text-center text-cyan-600 mb-3">600 điểm</p>
                    <Button className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300">
                      Đổi ngay
                    </Button>
                  </div>
                </div>
              </div>

              {/* Usage History */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-gray-800 mb-4">Lịch sử sử dụng</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <History className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-800">GIAM20</p>
                        <p className="text-sm text-gray-600">Đã sử dụng - 12/12/2024</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-semibold">-40.000đ</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <History className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-800">NEWUSER50</p>
                        <p className="text-sm text-gray-600">Đã sử dụng - 05/12/2024</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-semibold">-75.000đ</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg opacity-50">
                    <div className="flex items-center gap-3">
                      <History className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-800">WINTER30</p>
                        <p className="text-sm text-gray-600">Đã hết hạn - 01/12/2024</p>
                      </div>
                    </div>
                    <span className="text-gray-400">Hết hạn</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
