import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, Palette, Users, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our real estate and interior design company — our story, team, and values.',
}

const VALUES = [
  { icon: Building2, title: 'Real Estate Expertise', desc: 'Over 15 years of market knowledge, helping buyers, sellers, and investors navigate the property landscape.' },
  { icon: Palette, title: 'Design Excellence', desc: 'Award-winning interior design team creating functional, beautiful spaces tailored to each client.' },
  { icon: Users, title: 'Client First', desc: "Every decision we make is guided by what's best for our clients — transparency, honesty, results." },
  { icon: Trophy, title: 'Proven Track Record', desc: '1,200+ satisfied clients and 300+ completed design projects across residential and commercial spaces.' },
]

export default function AboutPage() {
  return (
    <div>
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            About <span className="text-amber-400">PrimeEstates</span>
          </h1>
          <p className="text-lg text-slate-300">
            We are a full-service real estate and interior design company committed to turning your property dreams into reality.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Story</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Founded over 15 years ago, PrimeEstates began as a boutique real estate agency with a simple mission: to make property transactions straightforward, transparent, and rewarding for every client. As our client base grew, we recognized a recurring need — people wanted not just a property, but a home. That realization led us to establish our interior design division.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Today, we offer end-to-end services: finding the right property, negotiating the best deal, and then transforming the space into something truly extraordinary. Our integrated approach saves clients time, money, and stress — while delivering results that exceed expectations.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">What Sets Us Apart</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
          <p className="text-slate-600 mb-8">Whether you're buying, selling, or redesigning — we're here to help every step of the way.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/listings"><Button size="lg">Browse Properties</Button></Link>
            <Link href="/contact"><Button size="lg" variant="outline">Contact Us</Button></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
