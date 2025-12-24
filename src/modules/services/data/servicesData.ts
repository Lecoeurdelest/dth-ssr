// Dữ liệu tập trung cho tất cả các dịch vụ
export interface PricingCategory {
  category: string;
  items: { item: string; price: string }[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  serviceRating: number;
  technicianRating: number;
}

export interface ServiceDetail {
  title: string;
  description: string;
  headerImage: string;
  subServices: string[];
  pricingCategories: PricingCategory[];
  commitments: string[];
  videoUrl?: string;
  images?: string[];
  reviews: Review[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  serviceCount: number;
  details: ServiceDetail;
}

export const servicesData: Service[] = [
  // 1. Sửa điện tại nhà
  {
    id: 'sua-dien-tai-nha',
    title: 'Sửa điện tại nhà',
    description: 'Sửa chữa hệ thống điện - Thay thế vật liệu hư hỏng - Bảo trì định kỳ',
    image: 'https://images.unsplash.com/photo-1636218685495-8f6545aadb71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMGVsZWN0cmljYWwlMjB3b3JrfGVufDF8fHx8MTc2NTYxNTk2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviews: 127,
    serviceCount: 8,
    details: {
      title: 'SỬA CHỮA ĐIỆN',
      description: 'Dịch vụ sửa chữa điện chuyên nghiệp, an toàn và hiệu quả. Đội ngũ thợ điện có chứng chỉ hành nghề, giàu kinh nghiệm với các hệ thống điện dân dụng và công nghiệp.',
      headerImage: 'https://images.unsplash.com/photo-1636218685495-8f6545aadb71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMGVsZWN0cmljYWwlMjB3b3JrfGVufDF8fHx8MTc2NTYxNTk2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      subServices: [
        'Sửa chữa điện dân dụng',
        'Bảo trì và kiểm tra hệ thống điện',
        'Lắp đặt thiết bị điện'
      ],
      pricingCategories: [
        {
          category: 'SỬA CHỮA ĐIỆN DÂN DỤNG',
          items: [
            { item: 'Kiểm tra – chẩn đoán sự cố', price: '50.000 – 80.000đ' },
            { item: 'Sửa công tắc, ổ cắm', price: '80.000 – 150.000đ' },
            { item: 'Thay/sửa bóng đèn', price: '50.000 – 120.000đ' },
            { item: 'Thay aptomat – cầu dao', price: '120.000 – 250.000đ' }
          ]
        },
        {
          category: 'BẢO TRÌ VÀ KIỂM TRA HỆ THỐNG ĐIỆN',
          items: [
            { item: 'Khắc phục chập điện', price: '150.000 – 300.000đ' },
            { item: 'Sửa mất điện cục bộ', price: '120.000 – 250.000đ' },
            { item: 'Đi lại dây điện phòng nhỏ', price: '300.000 – 700.000đ' }
          ]
        },
        {
          category: 'LẮP ĐẶT THIẾT BỊ ĐIỆN',
          items: [
            { item: 'Lắp đèn, quạt trần, quạt treo', price: '100.000 – 200.000đ/món' },
            { item: 'Lắp máy nước nóng', price: '150.000 – 300.000đ/món' },
            { item: 'Lắp thiết bị điện khác', price: 'Liên hệ báo giá' }
          ]
        }
      ],
      commitments: [
        'Báo giá trước khi làm – không phát sinh',
        'Thợ chuyên nghiệp, làm việc tận tâm',
        'Có mặt nhanh – hỗ trợ 24/7'
      ],
      images: [
        'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800',
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
        'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800'
      ],
      reviews: [
        {
          id: '1',
          userName: 'Nguyễn Văn A',
          rating: 5,
          date: '2024-12-10',
          comment: 'Thợ làm việc rất chuyên nghiệp, nhanh gọn. Giá cả hợp lý, không phát sinh thêm chi phí. Rất hài lòng!',
          serviceRating: 5,
          technicianRating: 5
        },
        {
          id: '2',
          userName: 'Trần Thị B',
          rating: 5,
          date: '2024-12-08',
          comment: 'Dịch vụ tốt, thợ tận tâm. Sửa xong chạy ổn định, đã giới thiệu cho bạn bè.',
          serviceRating: 5,
          technicianRating: 5
        },
        {
          id: '3',
          userName: 'Lê Minh C',
          rating: 4,
          date: '2024-12-05',
          comment: 'Làm việc nhanh, tuy nhiên hơi chậm một chút so với hẹn. Nhưng nhìn chung vẫn ok.',
          serviceRating: 4,
          technicianRating: 4
        }
      ]
    }
  },
  // 2. Sửa nước tại nhà
  {
    id: 'sua-nuoc-thong-tac',
    title: 'Sửa nước tại nhà',
    description: 'Sửa chữa hệ thống nước - Thông tắc công trình, hút bể phốt',
    image: 'https://images.unsplash.com/photo-1654440122140-f1fc995ddb34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwd3JlbmNoJTIwd2F0ZXIlMjBwaXBlfGVufDF8fHx8MTc2NTYxNTk2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviews: 98,
    serviceCount: 9,
    details: {
      title: 'SỬA CHỮA NƯỚC',
      description: 'Dịch vụ sửa chữa hệ thống nước chuyên nghiệp, thông tắc nhanh chóng, hút bể phốt định kỳ. Đội ngũ thợ nước giàu kinh nghiệm, trang bị đầy đủ thiết bị hiện đại.',
      headerImage: 'https://images.unsplash.com/photo-1654440122140-f1fc995ddb34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwd3JlbmNoJTIwd2F0ZXIlMjBwaXBlfGVufDF8fHx8MTc2NTYxNTk2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      subServices: [
        'Cấp thoát nước',
        'Thông tắc nước',
        'Hút bể phốt'
      ],
      pricingCategories: [
        {
          category: 'SỬA NƯỚC',
          items: [
            { item: 'Sửa rò rỉ ống nước', price: '120.000 – 250.000đ' },
            { item: 'Thay vòi nước, van nước', price: '80.000 – 150.000đ/món' },
            { item: 'Thay phao bồn, sửa bồn cầu', price: '120.000 – 250.000đ' },
            { item: 'Lắp đặt ống nước mới', price: 'Liên hệ khảo sát báo giá' }
          ]
        },
        {
          category: 'THÔNG TẮC',
          items: [
            { item: 'Thông tắc bồn cầu', price: '150.000 – 300.000đ' },
            { item: 'Thông tắc chậu rửa, lavabo', price: '100.000 – 250.000đ' },
            { item: 'Thông tắc cống thoát sàn', price: '120.000 – 250.000đ' },
            { item: 'Thông tắc đường ống dài', price: '300.000 – 700.000đ' }
          ]
        },
        {
          category: 'HÚT BỂ PHỐT',
          items: [
            { item: 'Hút bể phốt hộ gia đình (xe nhỏ)', price: '300.000 – 500.000đ' },
            { item: 'Hút bể phốt nhà hàng – cơ quan', price: '500.000 – 900.000đ' },
            { item: 'Nạo vét, kiểm tra bể phốt', price: 'Liên hệ báo giá cụ thể' }
          ]
        }
      ],
      commitments: [
        'Báo giá trước khi làm – không phát sinh',
        'Thợ chuyên nghiệp, làm việc tận tâm',
        'Có mặt nhanh – hỗ trợ 24/7'
      ],
      images: [
        'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800',
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
        'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800'
      ],
      reviews: [
        {
          id: '1',
          userName: 'Phạm Thị D',
          rating: 5,
          date: '2024-12-11',
          comment: 'Thông tắc rất nhanh, sạch sẽ. Anh thợ nhiệt tình, giá cả hợp lý.',
          serviceRating: 5,
          technicianRating: 5
        },
        {
          id: '2',
          userName: 'Hoàng Văn E',
          rating: 5,
          date: '2024-12-09',
          comment: 'Hút bể phốt sạch sẽ, không mùi. Đội thợ làm việc chuyên nghiệp.',
          serviceRating: 5,
          technicianRating: 5
        }
      ]
    }
  },
  // 3. Sửa chữa đồ mộc
  {
    id: 'sua-chua-do-moc',
    title: 'Sửa chữa đồ mộc',
    description: 'Sửa chữa đồ mộc – Thay thế - tân trang',
    image: 'https://images.unsplash.com/photo-1704784846246-d81b3542d3d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBkb29yJTIwY2FycGVudHJ5fGVufDF8fHx8MTc2NTYxMzg5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviews: 63,
    serviceCount: 10,
    details: {
      title: 'SỬA CHỮA ĐỒ MỘC',
      description: 'Dịch vụ sửa chữa, tân trang đồ gỗ chuyên nghiệp. Thợ mộc giàu kinh nghiệm, tay nghề cao, xử lý mọi vấn đề về đồ gỗ từ nhỏ đến lớn.',
      headerImage: 'https://images.unsplash.com/photo-1704784846246-d81b3542d3d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBkb29yJTIwY2FycGVudHJ5fGVufDF8fHx8MTc2NTYxMzg5NHww&ixlib=rb-4.1.0&q=80&w=1080',
      subServices: [
        'Sửa chữa đồ mộc',
        'Thay thế - tân trang'
      ],
      pricingCategories: [
        {
          category: 'SỬA CHỮA ĐỒ MỘC',
          items: [
            { item: 'Sửa bản lề tủ bị hỏng, xệ', price: '80.000 – 180.000đ' },
            { item: 'Sửa cánh tủ cong vênh, không đóng kín', price: '120.000 – 250.000đ' },
            { item: 'Sửa giường gỗ (kêu, gãy nan, long ốc)', price: '150.000 – 400.000đ' },
            { item: 'Sửa bàn – ghế gỗ', price: '120.000 – 300.000đ' },
            { item: 'Sửa ray trượt ngăn kéo', price: '80.000 – 200.000đ' },
            { item: 'Sửa tủ bếp – tủ quần áo', price: '150.000 – 450.000đ' },
            { item: 'Sửa mặt bàn gỗ bong tróc, trầy xước', price: '150.000 – 350.000đ' }
          ]
        },
        {
          category: 'THAY THẾ – TÂN TRANG',
          items: [
            { item: 'Thay bản lề mới', price: '50.000 – 100.000đ/cái' },
            { item: 'Thay ray trượt mới', price: '80.000 – 150.000đ/bộ' },
            { item: 'Thay mặt tủ, thay cánh tủ', price: 'Liên hệ khảo sát báo giá' },
            { item: 'Sơn – phủ lại đồ gỗ', price: 'Tính theo m², báo giá sau khi xem thực tế' }
          ]
        }
      ],
      commitments: [
        'Làm cẩn thận, chắc chắn – hoàn thiện đẹp',
        'Báo giá trước, không phát sinh',
        'Thợ mộc kinh nghiệm, xử lý nhanh – gọn – sạch'
      ],
      images: [
        'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800',
        'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800',
        'https://images.unsplash.com/photo-1617804547143-e06fd6a69dc3?w=800'
      ],
      reviews: [
        {
          id: '1',
          userName: 'Đỗ Văn G',
          rating: 5,
          date: '2024-12-07',
          comment: 'Sửa giường rất tốt, không còn kêu nữa. Thợ làm việc chuyên nghiệp.',
          serviceRating: 5,
          technicianRating: 5
        },
        {
          id: '2',
          userName: 'Bùi Thị H',
          rating: 4,
          date: '2024-12-03',
          comment: 'Sửa tủ khá ok, giá cả hợp lý. Tuy nhiên hơi lâu một chút.',
          serviceRating: 4,
          technicianRating: 4
        }
      ]
    }
  },
  // 4. Vận chuyển – khuân vác
  {
    id: 'van-chuyen-khuan-vac',
    title: 'Vận chuyển – khuân vác',
    description: 'Dịch vụ vận chuyển – Dịch vụ khuân vác',
    image: 'https://images.unsplash.com/photo-1758219944627-4d9b32ed7019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpbmclMjB0cnVjayUyMGRlbGl2ZXJ5fGVufDF8fHx8MTc2NTYwNDUzNXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviews: 112,
    serviceCount: 8,
    details: {
      title: 'VẬN CHUYỂN – KHUÂN VÁC',
      description: 'Dịch vụ vận chuyển đồ đạc, chuyển nhà trọn gói chuyên nghiệp. Đội ngũ nhân viên khuân vác khỏe, có kinh nghiệm, cẩn thận với đồ đạc.',
      headerImage: 'https://images.unsplash.com/photo-1758219944627-4d9b32ed7019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpbmclMjB0cnVjayUyMGRlbGl2ZXJ5fGVufDF8fHx8MTc2NTYwNDUzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      subServices: [
        'Dịch vụ vận chuyển',
        'Dịch vụ khuân vác'
      ],
      pricingCategories: [
        {
          category: 'DỊCH VỤ VẬN CHUYỂN',
          items: [
            { item: 'Vận chuyển đồ nội thất nhỏ (bàn, ghế, kệ…)', price: '100.000 – 200.000đ' },
            { item: 'Vận chuyển máy giặt – tủ lạnh – máy lạnh', price: '150.000 – 350.000đ' },
            { item: 'Vận chuyển đồ gia dụng cồng kềnh', price: '200.000 – 500.000đ' },
            { item: 'Vận chuyển nhà trọn gói', price: 'Liên hệ khảo sát báo giá' },
            { item: 'Hỗ trợ vận chuyển ngắn (nội khu)', price: '50.000 – 120.000đ' }
          ]
        },
        {
          category: 'DỊCH VỤ KHUÂN VÁC',
          items: [
            { item: 'Khuân vác đồ nặng (máy móc, thiết bị…)', price: '120.000 – 250.000đ/người' },
            { item: 'Khuân vác tủ, giường, sofa', price: '150.000 – 300.000đ' },
            { item: 'Chuyển đồ lên xuống tầng', price: '50.000 – 100.000đ/tầng' },
            { item: 'Bốc xếp hàng hóa theo giờ', price: '120.000 – 180.000đ/giờ/người' },
            { item: 'Hỗ trợ khuân vác lẻ', price: 'Liên hệ báo giá' }
          ]
        }
      ],
      commitments: [
        'Làm việc nhanh – an toàn – đúng hẹn',
        'Không làm hỏng đồ, không thu thêm phí phát sinh',
        'Nhân viên khỏe – kinh nghiệm – trách nhiệm'
      ],
      images: [
        'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=800',
        'https://images.unsplash.com/photo-1600518464329-f4f47a6fe9e9?w=800',
        'https://images.unsplash.com/photo-1600518464441-3c21c7c2bce0?w=800'
      ],
      reviews: [
        {
          id: '1',
          userName: 'Mai Văn I',
          rating: 5,
          date: '2024-12-06',
          comment: 'Chuyển nhà rất nhanh, không làm hỏng đồ. Đội ngũ rất chuyên nghiệp.',
          serviceRating: 5,
          technicianRating: 5
        },
        {
          id: '2',
          userName: 'Lý Thị K',
          rating: 5,
          date: '2024-12-01',
          comment: 'Khuân vác cẩn thận, giá cả hợp lý. Sẽ sử dụng lại dịch vụ.',
          serviceRating: 5,
          technicianRating: 5
        }
      ]
    }
  },
  // 5. Lắp đặt đồ gia dụng
  {
    id: 'lap-dat-do-gia-dung',
    title: 'Lắp đặt đồ gia dụng',
    description: 'Lắp đặt đồ gia dụng – Lắp đặt đồ nội thất – đồ mộc',
    image: 'https://images.unsplash.com/photo-1692731974074-03e7ef257a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0diUyMGluc3RhbGxhdGlvbiUyMHJlcGFpcnxlbnwxfHx8fDE3NjU2MTU5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviews: 85,
    serviceCount: 12,
    details: {
      title: 'LẮP ĐẶT',
      description: 'Dịch vụ lắp đặt đồ gia dụng và nội thất chuyên nghiệp. Thợ có tay nghề cao, tư vấn vị trí lắp đặt hợp lý, đảm bảo thẩm mỹ và an toàn.',
      headerImage: 'https://images.unsplash.com/photo-1692731974074-03e7ef257a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0diUyMGluc3RhbGxhdGlvbiUyMHJlcGFpcnxlbnwxfHx8fDE3NjU2MTU5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      subServices: [
        'Lắp đặt đồ gia dụng',
        'Lắp đặt đồ nội thất – đồ mộc'
      ],
      pricingCategories: [
        {
          category: 'LẮP ĐẶT ĐỒ GIA DỤNG',
          items: [
            { item: 'Lắp đặt quạt trần/quạt treo', price: '100.000 – 200.000đ/món' },
            { item: 'Lắp máy nước nóng', price: '150.000 – 300.000đ/món' },
            { item: 'Lắp đặt bếp từ/bếp gas', price: '100.000 – 200.000đ' },
            { item: 'Lắp máy lọc nước', price: '120.000 – 220.000đ' },
            { item: 'Lắp tivi treo tường', price: '120.000 – 250.000đ' },
            { item: 'Lắp thiết bị khác', price: 'Liên hệ báo giá' }
          ]
        },
        {
          category: 'LẮP ĐẶT ĐỒ NỘI THẤT – ĐỒ MỘC',
          items: [
            { item: 'Lắp tủ quần áo', price: '150.000 – 350.000đ' },
            { item: 'Lắp giường ngủ', price: '150.000 – 300.000đ' },
            { item: 'Lắp bàn học – bàn làm việc', price: '100.000 – 200.000đ' },
            { item: 'Lắp kệ treo tường', price: '80.000 – 150.000đ/kệ' },
            { item: 'Lắp tủ bếp', price: 'Liên hệ khảo sát báo giá' },
            { item: 'Lắp đồ nội thất khác', price: 'Trao đổi trực tiếp' }
          ]
        }
      ],
      commitments: [
        'Báo giá minh bạch – không phát sinh',
        'Thợ chuyên nghiệp, tay nghề cao',
        'Hỗ trợ nhanh – bảo hành rõ ràng'
      ],
      images: [
        'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
        'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'
      ],
      reviews: [
        {
          id: '1',
          userName: 'Võ Thị F',
          rating: 5,
          date: '2024-12-12',
          comment: 'Lắp tủ bếp rất đẹp, chắc chắn. Anh thợ làm cẩn thận, tỉ mỉ.',
          serviceRating: 5,
          technicianRating: 5
        }
      ]
    }
  },
  // 6. Đa dịch vụ sửa chữa nhà cửa
  {
    id: 'da-dich-vu-sua-chua-nha-cua',
    title: 'Đa dịch vụ sửa chữa nhà cửa',
    description: 'Tổng hợp các dịch vụ sửa chữa nhà cửa - Giải pháp toàn diện cho ngôi nhà',
    image: 'https://images.unsplash.com/photo-1759434775823-40d8b9577a41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVwYWlyJTIwc2VydmljZXMlMjBtYWludGVuYW5jZXxlbnwxfHx8fDE3NjU3MTk2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviews: 156,
    serviceCount: 15,
    details: {
      title: 'ĐA DỊCH VỤ SỬA CHỮA NHÀ CỬA',
      description: 'Giải pháp toàn diện cho mọi nhu cầu sửa chữa, bảo trì nhà cửa. Đội ngũ thợ đa năng, giàu kinh nghiệm, sẵn sàng hỗ trợ mọi công việc từ nhỏ đến lớn.',
      headerImage: 'https://images.unsplash.com/photo-1759434775823-40d8b9577a41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVwYWlyJTIwc2VydmljZXMlMjBtYWludGVuYW5jZXxlbnwxfHx8fDE3NjU3MTk2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      subServices: [
        'Sửa chữa điện – nước',
        'Sửa chữa đồ gỗ – đồ mộc',
        'Sơn sửa tường – trần',
        'Lắp đặt thiết bị gia dụng',
        'Các dịch vụ khác theo yêu cầu'
      ],
      pricingCategories: [
        {
          category: 'SỬA CHỮA TỔNG HỢP',
          items: [
            { item: 'Sửa chữa điện cơ bản', price: '80.000 – 200.000đ' },
            { item: 'Sửa chữa nước cơ bản', price: '100.000 – 250.000đ' },
            { item: 'Sửa chữa đồ gỗ – đồ mộc', price: '120.000 – 300.000đ' },
            { item: 'Sơn sửa tường – trần', price: '150.000 – 400.000đ' },
            { item: 'Lắp đặt thiết bị gia dụng', price: '100.000 – 250.000đ' }
          ]
        },
        {
          category: 'GÓI DỊCH VỤ TRỌN GÓI',
          items: [
            { item: 'Bảo trì định kỳ nhà ở (hàng tháng)', price: '500.000 – 1.000.000đ' },
            { item: 'Sửa chữa tổng thể căn hộ', price: 'Liên hệ khảo sát báo giá' },
            { item: 'Tư vấn và sửa chữa theo yêu cầu', price: 'Trao đổi trực tiếp' }
          ]
        },
        {
          category: 'DỊCH VỤ KHÁC',
          items: [
            { item: 'Vệ sinh máy lạnh, máy giặt', price: '150.000 – 300.000đ' },
            { item: 'Sửa cửa sổ, cửa chính', price: '120.000 – 350.000đ' },
            { item: 'Chống thấm – chống dột', price: '200.000 – 500.000đ' },
            { item: 'Các dịch vụ khác', price: 'Liên hệ báo giá' }
          ]
        }
      ],
      commitments: [
        'Đa dạng dịch vụ – giải quyết mọi vấn đề',
        'Báo giá minh bạch – không phát sinh',
        'Thợ đa năng – kinh nghiệm – tận tâm',
        'Hỗ trợ 24/7 – có mặt nhanh chóng'
      ],
      images: [
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
        'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
        'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800'
      ],
      reviews: [
        {
          id: '1',
          userName: 'Nguyễn Văn M',
          rating: 5,
          date: '2024-12-13',
          comment: 'Dịch vụ rất đa dạng, một lần gọi giải quyết được nhiều việc. Rất tiện lợi và chuyên nghiệp!',
          serviceRating: 5,
          technicianRating: 5
        },
        {
          id: '2',
          userName: 'Trần Thị N',
          rating: 5,
          date: '2024-12-11',
          comment: 'Thợ rất đa năng, sửa được nhiều thứ. Giá cả hợp lý, làm việc nhanh gọn.',
          serviceRating: 5,
          technicianRating: 5
        },
        {
          id: '3',
          userName: 'Lê Văn P',
          rating: 4,
          date: '2024-12-09',
          comment: 'Dịch vụ tốt, đội thợ nhiệt tình. Sẽ tiếp tục sử dụng cho các lần sau.',
          serviceRating: 4,
          technicianRating: 5
        }
      ]
    }
  }
];

