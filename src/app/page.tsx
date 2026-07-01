import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, Building2, MapPin, Square,
  MessageCircle, Phone, Mail, TrendingUp,
  Shield, CheckCircle2, Search, SlidersHorizontal, Star
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { LeadForm } from '@/components/forms/lead-form'
import { formatPrice, getWhatsAppUrl } from '@/lib/utils'
import type { ListingWithMedia } from '@/types/database'

async function getFeaturedListings(): Promise<ListingWithMedia[]> {
  try {
    const supabase = await createClient()
    const { data } = await (supabase as any)
      .from('listings').select('*, media(*)').eq('published', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false }).limit(9)
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
    id: 'd6', title: 'Corner Plot — Prime Road Facing',
    slug: '#', price: 3800000, currency: 'INR', status: 'sale',
    location: 'Main Road, Bhogapuram', area_sqft: 2700,
    featured: false, property_type: 'Residential Plot',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
  },
  {
    id: 'd7', title: 'Industrial Land — Atchutapuram SEZ Zone',
    slug: '#', price: 12000000, currency: 'INR', status: 'sale',
    location: 'SEZ Zone, Atchutapuram', area_sqft: 50000,
    featured: false, property_type: 'Industrial Land',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    id: 'd8', title: 'Gated Villa Plot — East Facing',
    slug: '#', price: 5500000, currency: 'INR', status: 'sale',
    location: 'Green Valley, Bhogapuram', area_sqft: 4000,
    featured: false, property_type: 'Villa Plot',
    image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80',
  },
  {
    id: 'd9', title: 'Budget Plot — Ideal for First-Time Buyers',
    slug: '#', price: 950000, currency: 'INR', status: 'sale',
    location: 'Nakkapalle Road, Bhogapuram', area_sqft: 1200,
    featured: false, property_type: 'Open Plot',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  },
]

const PROPERTY_TYPES = [
  { label: 'Residential', query: 'Residential Plot', emoji: '🏘️', count: '80+' },
  { label: 'Villa Plots', query: 'Villa Plot', emoji: '🏡', count: '45+' },
  { label: 'Commercial', query: 'Commercial Land', emoji: '🏢', count: '30+' },
  { label: 'Agricultural', query: 'Agricultural Land', emoji: '🌾', count: '60+' },
]

const TRUST_BADGES = [
  { icon: Shield, text: 'Clear Legal Titles' },
  { icon: CheckCircle2, text: 'DTCP Approved' },
  { icon: TrendingUp, text: '3x Appreciation' },
  { icon: Star, text: '1,200+ Families Served' },
]

export default async function HomePage() {
  const dbListings = await getFeaturedListings()
  const listings = dbListings.length > 0 ? dbListings : DUMMY_LISTINGS
  const isLive = dbListings.length > 0
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'

  return (
    <div className="bg-[#f8f7f4] min-h-screen">

      {/* ── TOP SEARCH BAR ── */}
      <section className="bg-white border-b border-stone-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
            <div className="flex-1 flex items-center gap-2 bg-stone-100 rounded-xl px-4 py-2.5">
              <Search className="w-4 h-4 text-stone-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search location — Bhogapuram, Vizag, Airport Zone…"
                className="w-full text-sm text-stone-700 placeholder:text-stone-400 bg-transparent outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2.5 bg-stone-100 rounded-xl text-sm text-stone-600 outline-none cursor-pointer border-0">
                <option value="">All Types</option>
                <option>Residential Plot</option>
                <option>Villa Plot</option>
                <option>Commercial Land</option>
                <option>Agricultural Land</option>
              </select>
              <Link href="/listings"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                <Search className="w-4 h-4" /> Search
              </Link>
              <Link href="/listings"
                className="flex items-center gap-2 border border-stone-300 hover:border-emerald-500 text-stone-600 hover:text-emerald-700 px-3 py-2.5 rounded-xl text-sm transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── HEADLINE + CATEGORY PILLS ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Plots & Land in{' '}
              <span className="text-emerald-600">Bhogapuram</span>
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              {listings.length} verified properties · Visakhapatnam District, AP
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {PROPERTY_TYPES.map(({ label, query, emoji }) => (
              <Link key={label} href={`/listings?type=${encodeURIComponent(query)}`}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50 text-stone-700 hover:text-emerald-700 rounded-full text-xs font-semibold transition-all">
                <span>{emoji}</span>{label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── MAIN LISTING GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((listing: any, idx: number) => {
            const img = listing.image || listing.media?.find((m: any) => m.is_cover && m.type === 'image')?.url || listing.media?.[0]?.url
            const href = isLive ? `/listings/${listing.slug}` : '/listings'
            const isFeatured = listing.featured

            return (
              <article key={listing.id}
                className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  isFeatured ? 'border-emerald-200 ring-1 ring-emerald-100' : 'border-stone-200'
                }`}>
                <Link href={href} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    {img ? (
                      <Image src={img} alt={listing.title} fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
                        priority={idx < 3}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
                        <Building2 className="w-12 h-12 text-stone-300" />
                      </div>
                    )}
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {isFeatured && (
                        <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide">
                          ★ FEATURED
                        </span>
                      )}
                      <span className="bg-white/95 text-stone-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {listing.property_type || 'Plot'}
                      </span>
                    </div>
                    {/* Status */}
                    <div className="absolute top-3 right-3">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                        listing.status === 'sale' ? 'bg-amber-500 text-white' : 'bg-sky-500 text-white'
                      }`}>
                        For {listing.status === 'sale' ? 'Sale' : 'Rent'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 pb-3">
                    <p className="text-emerald-700 font-black text-xl tracking-tight">
                      {formatPrice(listing.price, listing.currency)}
                    </p>
                    <h3 className="font-bold text-stone-800 text-sm mt-1 line-clamp-2 group-hover:text-emerald-700 transition-colors leading-snug">
                      {listing.title}
                    </h3>
                    {listing.location && (
                      <div className="flex items-center gap-1 mt-2 text-stone-400 text-xs">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{listing.location}</span>
                      </div>
                    )}
                  </div>
                </Link>

                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    {listing.area_sqft ? (
                      <span className="flex items-center gap-1 text-stone-500 text-xs font-medium">
                        <Square className="w-3.5 h-3.5" />
                        {listing.area_sqft.toLocaleString()} sqft
                      </span>
                    ) : <span />}
                    <a
                      href={getWhatsAppUrl(whatsapp, `Hi! I'm interested in "${listing.title}" at ${formatPrice(listing.price, listing.currency)}. Please share more details.`)}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* ── LOAD MORE ── */}
        <div className="text-center mt-10">
          <Link href="/listings"
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors">
            View All Properties <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── TRUST STRIP ── */}
      <section className="bg-emerald-600 py-5 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
            {TRUST_BADGES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white">
                <Icon className="w-4 h-4 text-emerald-200" />
                <span className="text-sm font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-stone-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { val: '350+', label: 'Plots Sold' },
              { val: '1,200+', label: 'Happy Clients' },
              { val: '12+', label: 'Years Experience' },
              { val: '100%', label: 'Clear Titles' },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="text-3xl font-black text-emerald-400">{val}</div>
                <div className="text-stone-400 text-xs mt-1 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-16 bg-[#f8f7f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Why Bhogapuram Lands?</span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">
              Your Trusted Partner Since 2012
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Shield, title: 'Verified Legal Titles', desc: 'Every plot is legally verified — patta, EC, and ownership documents checked before listing.' },
              { icon: TrendingUp, title: '3x Appreciation Zone', desc: 'Bhogapuram International Airport corridor has seen massive land value growth in 5 years.' },
              { icon: CheckCircle2, title: 'End-to-End Support', desc: 'From site visit to registration — we guide every step of the purchase journey.' },
              { icon: MapPin, title: 'Premium Locations', desc: 'Hand-picked plots near highways, airport zones, and fast-growing townships.' },
              { icon: Phone, title: '7-Day Availability', desc: 'Our team is available 7 days a week — call, email, or WhatsApp anytime.' },
              { icon: Star, title: '1,200+ Families Served', desc: 'A decade of trust, zero disputes, and hundreds of happy investors across Vizag district.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 bg-white rounded-2xl border border-stone-200 hover:border-emerald-300 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm mb-1">{title}</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT + LEAD FORM ── */}
      <section className="py-16 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Get In Touch</span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2 mb-4">
                Looking for the Perfect Plot?
              </h2>
              <p className="text-stone-500 text-sm mb-8 leading-relaxed">
                Share your requirements — our team will respond within 24 hours with the best available options in Bhogapuram and Visakhapatnam.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { Icon: Phone, label: 'Call / WhatsApp', value: whatsapp, href: `tel:${whatsapp}` },
                  { Icon: Mail, label: 'Email Us', value: 'info@bhogapuramlands.com', href: 'mailto:info@bhogapuramlands.com' },
                  { Icon: MapPin, label: 'Office', value: 'Bhogapuram, Visakhapatnam Dist., AP 531163', href: null },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wide">{label}</p>
                      {href ? (
                        <a href={href} className="text-stone-800 font-bold text-sm hover:text-emerald-700 transition-colors">{value}</a>
                      ) : (
                        <p className="text-stone-800 font-bold text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {['Bhogapuram', 'Atchutapuram', 'Nakkapalle', 'Anakapalle', 'Visakhapatnam', 'Airport Zone'].map((area) => (
                  <Link key={area} href={`/listings?location=${encodeURIComponent(area)}`}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-700 border border-stone-200 hover:border-emerald-300 text-stone-600 text-xs font-semibold rounded-full transition-all">
                    {area}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-stone-50 rounded-3xl border border-stone-200 p-8">
              <h3 className="text-xl font-black text-stone-900 mb-1">Send an Enquiry</h3>
              <p className="text-stone-400 text-sm mb-6">We reply within 24 hours — usually much faster!</p>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
