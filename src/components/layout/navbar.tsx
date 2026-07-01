'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Waves, Phone, LogIn } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/listings', label: 'Properties' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-cyan-100 shadow-sm shadow-cyan-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-200">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-[17px] text-cyan-900 tracking-tight">CoastalLands</span>
              <span className="text-[10px] font-bold text-orange-400 tracking-widest uppercase -mt-0.5">Vizag · Bay of Bengal</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                  pathname === href
                    ? 'bg-cyan-50 text-cyan-700'
                    : 'text-slate-600 hover:text-cyan-700 hover:bg-cyan-50'
                )}>
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a
              href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890').replace(/[^0-9]/g, '')}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-bold rounded-xl transition-colors">
              <Phone className="w-3.5 h-3.5" /> WhatsApp
            </a>
            <Link href="/admin"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors">
              <LogIn className="w-3.5 h-3.5" /> Admin
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-cyan-50 transition-colors"
            onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden py-3 border-t border-cyan-100 space-y-0.5">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                  pathname === href
                    ? 'bg-cyan-50 text-cyan-700'
                    : 'text-slate-600 hover:text-cyan-700 hover:bg-cyan-50'
                )}>
                {label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890').replace(/[^0-9]/g, '')}`}
              target="_blank" rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-green-700 bg-green-50">
              <Phone className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
