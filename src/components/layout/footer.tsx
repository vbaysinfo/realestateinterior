import Link from 'next/link'
import { Building2, MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Bhogapuram Lands'
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'

  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="leading-none">
                <div className="font-black text-lg text-white">Bhogapuram</div>
                <div className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Lands & Plots</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-5">
              Your trusted real estate partner in Bhogapuram & Visakhapatnam. Prime plots, clear titles, and expert guidance — all in one place.
            </p>
            <div className="flex gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-blue-600 flex items-center justify-center transition-colors text-xs font-bold">f</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-pink-600 flex items-center justify-center transition-colors text-xs font-bold">in</a>
              <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-green-600 flex items-center justify-center transition-colors text-xs font-bold">wa</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/listings', label: 'All Properties' },
                { href: '/listings?status=sale', label: 'Plots for Sale' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-slate-400">
                    <span className="w-1 h-1 bg-amber-500 rounded-full inline-block" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Areas We Cover</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                'Bhogapuram', 'Visakhapatnam', 'Atchutapuram',
                'Nakkapalle', 'Anakapalle', 'Near Airport Zone',
              ].map((area) => (
                <li key={area}>
                  <Link href={`/listings?location=${area}`}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-slate-400">
                    <span className="w-1 h-1 bg-blue-400 rounded-full inline-block" />
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">Bhogapuram, Visakhapatnam Dist., AP 531163</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${whatsapp}`} className="hover:text-emerald-400 transition-colors text-slate-400">{whatsapp}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="mailto:info@bhogapuramlands.com" className="hover:text-emerald-400 transition-colors text-slate-400">
                  info@bhogapuramlands.com
                </a>
              </li>
            </ul>
            <div className="mt-5 p-3 rounded-xl bg-stone-800 border border-stone-800">
              <p className="text-xs text-slate-400 mb-1">Working Hours</p>
              <p className="text-sm font-semibold text-white">Mon–Sat: 9 AM – 7 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteName}. All rights reserved. | Bhogapuram, Visakhapatnam, Andhra Pradesh</p>
          <div className="flex gap-4">
            <Link href="/sitemap.xml" className="hover:text-slate-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
