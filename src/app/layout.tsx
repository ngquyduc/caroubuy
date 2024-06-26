import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import connectToDB from "@/lib/mongoose";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Caroubuy",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToDB();
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
