import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/lib/progress";
import { Backdrop } from "@/components/common/Backdrop";

const sans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

const serif = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-serif",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "戦略の旅 ─ 物語で学ぶ経営戦略",
  description:
    "新米コンサルタントになって、物語を進めながら経営戦略を学ぶ学習アプリ。入口はやさしく、進むほど本質に近づく6つのステージ。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060a17",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <ProgressProvider>
          <Backdrop />
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}
