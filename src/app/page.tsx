import Link from 'next/link'
import Image from 'next/image'
import { Search, ArrowRight, Building2, Palette, MapPin, Bed, Bath, Square, MessageCircle, CheckCircle, TreePine, TrendingUp, Home } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { ProjectCard } from '@/components/interior/project-card'
import { LeadForm } from '@/components/forms/lead-form'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice, getWhatsAppUrl } from '@/lib/utils'
import type { ListingWithMedia, ProjectWithMedia } from '@/types/database'

async function getFeaturedListings(): Promise<ListingWithMedia[]> {
  try {
    const supabase = await createClient()
    const { data } = await (supabase as any)
      .from('listings')
      .select('*, media(*)')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(6)
    return (data as ListingWithMedia[]) || []
  } catch {
    return []
  }
}

async function getFeaturedProjects(): Promise<ProjectWithMedia[]> {
  try {
    const supabase = await createClient()
    const { data } = await (supabase as any)
      .from('interior_projects')
      .select('*, media(*)')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3)
    return (data as ProjectWithMedia[]) || []
  } catch {
    return []
  }
}

const DUMMY_LISTINGS = [
  {
    id: 'd1', title: 'Prime Residential Plot — Gated Community', slug: '#',
    price: 1200000, currency: 'USD', status: 'sale', location: 'Green Valley, Sector 12',
    area_sqft: 4500, bedrooms: null, bathrooms: null, featured: true,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    type: 'Land / Plot',
  },
  {
    id: 'd2', title: 'Commercial Land Near Highway Junction', slug: '#',
    price: 3500000, currency: 'USD', status: 'sale', location: 'Industrial Zone, Block A',
    area_sqft: 12000, bedrooms: null, bathrooms: null, featured: false,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    type: 'Commercial Land',
  },
  {
    id: 'd3', title: 'Luxury Villa Plot with Lake View', slug: '#',
    price: 850000, currency: 'USD', status: 'sale', location: 'Lakeside Residency, Phase 2',
    area_sqft: 6000, bedrooms: null, bathrooms: null, featured: true,
    image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&q=80',
    type: 'Villa Plot',
  },
  {
    id: 'd4', title: 'Agricultural Land — Irrigation Ready', slug: '#',
    price: 420000, currency: 'USD', status: 'sale', location: 'Rural Outskirts, Farm Belt',
    area_sqft: 43560, bedrooms: null, bathrooms: null, featured: false,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
    type: 'Agricultural',
  },
  {
    id: 'd5', title: 'Corner Plot in Prime Downtown Area', slug: '#',
    price: 2100000, currency: 'USD', status: 'sale', location: 'City Centre, Main Road',
    area_sqft: 3200, bedrooms: null, bathrooms: null, featured: false,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    type: 'Commercial Land',
  },
  {
    id: 'd6', title: 'Affordable Residential Plot — New Township', slug: '#',
    price: 280000, currency: 'USD', status: 'sale', location: 'New Township, East Wing',
    area_sqft: 2400, bedrooms: null, bathrooms: null, featured: false,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    type: 'Land / Plot',
  },
]

const DUMMY_PROJECTS = [
  {
    id: 'p1', title: 'Modern Minimalist Living Room', slug: '#', category: 'residential',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  },
  {
    id: 'p2', title: 'Luxury Master Suite Redesign', slug: '#', category: 'luxury',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
  },
  {
    id: 'p3', title: 'Contemporary Office Interior', slug: '#', category: 'office',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  },
]

const STATS = [
  { label: 'Plots & Lands Sold', value: '350+' },
  { label: 'Happy Clients', value: '1,200+' },
  { label: 'Design Projects', value: '300+' },
  { label: 'Years Experience', value: '15+' },
]

const FEATURES = [
  'Clear title & legal documentation',
  'Prime location plots & land',
  'Professional interior design',
  'End-to-end purchase support',
  'Market analysis & valuation',
  'Post-sale construction guidance',
]

export default async function HomePage() {
  const [dbListings, dbProjects] = await Promise.all([getFeaturedListings(), getFeaturedProjects()])
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'

  return (
    <>
      {/* Compact Hero */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-14 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/50" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-1.5 text-amber-300 text-xs font-medium mb-4">
            Plot / Land Sales &amp; Interior Design Experts
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Find Your Perfect <span className="text-amber-400">Plot of Land</span><br className="hidden sm:block" /> &amp; Design Dream Spaces
          </h1>
          <p className="text-slate-300 text-base mb-8 max-w-xl mx-auto">
            Premium plots across prime locations — plus bespoke interior design. All in one place.
          </p>
          <div className="flex gap-2 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search location or plot type..."
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <Link href="/listings">
              <Button size="lg" className="whitespace-nowrap">Search</Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-5 text-xs">
            {['Residential Plots', 'Commercial Land', 'Villa Plots', 'Agricultural Land'].map((t) => (
              <Link key={t} href="/listings" className="bg-white/10 hover:bg-amber-500/20 border border-white/20 hover:border-amber-400/40 text-slate-300 hover:text-amber-300 px-3 py-1.5 rounded-full transition-all">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-amber-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {STATS.map(({ label, value }) => (
              <div key={label}>
                <div className="text-2xl sm:text-3xl font-bold">{value}</div>
                <div className="text-amber-100 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-amber-600 text-xs font-semibold mb-1 uppercase tracking-wide">
                <Building2 className="w-3.5 h-3.5" /> Featured Plots &amp; Properties
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Latest Listings</h2>
            </div>
            <Link href="/listings" className="flex items-center gap-1 text-amber-600 hover:text-amber-700 text-sm font-medium">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {dbListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {dbListings.map((listing) => {
                const cover = listing.media?.find((m: any) => m.is_cover && m.type === 'image') || listing.media?.find((m: any) => m.type === 'image')
                return (
                  <article key={listing.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow group">
                    <Link href={`/listings/${listing.slug}`}>
                      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                        {cover ? (
                          <Image src={cover.url} alt={listing.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                            <Building2 className="w-10 h-10 text-slate-300" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <Badge variant={listing.status === 'sale' ? 'info' : 'success'}>For {listing.status === 'sale' ? 'Sale' : 'Rent'}</Badge>
                        </div>
                        {listing.featured && <div className="absolute top-3 right-3"><Badge variant="warning">Featured</Badge></div>}
                      </div>
                      <div className="p-4">
                        <p className="text-amber-600 font-bold text-lg">{formatPrice(listing.price, listing.currency)}</p>
                        <h3 className="font-semibold text-slate-900 mt-0.5 line-clamp-1 group-hover:text-amber-600 transition-colors">{listing.title}</h3>
                        <div className="flex items-center gap-1 mt-1 text-slate-400 text-xs"><MapPin className="w-3 h-3" /> {listing.location}</div>
                        {listing.area_sqft && <div className="flex items-center gap-1 mt-2 text-slate-500 text-xs"><Square className="w-3 h-3" /> {listing.area_sqft.toLocaleString()} sqft</div>}
                      </div>
                    </Link>
                    <div className="px-4 pb-4">
                      <a href={getWhatsAppUrl(whatsapp, `Hi! I'm interested in "${listing.title}". Please provide more info.`)} target="_blank" rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors">
                        <MessageCircle className="w-3.5 h-3.5" /> Inquire on WhatsApp
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DUMMY_LISTINGS.map((listing) => (
                <article key={listing.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow group">
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <Image src={listing.image} alt={listing.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="info">For Sale</Badge>
                      {listing.featured && <Badge variant="warning">Featured</Badge>}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-slate-900/70 text-white text-xs px-2 py-1 rounded-full">{listing.type}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-amber-600 font-bold text-lg">{formatPrice(listing.price, listing.currency)}</p>
                    <h3 className="font-semibold text-slate-900 mt-0.5 line-clamp-1 group-hover:text-amber-600 transition-colors">{listing.title}</h3>
                    <div className="flex items-center gap-1 mt-1 text-slate-400 text-xs"><MapPin className="w-3 h-3" /> {listing.location}</div>
                    <div className="flex items-center gap-1 mt-2 text-slate-500 text-xs"><Square className="w-3 h-3" /> {listing.area_sqft.toLocaleString()} sqft</div>
                  </div>
                  <div className="px-4 pb-4">
                    <a href={getWhatsAppUrl(whatsapp, `Hi! I'm interested in "${listing.title}". Please provide more info.`)} target="_blank" rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" /> Inquire on WhatsApp
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interior Design */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                <Palette className="w-3.5 h-3.5" /> Interior Design
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Transform Your Space</h2>
            </div>
            <Link href="/portfolio" className="flex items-center gap-1 text-amber-400 hover:text-amber-300 text-sm font-medium">
              Full portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {(dbProjects.length > 0 ? dbProjects : DUMMY_PROJECTS).map((project: any) => {
              const image = dbProjects.length > 0
                ? project.media?.find((m: any) => m.is_cover)?.url || project.media?.[0]?.url
                : project.image
              return (
                <Link key={project.id} href={dbProjects.length > 0 ? `/portfolio/${project.slug}` : '/portfolio'} className="group relative rounded-2xl overflow-hidden aspect-[4/3] block">
                  {image ? (
                    <Image src={image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px)100vw,33vw" />
                  ) : (
                    <div className="absolute inset-0 bg-slate-700 flex items-center justify-center">
                      <Palette className="w-10 h-10 text-slate-500" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-xs text-amber-400 font-medium capitalize">{project.category}</span>
                    <h3 className="text-white font-semibold text-sm mt-0.5">{project.title}</h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Us + Lead Form */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-amber-600 text-xs font-semibold uppercase tracking-wide mb-2">Why Choose Us</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Your Trusted Partner for Plots &amp; Beautiful Interiors
            </h2>
            <p className="text-slate-500 text-sm mb-7">
              We combine expertise in plot &amp; land sales with world-class interior design — find the perfect land and build the perfect space, all in one place.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link href="/listings"><Button size="lg">Browse Plots</Button></Link>
              <Link href="/portfolio"><Button size="lg" variant="outline">Design Portfolio</Button></Link>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Get in Touch</h3>
            <p className="text-slate-400 text-sm mb-5">Interested in a plot or our design services? We'll call you back.</p>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  )
}
