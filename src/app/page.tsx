import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, Building2, MapPin, Square,
  Phone, Mail, Waves, Wind, Sun, Shell, Anchor, Search,
  SlidersHorizontal, TreePine, Star
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

async function getLocations(): Promise<any[]> {
  try {
    const supabase = await createClient()
    const { data } = await (supabase as any)
      .from('locations').select('*').eq('active', true)
      .order('sort_order', { ascending: true })
    return data || []
  } catch { return [] }
}

const DUMMY_LISTINGS = [
  {
    id: 'd1', title: 'Open Plot — 200 Sq Yards, East Facing',
    slug: '#', price: 1800000, currency: 'INR', status: 'sale',
    location: 'Bheemunipatnam, Visakhapatnam', area_sqft: 200,
    featured: true, category: 'Open Plots', property_type: 'Open Plots', area_unit: 'Sq Yard',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80',
  },
  {
    id: 'd2', title: 'Agriculture Land — 5 Cents, Fertile Coastal Soil',
    slug: '#', price: 950000, currency: 'INR', status: 'sale',
    location: 'Nakkapalle Coast, Visakhapatnam', area_sqft: 5,
    featured: true, category: 'Agriculture Land', property_type: 'Agriculture Land', area_unit: 'Cents',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
  },
  {
    id: 'd3', title: '2BHK Flat — Sea View, Ready to Move',
    slug: '#', price: 4500000, currency: 'INR', status: 'sale',
    location: 'Rushikonda Hills, Visakhapatnam', area_sqft: 1150,
    featured: false, category: 'Residential', property_type: 'Flats', area_unit: 'Sq Feet',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  },
  {
    id: 'd4', title: 'Independent House — 3BHK, Corner Plot',
    slug: '#', price: 6800000, currency: 'INR', status: 'sale',
    location: 'Bheemili, Visakhapatnam', area_sqft: 1800,
    featured: false, category: 'Residential', property_type: 'Independent House', area_unit: 'Sq Feet',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  },
  {
    id: 'd5', title: 'Shop Space — Prime Location, High Footfall',
    slug: '#', price: 3200000, currency: 'INR', status: 'sale',
    location: 'Vizag Beach Road, Visakhapatnam', area_sqft: 450,
    featured: false, category: 'Commercial', property_type: 'Shop', area_unit: 'Sq Feet',
    image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80',
  },
  {
    id: 'd6', title: 'Open Plot — 300 Sq Yards, Gated Layout',
    slug: '#', price: 2700000, currency: 'INR', status: 'sale',
    location: 'Bhogapuram Coast, Visakhapatnam', area_sqft: 300,
    featured: false, category: 'Open Plots', property_type: 'Open Plots', area_unit: 'Sq Yard',
    image: 'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=800&q=80',
  },
  {
    id: 'd7', title: 'Villa — Luxury 4BHK, Private Garden',
    slug: '#', price: 12000000, currency: 'INR', status: 'sale',
    location: 'Rishikonda Hills, Visakhapatnam', area_sqft: 3200,
    featured: false, category: 'Residential', property_type: 'Villa', area_unit: 'Sq Feet',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
  },
  {
    id: 'd8', title: 'Agriculture Land — 10 Cents Near Highway',
    slug: '#', price: 1800000, currency: 'INR', status: 'sale',
    location: 'Airport Zone, Visakhapatnam', area_sqft: 10,
    featured: false, category: 'Agriculture Land', property_type: 'Agriculture Land', area_unit: 'Cents',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
  },
  {
    id: 'd9', title: 'Warehouse — 5000 Sq Ft Industrial Space',
    slug: '#', price: 8500000, currency: 'INR', status: 'sale',
    location: 'Bhogapuram Coast, Visakhapatnam', area_sqft: 5000,
    featured: false, category: 'Commercial', property_type: 'Warehouse', area_unit: 'Sq Feet',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  },
]

const PROPERTY_TYPES = [
  { label: 'Agriculture Land', query: 'Agriculture Land', emoji: '🌾', desc: 'Measured in Cents' },
  { label: 'Open Plots', query: 'Open Plots', emoji: '🏞️', desc: 'Measured in Sq Yard' },
  { label: 'Residential', query: 'Residential', emoji: '🏠', desc: 'Flats, Villas, Houses' },
  { label: 'Commercial', query: 'Commercial', emoji: '🏢', desc: 'Office, Shop, Warehouse' },
]

const COASTAL_HIGHLIGHTS = [
  { icon: Sun, title: 'Year-Round Sunshine', desc: 'Visakhapatnam enjoys 300+ sunny days a year with warm, breezy coastal weather all year long.' },
  { icon: Waves, title: 'Bay of Bengal Shoreline', desc: 'Miles of pristine sandy beaches, turquoise waters, and dramatic cliffs along the AP coastline.' },
  { icon: TreePine, title: 'Lush Green Surroundings', desc: 'Casuarina groves, coconut palms, and mangroves create a serene natural coastal environment.' },
  { icon: Anchor, title: 'Port City Growth', desc: 'Visakhapatnam expanding port, IT corridor, and tourism boom make coastal land an exceptional investment.' },
  { icon: Wind, title: 'Fresh Sea Breeze Daily', desc: 'Wake up every day to cool ocean winds and the soothing sound of waves — true coastal living.' },
  { icon: Star, title: 'Top Rated Beaches', desc: 'Bheemunipatnam, Rushikonda, and Bheemili rank among India most scenic and cleanest beaches.' },
]

const BEACHES_NEARBY = [
  { name: 'Bheemunipatnam Beach', dist: '2 km', note: 'Widest beach in AP — golden sands, lighthouse view' },
  { name: 'Rushikonda Beach', dist: '8 km', note: 'Blue Flag certified, water sports, hill backdrop' },
  { name: 'Bheemili Beach', dist: '4 km', note: 'Serene, uncrowded, historic Dutch fort nearby' },
  { name: 'Yarada Beach', dist: '35 km', note: 'Secluded cove between mountains, most scenic' },
  { name: 'Rishikonda Hills', dist: '10 km', note: 'Elevated sea views, sunrise & sunset hotspot' },
  { name: 'Mangamaripeta Beach', dist: '6 km', note: 'Peaceful fishing village beach, raw coastal charm' },
]

const WA_SVG = (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const FALLBACK_LOCATION_GROUPS = [
  { name: 'Bheemunipatnam', emoji: '🏖️', description: 'Widest beach in AP — golden sands & lighthouse', color: 'from-cyan-500 to-blue-600' },
  { name: 'Rushikonda', emoji: '🌊', description: 'Blue Flag beach — hills, water sports, sunrise views', color: 'from-sky-500 to-cyan-600' },
  { name: 'Bheemili', emoji: '🐚', description: 'Serene seafront — Dutch fort, uncrowded shores', color: 'from-teal-500 to-cyan-600' },
  { name: 'Rishikonda Hills', emoji: '⛰️', description: 'Elevated coastal plots — panoramic 180° sea views', color: 'from-blue-500 to-indigo-600' },
  { name: 'Vizag Beach Road', emoji: '🛣️', description: 'Prime Beach Road — high-value commercial & residential', color: 'from-cyan-600 to-sky-700' },
  { name: 'Bhogapuram Coast', emoji: '🌅', description: 'Near Airport — fastest appreciating coastal belt', color: 'from-orange-400 to-cyan-600' },
]

export default async function HomePage() {
  const [dbListings, dbLocations] = await Promise.all([getFeaturedListings(), getLocations()])
  const allListings = dbListings.length > 0 ? dbListings : DUMMY_LISTINGS
  const isLive = dbListings.length > 0
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'

  const locationGroups = dbLocations.length > 0 ? dbLocations : FALLBACK_LOCATION_GROUPS

  // Group listings by property category
  const CATEGORY_META: Record<string, { emoji: string; color: string; unit: string }> = {
    'Agriculture Land': { emoji: '🌾', color: 'from-green-500 to-emerald-600', unit: 'Cents' },
    'Open Plots':       { emoji: '🏞️', color: 'from-cyan-500 to-blue-600',    unit: 'Sq Yard' },
    'Residential':      { emoji: '🏠', color: 'from-orange-400 to-amber-500', unit: 'Sq Feet' },
    'Commercial':       { emoji: '🏢', color: 'from-violet-500 to-purple-600', unit: 'Sq Feet' },
  }

  const grouped = Object.entries(CATEGORY_META).map(([cat, meta]) => ({
    area: cat, ...meta,
    desc: `Unit: ${meta.unit}`,
    listings: allListings.filter((l: any) =>
      (l.category || '').toLowerCase() === cat.toLowerCase() ||
      (l.property_type || '').toLowerCase().includes(cat.toLowerCase())
    ),
  })).filter(g => g.listings.length > 0)

  const groupedIds = new Set(grouped.flatMap(g => g.listings.map((l: any) => l.id)))
  const otherListings = allListings.filter((l: any) => !groupedIds.has(l.id))

  return (
    <div className="bg-sky-50">

      {/* ── SEARCH BAR ── */}
      <section className="bg-white border-b border-cyan-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 bg-sky-50 rounded-xl px-4 py-2.5 border border-sky-100">
              <Search className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <input type="text"
                placeholder="Search beach area — Bheemunipatnam, Rushikonda, Vizag Beach Road…"
                className="w-full text-sm text-slate-700 placeholder:text-slate-400 bg-transparent outline-none" />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2.5 bg-sky-50 border border-sky-100 rounded-xl text-sm text-slate-600 outline-none cursor-pointer">
                <option value="">All Categories</option>
                <option>Agriculture Land</option>
                <option>Open Plots</option>
                <option>Residential</option>
                <option>Commercial</option>
              </select>
              <Link href="/listings"
                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                <Search className="w-4 h-4" /> Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── PAGE TITLE ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Waves className="w-5 h-5 text-cyan-500" />
            <span className="text-xs font-bold tracking-widest text-cyan-600 uppercase">Bay of Bengal Coastal Properties</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-cyan-950 tracking-tight">
            Beach & Sea View Land in <span className="text-cyan-600">Visakhapatnam</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">{allListings.length} verified coastal properties across {locationGroups.length}+ prime beach locations · Andhra Pradesh</p>
        </div>

        {/* ── CATEGORY QUICK LINKS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {PROPERTY_TYPES.map(({ label, query, emoji, desc }) => (
            <Link key={label} href={`/listings?category=${encodeURIComponent(query)}`}
              className="group bg-white rounded-2xl border-2 border-cyan-100 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-100 transition-all p-4 text-center">
              <div className="text-3xl mb-2">{emoji}</div>
              <div className="font-black text-cyan-900 text-sm">{label}</div>
              <div className="text-slate-400 text-xs mt-0.5">{desc}</div>
            </Link>
          ))}
        </div>

        {/* ── LISTINGS GROUPED BY LOCATION ── */}
        <div className="space-y-12">
          {grouped.map(({ area, emoji, color, listings }) => (
            <div key={area}>
              {/* Location heading */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-lg`}>
                    {emoji}
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-cyan-950">{area}</h2>
                    <p className="text-xs text-slate-400">{listings.length} propert{listings.length === 1 ? 'y' : 'ies'} available</p>
                  </div>
                </div>
                <Link href={`/listings?location=${encodeURIComponent(area)}`}
                  className="flex items-center gap-1 text-xs font-bold text-cyan-600 hover:text-cyan-800 transition-colors">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {listings.slice(0, 3).map((listing: any, idx: number) => {
                  const img = listing.image || listing.media?.find((m: any) => m.is_cover && m.type === 'image')?.url || listing.media?.[0]?.url
                  const href = isLive ? `/listings/${listing.slug}` : '/listings'
                  return (
                    <article key={listing.id}
                      className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-200/50 hover:-translate-y-1 ${listing.featured ? 'border-cyan-300 ring-2 ring-cyan-100' : 'border-cyan-100'}`}>
                      <Link href={href} className="block">
                        <div className="relative aspect-[4/3] overflow-hidden bg-sky-100">
                          {img ? (
                            <Image src={img} alt={listing.title} fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                              sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
                              priority={idx === 0} />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-cyan-200 flex items-center justify-center">
                              <Waves className="w-12 h-12 text-cyan-300" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/60 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            {listing.featured && <span className="bg-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full">🌊 FEATURED</span>}
                            <span className="bg-white/90 backdrop-blur-sm text-cyan-800 text-[10px] font-bold px-2.5 py-1 rounded-full">{listing.property_type || 'Coastal Plot'}</span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm ${listing.status === 'sale' ? 'bg-cyan-600 text-white' : 'bg-sky-400 text-white'}`}>
                              For {listing.status === 'sale' ? 'Sale' : 'Rent'}
                            </span>
                          </div>
                          <div className="absolute bottom-3 left-3">
                            <p className="text-white font-black text-lg drop-shadow-lg">{formatPrice(listing.price, listing.currency)}</p>
                          </div>
                        </div>
                        <div className="p-4 pb-3">
                          <h3 className="font-bold text-slate-800 text-sm line-clamp-2 group-hover:text-cyan-700 transition-colors leading-snug">{listing.title}</h3>
                          {listing.location && (
                            <div className="flex items-center gap-1 mt-2 text-slate-400 text-xs">
                              <MapPin className="w-3 h-3 flex-shrink-0 text-orange-400" />
                              <span className="truncate">{listing.location}</span>
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="px-4 pb-4">
                        <div className="flex items-center justify-between pt-3 border-t border-sky-100">
                          {listing.area_sqft ? (
                            <span className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                              <Square className="w-3.5 h-3.5 text-cyan-400" />{listing.area_sqft.toLocaleString()} sqft
                            </span>
                          ) : <span />}
                          <a href={getWhatsAppUrl(whatsapp, `Hi! I'm interested in "${listing.title}" (${formatPrice(listing.price, listing.currency)}) in ${area}. Please share details.`)}
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center w-9 h-9 bg-[#25D366] hover:bg-[#1ebe5d] rounded-xl transition-colors" aria-label="WhatsApp">
                            {WA_SVG}
                          </a>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Other listings not matching a defined area */}
          {otherListings.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-lg">🗺️</div>
                  <div>
                    <h2 className="text-lg font-black text-cyan-950">More Coastal Properties</h2>
                    <p className="text-xs text-slate-400">{otherListings.length} additional propert{otherListings.length === 1 ? 'y' : 'ies'}</p>
                  </div>
                </div>
                <Link href="/listings" className="flex items-center gap-1 text-xs font-bold text-cyan-600 hover:text-cyan-800 transition-colors">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {otherListings.slice(0, 3).map((listing: any) => {
                  const img = listing.image || listing.media?.find((m: any) => m.is_cover && m.type === 'image')?.url || listing.media?.[0]?.url
                  const href = isLive ? `/listings/${listing.slug}` : '/listings'
                  return (
                    <article key={listing.id} className="group bg-white rounded-2xl overflow-hidden border border-cyan-100 hover:border-cyan-300 hover:shadow-xl transition-all hover:-translate-y-1">
                      <Link href={href} className="block">
                        <div className="relative aspect-[4/3] overflow-hidden bg-sky-100">
                          {img ? <Image src={img} alt={listing.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" />
                            : <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-cyan-200 flex items-center justify-center"><Waves className="w-12 h-12 text-cyan-300" /></div>}
                          <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/60 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3"><p className="text-white font-black text-lg drop-shadow-lg">{formatPrice(listing.price, listing.currency)}</p></div>
                        </div>
                        <div className="p-4 pb-3">
                          <h3 className="font-bold text-slate-800 text-sm line-clamp-2 group-hover:text-cyan-700 transition-colors">{listing.title}</h3>
                          {listing.location && <div className="flex items-center gap-1 mt-2 text-slate-400 text-xs"><MapPin className="w-3 h-3 text-orange-400" /><span className="truncate">{listing.location}</span></div>}
                        </div>
                      </Link>
                      <div className="px-4 pb-4 pt-3 border-t border-sky-100 flex items-center justify-between">
                        {listing.area_sqft ? <span className="flex items-center gap-1 text-slate-500 text-xs"><Square className="w-3.5 h-3.5 text-cyan-400" />{listing.area_sqft.toLocaleString()} sqft</span> : <span />}
                        <a href={getWhatsAppUrl(whatsapp, `Hi! I'm interested in "${listing.title}". Please share details.`)} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center w-9 h-9 bg-[#25D366] hover:bg-[#1ebe5d] rounded-xl transition-colors" aria-label="WhatsApp">{WA_SVG}</a>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link href="/listings"
            className="inline-flex items-center gap-2 bg-cyan-700 hover:bg-cyan-800 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-cyan-200">
            View All Coastal Properties <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── BEACHES NEARBY ── */}
      <section className="py-16 bg-gradient-to-b from-sky-50 to-cyan-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shell className="w-5 h-5 text-orange-400" />
              <span className="text-xs font-bold tracking-widest text-cyan-700 uppercase">Pristine Shorelines Nearby</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-cyan-950">
              World-Class Beaches at Your Doorstep
            </h2>
            <p className="text-cyan-700 text-sm mt-2 max-w-2xl mx-auto">
              Our properties are located minutes from some of India most beautiful beaches — golden sands, clear waters, and breathtaking coastal scenery.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BEACHES_NEARBY.map(({ name, dist, note }) => (
              <div key={name}
                className="flex gap-4 p-5 bg-white/80 backdrop-blur rounded-2xl border border-cyan-200 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-100 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <Waves className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-cyan-900 text-sm">{name}</h4>
                    <span className="text-[10px] font-black bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">{dist}</span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COASTAL LIVING HIGHLIGHTS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sun className="w-5 h-5 text-orange-400" />
              <span className="text-xs font-bold tracking-widest text-cyan-600 uppercase">Why Coastal Living?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-cyan-950">
              Life is Better by the Ocean
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-2xl mx-auto">
              Visakhapatnam coastline offers more than just a view — it is a lifestyle of fresh air, natural beauty, and rising property values.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COASTAL_HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
              <div key={title}
                className="group p-6 rounded-2xl border border-sky-100 hover:border-cyan-300 bg-sky-50 hover:bg-white hover:shadow-lg hover:shadow-cyan-100 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-cyan-900 text-sm mb-2">{title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OCEAN VIEW BANNER ── */}
      <section className="relative h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=85"
          alt="Bay of Bengal coastline Visakhapatnam"
          fill className="object-cover" sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/80 via-cyan-900/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              <span className="text-orange-300 text-xs font-bold tracking-widest uppercase">Own a Piece of Paradise</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 leading-tight">
                Wake Up to the Sound<br />of the Ocean Every Day
              </h2>
              <p className="text-cyan-200 text-sm mt-3 leading-relaxed">
                Our beachfront and sea view plots put you steps from the Bay of Bengal. Verified titles, legal clearance, and expert coastal real estate guidance.
              </p>
              <div className="flex gap-3 mt-6">
                <Link href="/listings"
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl text-sm transition-colors">
                  Browse Properties
                </Link>
                <a href={getWhatsAppUrl(whatsapp, 'Hi! I want to know about beach and sea view plots in Visakhapatnam.')}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl transition-colors" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-gradient-to-r from-cyan-700 to-blue-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { val: '120+', label: 'Coastal Plots Sold', icon: '🏖️' },
              { val: '800+', label: 'Happy Buyers', icon: '🌊' },
              { val: '50 km', label: 'Coastline Coverage', icon: '⛵' },
              { val: '100%', label: 'Clear Titles', icon: '✅' },
            ].map(({ val, label, icon }) => (
              <div key={label} className="text-white">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-3xl font-black text-white">{val}</div>
                <div className="text-cyan-200 text-xs mt-1 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT + LEAD FORM ── */}
      <section className="py-16 bg-sky-50 border-t border-cyan-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shell className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-bold tracking-widest text-cyan-600 uppercase">Get In Touch</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-cyan-950 mb-4">
                Find Your Perfect<br />
                <span className="text-cyan-600">Beach Property</span>
              </h2>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Whether you're looking for a beachfront plot, sea view villa site, or a coastal investment land — our expert team will find the best options for you along the Visakhapatnam coastline.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { Icon: Phone, label: 'Call / WhatsApp', value: whatsapp, href: `tel:${whatsapp}` },
                  { Icon: Mail, label: 'Email Us', value: 'info@coastallandsvizag.com', href: 'mailto:info@coastallandsvizag.com' },
                  { Icon: MapPin, label: 'Office', value: 'Beach Road, Bhogapuram, Visakhapatnam, AP 531163', href: null },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-cyan-100 shadow-sm">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">{label}</p>
                      {href ? (
                        <a href={href} className="text-slate-800 font-bold text-sm hover:text-cyan-700 transition-colors">{value}</a>
                      ) : (
                        <p className="text-slate-800 font-bold text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Beach area chips */}
              <div>
                <p className="text-xs font-bold text-cyan-700 uppercase tracking-widest mb-3">Coastal Areas We Cover</p>
                <div className="flex flex-wrap gap-2">
                  {['Bheemunipatnam', 'Rushikonda', 'Bheemili', 'Rishikonda', 'Vizag Beach Road', 'Bhogapuram Coast'].map((area) => (
                    <Link key={area} href={`/listings?location=${encodeURIComponent(area)}`}
                      className="px-3 py-1.5 bg-white border border-cyan-200 hover:bg-cyan-50 hover:border-cyan-400 text-cyan-700 text-xs font-semibold rounded-full transition-all flex items-center gap-1">
                      <Waves className="w-3 h-3" />{area}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-cyan-100 shadow-xl shadow-cyan-100/50 p-8">
              <div className="flex items-center gap-2 mb-1">
                <Waves className="w-5 h-5 text-cyan-500" />
                <h3 className="text-xl font-black text-cyan-950">Send an Enquiry</h3>
              </div>
              <p className="text-slate-400 text-sm mb-6">Tell us your beach property dream — we'll make it real.</p>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
