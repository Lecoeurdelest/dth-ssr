// Dữ liệu đơn hàng dịch vụ

export type OrderStatus =
  | "pending"
  | "processing"
  | "repairing"
  | "completed"
  | "cancelled";

export interface TimelineStep {
  status: string;
  time: string;
  completed: boolean;
  description?: string;
}

export interface CostDetail {
  item: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface TechnicianInfo {
  id: string;
  name: string;
  avatar: string;
  experience: number;
  rating: number;
  phone: string;
}

export interface InvoiceInfo {
  invoiceNumber: string;
  issueDate: string;
  status: "issued" | "not_issued";
  warrantyNote?: string;
}

export interface Order {
  id: string;
  orderCode: string;
  serviceType: string;
  serviceIcon:
    | "electric"
    | "water"
    | "wood"
    | "moving"
    | "installation"
    | "multi";
  orderDate: string;
  status: OrderStatus;
  address: string;
  totalCost: number;
  customerName: string;
  customerPhone: string;
  issueDescription: string;
  issueImages?: string[];
  technician?: TechnicianInfo;
  timeline: TimelineStep[];
  costDetails: CostDetail[];
  paymentMethod: string;
  notes?: string;
  canReview: boolean;
  reviewSubmitted?: boolean;
  invoice?: InvoiceInfo;
}

export const ordersData: Order[] = [
  {
    id: "1",
    orderCode: "DH001234",
    serviceType: "Sửa điện tại nhà",
    serviceIcon: "electric",
    orderDate: "2024-12-12 09:30",
    status: "completed",
    address: "Số 15, đường Lê Hồng Phong, Thành phố Ninh Bình",
    totalCost: 350000,
    customerName: "Nguyễn Văn An",
    customerPhone: "0912345678",
    issueDescription:
      "Đèn phòng khách bị hỏng, công tắc không hoạt động. Cần kiểm tra và sửa chữa ngay.",
    issueImages: [
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400",
    ],
    technician: {
      id: "tech1",
      name: "Trần Văn Bình",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      experience: 8,
      rating: 4.9,
      phone: "0987654321",
    },
    timeline: [
      { status: "Đã đặt dịch vụ", time: "12/12/2024 09:30", completed: true },
      {
        status: "Thợ đang đến",
        time: "12/12/2024 10:15",
        completed: true,
        description: "Đang di chuyển đến địa chỉ",
      },
      {
        status: "Đang sửa chữa",
        time: "12/12/2024 10:45",
        completed: true,
        description: "Đã bắt đầu sửa chữa",
      },
      {
        status: "Hoàn thành",
        time: "12/12/2024 12:00",
        completed: true,
        description: "Đã sửa xong, hoạt động tốt",
      },
    ],
    costDetails: [
      {
        item: "Kiểm tra chẩn đoán sự cố",
        quantity: 1,
        unitPrice: 80000,
        total: 80000,
      },
      {
        item: "Thay công tắc mới",
        quantity: 2,
        unitPrice: 100000,
        total: 200000,
      },
      { item: "Sửa đèn LED", quantity: 1, unitPrice: 70000, total: 70000 },
    ],
    paymentMethod: "Tiền mặt",
    canReview: true,
    reviewSubmitted: false,
    invoice: {
      invoiceNumber: "HD001234",
      issueDate: "12/12/2024 12:15",
      status: "issued",
      warrantyNote: "Bảo hành công tắc và đèn LED trong 6 tháng",
    },
  },
  {
    id: "2",
    orderCode: "DH001235",
    serviceType: "Sửa nước tại nhà",
    serviceIcon: "water",
    orderDate: "2024-12-13 14:00",
    status: "repairing",
    address: "Số 28, phường Đông Thành, Thành phố Ninh Bình",
    totalCost: 280000,
    customerName: "Nguyễn Văn An",
    customerPhone: "0912345678",
    issueDescription:
      "Vòi nước nhà bếp bị rò rỉ, nước chảy yếu. Cần thợ đến kiểm tra và sửa chữa.",
    issueImages: [
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400",
    ],
    technician: {
      id: "tech2",
      name: "Lê Minh Cường",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      experience: 12,
      rating: 4.8,
      phone: "0976543210",
    },
    timeline: [
      { status: "Đã đặt dịch vụ", time: "13/12/2024 14:00", completed: true },
      { status: "Thợ đang đến", time: "13/12/2024 14:30", completed: true },
      {
        status: "Đang sửa chữa",
        time: "13/12/2024 15:00",
        completed: true,
        description: "Đang thay thế vòi nước",
      },
      { status: "Hoàn thành", time: "", completed: false },
    ],
    costDetails: [
      {
        item: "Kiểm tra hệ thống nước",
        quantity: 1,
        unitPrice: 80000,
        total: 80000,
      },
      {
        item: "Thay vòi nước mới",
        quantity: 1,
        unitPrice: 150000,
        total: 150000,
      },
      { item: "Vật tư phụ", quantity: 1, unitPrice: 50000, total: 50000 },
    ],
    paymentMethod: "Chuyển khoản",
    canReview: false,
    reviewSubmitted: false,
  },
  {
    id: "3",
    orderCode: "DH001236",
    serviceType: "Sửa chữa đồ mộc",
    serviceIcon: "wood",
    orderDate: "2024-12-11 10:00",
    status: "completed",
    address: "Số 42, phường Tân Thành, Thành phố Ninh Bình",
    totalCost: 420000,
    customerName: "Nguyễn Văn An",
    customerPhone: "0912345678",
    issueDescription:
      "Giường ngủ bị kêu, bản lề tủ quần áo bị hỏng. Cần thợ mộc đến sửa chữa.",
    technician: {
      id: "tech3",
      name: "Phạm Đức Duy",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
      experience: 15,
      rating: 4.9,
      phone: "0965432109",
    },
    timeline: [
      { status: "Đã đặt dịch vụ", time: "11/12/2024 10:00", completed: true },
      { status: "Thợ đang đến", time: "11/12/2024 10:30", completed: true },
      { status: "Đang sửa chữa", time: "11/12/2024 11:00", completed: true },
      { status: "Hoàn thành", time: "11/12/2024 13:30", completed: true },
    ],
    costDetails: [
      {
        item: "Sửa giường gỗ (kêu, long ốc)",
        quantity: 1,
        unitPrice: 250000,
        total: 250000,
      },
      {
        item: "Thay bản lề tủ mới",
        quantity: 3,
        unitPrice: 50000,
        total: 150000,
      },
      { item: "Vật liệu phụ", quantity: 1, unitPrice: 20000, total: 20000 },
    ],
    paymentMethod: "Tiền mặt",
    canReview: true,
    reviewSubmitted: true,
    invoice: {
      invoiceNumber: "HD001236",
      issueDate: "11/12/2024 13:45",
      status: "issued",
      warrantyNote: "Bảo hành bản lề và công việc sửa chữa trong 3 tháng",
    },
  },
  {
    id: "4",
    orderCode: "DH001237",
    serviceType: "Vận chuyển – khuân vác",
    serviceIcon: "moving",
    orderDate: "2024-12-10 08:00",
    status: "completed",
    address: "Từ số 12 Lê Lợi đến số 35 Trần Hưng Đạo, TP Ninh Bình",
    totalCost: 650000,
    customerName: "Nguyễn Văn An",
    customerPhone: "0912345678",
    issueDescription:
      "Chuyển nhà, cần vận chuyển tủ lạnh, máy giặt, bàn ghế và các đồ đạc khác.",
    technician: {
      id: "tech4",
      name: "Hoàng Văn Em",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      experience: 6,
      rating: 4.7,
      phone: "0954321098",
    },
    timeline: [
      { status: "Đã đặt dịch vụ", time: "10/12/2024 08:00", completed: true },
      { status: "Đội ngũ đang đến", time: "10/12/2024 08:30", completed: true },
      { status: "Đang vận chuyển", time: "10/12/2024 09:00", completed: true },
      { status: "Hoàn thành", time: "10/12/2024 12:00", completed: true },
    ],
    costDetails: [
      {
        item: "Vận chuyển tủ lạnh",
        quantity: 1,
        unitPrice: 200000,
        total: 200000,
      },
      {
        item: "Vận chuyển máy giặt",
        quantity: 1,
        unitPrice: 180000,
        total: 180000,
      },
      {
        item: "Khuân vác đồ đạc khác",
        quantity: 1,
        unitPrice: 270000,
        total: 270000,
      },
    ],
    paymentMethod: "Tiền mặt",
    canReview: true,
    reviewSubmitted: false,
    invoice: {
      invoiceNumber: "HD001237",
      issueDate: "10/12/2024 12:15",
      status: "issued",
      warrantyNote: "Cam kết đồ đạc được vận chuyển an toàn",
    },
  },
  {
    id: "5",
    orderCode: "DH001238",
    serviceType: "Lắp đặt đồ gia dụng",
    serviceIcon: "installation",
    orderDate: "2024-12-14 15:30",
    status: "processing",
    address: "Số 67, đường Trường Chinh, Thành phố Ninh Bình",
    totalCost: 450000,
    customerName: "Nguyễn Văn An",
    customerPhone: "0912345678",
    issueDescription:
      "Cần lắp đặt tivi treo tường, máy lạnh mới mua. Yêu cầu thợ có kinh nghiệm.",
    timeline: [
      { status: "Đã đặt dịch vụ", time: "14/12/2024 15:30", completed: true },
      {
        status: "Đang xử lý",
        time: "14/12/2024 15:45",
        completed: true,
        description: "Đang tìm thợ phù hợp",
      },
      { status: "Thợ đang đến", time: "", completed: false },
      { status: "Hoàn thành", time: "", completed: false },
    ],
    costDetails: [
      {
        item: "Lắp tivi treo tường",
        quantity: 1,
        unitPrice: 200000,
        total: 200000,
      },
      {
        item: "Lắp máy lạnh (dự kiến)",
        quantity: 1,
        unitPrice: 250000,
        total: 250000,
      },
    ],
    paymentMethod: "Chưa thanh toán",
    canReview: false,
    reviewSubmitted: false,
  },
  {
    id: "6",
    orderCode: "DH001239",
    serviceType: "Thông tắc cống",
    serviceIcon: "water",
    orderDate: "2024-12-09 07:30",
    status: "cancelled",
    address: "Số 88, phường Nam Bình, Thành phố Ninh Bình",
    totalCost: 0,
    customerName: "Nguyễn Văn An",
    customerPhone: "0912345678",
    issueDescription: "Cống nhà vệ sinh bị tắc nghẽn, nước thoát chậm.",
    timeline: [
      { status: "Đã đặt dịch vụ", time: "09/12/2024 07:30", completed: true },
      {
        status: "Đã hủy",
        time: "09/12/2024 08:00",
        completed: true,
        description: "Khách hàng hủy - Tự xử lý được",
      },
    ],
    costDetails: [],
    paymentMethod: "Không áp dụng",
    notes: "Đơn hàng đã bị hủy theo yêu cầu của khách hàng",
    canReview: false,
    reviewSubmitted: false,
  },
  {
    id: "7",
    orderCode: "DH001240",
    serviceType: "Đa dịch vụ sửa chữa nhà cửa",
    serviceIcon: "multi",
    orderDate: "2024-12-08 13:00",
    status: "completed",
    address: "Số 25, phường Thanh Bình, Thành phố Ninh Bình",
    totalCost: 850000,
    customerName: "Nguyễn Văn An",
    customerPhone: "0912345678",
    issueDescription: "Sửa chữa tổng hợp: điện, nước, sơn tường phòng ngủ.",
    issueImages: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400",
    ],
    technician: {
      id: "tech5",
      name: "Nguyễn Quang Hải",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100",
      experience: 10,
      rating: 4.8,
      phone: "0943210987",
    },
    timeline: [
      { status: "Đã đặt dịch vụ", time: "08/12/2024 13:00", completed: true },
      { status: "Thợ đang đến", time: "08/12/2024 13:30", completed: true },
      { status: "Đang sửa chữa", time: "08/12/2024 14:00", completed: true },
      { status: "Hoàn thành", time: "08/12/2024 17:30", completed: true },
    ],
    costDetails: [
      {
        item: "Sửa chữa điện cơ bản",
        quantity: 1,
        unitPrice: 150000,
        total: 150000,
      },
      {
        item: "Sửa chữa nước cơ bản",
        quantity: 1,
        unitPrice: 200000,
        total: 200000,
      },
      {
        item: "Sơn sửa tường phòng ngủ",
        quantity: 1,
        unitPrice: 500000,
        total: 500000,
      },
    ],
    paymentMethod: "Chuyển khoản",
    canReview: true,
    reviewSubmitted: false,
    invoice: {
      invoiceNumber: "HD001240",
      issueDate: "08/12/2024 17:45",
      status: "issued",
      warrantyNote:
        "Bảo hành sơn tường 1 năm, bảo hành sửa chữa điện nước 6 tháng",
    },
  },
];

// Helper functions
export const getStatusText = (status: OrderStatus): string => {
  const statusMap: Record<OrderStatus, string> = {
    pending: "Chờ xử lý",
    processing: "Đang xử lý",
    repairing: "Đang sửa",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
  };
  return statusMap[status];
};

export const getStatusColor = (status: OrderStatus): string => {
  const colorMap: Record<OrderStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    repairing: "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-gray-100 text-gray-800",
  };
  return colorMap[status];
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
