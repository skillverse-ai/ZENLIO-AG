import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/sections/Navbar";
import "./globals.css";

const grift = localFont({
  src: [
    { path: "../public/fonts/grift-regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/grift-medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/grift-semibold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/grift-bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-grift",
});

const newOrder = localFont({
  src: [
    { path: "../public/fonts/New Order Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-new-order",
});

export const metadata: Metadata = {
  title: "Zenlio | Scale Your Business With Us",
  description: "Website + Automation Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${grift.variable} ${newOrder.variable} dark antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
