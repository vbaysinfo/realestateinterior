import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/common/whatsapp-button'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'PrimeEstates'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Real Estate & Interior Design`,
    template: `%s | ${siteName}`,
  },
  description: 'Discover premium properties for sale and rent, and explore our stunning interior design portfolio.',
  keywords: ['real estate', 'property', 'interior design', 'for sale', 'for rent'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton floating />
      </body>
    </html>
  )
}
