import { Suspense } from 'react'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { ListingCard } from '@/components/listings/listing-card'
import { ListingFilters } from '@/components/listings/listing-filters'
import { Building2 } from 'lucide-react'
import Link from 'next/link'
import type { ListingWithMedia } from '@/types/database'

export const metadata: Metadata = {
  title: 'Plots & Land for Sale in Bhogapuram, Visakhapatnam',
  description: 'Browse residential plots, villa plots, commercial land & agricultural land for sale in Bhogapuram, Visakhapatnam, Andhra Pradesh. Clear titles. Near Bhogapuram International Airport.',
  keywords: [
    'plots for sale Bhogapuram',
    'open plots Visakhapatnam',
    'residential plots Bhogapuram',
    'commercial land Visakhapatnam',
    'villa plots Bhogapuram',
    'plots near airport Bhogapuram',
    'land for sale Andhra Pradesh',
  ],
}

interface PageProps {
  searchParams: Promise<{ status?: string; type?: string; location?: string; maxPrice?: string; page?: string }>
}

async function ListingsGrid({ searchParams }: { searchParams: Awaited<PageProps['searchParams']> }) {
  const supabase = await createClient()
  const page = parseInt(searchParams.page || '1')
  const limit = 12

  let query = (supabase as any)
    .from('listings')
    .select('*, media(*)', { count: 'exact' })
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (searchParams.status) query = query.eq('status', searchParams.status)
  if (searchParams.type) query = query.ilike('property_type', searchParams.type)
  if (searchParams.location) query = query.ilike('location', `%${searchParams.location}%`)
  if (searchParams.maxPrice) query = query.lte('price', parseFloat(searchParams.maxPrice))

  const { data, count } = await query
  const listings = (data as ListingWithMedia[]) || []
  const totalPages = Math.ceil((count || 0) / limit)

  if (listings.length === 0) {
    return (
      <div className="text-center py-20">
        <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="font-semibold text-slate-700 mb-2">No plots found</h3>
        <p className="text-slate-500 text-sm">Try adjusting your filters or <Link href="/contact" className="text-amber-600 underline">contact us</Link> for availability.</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-6">{count} plot{count === 1 ? '' : 's'} found in Bhogapuram &amp; Visakhapatnam area</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/listings?page=${p}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                p === page ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default async function ListingsPage({ searchParams }: PageProps) {
  const params = await searchParams
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-amber-600 text-xs font-bold tracking-widest uppercase mb-1">Bhogapuram, Visakhapatnam</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Plots &amp; Land for Sale</h1>
        <p className="text-slate-500 text-sm mt-1">Residential, commercial &amp; villa plots in Bhogapuram and Visakhapatnam district — all with clear legal titles.</p>
      </div>

      {/* SEO breadcrumb tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['Open Plots Bhogapuram', 'Villa Plots Vizag', 'Commercial Land', 'Near Airport Plots', 'Gated Community Plots'].map((tag) => (
          <span key={tag} className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-medium">{tag}</span>
        ))}
      </div>

      <Suspense fallback={<div className="h-10 bg-slate-100 rounded-lg animate-pulse mb-6" />}>
        <ListingFilters />
      </Suspense>
      <div className="mt-8">
        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(null).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 h-72 animate-pulse" />
            ))}
          </div>
        }>
          <ListingsGrid searchParams={params} />
        </Suspense>
      </div>
    </div>
  )
}
