import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/common/whatsapp-button'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Bhogapuram Lands'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bhogapuramlands.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Plots & Land for Sale in Bhogapuram, Visakhapatnam`,
    template: `%s | ${siteName}`,
  },
  description: 'Buy verified plots and land in Bhogapuram, Visakhapatnam, Andhra Pradesh. Residential plots, villa plots, commercial land near Bhogapuram International Airport. Clear titles, expert guidance.',
  keywords: ['plots in Bhogapuram', 'land for sale Bhogapuram', 'plots near Bhogapuram airport', 'real estate Visakhapatnam', 'plots Vizag', 'residential plots AP', 'open plots Bhogapuram', 'villa plots Visakhapatnam'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
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
