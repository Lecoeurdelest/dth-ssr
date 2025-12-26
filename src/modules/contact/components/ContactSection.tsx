"use client";

import { Mail, MapPin, Clock, X, Send } from "lucide-react";
import { useState } from "react";
import { useChat } from "@/shared/hooks/useChat";
import Link from "next/link";

const logo = "/images/fc51bac2530de6d7ec8116e0b15695d855105671.png";
const callNowLogo = "/images/2a57975ed67638d355b309c29d4050a18eafe565.png";
const support247Logo = "/images/fe75cb6b49a42f835c02e52b75883851e07dd008.png";

export function ContactSection() {
  const { openChat } = useChat();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    datetime: "",
    workerCode: "",
    requirements: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
    alert("Yêu cầu của bạn đã được gửi!");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-blue-600 mb-3">LIÊN HỆ</h2>
          <p className="text-gray-600">
            Vui lòng điền thông tin dự phương bộ về dịch vụ và thông tin chi
            tiết
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Contact Info */}
          <div className="bg-white">
            {/* Logo */}
            <div className="mb-8">
              <img src={logo} alt="Sửa Chữa Nhà" className="h-48" />
            </div>

            {/* Call Now and 24/7 Support Badges */}
            <div className="flex gap-6 mb-8">
              {/* Gọi ngay Button */}
              <button
                onClick={() => (window.location.href = "tel:0xxxxxxxxx")}
                className="flex items-center gap-3 bg-white hover:bg-gray-50 p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <img src={callNowLogo} alt="Gọi ngay" className="w-20 h-20" />
                <div className="text-left">
                  <p className="text-gray-800 font-semibold">0xxxxxxxxx</p>
                </div>
              </button>

              {/* 24/7 Support Button */}
              <button
                onClick={openChat}
                className="flex items-center gap-3 bg-white hover:bg-gray-50 p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <img src={support247Logo} alt="24/7" className="w-20 h-20" />
                <div className="text-left">
                  <p className="text-gray-800 font-semibold">Tư vấn miễn phí</p>
                </div>
              </button>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-blue-500 mb-1">
                    📍 Mạng lưới cung cấp dịch vụ
                  </p>
                  <p className="text-gray-800 font-semibold">
                    Trên địa bàn tỉnh Ninh Bình
                  </p>
                  <ul className="text-gray-600 mt-2 space-y-1">
                    <li>• Thành phố Ninh Bình</li>
                    <li>• Thành phố Hoa Lư</li>
                    <li>• Huyện Gia Viễn</li>
                    <li>• Huyện Kim Sơn</li>
                    <li>• Huyện Nho Quan</li>
                    <li>• Huyện Yên Khánh</li>
                    <li>• Huyện Yên Mô</li>
                  </ul>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-blue-500 mb-1">
                    Giờ làm việc tư / sửa chửa
                  </p>
                  <p className="text-gray-800">Cả tuần và Cả Tết</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-blue-500 mb-1">Email liên hệ</p>
                  <p className="text-gray-800">suachuanho@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Họ và tên (Bắt buộc)*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập họ và tên"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Số điện thoại liên hệ*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập địa chỉ Email"
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-gray-700 mb-2">
                  Địa chỉ khách hàng
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập địa chỉ của bạn"
                />
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="service" className="block text-gray-700 mb-2">
                  Dịch vụ cần tư vấn*
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Chọn dịch vụ</option>
                  <option value="dien">Sửa chữa điện</option>
                  <option value="nuoc">Sửa chữa nước</option>
                  <option value="maylanh">Vệ sinh máy lạnh</option>
                  <option value="thongcong">Thông tắc cống</option>
                  <option value="suachua">Sửa chữa đồ gia dụng</option>
                  <option value="khac">Khác</option>
                </select>
              </div>

              {/* Date Time */}
              <div>
                <label htmlFor="datetime" className="block text-gray-700 mb-2">
                  Thời gian dự kiến*
                </label>
                <input
                  type="datetime-local"
                  id="datetime"
                  name="datetime"
                  value={formData.datetime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="HH/DD/yyyy --:--"
                />
              </div>

              {/* Requirements */}
              <div>
                <label
                  htmlFor="requirements"
                  className="block text-gray-700 mb-2"
                >
                  Yêu cầu và ghi chú
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Nhập yêu cầu của bạn"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors duration-300"
              >
                Đặt dịch vụ
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div>
          <h3 className="text-gray-800 mb-4">Bản đồ</h3>
          <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53!2zVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ vị trí"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

