import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FemmiProvider } from "@/components/FemmiProvider";

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
  title: "Femmi Error Lab",
  description: "Full-stack demo for testing Femmi error capture",
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
        <FemmiProvider>{children}</FemmiProvider>
      </body>
    </html>
  );
}
