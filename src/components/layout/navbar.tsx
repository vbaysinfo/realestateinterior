'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, Building2, Palette, Phone, LogIn } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/listings', label: 'Properties', icon: Building2 },
  { href: '/portfolio', label: 'Interior Design', icon: Palette },
  { href: '/contact', label: 'Contact', icon: Phone },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span>
              <span className="text-amber-600">Prime</span>Estates
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === href
                    ? 'bg-amber-50 text-amber-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Admin
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden py-3 border-t border-slate-100">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  pathname === href
                    ? 'bg-amber-50 text-amber-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <LogIn className="w-4 h-4" />
              Admin Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
