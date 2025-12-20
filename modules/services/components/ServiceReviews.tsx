"use client";

import { Star } from 'lucide-react';
import { Button } from '@/src/app/components/ui/button';
import { Card, CardContent } from '@/src/app/components/ui/card';
import { Review } from '../types/service.types';

interface ServiceReviewsProps {
  reviews: Review[];
  totalReviews: number;
  averageRating: number;
}

export function ServiceReviews({ reviews, totalReviews, averageRating }: ServiceReviewsProps) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        ⭐ Đánh giá từ khách hàng
      </h2>
      
      {/* Tổng quan đánh giá */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-cyan-600 mb-2">
              {averageRating}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <p className="text-gray-600">{totalReviews} đánh giá</p>
          </div>
          
          <div className="flex-1 w-full">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const percentage = star === 5 ? 85 : star === 4 ? 12 : 3;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-12">{star} sao</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách đánh giá */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="border-2 border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {review.userName.charAt(0).toUpperCase()}
                </div>
                
                <div className="flex-1">
                  {/* User Info */}
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Comment */}
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  
                  {/* Rating Details */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Dịch vụ:</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < review.serviceRating ? 'fill-cyan-500 text-cyan-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Thợ:</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < review.technicianRating ? 'fill-cyan-500 text-cyan-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Nút xem thêm đánh giá */}
      {totalReviews > reviews.length && (
        <div className="text-center mt-6">
          <Button variant="outline" className="border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50">
            Xem thêm {totalReviews - reviews.length} đánh giá
          </Button>
        </div>
      )}
    </div>
  );
}

