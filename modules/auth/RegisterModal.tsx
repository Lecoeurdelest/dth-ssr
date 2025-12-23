"use client";

import { useState, useEffect } from "react";
import { Button } from "@/src/app/components/ui/button";
import { Input } from "@/src/app/components/ui/input";
import { Label } from "@/src/app/components/ui/label";
import { Checkbox } from "@/src/app/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/src/app/components/ui/dialog";
import { Eye, EyeOff, Mail, Phone, User, Lock, Shield } from "lucide-react";
import { GoogleLogo, FacebookLogo } from "phosphor-react";
import { toast } from "sonner";
import { useAuthModal } from "@/shared/hooks/useAuthModal";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const { openLogin } = useAuthModal();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationMethod, setVerificationMethod] =
    useState<"email">("email");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    agreeTerms: false,
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        agreeTerms: false,
      });
      setVerificationMethod("email");
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.username || formData.username.length < 4) {
      toast.error("Tên đăng nhập phải có ít nhất 4 ký tự");
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return false;
    }

    if (verificationMethod === "email" && !formData.email.includes("@")) {
      toast.error("Email không hợp lệ");
      return false;
    }

    if (!formData.agreeTerms) {
      toast.error("Vui lòng đồng ý với điều khoản sử dụng");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const payload = {
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        email: formData.email,
      };

      fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })
        .then(async (res) => {
          const json = await res.json();
          if (!res.ok || !json?.success) {
            throw new Error(
              json?.error || json?.message || "Registration failed"
            );
          }
          toast.success(json?.message || "Đăng ký thành công!");
          onClose();
          setTimeout(() => {
            openLogin();
          }, 500);
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.message || "Đăng ký thất bại");
        });
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Đang kết nối với ${provider}...`);
  };

  const handleSwitchToLogin = () => {
    onClose();
    setTimeout(() => {
      openLogin();
    }, 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">Đăng Ký Tài Khoản</DialogTitle>
        <div className="bg-white rounded-1xl overflow-hidden">
          {/* Header - Empty (logo removed) */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-5 text-center">
            <h1 className="text-3xl font-bold mb-1">Đăng Ký Tài Khoản</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-3">
            {/* Social Login Options */}
            <div className="mb-3">
              <p className="text-center text-gray-600 mb-4">
                Đăng ký nhanh với
              </p>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => handleSocialLogin("Google")}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-cyan-500 flex items-center justify-center transition-colors hover:bg-gray-50"
                  aria-label="Đăng ký với Google"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.2 1.53 7.62 2.8l5.2-5.2C33.6 4.2 29.2 2 24 2 14.9 2 7.4 7.6 4.3 15.6l6.6 5.1C12.4 14.1 17.8 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.1 24.5c0-1.7-.15-3.3-.43-4.9H24v9.3h12.4c-.53 2.8-2.13 5.1-4.53 6.7l6.9 5.4c4-3.7 6.3-9.2 6.3-15.5z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.9 28.7c-.7-2.1-.7-4.3 0-6.4l-6.6-5.1c-2.8 5.6-2.8 12.2 0 17.8l6.6-5.1z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 46c5.2 0 9.6-1.7 12.8-4.7l-6.9-5.4c-1.9 1.3-4.3 2-5.9 2-6.2 0-11.6-4.6-13.1-10.9l-6.6 5.1C7.4 40.4 14.9 46 24 46z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin("Facebook")}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-cyan-500 flex items-center justify-center transition-colors hover:bg-gray-50"
                  aria-label="Đăng ký với Facebook"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="12" fill="#1877F2" />
                    <path
                      fill="#FFFFFF"
                      d="M15.12 8.4h-1.38c-.23 0-.54.3-.54.7v1.1h1.92l-.3 2h-1.62V18h-2.3v-5.8H9.6v-2h1.3V8.9c0-1.2.9-2.9 2.9-2.9h1.32v2.4z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main Form */}
            <div className="space-y-6">
              {/* Thông tin đăng nhập */}

              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-600" />
                  Tên đăng nhập <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-600" />
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyan-600" />
                  Mật khẩu <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-cyan-600" />
                  Xác nhận mật khẩu <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="space-y-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) =>
                      handleInputChange("agreeTerms", checked as boolean)
                    }
                  />
                  <Label htmlFor="agreeTerms" className="cursor-pointer">
                    Tôi đồng ý với{" "}
                    <button
                      type="button"
                      onClick={() => toast.info("Điều khoản sử dụng")}
                      className="text-cyan-600 hover:underline"
                    >
                      Điều khoản sử dụng
                    </button>{" "}
                    và{" "}
                    <button
                      type="button"
                      onClick={() => toast.info("Chính sách bảo mật")}
                      className="text-cyan-600 hover:underline"
                    >
                      Chính sách bảo mật
                    </button>{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-6"
                >
                  Đăng Ký Ngay
                </Button>
              </div>

              <div className="md:col-span-2 text-center">
                <p className="text-gray-600">
                  Đã có tài khoản?{" "}
                  <button
                    type="button"
                    onClick={handleSwitchToLogin}
                    className="text-cyan-600 hover:underline font-semibold"
                  >
                    Đăng nhập ngay
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
