import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, MapPin, TrendingUp, Shield, Users, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Bhogapuram Lands — Real Estate in Visakhapatnam',
  description: 'Learn about Bhogapuram Lands — your trusted real estate partner for plots and land in Bhogapuram, Visakhapatnam, Andhra Pradesh. 12+ years experience, 350+ plots sold.',
}

const TEAM_VALUES = [
  { icon: Shield, title: 'Transparency', desc: 'We believe in full disclosure — every document, every detail, no hidden surprises.' },
  { icon: CheckCircle2, title: 'Verified Properties', desc: 'Every plot we sell undergoes legal verification of patta, EC, and title documents.' },
  { icon: TrendingUp, title: 'Growth-Oriented', desc: 'We guide you to locations with maximum appreciation potential — especially near Bhogapuram Airport.' },
  { icon: Users, title: 'Client-First', desc: 'From first enquiry to registration, our team is available 7 days a week to assist you.' },
]

const AREAS = [
  'Bhogapuram', 'Atchutapuram', 'Nakkapalle', 'Anakapalle',
  'Bheemunipatnam', 'Yelamanchili', 'Airport Zone', 'Visakhapatnam',
]

const MILESTONES = [
  { year: '2012', label: 'Founded in Bhogapuram with a vision to simplify land buying' },
  { year: '2016', label: 'Expanded coverage to all of Visakhapatnam district' },
  { year: '2020', label: 'Bhogapuram Airport announcement boosted our portfolio 3x' },
  { year: '2024', label: '350+ plots sold, 1,200+ families served across the region' },
]

export default function AboutPage() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-blue-950 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-400 text-xs mb-6">
            <Link href="/" className="hover:text-blue-200 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-blue-200">About Us</span>
          </div>
          <h1 className="text-5xl font-black text-white mb-4">
            About <span className="text-amber-400">Bhogapuram Lands</span>
          </h1>
          <p className="text-blue-300 text-lg max-w-2xl leading-relaxed">
            Your most trusted real estate partner in Bhogapuram and Visakhapatnam. 
            12+ years of experience. 350+ plots sold. Zero legal disputes.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">Our Story</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-6">
                From a Small Office in Bhogapuram<br />
                <span className="text-blue-700">to the Region's Most Trusted Name</span>
              </h2>
              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  Bhogapuram Lands was founded in 2012 with a simple mission: make land buying in the Visakhapatnam district simple, transparent, and trustworthy. 
                  We started with a handful of residential plots in Bhogapuram and have since grown to serve over 1,200 families.
                </p>
                <p>
                  When the Bhogapuram International Airport was announced, we recognized the massive investment opportunity it presented. 
                  We worked closely with landowners and buyers to facilitate transactions in the airport corridor — helping clients achieve 3x appreciation on their plots.
                </p>
                <p>
                  Today, we are the go-to real estate agency for anyone looking to buy residential plots, villa plots, commercial land, or agricultural land in Bhogapuram, 
                  Atchutapuram, Nakkapalle, and the broader Visakhapatnam district.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=85"
                  alt="Bhogapuram Lands office"
                  fill className="object-cover"
                  sizes="(max-width:1024px)100vw,50vw"
                />
              </div>
              {/* Stats overlay */}
              <div className="absolute -bottom-6 -left-6 bg-blue-950 text-white rounded-2xl p-5 shadow-xl">
                <div className="text-4xl font-black text-amber-400">350+</div>
                <div className="text-blue-300 text-xs mt-1">Plots Successfully Sold</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-amber-500 text-white rounded-2xl p-5 shadow-xl">
                <div className="text-4xl font-black">12+</div>
                <div className="text-amber-100 text-xs mt-1">Years of Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">Our Journey</span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">Key Milestones</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MILESTONES.map(({ year, label }) => (
              <div key={year} className="bg-white rounded-2xl p-6 border-2 border-slate-100 text-center">
                <div className="text-4xl font-black text-blue-700 mb-3">{year}</div>
                <p className="text-slate-600 text-sm leading-relaxed">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">What We Stand For</span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                <div className="w-14 h-14 bg-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-2">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas covered */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">Where We Operate</span>
          <h2 className="text-3xl font-black text-white mt-2 mb-8">Areas We Cover</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {AREAS.map((area) => (
              <Link key={area} href={`/listings?location=${encodeURIComponent(area)}`}
                className="px-5 py-2.5 bg-white/10 hover:bg-amber-500 border border-white/20 hover:border-amber-500 text-white rounded-full text-sm font-semibold transition-all">
                <MapPin className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                {area}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-4">
            Ready to Find Your Perfect Plot?
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            Contact our team today. We'll help you find verified plots that match your budget and location preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings"
              className="px-8 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-black rounded-xl text-sm transition-colors shadow-lg shadow-blue-200">
              Browse All Properties
            </Link>
            <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi! I want to enquire about plots in Bhogapuram.')}`}
              target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 bg-green-500 hover:bg-green-600 text-white font-black rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
