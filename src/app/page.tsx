import Link from 'next/link'
import { Search, ArrowRight, Building2, Palette, Star, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { ListingCard } from '@/components/listings/listing-card'
import { ProjectCard } from '@/components/interior/project-card'
import { LeadForm } from '@/components/forms/lead-form'
import { Button } from '@/components/ui/button'
import type { ListingWithMedia, ProjectWithMedia } from '@/types/database'

async function getFeaturedListings(): Promise<ListingWithMedia[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
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
    const { data } = await supabase
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
  { label: 'Properties Listed', value: '500+' },
  { label: 'Happy Clients', value: '1,200+' },
  { label: 'Design Projects', value: '300+' },
  { label: 'Years of Experience', value: '15+' },
]

const FEATURES = [
  'Professional property photography',
  'Expert interior design consultation',
  'Market analysis & valuation',
  'End-to-end transaction support',
  'Post-sale property management',
  'Virtual property tours',
]

export default async function HomePage() {
  const [listings, projects] = await Promise.all([getFeaturedListings(), getFeaturedProjects()])

  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 text-white overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-1.5 text-amber-300 text-sm font-medium mb-6">
              <Star className="w-3.5 h-3.5" />
              Trusted Real Estate &amp; Design Experts
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find Your Perfect{' '}
              <span className="text-amber-400">Property</span>{' '}
              &amp; Design Dream Spaces
            </h1>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl">
              Premium real estate listings and bespoke interior design services. From property search to stunning interiors — we make it seamless.
            </p>
            <div className="flex gap-3 flex-col sm:flex-row max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search location, property type..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
              <Link href="/listings">
                <Button size="lg" className="w-full sm:w-auto whitespace-nowrap">
                  Search Properties
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-slate-400">
              {['Apartments', 'Villas', 'Commercial', 'Land'].map((t) => (
                <Link key={t} href={`/listings?type=${t.toLowerCase()}`} className="hover:text-amber-400 transition-colors">
                  {t} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
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

      {/* Featured Listings */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-600 text-sm font-medium mb-2">
              <Building2 className="w-4 h-4" />
              Featured Properties
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Premium Listings</h2>
          </div>
          <Link href="/listings" className="hidden sm:flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-100 rounded-xl">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No featured listings yet.</p>
            <Link href="/admin/listings/new" className="mt-4 inline-block text-amber-600 hover:underline text-sm font-medium">
              Add a listing →
            </Link>
          </div>
        )}
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
              <h2 className="text-2xl sm:text-3xl font-bold">Our Portfolio</h2>
            </div>
            <Link href="/portfolio" className="hidden sm:flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium text-sm transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-800 rounded-xl">
              <Palette className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No portfolio projects yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us + Lead Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-amber-600 text-sm font-medium mb-3">Why Choose Us</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              End-to-End Property &amp; Design Excellence
            </h2>
            <p className="text-slate-600 mb-8">
              We combine decades of real estate expertise with world-class interior design services to offer you a truly comprehensive experience.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <Link href="/listings">
                <Button size="lg">Browse Properties</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">Get in Touch</Button>
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  )
}
