import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import {
  Eye,
  EyeOff,
  Chrome,
  Facebook,
  Apple,
  Lock,
  User,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/shared/hooks/useAuth";
const logo = "/images/7781fbf195a9d4087a21bb9d8c87d2ea57e570b5.png";

export function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<
    "username" | "email" | "phone"
  >("username");
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });

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

    const payload = {
      identifier: formData.identifier,
      password: formData.password,
      loginType:
        loginMethod === "username"
          ? "USERNAME"
          : loginMethod === "email"
          ? "EMAIL"
          : "PHONE",
    };

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || !json?.success) {
          throw new Error(json?.error || json?.message || "Login failed");
        }
        const user = json.data?.user;
        if (user) {
          auth.login({
            name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
            birthdate: user.dateOfBirth || "",
            phone: user.phone || "",
            email: user.email || "",
          });
        }
        toast.success(json?.message || "Đăng nhập thành công!");
        setTimeout(() => {
          navigate("/tasks");
        }, 500);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message || "Đăng nhập thất bại");
      });
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Đang kết nối với ${provider}...`);
    setTimeout(() => {
      toast.success(`Đăng nhập thành công qua ${provider}!`);
      navigate("/tasks");
    }, 1500);
  };

  const handleForgotPassword = () => {
    toast.info("Chức năng khôi phục mật khẩu đang được phát triển");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with Logo */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-8 text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 shadow-lg mx-auto mb-4">
              <img
                src={logo}
                alt="Sửa Chữa Nhỏ"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2">Đăng Nhậppp</h1>
            <p className="text-cyan-100">Chào mừng bạn quay trở lại!</p>
          </div>

          <div className="p-8">
            {/* Social Login Options */}
            <div className="mb-8">
              <p className="text-center text-gray-600 mb-4">
                Đăng nhập nhanh với
              </p>
              <div className="grid grid-cols-1 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("Google")}
                  className="w-full"
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Tiếp tục với Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("Facebook")}
                  className="w-full"
                >
                  <Facebook className="w-5 h-5 mr-2" />
                  Tiếp tục với Facebook
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("Apple")}
                  className="w-full"
                >
                  <Apple className="w-5 h-5 mr-2" />
                  Tiếp tục với Apple
                </Button>
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

            {/* Login Method Tabs */}
            <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setLoginMethod("username")}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  loginMethod === "username"
                    ? "bg-white shadow-sm text-cyan-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <User className="w-4 h-4 inline mr-1" />
                Tên đăng nhập
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("email")}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  loginMethod === "email"
                    ? "bg-white shadow-sm text-cyan-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Mail className="w-4 h-4 inline mr-1" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("phone")}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  loginMethod === "phone"
                    ? "bg-white shadow-sm text-cyan-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                📱 SĐT
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="identifier" className="flex items-center gap-2">
                  {loginMethod === "username" && (
                    <User className="w-4 h-4 text-cyan-600" />
                  )}
                  {loginMethod === "email" && (
                    <Mail className="w-4 h-4 text-cyan-600" />
                  )}
                  {loginMethod === "phone" && (
                    <span className="text-cyan-600">📱</span>
                  )}
                  {loginMethod === "username" && "Tên đăng nhập"}
                  {loginMethod === "email" && "Email"}
                  {loginMethod === "phone" && "Số điện thoại"}
                </Label>
                <Input
                  id="identifier"
                  type={loginMethod === "email" ? "email" : "text"}
                  placeholder={
                    loginMethod === "username"
                      ? "Nhập tên đăng nhập"
                      : loginMethod === "email"
                      ? "example@email.com"
                      : "0987654321"
                  }
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

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Chưa có tài khoản?{" "}
                <Link
                  to="/register"
                  className="text-cyan-600 hover:underline font-semibold"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>

            {/* Additional Options */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  🔒 Bảo mật nâng cao
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Bật xác thực 2 lớp (2FA) để bảo vệ tài khoản của bạn tốt hơn
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    toast.info("Vui lòng đăng nhập để cài đặt 2FA")
                  }
                >
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Cần hỗ trợ?{" "}
            <Link to="/contact" className="text-cyan-600 hover:underline">
              Liên hệ với chúng tôi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
