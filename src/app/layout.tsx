import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/common/whatsapp-button'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Bhogapuram Lands'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Plots & Land for Sale in Bhogapuram, Visakhapatnam`,
    template: `%s | ${siteName}`,
  },
  description: 'Buy residential, commercial & villa plots in Bhogapuram, Visakhapatnam, Andhra Pradesh. Clear titles, prime locations near Bhogapuram Airport. Expert interior design services.',
  keywords: [
    'plots in Bhogapuram',
    'land for sale in Bhogapuram',
    'plots near Bhogapuram airport',
    'residential plots Visakhapatnam',
    'commercial land Bhogapuram',
    'villa plots Visakhapatnam',
    'plots in Andhra Pradesh',
    'real estate Bhogapuram',
    'land sale Visakhapatnam',
    'interior design Visakhapatnam',
    'plots near vizag airport',
    'open plots Bhogapuram',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName,
    description: 'Prime plots & land for sale in Bhogapuram, Visakhapatnam. Residential, commercial & villa plots near new Bhogapuram International Airport.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
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
