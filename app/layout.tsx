import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TroviProvider } from "@/components/TroviProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Trovi Error Lab",
  description: "Full-stack demo for testing Trovi error capture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100`}
      >
        <TroviProvider>{children}</TroviProvider>
      </body>
    </html>
  );
}
