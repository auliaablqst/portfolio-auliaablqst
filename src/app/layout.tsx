import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aulia Bilqisty - Data Science & Business Analyst Portfolio",
  description: "Professional portfolio of Aulia Bilqisty, combining Data Science, UI Design, and Business Analysis expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative overflow-x-hidden">
        {/* Liquid Glass Background */}
        <div className="fixed inset-0 -z-10">
          {/* Mesh Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 animate-pulse"></div>
          {/* Fluid Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-200/30 to-indigo-200/30 rounded-full blur-3xl animate-bounce delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}