"use client";

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
import { Button } from "@/src/app/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useAuthModal } from "@/shared/hooks/useAuthModal";
import { useAuth } from "@/shared/hooks/useAuth";

const logo = "/images/7781fbf195a9d4087a21bb9d8c87d2ea57e570b5.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { openLogin, openRegister } = useAuthModal();
  const { isLoggedIn } = useAuth();

  return (
    <header className="bg-cyan-500 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
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
          <Link href="/" className="flex items-center gap-3">
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
              href="/"
              className="text-lg hover:text-cyan-200 transition-colors"
            >
              Trang chủ
            </Link>
            <a
              href="/services"
              className="text-lg hover:text-cyan-200 transition-colors"
            >
              Dịch vụ
            </a>
            <Link
              href="/news"
              className="text-lg hover:text-cyan-200 transition-colors"
            >
              Tin tức
            </Link>
            <Link
              href="/contact"
              className="text-lg hover:text-cyan-200 transition-colors"
            >
              Liên hệ
            </Link>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-white hover:bg-cyan-600"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <UserCircle className="w-5 h-5" />
                <span>Tài khoản</span>
                <ChevronDown className="w-4 h-4" />
              </Button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  {!isLoggedIn ? (
                    <>
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          openLogin();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Đăng nhập
                      </button>
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          openRegister();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Đăng ký
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <UserCircle className="w-4 h-4" />
                        Hồ sơ
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <History className="w-4 h-4" />
                        Lịch sử đơn hàng
                      </Link>
                      <Link
                        href="/loyalty-points"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <Award className="w-4 h-4" />
                        Điểm tích lũy
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-cyan-400 py-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-lg hover:text-cyan-200 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <a
                href="/services"
                className="text-lg hover:text-cyan-200 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dịch vụ
              </a>
              <Link
                href="/news"
                className="text-lg hover:text-cyan-200 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tin tức
              </Link>
              <Link
                href="/contact"
                className="text-lg hover:text-cyan-200 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Liên hệ
              </Link>
              <div className="border-t border-cyan-400 pt-4">
                {!isLoggedIn ? (
                  <>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openLogin();
                      }}
                      className="block w-full text-left text-lg hover:text-cyan-200 transition-colors mb-2"
                    >
                      Đăng nhập
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openRegister();
                      }}
                      className="block w-full text-left text-lg hover:text-cyan-200 transition-colors"
                    >
                      Đăng ký
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/profile"
                      className="block text-lg hover:text-cyan-200 transition-colors mb-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Hồ sơ
                    </Link>
                    <Link
                      href="/orders"
                      className="block text-lg hover:text-cyan-200 transition-colors mb-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Lịch sử đơn hàng
                    </Link>
                    <Link
                      href="/loyalty-points"
                      className="block text-lg hover:text-cyan-200 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Điểm tích lũy
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
