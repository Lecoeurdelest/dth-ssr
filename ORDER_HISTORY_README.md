# Trang Lịch Sử Đặt Dịch Vụ

## Tổng quan
Trang "Lịch sử đặt dịch vụ" là một tính năng quan trọng trong website sửa chữa điện nước, giúp khách hàng quản lý và theo dõi các đơn hàng của họ một cách dễ dàng và trực quan.

## Tính năng chính

### 1. Danh sách đơn hàng
- Hiển thị tất cả đơn hàng dưới dạng card với thông tin rõ ràng
- Mỗi card bao gồm:
  - Icon loại dịch vụ (điện, nước, mộc, vận chuyển, lắp đặt, đa dịch vụ)
  - Mã đơn hàng
  - Trạng thái đơn (với màu sắc phân biệt)
  - Ngày đặt dịch vụ
  - Địa chỉ sửa chữa
  - Tổng chi phí
  - Nút "Xem chi tiết"

### 2. Bộ lọc theo trạng thái
- **Tất cả**: Hiển thị tất cả đơn hàng
- **Chờ xử lý**: Đơn hàng mới đặt, chưa được xử lý
- **Đang xử lý**: Đơn hàng đang được xử lý (tìm thợ, xác nhận)
- **Đang sửa**: Thợ đang thực hiện sửa chữa
- **Hoàn thành**: Đơn hàng đã hoàn thành
- **Đã hủy**: Đơn hàng bị hủy

### 3. Thống kê nhanh
- Tổng số đơn hàng
- Số đơn hàng hoàn thành (màu xanh lá)
- Số đơn hàng đang xử lý (màu xanh dương)
- Số đơn hàng chờ xử lý (màu vàng)

### 4. Chi tiết đơn hàng (Modal)
Khi nhấn "Xem chi tiết", modal hiển thị:

#### Thông tin cơ bản
- Trạng thái đơn hàng
- Ngày đặt dịch vụ
- Thông tin khách hàng (họ tên, số điện thoại, địa chỉ)

#### Mô tả sự cố
- Mô tả chi tiết vấn đề
- Hình ảnh sự cố (nếu có)

#### Thông tin thợ sửa chữa
- Ảnh đại diện
- Tên thợ
- Số năm kinh nghiệm
- Đánh giá sao
- Nút gọi điện trực tiếp

#### Timeline tiến trình
- Đã đặt dịch vụ
- Thợ đang đến
- Đang sửa chữa
- Hoàn thành
- (Với visual indicators rõ ràng)

#### Chi tiết chi phí
- Danh sách các hạng mục
- Số lượng × Đơn giá
- Tổng cộng (nổi bật màu xanh dương)

#### Phương thức thanh toán
- Tiền mặt / Chuyển khoản / Chưa thanh toán

#### Ghi chú (nếu có)
- Các ghi chú đặc biệt về đơn hàng

### 5. Chức năng tương tác

#### Đặt lại dịch vụ
- Tạo yêu cầu đặt lại dịch vụ tương tự
- Hiển thị thông báo xác nhận

#### Gọi hỗ trợ
- Gọi trực tiếp đến số hotline hỗ trợ

#### Tải hóa đơn PDF
- Tải xuống hóa đơn (chỉ hiển thị với đơn hoàn thành)

#### Đánh giá dịch vụ
- Chỉ hiển thị với đơn hoàn thành chưa đánh giá
- Đánh giá bằng sao (1-5 sao)
- Nhập nhận xét (tối thiểu 10 ký tự)
- Gửi đánh giá

## Thiết kế UI/UX

### Màu sắc
- **Primary**: Xanh dương (#3B82F6)
- **Success**: Xanh lá (#10B981) - Hoàn thành
- **Warning**: Vàng (#F59E0B) - Chờ xử lý
- **Processing**: Xanh dương nhạt - Đang xử lý
- **Purple**: Tím (#8B5CF6) - Đang sửa
- **Gray**: Xám (#6B7280) - Đã hủy

### Responsive
- **Desktop**: Layout 2 cột cho danh sách đơn hàng
- **Mobile**: Layout 1 cột, filter buttons cuộn ngang
- **Modal**: Tự động điều chỉnh padding và kích thước

### Phân cấp thông tin
1. Tiêu đề trang (lớn, bold)
2. Bộ lọc (dễ nhìn, dễ tương tác)
3. Thống kê (cards nổi bật với màu sắc)
4. Danh sách đơn hàng (cards với hover effect)
5. Chi tiết (modal rõ ràng, dễ đọc)

## Truy cập trang

### Từ Header
1. Đăng nhập vào hệ thống
2. Click vào menu "Tôi" ở header
3. Chọn "Lịch sử đặt hàng"

### Direct URL
- Desktop/Mobile: `/orders`

## Dữ liệu mẫu
File `/src/app/data/ordersData.ts` chứa 7 đơn hàng mẫu với các trạng thái khác nhau:
1. Đơn sửa điện - Hoàn thành
2. Đơn sửa nước - Đang sửa
3. Đơn sửa mộc - Hoàn thành (đã đánh giá)
4. Đơn vận chuyển - Hoàn thành
5. Đơn lắp đặt - Đang xử lý
6. Đơn thông tắc - Đã hủy
7. Đơn đa dịch vụ - Hoàn thành

## Components

### OrderHistoryPage
- Main page component
- Quản lý state cho filter và selected order
- Location: `/src/app/pages/OrderHistoryPage.tsx`

### OrderCard
- Hiển thị thông tin tóm tắt của đơn hàng
- Props: order, onViewDetails
- Location: `/src/app/components/OrderCard.tsx`

### OrderDetailModal
- Hiển thị chi tiết đầy đủ của đơn hàng
- Props: order, onClose
- Location: `/src/app/components/OrderDetailModal.tsx`

## Hướng dẫn sử dụng cho khách hàng

### Xem danh sách đơn hàng
1. Đăng nhập vào tài khoản
2. Click vào "Tôi" → "Lịch sử đặt hàng"
3. Xem danh sách tất cả đơn hàng

### Lọc đơn hàng
1. Click vào các nút filter phía trên danh sách
2. Chọn trạng thái muốn xem (Tất cả, Chờ xử lý, Đang xử lý, Đang sửa, Hoàn thành, Đã hủy)
3. Danh sách sẽ tự động cập nhật

### Xem chi tiết đơn hàng
1. Click nút "Xem chi tiết" trên card đơn hàng
2. Modal chi tiết sẽ hiển thị với đầy đủ thông tin
3. Cuộn xuống để xem các phần khác nhau
4. Click nút X hoặc click bên ngoài modal để đóng

### Đặt lại dịch vụ
1. Mở chi tiết đơn hàng
2. Click nút "Đặt lại dịch vụ" ở phía dưới
3. Hệ thống sẽ tạo yêu cầu mới

### Gọi hỗ trợ
1. Mở chi tiết đơn hàng
2. Click nút "Gọi hỗ trợ"
3. Điện thoại sẽ tự động gọi đến số hotline

### Gọi điện cho thợ
1. Mở chi tiết đơn hàng có thông tin thợ
2. Click icon điện thoại màu xanh lá bên cạnh thông tin thợ
3. Điện thoại sẽ gọi trực tiếp đến thợ

### Đánh giá dịch vụ
1. Mở chi tiết đơn hàng đã hoàn thành
2. Click nút "Đánh giá dịch vụ"
3. Chọn số sao (1-5)
4. Nhập nhận xét (ít nhất 10 ký tự)
5. Click "Gửi đánh giá"

### Tải hóa đơn
1. Mở chi tiết đơn hàng đã hoàn thành
2. Click nút "Tải hóa đơn"
3. File PDF sẽ được tải xuống

## Tích hợp với hệ thống

### Routes
- Route: `/orders`
- Component: `OrderHistoryPage`
- Yêu cầu: Người dùng đã đăng nhập (nên implement)

### Context
- Sử dụng `UserContext` để kiểm tra trạng thái đăng nhập
- Có thể mở rộng để lấy dữ liệu đơn hàng theo user

### Toast Notifications
- Sử dụng `sonner` để hiển thị thông báo
- Success: Khi đặt lại dịch vụ, gửi đánh giá thành công
- Error: Khi có lỗi (ví dụ: nhập đánh giá quá ngắn)

## Khả năng mở rộng

### Tích hợp Backend
```typescript
// Ví dụ fetch orders từ API
const fetchOrders = async () => {
  const response = await fetch('/api/orders');
  const data = await response.json();
  return data;
};
```

### Real-time Updates
- Sử dụng WebSocket hoặc polling để cập nhật trạng thái real-time
- Thông báo khi có thay đổi trạng thái đơn hàng

### Phân trang
- Thêm pagination khi có nhiều đơn hàng
- Load more functionality

### Tìm kiếm
- Tìm kiếm theo mã đơn hàng
- Tìm kiếm theo địa chỉ
- Tìm kiếm theo loại dịch vụ

### Export
- Export danh sách đơn hàng ra Excel/CSV
- Print receipt

## Best Practices

### Performance
- Lazy load images trong modal
- Memoize components khi cần
- Virtual scrolling cho danh sách dài

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly

### Mobile Optimization
- Touch-friendly buttons (tối thiểu 44x44px)
- Swipe gestures để đóng modal
- Optimized images

## Ghi chú kỹ thuật

### TypeScript Types
- `Order`: Interface cho đơn hàng
- `OrderStatus`: Type cho trạng thái
- `TimelineStep`: Interface cho timeline
- `TechnicianInfo`: Interface cho thông tin thợ
- `CostDetail`: Interface cho chi tiết chi phí

### Helper Functions
- `getStatusText()`: Chuyển đổi status sang text tiếng Việt
- `getStatusColor()`: Lấy class Tailwind cho màu status
- `formatCurrency()`: Format số tiền theo VND
- `formatDate()`: Format ngày giờ theo locale Việt Nam

## Liên hệ & Hỗ trợ
- Email: suachuanho@gmail.com
- Hotline: 09xxxxxx
