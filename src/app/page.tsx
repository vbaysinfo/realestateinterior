import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, Building2, Palette, MapPin, Square,
  MessageCircle, CheckCircle, Phone, Mail, Star
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { LeadForm } from '@/components/forms/lead-form'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice, getWhatsAppUrl } from '@/lib/utils'
import type { ListingWithMedia, ProjectWithMedia } from '@/types/database'

async function getFeaturedListings(): Promise<ListingWithMedia[]> {
  try {
    const supabase = await createClient()
    const { data } = await (supabase as any)
      .from('listings').select('*, media(*)').eq('published', true)
      .order('created_at', { ascending: false }).limit(6)
    return (data as ListingWithMedia[]) || []
  } catch { return [] }
}

async function getFeaturedProjects(): Promise<ProjectWithMedia[]> {
  try {
    const supabase = await createClient()
    const { data } = await (supabase as any)
      .from('interior_projects').select('*, media(*)').eq('published', true)
      .order('created_at', { ascending: false }).limit(3)
    return (data as ProjectWithMedia[]) || []
  } catch { return [] }
}

const DUMMY_LISTINGS = [
  { id: 'd1', title: 'Prime Residential Plot — Gated Community', slug: '#', price: 1200000, currency: 'USD', status: 'sale', location: 'Green Valley, Sector 12', area_sqft: 4500, featured: true, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', type: 'Land / Plot' },
  { id: 'd2', title: 'Commercial Land Near Highway Junction', slug: '#', price: 3500000, currency: 'USD', status: 'sale', location: 'Industrial Zone, Block A', area_sqft: 12000, featured: false, image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', type: 'Commercial' },
  { id: 'd3', title: 'Luxury Villa Plot with Lake View', slug: '#', price: 850000, currency: 'USD', status: 'sale', location: 'Lakeside Residency, Phase 2', area_sqft: 6000, featured: true, image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80', type: 'Villa Plot' },
  { id: 'd4', title: 'Agricultural Land — Irrigation Ready', slug: '#', price: 420000, currency: 'USD', status: 'sale', location: 'Rural Outskirts, Farm Belt', area_sqft: 43560, featured: false, image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80', type: 'Agricultural' },
  { id: 'd5', title: 'Corner Plot in Prime Downtown Area', slug: '#', price: 2100000, currency: 'USD', status: 'sale', location: 'City Centre, Main Road', area_sqft: 3200, featured: false, image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', type: 'Commercial' },
  { id: 'd6', title: 'Affordable Plot — New Township', slug: '#', price: 280000, currency: 'USD', status: 'sale', location: 'New Township, East Wing', area_sqft: 2400, featured: false, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', type: 'Land / Plot' },
]

const DUMMY_PROJECTS = [
  { id: 'p1', title: 'Modern Minimalist Living Room', slug: '#', category: 'Residential', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
  { id: 'p2', title: 'Luxury Master Suite Redesign', slug: '#', category: 'Luxury', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80' },
  { id: 'p3', title: 'Contemporary Office Interior', slug: '#', category: 'Office', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
]

const STATS = [
  { value: '350+', label: 'Plots Sold' },
  { value: '1,200+', label: 'Happy Clients' },
  { value: '300+', label: 'Design Projects' },
  { value: '15+', label: 'Years Experience' },
]

export default async function HomePage() {
  const [dbListings, dbProjects] = await Promise.all([getFeaturedListings(), getFeaturedProjects()])
  const listings = dbListings.length > 0 ? dbListings : DUMMY_LISTINGS
  const projects = dbProjects.length > 0 ? dbProjects : DUMMY_PROJECTS
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'
  const isLiveListing = dbListings.length > 0
  const isLiveProject = dbProjects.length > 0

  return (
    <div className="bg-white">

      {/* ═══ ABOVE-THE-FOLD: Split layout ═══ */}
      <section className="relative min-h-[60vh] flex flex-col lg:flex-row overflow-hidden">

        {/* Left — text + stats */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-10 lg:w-1/2 bg-white">
          {/* Decorative accent */}
          <div className="absolute top-0 left-0 w-1 h-32 bg-amber-500 rounded-b-full" />

          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-600 uppercase mb-6">
            <span className="w-8 h-px bg-amber-500 inline-block" />
            Plot Sales &amp; Interior Design
          </span>

          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-slate-900 leading-[1.05] mb-4">
            Your Dream<br />
            <span className="relative inline-block">
              <span className="relative z-10 text-white px-3">Land</span>
              <span className="absolute inset-0 bg-amber-500 rounded-md -rotate-1 z-0" />
            </span>{' '}
            Starts<br />
            Here.
          </h1>

          <p className="text-slate-500 text-base leading-relaxed mb-6 max-w-md">
            Discover prime plots across the city — residential, commercial, villa &amp; agricultural. Plus expert interior design to make every space extraordinary.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/listings">
              <Button size="lg" className="rounded-full px-8 shadow-lg shadow-amber-200">
                Explore Plots
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Design Portfolio
              </Button>
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-4 pt-8 border-t border-slate-100">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-black text-slate-900">{value}</div>
                <div className="text-xs text-slate-400 mt-0.5 leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — stacked image collage */}
        <div className="relative lg:w-1/2 min-h-[50vh] lg:min-h-full overflow-hidden bg-slate-900">
          {/* Main bg image */}
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=85"
            alt="Prime land"
            fill
            className="object-cover opacity-60"
            priority
            sizes="(max-width:1024px)100vw,50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-transparent to-amber-900/30" />

          {/* Floating card — featured listing */}
          <div className="absolute bottom-8 left-6 right-6 sm:left-8 sm:right-auto sm:w-72 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative">
                <Image src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=200&q=80" alt="Plot" fill className="object-cover" sizes="56px" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-amber-600 font-semibold">Featured Plot</span>
                </div>
                <p className="text-slate-900 font-bold text-sm leading-tight truncate">Luxury Villa Plot — Lake View</p>
                <p className="text-slate-500 text-xs mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" /> Lakeside Residency</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
              <span className="text-amber-600 font-black text-lg">$850,000</span>
              <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full font-medium">6,000 sqft</span>
            </div>
          </div>

          {/* Top-right tag */}
          <div className="absolute top-8 right-6 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            350+ Plots Available
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE STRIP ═══ */}
      <div className="bg-slate-900 text-amber-400 py-3 overflow-hidden whitespace-nowrap text-xs font-semibold tracking-widest uppercase">
        <div className="inline-flex gap-16 animate-none">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6">
              <span>Residential Plots</span><span className="text-amber-600">✦</span>
              <span>Commercial Land</span><span className="text-amber-600">✦</span>
              <span>Villa Plots</span><span className="text-amber-600">✦</span>
              <span>Agricultural Land</span><span className="text-amber-600">✦</span>
              <span>Interior Design</span><span className="text-amber-600">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ LISTINGS ═══ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">Available Now</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">Latest Plots &amp; <span className="text-amber-500">Properties</span></h2>
            </div>
            <Link href="/listings" className="flex items-center gap-2 text-slate-700 hover:text-amber-600 font-semibold text-sm transition-colors group">
              View all listings
              <span className="w-8 h-8 rounded-full border-2 border-slate-300 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center transition-all">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* Featured large + grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

            {/* Big featured card */}
            {listings[0] && (
              <article className="lg:col-span-5 group relative rounded-3xl overflow-hidden min-h-[400px]">
                <Image
                  src={(listings[0] as any).image || (isLiveListing ? ((listings[0] as any).media?.[0]?.url || '') : '')}
                  alt={(listings[0] as any).title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width:1024px)100vw,42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">For Sale</span>
                  {(listings[0] as any).featured && <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">Featured</span>}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-amber-400 text-xs font-semibold uppercase tracking-wide">{(listings[0] as any).type || 'Plot'}</span>
                  <h3 className="text-white font-black text-xl mt-1 leading-tight">{(listings[0] as any).title}</h3>
                  <div className="flex items-center gap-1 text-slate-300 text-xs mt-1"><MapPin className="w-3 h-3" />{(listings[0] as any).location}</div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-white font-black text-2xl">{formatPrice((listings[0] as any).price, (listings[0] as any).currency)}</span>
                    <a href={getWhatsAppUrl(whatsapp, `Hi! Interested in "${(listings[0] as any).title}"`)} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-green-500 hover:bg-green-400 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            )}

            {/* Right side grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {listings.slice(1, 5).map((listing: any) => {
                const img = listing.image || listing.media?.[0]?.url
                return (
                  <article key={listing.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                      {img ? (
                        <Image src={img} alt={listing.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px)100vw,25vw" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-slate-300" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{listing.type || 'Plot'}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-amber-600 font-black text-base">{formatPrice(listing.price, listing.currency)}</p>
                      <h3 className="text-slate-800 font-bold text-sm mt-0.5 line-clamp-1 group-hover:text-amber-600 transition-colors">{listing.title}</h3>
                      <div className="flex items-center gap-1 text-slate-400 text-xs mt-1"><MapPin className="w-3 h-3" /><span className="truncate">{listing.location}</span></div>
                      {listing.area_sqft && (
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                          <span className="flex items-center gap-1 text-slate-500 text-xs"><Square className="w-3 h-3" />{listing.area_sqft.toLocaleString()} sqft</span>
                          <a href={getWhatsAppUrl(whatsapp, `Hi! Interested in "${listing.title}"`)} target="_blank" rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-500 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/listings">
              <Button variant="outline" className="rounded-full px-10">Load More Listings</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ INTERIOR DESIGN ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mb-12">
            <div>
              <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">Interior Design</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                We Design Spaces<br />
                <span className="text-amber-500">People Love</span>
              </h2>
            </div>
            <div className="lg:text-right">
              <p className="text-slate-500 text-sm max-w-xs lg:ml-auto mb-4">From luxury residences to modern offices — our designs speak for themselves.</p>
              <Link href="/portfolio" className="inline-flex items-center gap-2 text-slate-700 hover:text-amber-600 font-semibold text-sm transition-colors group">
                View full portfolio
                <span className="w-7 h-7 rounded-full border-2 border-slate-300 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>

          {/* Mosaic layout */}
          <div className="grid grid-cols-12 gap-4 h-[500px]">
            {projects[0] && (
              <Link href={isLiveProject ? `/portfolio/${(projects[0] as any).slug}` : '/portfolio'}
                className="col-span-12 sm:col-span-7 relative group rounded-3xl overflow-hidden">
                <Image
                  src={(projects[0] as any).image || (projects[0] as any).media?.[0]?.url}
                  alt={(projects[0] as any).title} fill className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width:640px)100vw,58vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wide">{(projects[0] as any).category}</span>
                  <h3 className="text-white font-black text-xl mt-1">{(projects[0] as any).title}</h3>
                </div>
              </Link>
            )}
            <div className="col-span-12 sm:col-span-5 flex flex-col gap-4">
              {projects.slice(1, 3).map((project: any) => (
                <Link key={project.id} href={isLiveProject ? `/portfolio/${project.slug}` : '/portfolio'}
                  className="relative group rounded-3xl overflow-hidden flex-1">
                  <Image src={project.image || project.media?.[0]?.url} alt={project.title} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width:640px)100vw,42vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-wide">{project.category}</span>
                    <h3 className="text-white font-bold text-sm mt-0.5">{project.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY US — dark band ═══ */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <span className="text-xs font-bold tracking-widest text-amber-500 uppercase">Why Us</span>
              <h2 className="text-3xl font-black mt-2 mb-4">One Stop for Land &amp; Design</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                We're the only team that handles both premium plot sales and world-class interior design — so your journey from empty land to dream space is seamless.
              </p>
              <div className="mt-8 flex gap-3">
                <Link href="/listings"><Button size="lg" className="rounded-full">Browse Plots</Button></Link>
                <Link href="/contact"><Button size="lg" variant="outline" className="rounded-full border-slate-600 text-slate-300 hover:bg-slate-800">Contact Us</Button></Link>
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: '📋', title: 'Clear Legal Titles', desc: 'All plots come with verified documentation and zero legal hassle.' },
                { icon: '📍', title: 'Prime Locations', desc: 'Hand-picked plots in high-appreciation residential & commercial zones.' },
                { icon: '🎨', title: 'Expert Interior Design', desc: 'Award-winning designers to craft stunning spaces after your purchase.' },
                { icon: '🤝', title: 'End-to-End Support', desc: 'From plot selection to interior completion — we are with you every step.' },
                { icon: '📊', title: 'Market Valuations', desc: 'Accurate pricing and ROI analysis before you invest.' },
                { icon: '🏗️', title: 'Construction Guidance', desc: 'Post-sale advice on contractors, approvals and build timelines.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-500/30 transition-all">
                  <span className="text-2xl flex-shrink-0">{icon}</span>
                  <div>
                    <h4 className="font-bold text-sm text-white">{title}</h4>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LEAD FORM + CONTACT ═══ */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            <div>
              <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">Get In Touch</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-4">
                Let's Find Your<br />Perfect Plot
              </h2>
              <p className="text-slate-500 text-sm mb-8">Tell us what you're looking for and our team will reach out with the best matches within 24 hours.</p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-amber-100 shadow-sm">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Call / WhatsApp</p>
                    <p className="text-slate-800 font-bold text-sm">{whatsapp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-amber-100 shadow-sm">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Email Us</p>
                    <p className="text-slate-800 font-bold text-sm">info@yourcompany.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-amber-100 shadow-sm">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Office</p>
                    <p className="text-slate-800 font-bold text-sm">123 Main Street, City Centre</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-amber-100 p-8">
              <h3 className="text-xl font-black text-slate-900 mb-1">Send an Enquiry</h3>
              <p className="text-slate-400 text-sm mb-6">We reply within 24 hours.</p>
              <LeadForm />
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
