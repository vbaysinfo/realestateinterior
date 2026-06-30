import Link from 'next/link'
import { Building2, MapPin, Phone, Mail, Share2, Camera } from 'lucide-react'

export function Footer() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'PrimeEstates'
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                <span className="text-amber-500">Prime</span>Estates
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Your trusted partner in real estate and interior design. We help you find your perfect property and create beautiful living spaces.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors" aria-label="Facebook">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors" aria-label="Instagram">
                <Camera className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/listings', label: 'Properties for Sale' },
                { href: '/listings?status=rent', label: 'Properties for Rent' },
                { href: '/portfolio', label: 'Interior Design' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-amber-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Property Types</h3>
            <ul className="space-y-2 text-sm">
              {['Apartments', 'Villas', 'Townhouses', 'Commercial', 'Land'].map((type) => (
                <li key={type}>
                  <Link
                    href={`/listings?type=${type.toLowerCase()}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>123 Real Estate Ave, City, Country</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href={`tel:${whatsapp}`} className="hover:text-amber-400 transition-colors">
                  {whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href="mailto:info@primeestates.com" className="hover:text-amber-400 transition-colors">
                  info@primeestates.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
