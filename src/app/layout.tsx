import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["vietnamese", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Women's Day 20.10 — Gửi cô bạn xinh đẹp",
  description: "Thiệp hoa hồng và lời chúc dịu dàng nhân ngày Phụ nữ Việt Nam 20/10.",
  icons: {
    icon: "/artwork/rose.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF5F7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${cormorant.variable} ${beVietnam.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
