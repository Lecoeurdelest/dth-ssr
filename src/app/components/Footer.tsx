import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
const logo = "/images/7781fbf195a9d4087a21bb9d8c87d2ea57e570b5.png";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-3 shadow-lg mb-4">
              <img
                src={logo}
                alt="Sửa Chữa Nhỏ"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold">Dịch Vụ Sửa Chữa Điện Nước</h3>
            <p className="text-gray-400">
              Đơn vị cung cấp dịch vụ sửa chữa, bảo trì điện nước và nhà cửa uy
              tín, chuyên nghiệp tại khu vực.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Dịch vụ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tin tức
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Liên Hệ</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">Hotline</p>
                  <p className="font-semibold">09xxxxxx</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">Email</p>
                  <p className="font-semibold">suachuanho@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">Địa chỉ</p>
                  <p className="font-semibold">Tỉnh Ninh Bình</p>
                </div>
              </div>
            </div>

            {/* Social media */}
            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 Dịch Vụ Sửa Chữa Điện Nước. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
