import { X, Star, Camera, Upload, Loader2 } from 'lucide-react';
import { Order } from '../data/ordersData';
import { useState, useRef } from 'react';
import { toast } from 'sonner';

interface ReviewModalProps {
  order: Order;
  onClose: () => void;
  onSubmit: (reviewData: ReviewData) => void;
}

export interface ReviewData {
  orderId: string;
  rating: number;
  comment: string;
  images: string[];
}

const RATING_LABELS: Record<number, string> = {
  1: 'Rất tệ',
  2: 'Tệ',
  3: 'Bình thường',
  4: 'Tốt',
  5: 'Rất hài lòng'
};

export function ReviewModal({ order, onClose, onSubmit }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Kiểm tra số lượng ảnh tối đa
    if (images.length + files.length > 5) {
      toast.error('Bạn chỉ có thể tải lên tối đa 5 ảnh');
      return;
    }

    setIsUploading(true);

    try {
      const newImages: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Kiểm tra định dạng file
        if (!file.type.startsWith('image/')) {
          toast.error(`File ${file.name} không phải là ảnh`);
          continue;
        }

        // Kiểm tra kích thước file (tối đa 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`File ${file.name} quá lớn (tối đa 5MB)`);
          continue;
        }

        // Đọc file và chuyển thành base64
        const reader = new FileReader();
        const imageUrl = await new Promise<string>((resolve) => {
          reader.onload = (e) => {
            resolve(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        });

        newImages.push(imageUrl);
      }

      setImages([...images, ...newImages]);
      toast.success(`Đã tải lên ${newImages.length} ảnh`);
    } catch (error) {
      toast.error('Có lỗi khi tải ảnh lên');
    } finally {
      setIsUploading(false);
      // Reset input để có thể upload cùng file lại
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    toast.success('Đã xóa ảnh');
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Vui lòng chọn số sao đánh giá');
      return;
    }

    if (comment.trim().length < 10) {
      toast.error('Vui lòng nhập nhận xét ít nhất 10 ký tự');
      return;
    }

    onSubmit({
      orderId: order.id,
      rating,
      comment: comment.trim(),
      images
    });
    
    toast.success('Cảm ơn bạn đã đánh giá dịch vụ!');
  };

  const displayRating = hoveredStar || rating;

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 md:px-6 py-4 flex items-center justify-between rounded-t-2xl z-10 shadow-md">
          <div>
            <h2 className="text-white">Đánh giá dịch vụ</h2>
            <p className="text-sm text-yellow-50 mt-1">Chia sẻ trải nghiệm của bạn</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-yellow-600 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          {/* Thông tin đơn hàng */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-100">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-gray-600">Dịch vụ:</span>
                <span className="text-gray-900 text-right">{order.serviceType}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-600">Mã đơn hàng:</span>
                <span className="text-gray-900 font-mono">{order.orderCode}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-600">Ngày sử dụng:</span>
                <span className="text-gray-900">{order.orderDate}</span>
              </div>
            </div>
          </div>

          {/* Chọn sao đánh giá */}
          <div>
            <label className="block text-gray-900 mb-3">
              Mức độ hài lòng <span className="text-red-500">*</span>
            </label>
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-6">
              <div className="flex justify-center gap-2 md:gap-3 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="transition-all duration-200 hover:scale-125 active:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 md:w-14 md:h-14 transition-colors ${
                        star <= displayRating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {displayRating > 0 && (
                <p className="text-center text-gray-900 transition-all animate-in fade-in">
                  {RATING_LABELS[displayRating]}
                </p>
              )}
            </div>
          </div>

          {/* Nhập nhận xét */}
          <div>
            <label className="block text-gray-900 mb-3">
              Nhận xét của bạn <span className="text-red-500">*</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Chia sẻ cảm nhận của bạn về chất lượng dịch vụ, thái độ của thợ, thời gian hoàn thành..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              rows={5}
              maxLength={500}
            />
            <p className="text-sm text-gray-500 mt-2">
              {comment.length}/500 ký tự {comment.length < 10 && comment.length > 0 && '(tối thiểu 10 ký tự)'}
            </p>
          </div>

          {/* Upload ảnh */}
          <div>
            <label className="block text-gray-900 mb-3">
              Thêm hình ảnh (tùy chọn)
              <span className="text-sm text-gray-500 ml-2">Tối đa 5 ảnh</span>
            </label>

            {/* Preview ảnh */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Nút upload */}
            {images.length < 5 && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full py-4 border-2 border-dashed border-yellow-300 rounded-xl hover:border-yellow-500 hover:bg-yellow-50 transition-all flex items-center justify-center gap-3 text-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Đang tải lên...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-6 h-6" />
                      <span>Chọn ảnh từ thiết bị</span>
                      <Upload className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Định dạng: JPG, PNG • Kích thước tối đa: 5MB/ảnh
                </p>
              </div>
            )}
          </div>

          {/* Hành động */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Bỏ qua
            </button>
            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="py-3 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-yellow-400 disabled:hover:to-yellow-500 shadow-lg hover:shadow-xl"
            >
              Gửi đánh giá
            </button>
          </div>

          {/* Thông báo */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <strong>Lưu ý:</strong> Đánh giá của bạn sẽ giúp chúng tôi cải thiện chất lượng dịch vụ và hỗ trợ khách hàng khác có thêm thông tin tham khảo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}