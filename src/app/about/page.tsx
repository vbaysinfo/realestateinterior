import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, MapPin, TrendingUp, Shield, Users, Phone, Waves, Sun, Shell, Wind } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | CoastalLands Vizag — Beach & Sea View Real Estate',
  description: 'Learn about CoastalLands Vizag — your trusted coastal real estate partner for beachfront plots and sea view properties in Visakhapatnam, Andhra Pradesh.',
}

const TEAM_VALUES = [
  { icon: Shield, title: 'Verified Titles', desc: 'Every coastal plot is legally verified — CRZ compliance, patta, EC and ownership documents checked.' },
  { icon: CheckCircle2, title: 'Coastal Expertise', desc: 'Specialized in beach and sea view properties along the entire Visakhapatnam coastline.' },
  { icon: TrendingUp, title: 'Appreciation Potential', desc: 'Beachfront land in Vizag has appreciated 4x over 10 years as tourism and infrastructure grow.' },
  { icon: Users, title: 'Client-First', desc: 'From first enquiry to registration — we guide you every step, 7 days a week.' },
]

const COASTAL_AREAS = [
  'Bheemunipatnam', 'Rushikonda', 'Bheemili', 'Rishikonda Hills',
  'Vizag Beach Road', 'Bhogapuram Coast', 'Nakkapalle Shore', 'Bay of Bengal Zone',
]

const MILESTONES = [
  { year: '2010', label: 'Founded on the shores of Visakhapatnam with a passion for coastal real estate' },
  { year: '2015', label: 'Expanded to cover the full 50 km AP coastline from Bhogapuram to Bheemunipatnam' },
  { year: '2019', label: 'Tourism boom and Smart City status tripled coastal land demand in Vizag' },
  { year: '2024', label: '120+ coastal plots sold, 800+ families now own a piece of Bay of Bengal paradise' },
]

export default function AboutPage() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'

  return (
    <div className="bg-sky-50">

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=85"
            alt="Bay of Bengal coastline Visakhapatnam"
            fill className="object-cover" sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/90 via-cyan-900/80 to-cyan-800/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-cyan-300 text-xs mb-6">
            <Link href="/" className="hover:text-cyan-100 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-cyan-100">About Us</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Waves className="w-6 h-6 text-cyan-400" />
            <span className="text-xs font-bold tracking-widest text-cyan-300 uppercase">Bay of Bengal Coastal Experts</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            About <span className="text-orange-400">CoastalLands Vizag</span>
          </h1>
          <p className="text-cyan-200 text-lg max-w-2xl leading-relaxed">
            Visakhapatnam's most trusted coastal real estate agency.
            14+ years of expertise in beachfront plots, sea view properties, and coastal land along the Bay of Bengal.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shell className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-bold tracking-widest text-cyan-600 uppercase">Our Story</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-cyan-950 mt-2 mb-6 leading-tight">
                Born on the Shore,<br />
                <span className="text-cyan-600">Built for the Sea</span>
              </h2>
              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  CoastalLands Vizag was founded in 2010 with a single dream — to help families and investors own a piece of the breathtaking Visakhapatnam coastline. We started with a small collection of beachfront plots in Bheemunipatnam and have grown to become the city's leading coastal real estate specialist.
                </p>
                <p>
                  The Bay of Bengal coastline stretching through Visakhapatnam — from Bheemunipatnam's golden sands to the dramatic cliffs of Rishikonda — is one of India's most scenic and undervalued coastal stretches. As tourism, infrastructure, and Smart City investments pour in, the appreciation potential for coastal land here is unmatched anywhere in India.
                </p>
                <p>
                  Today we cover a full 50 km of the AP coastline, specializing in beachfront plots, sea view villa sites, coastal residential plots, and resort development land. Every property we sell is legally verified, CRZ-compliant, and comes with clear title documentation.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=85"
                  alt="Visakhapatnam beach coastline"
                  fill className="object-cover"
                  sizes="(max-width:1024px)100vw,50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-2xl p-5 shadow-xl">
                <div className="text-4xl font-black text-white">120+</div>
                <div className="text-cyan-200 text-xs mt-1">Coastal Plots Sold</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-orange-500 text-white rounded-2xl p-5 shadow-xl">
                <div className="text-4xl font-black">14+</div>
                <div className="text-orange-100 text-xs mt-1">Years on the Coast</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coastal Experience */}
      <section className="py-16 bg-gradient-to-b from-sky-50 to-cyan-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-cyan-700 uppercase">The Coastal Advantage</span>
            <h2 className="text-3xl font-black text-cyan-950 mt-2">
              Why Invest in Vizag Coastal Land?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Sun, title: 'India\'s Fastest Growing Coastal City',
                desc: 'Visakhapatnam is India\'s most rapidly developing coastal city — Smart City project, IT hub expansion, and port growth are fueling unprecedented real estate demand.'
              },
              {
                icon: Waves, title: 'Bay of Bengal Frontage',
                desc: 'The Bay of Bengal\'s turquoise waters, golden beaches, and dramatic coastline make Vizag sea view properties among the most desirable in all of South India.'
              },
              {
                icon: TrendingUp, title: '4x Land Appreciation in 10 Years',
                desc: 'Coastal land values in Visakhapatnam have grown 4x in the past decade — with more infrastructure development planned, the growth story is just beginning.'
              },
              {
                icon: Wind, title: 'Perfect Coastal Climate',
                desc: 'Warm tropical weather year-round, cool sea breezes, and a refreshing ocean climate make coastal living in Vizag exceptionally comfortable and healthy.'
              },
              {
                icon: Shield, title: 'CRZ-Compliant Properties',
                desc: 'All our coastal properties are fully CRZ (Coastal Regulation Zone) compliant. We only list properties with clean legal status, zero disputes, and verified documents.'
              },
              {
                icon: MapPin, title: 'Tourism Boom Zone',
                desc: 'Rushikonda, Bheemunipatnam, and Bheemili are rapidly developing into world-class tourism destinations — perfect for resort, hospitality, and villa investments.'
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 bg-white rounded-2xl border border-cyan-200 hover:shadow-lg hover:shadow-cyan-100 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-black text-cyan-900 text-sm mb-2">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-cyan-700 uppercase">Our Journey</span>
            <h2 className="text-3xl font-black text-cyan-950 mt-2">Milestones Along the Shore</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MILESTONES.map(({ year, label }) => (
              <div key={year}
                className="bg-gradient-to-b from-sky-50 to-white rounded-2xl p-6 border-2 border-cyan-100 text-center hover:border-cyan-300 hover:shadow-md transition-all">
                <div className="text-4xl font-black text-cyan-600 mb-3">{year}</div>
                <p className="text-slate-600 text-sm leading-relaxed">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-cyan-700 uppercase">What We Stand For</span>
            <h2 className="text-3xl font-black text-cyan-950 mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title}
                className="p-6 bg-white rounded-2xl border border-cyan-100 text-center hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-100 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black text-cyan-900 text-sm mb-2">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coastal Areas */}
      <section className="py-16 bg-gradient-to-r from-cyan-700 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Waves className="w-8 h-8 text-cyan-300 mx-auto mb-3" />
          <h2 className="text-3xl font-black text-white mt-2 mb-8">Coastal Areas We Cover</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {COASTAL_AREAS.map((area) => (
              <Link key={area} href={`/listings?location=${encodeURIComponent(area)}`}
                className="px-5 py-2.5 bg-white/15 hover:bg-orange-500 border border-white/30 hover:border-orange-500 text-white rounded-full text-sm font-semibold transition-all flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5" /> {area}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-sky-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shell className="w-8 h-8 text-orange-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-cyan-950 mb-4">
            Ready to Own Your Beach Property?
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            Contact our coastal real estate experts today. We'll find you the perfect beachfront or sea view plot along the Bay of Bengal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings"
              className="px-8 py-3.5 bg-cyan-700 hover:bg-cyan-800 text-white font-black rounded-xl text-sm transition-colors shadow-lg shadow-cyan-200">
              Browse Coastal Properties
            </Link>
            <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi! I want to enquire about beach and sea view plots in Visakhapatnam.')}`}
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
