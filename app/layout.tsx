import type { Metadata } from "next";
import { Noto_Sans_Sinhala, Inter } from "next/font/google";
import "./globals.css";

const notoSansSinhala = Noto_Sans_Sinhala({
  variable: "--font-sinhala",
  subsets: ["sinhala"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snehaye Nagaraya - Live in Concert",
  description:
    "Pre-register for Snehaye Nagaraya live concert featuring Amarasiri Peiris, Kasun Kalhara, Sunil Edirisinghe, Karunarathna Divulgane, and Shashika Nisansala at Musaeus College Auditorium on December 13, 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="si">
      <body
        className={`${notoSansSinhala.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
