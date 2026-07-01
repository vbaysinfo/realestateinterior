import Link from 'next/link'
import { MapPin, Phone, Mail, Wind } from 'lucide-react'

export function Footer() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'VBAYS Real Estate'
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'

  return (
    <footer className="bg-gradient-to-b from-stone-900 to-black text-white">
      {/* Divider */}
      <div className="w-full overflow-hidden leading-none -mb-px">
        <svg viewBox="0 0 1440 60" className="w-full fill-stone-50" preserveAspectRatio="none" style={{height: 40}}>
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/vbays-logo.svg"
                alt="VBAYS"
                className="h-9 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-xs font-bold text-amber-400 tracking-widest uppercase mb-3">
              Real Estate · Visakhapatnam
            </p>
            <p className="text-sm leading-relaxed text-stone-400 mb-5">
              Visakhapatnam's premier coastal real estate agency. Beachfront plots, sea view villas, and coastal land along the Bay of Bengal.
            </p>
            <div className="flex gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors text-xs font-bold">f</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-pink-500 flex items-center justify-center transition-colors text-xs font-bold">in</a>
              <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-green-500 flex items-center justify-center transition-colors text-xs font-bold">wa</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-amber-400 mb-4 text-xs uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/listings', label: 'All Properties' },
                { href: '/listings?category=Open+Plots', label: 'Open Plots' },
                { href: '/listings?category=Agriculture+Land', label: 'Agriculture Land' },
                { href: '/listings?category=Residential', label: 'Residential' },
                { href: '/listings?category=Commercial', label: 'Commercial' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-stone-400">
                    <span className="w-1 h-1 bg-amber-400 rounded-full inline-block flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coastal Areas */}
          <div>
            <h3 className="font-bold text-amber-400 mb-4 text-xs uppercase tracking-widest">Coastal Areas</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                'Bheemunipatnam Beach',
                'Rushikonda Beach',
                'Bhogapuram Coast',
                'Rishikonda Hills',
                'Bheemili Seafront',
                'Vizag Beach Road',
                'Nakkapalle Coast',
                'Bay of Bengal Shore',
              ].map((area) => (
                <li key={area}>
                  <Link href={`/listings?location=${encodeURIComponent(area)}`}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-stone-400">
                    <Wind className="w-3 h-3 text-stone-500 flex-shrink-0" />
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-amber-400 mb-4 text-xs uppercase tracking-widest">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-stone-400">Beach Road, Bhogapuram, Visakhapatnam Dist., AP 531163</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`tel:${whatsapp}`} className="hover:text-amber-400 transition-colors text-stone-400">{whatsapp}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="mailto:info@vbays.com" className="hover:text-amber-400 transition-colors text-stone-400">
                  info@vbays.com
                </a>
              </li>
            </ul>
            <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-stone-400 mb-1 font-semibold">Office Hours</p>
              <p className="text-sm font-bold text-white">Mon–Sat: 9 AM – 7 PM</p>
              <p className="text-xs text-stone-400 mt-1">Site visits by appointment</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {siteName}. All rights reserved. | Visakhapatnam, Andhra Pradesh</p>
          <div className="flex gap-4">
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
