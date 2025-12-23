import {
  Phone,
  User,
  Menu,
  X,
  ChevronDown,
  UserCircle,
  History,
  Award,
  Globe,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
const logo = "/images/7781fbf195a9d4087a21bb9d8c87d2ea57e570b5.png";
import { useAuth } from "@/shared/hooks/useAuth";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    name: "",
    birthdate: "",
    phone: "",
    email: "",
  });
  const { isLoggedIn, userInfo, login, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // call backend login API
    const payload = {
      identifier: loginFormData.email || loginFormData.phone || loginFormData.name,
      password: ' ', // header form doesn't collect password; prompt to use modal or adjust form
    };
    // As header form lacks password, use modal login instead
    // fallback: just close
    setShowLoginModal(false);
    setLoginFormData({
      name: "",
      birthdate: "",
      phone: "",
      email: "",
    });
  };

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
  };

  return (
    <>
      <header className="bg-cyan-500 text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4">
          {/* Domain banner */}
          <div className="flex justify-center items-center py-1.5 border-b border-cyan-400 bg-cyan-600">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">suachuanho.com.vn</span>
            </div>
          </div>

          {/* Top bar with hotline */}
          <div className="flex justify-end items-center py-2 border-b border-cyan-400">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Hotline: 09xxxxxx</span>
            </div>
          </div>

          {/* Main header */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-3 shadow-lg">
                <img
                  src={logo}
                  alt="Sửa Chữa Nhỏ"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className={`text-lg transition-colors ${
                  isActive("/")
                    ? "text-red-500 font-bold"
                    : "hover:text-cyan-200"
                }`}
              >
                Trang chủ
              </Link>
              <a
                href="#services"
                className="text-lg hover:text-cyan-200 transition-colors"
              >
                Dịch vụ
              </a>
              <Link
                to="/news"
                className={`text-lg transition-colors ${
                  isActive("/news")
                    ? "text-red-500 font-bold"
                    : "hover:text-cyan-200"
                }`}
              >
                Tin tức
              </Link>
              <Link
                to="/contact"
                className={`text-lg transition-colors ${
                  isActive("/contact")
                    ? "text-red-500 font-bold"
                    : "hover:text-cyan-200"
                }`}
              >
                Liên hệ
              </Link>

              {/* Login / User Menu */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    className="text-lg transition-colors hover:text-cyan-200 flex items-center gap-2"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                  >
                    <UserCircle className="w-5 h-5" />
                    Tôi
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden">
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 flex items-center gap-3 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <UserCircle className="w-5 h-5 text-cyan-600" />
                          Thông tin cá nhân
                        </Link>
                        <Link
                          to="/orders"
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 flex items-center gap-3 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <History className="w-5 h-5 text-cyan-600" />
                          Lịch sử đặt hàng
                        </Link>
                        <Link
                          to="/loyalty-points"
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 flex items-center gap-3 transition-colors"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <Award className="w-5 h-5 text-cyan-600" />
                          Điểm tích lũy
                        </Link>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-cyan-600"
                  onClick={() => setShowLoginModal(true)}
                >
                  <User className="w-4 h-4 mr-2" />
                  Đăng nhập
                </Button>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-cyan-400">
              <div className="flex flex-col gap-3">
                <Link
                  to="/"
                  className={`text-lg transition-colors py-2 ${
                    isActive("/")
                      ? "text-red-500 font-bold"
                      : "hover:text-cyan-200"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Trang chủ
                </Link>
                <a
                  href="#services"
                  className="text-lg hover:text-cyan-200 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dịch vụ
                </a>
                <Link
                  to="/news"
                  className={`text-lg transition-colors py-2 ${
                    isActive("/news")
                      ? "text-red-500 font-bold"
                      : "hover:text-cyan-200"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tin tức
                </Link>
                <Link
                  to="/contact"
                  className={`text-lg transition-colors py-2 ${
                    isActive("/contact")
                      ? "text-red-500 font-bold"
                      : "hover:text-cyan-200"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Liên hệ
                </Link>

                {isLoggedIn ? (
                  <>
                    <div className="border-t border-cyan-400 my-2"></div>
                    <Link
                      to="/profile"
                      className="text-lg text-left py-2 hover:text-cyan-200 flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserCircle className="w-5 h-5" />
                      Thông tin cá nhân
                    </Link>
                    <Link
                      to="/orders"
                      className="text-lg text-left py-2 hover:text-cyan-200 flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <History className="w-5 h-5" />
                      Lịch sử đặt hàng
                    </Link>
                    <Link
                      to="/loyalty-points"
                      className="text-lg text-left py-2 hover:text-cyan-200 flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Award className="w-5 h-5" />
                      Điểm tích lũy
                    </Link>
                    <button
                      className="text-lg text-left py-2 text-red-300 hover:text-red-200"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-cyan-600 justify-start"
                    onClick={() => {
                      setShowLoginModal(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Đăng nhập
                  </Button>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Login Modal (use central LoginModal component) */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-0">
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              {/* Use LoginModal from modules/auth */}
              <div className="p-6">
                {/* Lazy load / render the modal component content */}
                {/* The LoginModal component is present at modules/auth/LoginModal.tsx */}
                {/* Instead of duplicating markup, open the modal logic via AuthModalRoot in providers */}
                {/* For now, show link to full login page */}
                <div className="text-center">
                  <h3 className="text-gray-800 mb-2">Đăng nhập</h3>
                  <p className="text-gray-600 text-sm mb-4">Vui lòng dùng nút Đăng nhập để mở form</p>
                  <Button onClick={() => { setShowLoginModal(false); /* open central modal if needed */ }}>
                    Mở form đăng nhập
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
