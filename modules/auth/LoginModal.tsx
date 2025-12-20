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
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { GoogleLogo, FacebookLogo } from "phosphor-react";
import { toast } from "sonner";
import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        identifier: "",
        password: "",
        rememberMe: false,
      });
      setShowPassword(false);
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.identifier) {
      toast.error("Vui lòng nhập thông tin đăng nhập");
      return;
    }

    if (!formData.password) {
      toast.error("Vui lòng nhập mật khẩu");
      return;
    }

    // Mock login - use shared useAuth hook
    login({
      name: formData.identifier,
      birthdate: "",
      phone: "",
      email: "",
    });

    toast.success("Đăng nhập thành công!");
    onClose();
    setTimeout(() => {
      router.push("/tasks");
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Đang kết nối với ${provider}...`);
    setTimeout(() => {
      // Mock social login
      login({
        name: `${provider} User`,
        birthdate: "",
        phone: "",
        email: "",
      });
      toast.success(`Đăng nhập thành công qua ${provider}!`);
      onClose();
      router.push("/tasks");
    }, 1500);
  };

  const handleForgotPassword = () => {
    toast.info("Chức năng khôi phục mật khẩu đang được phát triển");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">Đăng Nhập</DialogTitle>
        <div className="bg-white rounded-2xl overflow-hidden">
          {/* Header - Empty (logo removed) */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Đăng Nhập</h1>
            <p className="text-cyan-100">Chào mừng bạn quay trở lại!</p>
          </div>

          <div className="p-8">
            {/* Social Login Options */}
            <div className="mb-8">
              <p className="text-center text-gray-600 mb-4">
                Đăng nhập nhanh với
              </p>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => handleSocialLogin("Google")}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-cyan-500 flex items-center justify-center transition-colors hover:bg-gray-50"
                  aria-label="Đăng nhập với Google"
                >
                  <GoogleLogo className="w-6 h-6 text-gray-700" weight="fill" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin("Facebook")}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-cyan-500 flex items-center justify-center transition-colors hover:bg-gray-50"
                  aria-label="Đăng nhập với Facebook"
                >
                  <FacebookLogo
                    className="w-6 h-6 text-gray-700"
                    weight="fill"
                  />
                </button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Hoặc đăng nhập với tài khoản
                  </span>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="identifier" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-600" />
                  Tên đăng nhập
                </Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={formData.identifier}
                  onChange={(e) =>
                    handleInputChange("identifier", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyan-600" />
                  Mật khẩu
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      handleInputChange("rememberMe", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm cursor-pointer"
                  >
                    Ghi nhớ đăng nhập
                  </Label>
                </div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-cyan-600 hover:underline"
                >
                  Quên mật khẩu?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-6"
              >
                Đăng Nhập
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
