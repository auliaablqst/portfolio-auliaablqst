import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { ToastProvider } from "@/components/ToastProvider"
import { BackgroundBlobs } from "@/components/BackgroundBlobs"
import { CustomCursor } from "@/components/CustomCursor"
import { SITE_CONFIG } from "@/constants"

const jakarta = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
})

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.author,
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    type: "website",
    locale: "id_ID",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F9FC" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1230" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${jakarta.variable} min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased transition-colors duration-300 selection:bg-[var(--primary)]/15 selection:text-[var(--primary)]`}
      >
        <ToastProvider>
          {/* Custom Non-intrusive Mouse Cursor (Fine Pointer Only) */}
          <CustomCursor />

          {/* Ambient Liquid Glass Background Blobs */}
          <BackgroundBlobs />

          {/* Floating Liquid Glass Pill Navbar */}
          <Navbar />

          {/* Main Page Content */}
          <main className="relative min-h-screen overflow-x-hidden pt-16 sm:pt-20">
            {children}
          </main>
        </ToastProvider>
      </body>
    </html>
  )
}
