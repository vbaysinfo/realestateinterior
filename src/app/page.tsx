'use server'

import Link from 'next/link'
import { Search, ArrowRight, Building2, Palette, Star, CheckCircle, MapPin, TrendingUp, Home, TreePine } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { ListingCard } from '@/components/listings/listing-card'
import { ProjectCard } from '@/components/interior/project-card'
import { LeadForm } from '@/components/forms/lead-form'
import { Button } from '@/components/ui/button'
import type { ListingWithMedia, ProjectWithMedia } from '@/types/database'

async function getFeaturedListings(): Promise<ListingWithMedia[]> {
  try {
    const supabase = await createClient()
    const { data } = await (supabase as any)
      .from('listings')
      .select('*, media(*)')
      .eq('published', true)
      .eq('featured', true)
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
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(6)
    return (data as ProjectWithMedia[]) || []
  } catch {
    return []
  }
}

const STATS = [
  { label: 'Plots & Lands Sold', value: '350+' },
  { label: 'Happy Clients', value: '1,200+' },
  { label: 'Design Projects', value: '300+' },
  { label: 'Years of Experience', value: '15+' },
]

const PLOT_TYPES = [
  { icon: TreePine, label: 'Residential Plots', desc: 'Prime locations for your dream home', href: '/listings?type=land' },
  { icon: Building2, label: 'Commercial Land', desc: 'High-return investment opportunities', href: '/listings?type=commercial' },
  { icon: Home, label: 'Villa Plots', desc: 'Exclusive gated community plots', href: '/listings?type=villa' },
  { icon: TrendingUp, label: 'Investment Plots', desc: 'High-appreciation value land', href: '/listings?type=land' },
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
  const [listings, projects] = await Promise.all([getFeaturedListings(), getFeaturedProjects()])

  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 text-white overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/50" />
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-1.5 text-amber-300 text-sm font-medium mb-6">
              <Star className="w-3.5 h-3.5" />
              Plot / Land Sales &amp; Interior Design Experts
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find Your Perfect{' '}
              <span className="text-amber-400">Plot of Land</span>{' '}
              &amp; Design Dream Spaces
            </h1>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl">
              Premium plot &amp; land sales across prime locations — plus bespoke interior design services. From choosing the right land to crafting stunning interiors, we do it all.
            </p>
            <div className="flex gap-3 flex-col sm:flex-row max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search location, plot type..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
              <Link href="/listings">
                <Button size="lg" className="w-full sm:w-auto whitespace-nowrap">
                  Search Plots
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-slate-400">
              {['Residential', 'Commercial', 'Agricultural', 'Villa Plots'].map((t) => (
                <Link key={t} href={`/listings?type=land`} className="hover:text-amber-400 transition-colors">
                  {t} →
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/5 to-transparent" />
      </section>

      {/* Stats Bar */}
      <section className="bg-amber-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {STATS.map(({ label, value }) => (
              <div key={label}>
                <div className="text-3xl font-bold">{value}</div>
                <div className="text-amber-100 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plot Type Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-amber-600 text-sm font-medium mb-2">
            <MapPin className="w-4 h-4" />
            Browse by Category
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Find the Right Plot for You</h2>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto">Choose from a wide range of land types across prime locations with clear titles and legal documentation.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLOT_TYPES.map(({ icon: Icon, label, desc, href }) => (
            <Link key={label} href={href} className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-amber-400 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-amber-50 group-hover:bg-amber-100 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <Icon className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">{label}</h3>
              <p className="text-sm text-slate-500">{desc}</p>
              <div className="mt-4 text-amber-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-amber-600 text-sm font-medium mb-2">
                <Building2 className="w-4 h-4" />
                Featured Properties
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Premium Plots &amp; Listings</h2>
              <p className="text-slate-500 text-sm mt-1">Hand-picked properties with verified titles and excellent locations</p>
            </div>
            <Link href="/listings" className="hidden sm:flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors">
              View all listings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No featured listings yet.</p>
              <p className="text-slate-400 text-sm mt-1">Add your first plot or property from the admin panel.</p>
              <Link href="/admin/listings/new" className="mt-4 inline-block text-amber-600 hover:underline text-sm font-medium">
                Add a listing →
              </Link>
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link href="/listings">
              <Button variant="outline">View All Listings</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interior Design Portfolio */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-sm font-medium mb-2">
                <Palette className="w-4 h-4" />
                Interior Design
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Transform Your Space</h2>
              <p className="text-slate-400 text-sm mt-1">Award-winning interior design for homes, offices &amp; commercial spaces</p>
            </div>
            <Link href="/portfolio" className="hidden sm:flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium text-sm transition-colors">
              View portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-800 rounded-2xl border border-slate-700">
              <Palette className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 font-medium">No portfolio projects yet.</p>
              <p className="text-slate-500 text-sm mt-1">Showcase your interior design work from the admin panel.</p>
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link href="/portfolio">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">View Full Portfolio</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us + Lead Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-amber-600 text-sm font-medium mb-3">Why Choose Us</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Your Trusted Partner for Plots &amp; Beautiful Interiors
            </h2>
            <p className="text-slate-600 mb-8">
              We combine expertise in plot &amp; land sales with world-class interior design services — so you can find the perfect land and build the perfect space, all in one place.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              <Link href="/listings">
                <Button size="lg">Browse Plots</Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline">View Design Portfolio</Button>
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Get in Touch</h3>
              <p className="text-slate-500 text-sm mt-1">Interested in a plot or our design services? Drop us a message.</p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  )
}
