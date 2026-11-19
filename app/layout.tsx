import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from 'next/font/google'
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { ToastProvider } from "@/components/ToastProvider"

const jakarta = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  title: "Aulia Bilqisty - Premium Portfolio",
  description: "Modern portfolio for Aulia Bilqisty, focused on Data Science, Business Intelligence, and clean product experiences.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${jakarta.variable} bg-[var(--bg)] text-[var(--text)] antialiased`}>
        <ToastProvider>
          <Navbar />
          <main className="min-h-screen pt-24">
            {children}
          </main>
        </ToastProvider>
      </body>
    </html>
  )
}
