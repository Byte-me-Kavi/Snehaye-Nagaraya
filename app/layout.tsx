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
    "Pre-register for Snehaye Nagaraya live concert featuring best artists in srilanka at Musaeus College Auditorium on December 13, 2025 at 7.30 PM. onwards.",
  openGraph: {
    title: "Snehaye Nagaraya - Live in Concert",
    description:
      "Pre-register for Snehaye Nagaraya live concert featuring best artists in srilanka at Musaeus College Auditorium on December 13, 2025 at 7.30 PM.",
    url: "https://snehaye-nagaraya-rsvp.vercel.app/",
    siteName: "Snehaye Nagaraya",
    images: [
      {
        url: "https://snehaye-nagaraya-rsvp.vercel.app/thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Snehaye Nagaraya thumbnail",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="si">
      <head>
        {/* Open Graph meta tags (explicitly added for compatibility) */}
        <meta
          property="og:title"
          content="Snehaye Nagaraya - Live in Concert"
        />
        <meta
          property="og:description"
          content="Pre-register for Snehaye Nagaraya live concert featuring best artists in srilanka at Musaeus College Auditorium on December 13, 2025 at 7.30 PM."
        />
        <meta
          property="og:image"
          content="https://snehaye-nagaraya-rsvp.vercel.app/thumbnail.jpg"
        />
        <meta
          property="og:url"
          content="https://snehaye-nagaraya-rsvp.vercel.app/"
        />
        <meta property="og:type" content="website" />
      </head>
      <body
        className={`${notoSansSinhala.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
