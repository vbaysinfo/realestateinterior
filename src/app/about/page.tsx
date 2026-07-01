import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, Palette, Users, Trophy, MapPin, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About Us — Plots & Land in Bhogapuram, Visakhapatnam',
  description: 'Bhogapuram Lands is the leading plot & land dealer in Bhogapuram, Visakhapatnam, Andhra Pradesh. 15+ years of experience in residential, commercial & villa plots near Bhogapuram Airport.',
  keywords: ['plot dealer Bhogapuram', 'land broker Visakhapatnam', 'real estate agent Bhogapuram', 'plots Andhra Pradesh'],
}

const VALUES = [
  { icon: Building2, title: 'Plot & Land Experts', desc: 'Over 15 years of local market knowledge in Bhogapuram and Visakhapatnam district — helping buyers find the right plot at the right price.' },
  { icon: Palette, title: 'Interior Design', desc: 'Award-winning interior design team creating beautiful homes and commercial spaces across Visakhapatnam.' },
  { icon: Users, title: 'Client First', desc: 'Every decision is guided by our clients\' interests — transparency, clear titles, and honest dealings every time.' },
  { icon: Trophy, title: 'Proven Track Record', desc: '350+ plots sold and 300+ completed design projects across Bhogapuram, Vizag and surrounding areas.' },
]

const AREAS = [
  'Bhogapuram', 'Atchutapuram', 'Nakkapalle', 'Pedagantyada',
  'Sabbavaram', 'Vizianagaram', 'Visakhapatnam City', 'Duvvada',
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">Bhogapuram, Visakhapatnam</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="text-amber-400">Bhogapuram Lands</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Your most trusted plot &amp; land dealer in Bhogapuram, Visakhapatnam district — offering verified, clear-title plots with expert interior design services.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-slate-400 text-sm">
            <MapPin className="w-4 h-4 text-amber-500" />
            Bhogapuram, Visakhapatnam Dist., Andhra Pradesh
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Story</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Founded in Bhogapuram over 15 years ago, we started with a simple mission: to help families and investors find the best plots and land in Visakhapatnam district at honest prices. As Bhogapuram grew — especially with the development of the new Bhogapuram International Airport — we positioned ourselves as the region's most trusted name in land and plot sales.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          We specialise in residential open plots, villa plots, commercial land, and agricultural land across Bhogapuram, Atchutapuram, Nakkapalle, and surrounding mandals. Every plot we sell comes with clear legal titles, RERA registration where applicable, and full documentation support.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Recognising that our clients also needed help building and designing their spaces after purchasing land, we launched our interior design division — offering complete home and office interiors across Visakhapatnam.
        </p>

        {/* Why airport proximity matters */}
        <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
          <h3 className="font-bold text-slate-900 mb-2">📍 Why Bhogapuram?</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Bhogapuram is the site of the new <strong>Bhogapuram International Airport</strong> — one of Andhra Pradesh's biggest infrastructure projects. Land prices in and around Bhogapuram are appreciating rapidly, making it one of the best real estate investment opportunities in the state right now.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 bg-slate-50">
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

      {/* Areas Served */}
      <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Areas We Serve</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {AREAS.map((area) => (
            <div key={area} className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-sm">
              <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span className="text-slate-700 font-medium">{area}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 text-center bg-amber-600 text-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">Looking for Plots in Bhogapuram?</h2>
          <p className="text-amber-100 mb-8">Browse our verified plots and land listings near Bhogapuram International Airport — or get in touch for a site visit.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/listings"><Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50">View All Plots</Button></Link>
            <Link href="/contact"><Button size="lg" variant="outline" className="border-white text-white hover:bg-amber-700">Contact Us</Button></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
