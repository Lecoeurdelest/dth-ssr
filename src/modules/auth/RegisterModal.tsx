"use client";

import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/shared/components/ui/dialog";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import { toast } from "sonner";
import { useAuthModal } from "@/shared/hooks/useAuthModal";
import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
    const router = useRouter();
    const { registerUser } = useAuth();
    const { openLogin } = useAuthModal();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        agreeTerms: false,
    });

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                firstName: "",
                lastName: "",
                agreeTerms: false,
            });
            setShowPassword(false);
            setShowConfirmPassword(false);
        }
    }, [isOpen]);

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        if (!formData.username || formData.username.length < 3) {
            toast.error("Tên đăng nhập phải có ít nhất 3 ký tự");
            return false;
        }

        if (formData.username.length > 50) {
            toast.error("Tên đăng nhập không được quá 50 ký tự");
            return false;
        }

        if (!formData.email || !formData.email.includes("@")) {
            toast.error("Email không hợp lệ");
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

        if (!formData.agreeTerms) {
            toast.error("Vui lòng đồng ý với điều khoản sử dụng");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                await registerUser({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                });

                toast.success("Đăng ký thành công!");
                onClose();
                setTimeout(() => {
                    router.push("/tasks");
                }, 1000);
            } catch (error: any) {
                toast.error(
                    error.message || "Đăng ký thất bại. Vui lòng thử lại."
                );
            }
        }
    };

    const handleSwitchToLogin = () => {
        onClose();
        setTimeout(() => {
            openLogin();
        }, 100);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-0">
                <DialogTitle className="sr-only">Đăng Ký Tài Khoản</DialogTitle>
                <div className="bg-white rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-5 text-center">
                        <h1 className="text-3xl font-bold mb-2">
                            Đăng Ký Tài Khoản
                        </h1>
                        <p className="text-sm opacity-90">
                            Tạo tài khoản mới để sử dụng dịch vụ
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-5">
                        {/* Username */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="username"
                                className="flex items-center gap-2"
                            >
                                <User className="w-4 h-4 text-cyan-600" />
                                Tên đăng nhập{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Nhập tên đăng nhập (3-50 ký tự)"
                                value={formData.username}
                                onChange={(e) =>
                                    handleInputChange(
                                        "username",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4 text-cyan-600" />
                                Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@email.com"
                                value={formData.email}
                                onChange={(e) =>
                                    handleInputChange("email", e.target.value)
                                }
                                required
                            />
                        </div>

                        {/* First Name & Last Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Họ</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="Nguyễn"
                                    value={formData.firstName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "firstName",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Tên</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Văn A"
                                    value={formData.lastName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "lastName",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="flex items-center gap-2"
                            >
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
                                        handleInputChange(
                                            "password",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
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

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="confirmPassword"
                                className="flex items-center gap-2"
                            >
                                <Lock className="w-4 h-4 text-cyan-600" />
                                Xác nhận mật khẩu{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Nhập lại mật khẩu"
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "confirmPassword",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
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
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="agreeTerms"
                                checked={formData.agreeTerms}
                                onCheckedChange={(checked) =>
                                    handleInputChange(
                                        "agreeTerms",
                                        checked as boolean
                                    )
                                }
                            />
                            <Label
                                htmlFor="agreeTerms"
                                className="cursor-pointer text-sm"
                            >
                                Tôi đồng ý với{" "}
                                <span className="text-cyan-600 hover:underline">
                                    Điều khoản sử dụng
                                </span>{" "}
                                và{" "}
                                <span className="text-cyan-600 hover:underline">
                                    Chính sách bảo mật
                                </span>{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-6"
                        >
                            Đăng Ký Ngay
                        </Button>

                        {/* Switch to Login */}
                        <div className="text-center">
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
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
