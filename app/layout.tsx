import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header, Footer } from "@/shared/components/layout";
import { AuthModalProvider } from "@/shared/hooks/useAuthModal";
import { AuthModalRoot } from "@/modules/auth";
import { ChatBox } from "@/shared/components/ChatBox";

export const metadata: Metadata = {
  title: "Dịch Vụ Sửa Chữa Điện Nước",
  description:
    "Đơn vị cung cấp dịch vụ sửa chữa, bảo trì điện nước và nhà cửa uy tín, chuyên nghiệp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <Providers>
          <AuthModalProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <AuthModalRoot />
            <ChatBox />
          </AuthModalProvider>
        </Providers>
      </body>
    </html>
  );
}

