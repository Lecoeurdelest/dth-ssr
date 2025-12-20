import { Star, Calendar, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ReviewData } from './ReviewModal';

interface ReviewWithTimestamp extends ReviewData {
  timestamp: string;
}

const RATING_LABELS: Record<number, string> = {
  1: 'Rất tệ',
  2: 'Tệ',
  3: 'Bình thường',
  4: 'Tốt',
  5: 'Rất hài lòng'
};

export function ReviewList() {
  const [reviews, setReviews] = useState<ReviewWithTimestamp[]>([]);

  useEffect(() => {
    // Load reviews from localStorage
    const storedReviews = localStorage.getItem('serviceReviews');
    if (storedReviews) {
      const parsedReviews = JSON.parse(storedReviews);
      // Sort by timestamp (newest first)
      parsedReviews.sort((a: ReviewWithTimestamp, b: ReviewWithTimestamp) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setReviews(parsedReviews);
    }
  }, []);

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <Star className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-gray-900 mb-2">Chưa có đánh giá</h3>
        <p className="text-gray-600">Bạn chưa gửi đánh giá nào cho dịch vụ</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-900">Đánh giá của tôi</h2>
        <span className="text-sm text-gray-500">{reviews.length} đánh giá</span>
      </div>
      
      {reviews.map((review, index) => (
        <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Mã đơn: {review.orderId}</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Rating label */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              {RATING_LABELS[review.rating]}
            </span>
          </div>

          {/* Comment */}
          <p className="text-gray-700 mb-4">{review.comment}</p>

          {/* Images */}
          {review.images && review.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
              {review.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image}
                  alt={`Review image ${imgIndex + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-gray-200"
                />
              ))}
            </div>
          )}

          {/* Timestamp */}
          <div className="flex items-center gap-2 text-sm text-gray-500 pt-3 border-t border-gray-100">
            <Calendar className="w-4 h-4" />
            <span>Đánh giá vào {formatDateTime(review.timestamp)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
