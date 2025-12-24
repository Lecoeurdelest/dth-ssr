/**
 * Application-level configuration
 * This file will contain app-wide settings and constants
 */

export const appConfig = {
    name: "Dịch Vụ Sửa Chữa Điện Nước",
    version: "0.0.1",
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
} as const;
