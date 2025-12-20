import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Anh Minh Tuấn',
      location: 'Thành phố Ninh Bình, Ninh Bình',
      image: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjU2MjAxNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5,
      review: 'Dịch vụ sửa điện nhanh chóng, thợ rất chuyên nghiệp và tận tâm. Giá cả hợp lý, không phát sinh thêm chi phí. Tôi rất hài lòng và sẽ tiếp tục sử dụng dịch vụ!',
      service: 'Sửa chữa điện'
    },
    {
      name: 'Chị Thu Hương',
      location: 'Huyện Gia Viễn, Ninh Bình',
      image: 'https://images.unsplash.com/photo-1610896011476-300d6239d995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwc21pbGV8ZW58MXx8fHwxNzY1NjIwMzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5,
      review: 'Thông tắc cống rất nhanh, sạch sẽ. Nhân viên nhiệt tình, giải quyết triệt để vấn đề. Báo giá rõ ràng trước khi làm. Tôi sẽ giới thiệu cho bạn bè!',
      service: 'Thông tắc cống'
    },
    {
      name: 'Anh Đức Anh',
      location: 'Huyện Hoa Lư, Ninh Bình',
      image: 'https://images.unsplash.com/photo-1753161023962-665967602405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGN1c3RvbWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY1NTM4MDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5,
      review: 'Chuyển nhà nhanh gọn, nhân viên cẩn thận, không làm hỏng đồ đạc. Giá tốt hơn nhiều so với các dịch vụ khác. Rất đáng tin cậy!',
      service: 'Vận chuyển - khuân vác'
    },
    {
      name: 'Chị Mai Lan',
      location: 'Thành phố Tam Điệp, Ninh Bình',
      image: 'https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NTYwMjA2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5,
      review: 'Lắp đặt TV treo tường rất chuyên nghiệp. Thợ tư vấn vị trí hợp lý, lắp đặt chuẩn chỉnh và gọn gàng. Tôi rất hài lòng với dịch vụ!',
      service: 'Lắp đặt đồ gia dụng'
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-600 mb-4">
            Đánh giá của khách hàng
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hàng nghìn khách hàng đã tin tưởng và hài lòng với dịch vụ của chúng tôi
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-cyan-50 to-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-cyan-600" />
              </div>

              <div className="relative">
                {/* Customer Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-cyan-200 flex-shrink-0">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "{testimonial.review}"
                </p>

                {/* Service Tag */}
                <div className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium">{testimonial.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-600 mb-2">5,000+</div>
            <div className="text-gray-600">Khách hàng</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Đánh giá</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-600 mb-2">99%</div>
            <div className="text-gray-600">Hài lòng</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-600 mb-2">24/7</div>
            <div className="text-gray-600">Hỗ trợ</div>
          </div>
        </div>
      </div>
    </section>
  );
}