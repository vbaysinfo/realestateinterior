import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { TopBar } from '@/components/layout/topbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/common/whatsapp-button'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'CoastalLands Vizag'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coastallandsvizag.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Beach & Sea View Plots for Sale in Visakhapatnam`,
    template: `%s | ${siteName}`,
  },
  description: 'Buy verified beachfront and sea view plots in Bhogapuram, Visakhapatnam, Andhra Pradesh. Coastal land, beach villa plots, sea-facing properties near Bay of Bengal. Clear titles, expert guidance.',
  keywords: ['beach plots Visakhapatnam', 'sea view land Vizag', 'coastal property Bhogapuram', 'beachfront plots AP', 'beach villa plots Vizag', 'sea facing land Visakhapatnam', 'Bay of Bengal plots', 'coastal real estate Andhra Pradesh'],
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
      <body className="min-h-full flex flex-col bg-sky-50 text-slate-900">
        <Navbar />
        <TopBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton floating />
      </body>
    </html>
  )
}
