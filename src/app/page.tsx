import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, Building2, MapPin, Square,
  MessageCircle, Phone, Mail, Star, TrendingUp,
  Shield, Clock, CheckCircle2, Search
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { LeadForm } from '@/components/forms/lead-form'
import { Button } from '@/components/ui/button'
import { formatPrice, getWhatsAppUrl } from '@/lib/utils'
import type { ListingWithMedia } from '@/types/database'

async function getFeaturedListings(): Promise<ListingWithMedia[]> {
  try {
    const supabase = await createClient()
    const { data } = await (supabase as any)
      .from('listings').select('*, media(*)').eq('published', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false }).limit(8)
    return (data as ListingWithMedia[]) || []
  } catch { return [] }
}

const DUMMY_LISTINGS = [
  {
    id: 'd1', title: 'Premium Residential Plot — Gated Community',
    slug: '#', price: 2800000, currency: 'INR', status: 'sale',
    location: 'Bhogapuram Layout, Phase 1', area_sqft: 2400,
    featured: true, property_type: 'Residential Plot',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
  },
  {
    id: 'd2', title: 'Commercial Land Near NH-16 Highway',
    slug: '#', price: 8500000, currency: 'INR', status: 'sale',
    location: 'NH-16 Corridor, Bhogapuram', area_sqft: 10000,
    featured: false, property_type: 'Commercial Land',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    id: 'd3', title: 'Villa Plot Near Bhogapuram Airport',
    slug: '#', price: 4200000, currency: 'INR', status: 'sale',
    location: 'Airport Zone, Bhogapuram', area_sqft: 3600,
    featured: true, property_type: 'Villa Plot',
    image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80',
  },
  {
    id: 'd4', title: 'Open Plot in Upcoming Township',
    slug: '#', price: 1500000, currency: 'INR', status: 'sale',
    location: 'New Township, Bhogapuram', area_sqft: 1800,
    featured: false, property_type: 'Open Plot',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  },
  {
    id: 'd5', title: 'Agricultural Land — Irrigation Facility',
    slug: '#', price: 3200000, currency: 'INR', status: 'sale',
    location: 'Rural Belt, Atchutapuram', area_sqft: 43560,
    featured: false, property_type: 'Agricultural Land',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
  },
  {
    id: 'd6', title: 'Corner Plot — Prime Location',
    slug: '#', price: 3800000, currency: 'INR', status: 'sale',
    location: 'Main Road, Bhogapuram', area_sqft: 2700,
    featured: false, property_type: 'Residential Plot',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
  },
]

const STATS = [
  { value: '350+', label: 'Plots Sold', icon: Building2 },
  { value: '1,200+', label: 'Happy Clients', icon: Star },
  { value: '12+', label: 'Years Experience', icon: TrendingUp },
  { value: '100%', label: 'Clear Titles', icon: Shield },
]

const PROPERTY_TYPES = [
  { label: 'Residential Plots', icon: '🏘️', count: '80+ plots', color: 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-100' },
  { label: 'Villa Plots', icon: '🏡', count: '45+ plots', color: 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-100' },
  { label: 'Commercial Land', icon: '🏢', count: '30+ plots', color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-100' },
  { label: 'Agricultural Land', icon: '🌾', count: '60+ acres', color: 'bg-orange-50 hover:bg-orange-100 text-orange-800 border-orange-100' },
]

const WHY_US = [
  { icon: Shield, title: 'Verified Legal Titles', desc: 'All properties with clear patta, EC documents and verified ownership — zero legal surprises.' },
  { icon: TrendingUp, title: 'High Appreciation Zone', desc: 'Bhogapuram International Airport development has driven 3x value growth in just 5 years.' },
  { icon: CheckCircle2, title: 'End-to-End Assistance', desc: 'From site visit to registration — we guide you through every step of your purchase journey.' },
  { icon: Clock, title: 'Quick Documentation', desc: 'We handle all paperwork and registration formalities efficiently and transparently.' },
  { icon: MapPin, title: 'Premium Locations', desc: 'Hand-picked plots near highway corridors, airport zones, and growing townships.' },
  { icon: Phone, title: '24/7 Support', desc: 'Our team is always available on WhatsApp and phone to answer your questions immediately.' },
]

export default async function HomePage() {
  const dbListings = await getFeaturedListings()
  const listings = dbListings.length > 0 ? dbListings : DUMMY_LISTINGS
  const isLive = dbListings.length > 0
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'

  return (
    <div className="bg-white">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[92vh] flex items-center bg-blue-950 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=85"
            alt="Land in Bhogapuram Visakhapatnam"
            fill className="object-cover opacity-20" priority sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/95 to-blue-900/80" />
        </div>

        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-800/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-300 text-xs font-bold tracking-widest uppercase">
                Bhogapuram · Visakhapatnam · Andhra Pradesh
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.02] mb-6">
              Find Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">
                Dream Plot
              </span><br />
              in Bhogapuram
            </h1>

            <p className="text-blue-200 text-lg leading-relaxed mb-10 max-w-xl">
              Prime residential, villa & commercial plots near Bhogapuram International Airport.
              Clear titles, verified documents, and expert guidance.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl shadow-blue-950/50 p-3 flex flex-col sm:flex-row gap-2 mb-8 max-w-2xl">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search by location (Bhogapuram, Vizag...)"
                  className="w-full text-sm text-slate-700 placeholder:text-slate-400 bg-transparent outline-none py-2"
                />
              </div>
              <div className="h-px sm:h-auto sm:w-px bg-slate-200" />
              <select className="flex-none text-sm text-slate-600 bg-transparent outline-none px-3 py-2 cursor-pointer">
                <option value="">All Types</option>
                <option>Residential Plot</option>
                <option>Villa Plot</option>
                <option>Commercial Land</option>
                <option>Agricultural Land</option>
              </select>
              <Link href="/listings">
                <button className="w-full sm:w-auto bg-blue-700 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                  <Search className="w-4 h-4" /> Search
                </button>
              </Link>
            </div>

            {/* Quick type links */}
            <div className="flex flex-wrap gap-2">
              {['Residential Plots', 'Villa Plots', 'Commercial Land', 'Near Airport'].map((t) => (
                <Link key={t} href={`/listings?type=${encodeURIComponent(t)}`}
                  className="px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-xs font-semibold transition-colors">
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-blue-400">
          <span className="text-xs font-medium tracking-widest uppercase">Explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-blue-400 to-transparent" />
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map(({ value, label, icon: Icon }, i) => (
              <div key={label} className={`flex items-center gap-4 py-8 px-6 ${i < 3 ? 'border-r border-slate-100' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-3xl font-black text-blue-900">{value}</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROPERTY TYPES ═══ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">Browse by Category</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              What Are You Looking For?
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PROPERTY_TYPES.map(({ label, icon, count, color }) => (
              <Link key={label} href={`/listings?type=${encodeURIComponent(label)}`}
                className={`group p-6 rounded-2xl border-2 transition-all duration-200 text-center ${color}`}>
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-bold text-sm mb-1">{label}</h3>
                <p className="text-xs opacity-70 font-medium">{count}</p>
                <div className="mt-3 flex items-center justify-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  View all <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED LISTINGS ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">Latest Properties</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                Available Plots &<br className="sm:hidden" /> <span className="text-blue-700">Land for Sale</span>
              </h2>
              <p className="text-slate-500 text-sm mt-2">Verified properties in Bhogapuram & Visakhapatnam region</p>
            </div>
            <Link href="/listings"
              className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-bold text-sm transition-colors group flex-shrink-0">
              View all properties
              <span className="w-8 h-8 rounded-full border-2 border-blue-200 group-hover:border-blue-700 group-hover:bg-blue-700 group-hover:text-white flex items-center justify-center transition-all">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* Hero card + grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Featured large card */}
            {listings[0] && (
              <Link href={isLive ? `/listings/${(listings[0] as any).slug}` : '/listings'}
                className="lg:col-span-5 group relative rounded-3xl overflow-hidden min-h-[500px] block">
                <Image
                  src={(listings[0] as any).image || (listings[0] as any).media?.[0]?.url || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'}
                  alt={(listings[0] as any).title} fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width:1024px)100vw,42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-amber-500 text-white text-xs font-black px-3 py-1 rounded-full">For Sale</span>
                  {(listings[0] as any).featured && (
                    <span className="bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full">Featured</span>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
                    {(listings[0] as any).property_type || 'Plot'}
                  </span>
                  <h3 className="text-white font-black text-xl mt-1 leading-tight">
                    {(listings[0] as any).title}
                  </h3>
                  <div className="flex items-center gap-1 text-slate-300 text-xs mt-1.5">
                    <MapPin className="w-3 h-3" />{(listings[0] as any).location}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                    <div>
                      <span className="text-white font-black text-2xl">
                        {formatPrice((listings[0] as any).price, (listings[0] as any).currency)}
                      </span>
                      {(listings[0] as any).area_sqft && (
                        <div className="text-slate-300 text-xs mt-0.5 flex items-center gap-1">
                          <Square className="w-3 h-3" /> {(listings[0] as any).area_sqft.toLocaleString()} sqft
                        </div>
                      )}
                    </div>
                    <a href={getWhatsAppUrl(whatsapp, `Hi! I'm interested in "${(listings[0] as any).title}". Please share details.`)}
                      target="_blank" rel="noopener noreferrer"
                      
                      className="flex items-center gap-1.5 bg-green-500 hover:bg-green-400 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid of smaller cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {listings.slice(1, 5).map((listing: any) => {
                const img = listing.image || listing.media?.[0]?.url
                return (
                  <Link
                    key={listing.id}
                    href={isLive ? `/listings/${listing.slug}` : '/listings'}
                    className="group bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                      {img ? (
                        <Image src={img} alt={listing.title} fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width:640px)100vw,25vw" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-blue-200" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="bg-blue-700/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {listing.property_type || 'Plot'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-blue-700 font-black text-base">{formatPrice(listing.price, listing.currency)}</p>
                      <h3 className="text-slate-800 font-bold text-sm mt-0.5 line-clamp-1 group-hover:text-blue-700 transition-colors">
                        {listing.title}
                      </h3>
                      <div className="flex items-center gap-1 text-slate-400 text-xs mt-1.5">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{listing.location}</span>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                        {listing.area_sqft ? (
                          <span className="flex items-center gap-1 text-slate-500 text-xs">
                            <Square className="w-3 h-3" />{listing.area_sqft.toLocaleString()} sqft
                          </span>
                        ) : <span />}
                        <a href={getWhatsAppUrl(whatsapp, `Hi! Interested in "${listing.title}". Please share more info.`)}
                          target="_blank" rel="noopener noreferrer"
                          
                          className="flex items-center gap-1 text-green-600 hover:text-green-500 text-xs font-bold transition-colors">
                          <MessageCircle className="w-3.5 h-3.5" /> Enquire
                        </a>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Row of remaining listings */}
          {listings.length > 5 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {listings.slice(5, 8).map((listing: any) => {
                const img = listing.image || listing.media?.[0]?.url
                return (
                  <Link key={listing.id} href={isLive ? `/listings/${listing.slug}` : '/listings'}
                    className="group bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex gap-4 p-3">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                      {img ? (
                        <Image src={img} alt={listing.title} fill className="object-cover" sizes="96px" />
                      ) : (
                        <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-blue-200" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                        {listing.property_type || 'Plot'}
                      </span>
                      <h3 className="text-slate-800 font-bold text-sm line-clamp-1 group-hover:text-blue-700 transition-colors mt-0.5">
                        {listing.title}
                      </h3>
                      <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
                        <MapPin className="w-3 h-3" /><span className="truncate">{listing.location}</span>
                      </div>
                      <p className="text-blue-700 font-black text-sm mt-1.5">
                        {formatPrice(listing.price, listing.currency)}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/listings">
              <Button className="rounded-full px-10 bg-blue-700 hover:bg-blue-800 text-white font-bold shadow-lg shadow-blue-200">
                View All Properties <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ WHY US ═══ */}
      <section className="py-20 bg-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-400 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-4">
              Trusted Real Estate Partner<br />
              <span className="text-amber-400">in Bhogapuram & Vizag</span>
            </h2>
            <p className="text-blue-300 max-w-xl mx-auto text-sm">
              We combine deep local knowledge, transparent dealings, and 12+ years of experience to help you invest with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_US.map(({ icon: Icon, title, desc }) => (
              <div key={title}
                className="group flex gap-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/25 transition-colors">
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
                  <p className="text-blue-300 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link href="/listings">
              <Button size="lg" className="rounded-full px-8 bg-amber-500 hover:bg-amber-400 text-white font-bold border-0">
                Browse All Plots
              </Button>
            </Link>
            <a href={getWhatsAppUrl(whatsapp, 'Hi! I want to know more about plots in Bhogapuram.')}
              target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline"
                className="rounded-full px-8 border-white/30 text-white hover:bg-white/10">
                <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT + LEAD FORM ═══ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">Get In Touch</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-4">
                Looking for the<br />
                <span className="text-blue-700">Perfect Plot?</span>
              </h2>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Tell us your requirements and our team will reach out with the best available plots within 24 hours.
                We cover Bhogapuram, Atchutapuram, Nakkapalle, and all of Visakhapatnam district.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { Icon: Phone, label: 'Call / WhatsApp', value: whatsapp, href: `tel:${whatsapp}` },
                  { Icon: Mail, label: 'Email Us', value: 'info@bhogapuramlands.com', href: 'mailto:info@bhogapuramlands.com' },
                  { Icon: MapPin, label: 'Office Address', value: 'Bhogapuram, Visakhapatnam Dist., AP 531163', href: null },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-11 h-11 bg-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{label}</p>
                      {href ? (
                        <a href={href} className="text-slate-800 font-bold text-sm hover:text-blue-700 transition-colors">{value}</a>
                      ) : (
                        <p className="text-slate-800 font-bold text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Area coverage */}
              <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">Areas We Cover</p>
                <div className="flex flex-wrap gap-2">
                  {['Bhogapuram', 'Atchutapuram', 'Nakkapalle', 'Anakapalle', 'Visakhapatnam', 'Near Airport'].map((area) => (
                    <span key={area} className="px-3 py-1 bg-white border border-blue-200 text-blue-700 text-xs font-semibold rounded-full">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
              <h3 className="text-2xl font-black text-slate-900 mb-1">Send an Enquiry</h3>
              <p className="text-slate-400 text-sm mb-6">We reply within 24 hours — usually much faster!</p>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
