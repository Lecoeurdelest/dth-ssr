"use client";

import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
const redCallButton = "/images/e7dadc01547bc5449ead9531785ea14c4373466f.png";
const blueConsultButton =
  "/images/e6ec1561c91c35083a6c2c0220d204858099ba09.png";
import { GripVertical, Phone, X } from "lucide-react";
import { useChat } from "../contexts/ChatContext";

export function FloatingContact() {
  const { openChat } = useChat();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [showPhonePopup, setShowPhonePopup] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load saved position from localStorage
    const savedPosition = localStorage.getItem("floatingContactPosition");
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return; // Don't drag if clicking on buttons
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Keep within viewport bounds
    const maxX = window.innerWidth - 300;
    const maxY = window.innerHeight - 350;

    const boundedX = Math.max(-maxX, Math.min(maxX, newX));
    const boundedY = Math.max(-maxY, Math.min(maxY, newY));

    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Save position to localStorage
      localStorage.setItem("floatingContactPosition", JSON.stringify(position));
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragStart, position]);

  const handleCallNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPhonePopup(true);
  };

  const handleCallPhone = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
    setShowPhonePopup(false);
  };

  if (!isClient) return null;

  return (
    <>
      <div
        className="fixed bottom-4 z-50 flex flex-col items-center gap-8 select-none"
        style={{
          right: "20px",
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? "grabbing" : "grab",
          transition: isDragging ? "none" : "transform 0.2s ease-out",
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Drag Handle */}
        <div className="flex items-center justify-center mb-2 opacity-40 hover:opacity-100 transition-opacity">
          <GripVertical className="w-7 h-7 text-gray-700" />
        </div>

        {/* Red Call Button - Top */}
        <button
          className="relative block transform hover:scale-110 active:scale-[1.2] transition-all duration-300 ease-out group bg-transparent border-0"
          aria-label="Gọi ngay"
          onClick={handleCallNowClick}
          style={{
            filter: "drop-shadow(0 8px 20px rgba(220, 38, 38, 0.4))",
            animation: "bounce-gentle 3s ease-in-out infinite",
          }}
        >
          <img
            src={redCallButton}
            alt="Gọi ngay"
            className="w-[380px] h-auto object-contain"
          />
        </button>

        {/* Blue Consult Button - Bottom */}
        <button
          className="relative block transform hover:scale-110 active:scale-[1.2] transition-all duration-300 ease-out group bg-transparent border-0"
          aria-label="Tư vấn miễn phí 24/7"
          onClick={(e) => {
            e.stopPropagation();
            openChat();
          }}
          style={{
            filter: "drop-shadow(0 8px 20px rgba(37, 99, 235, 0.4))",
            animation: "bounce-gentle 3s ease-in-out infinite 0.3s",
          }}
        >
          <img
            src={blueConsultButton}
            alt="Tư vấn miễn phí 24/7"
            className="w-[380px] h-auto object-contain"
          />
        </button>
      </div>

      {/* Phone Number Popup */}
      {showPhonePopup && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in duration-300">
            {/* Close Button */}
            <button
              onClick={() => setShowPhonePopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl animate-pulse">
                <Phone className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-gray-800 mb-3">📞 Liên hệ với chúng tôi</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Gọi ngay để được tư vấn và hỗ trợ miễn phí
                <br />
                <span className="text-sm text-gray-500">
                  Dịch vụ sửa chữa điện-nước chuyên nghiệp
                </span>
              </p>

              {/* Phone Numbers */}
              <div className="space-y-4">
                <button
                  onClick={() => handleCallPhone("0123456789")}
                  className="w-full bg-gradient-to-r from-red-500 via-red-600 to-orange-600 text-white py-5 px-6 rounded-2xl font-semibold text-lg hover:from-red-600 hover:to-orange-700 active:scale-95 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group"
                >
                  <Phone className="w-6 h-6 group-hover:rotate-12 group-hover:scale-110 transition-transform" />
                  <span className="tracking-wide">0123 456 789</span>
                </button>

                <button
                  onClick={() => handleCallPhone("0987654321")}
                  className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 text-white py-5 px-6 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-700 active:scale-95 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group"
                >
                  <Phone className="w-6 h-6 group-hover:rotate-12 group-hover:scale-110 transition-transform" />
                  <span className="tracking-wide">098 765 4321</span>
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  <span className="text-2xl">⏰</span>
                  <span>
                    Hoạt động <strong className="text-red-600">24/7</strong> -
                    Luôn sẵn sàng hỗ trợ
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
