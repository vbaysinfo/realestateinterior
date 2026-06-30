import { Suspense } from 'react'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { ListingCard } from '@/components/listings/listing-card'
import { ListingFilters } from '@/components/listings/listing-filters'
import { Building2 } from 'lucide-react'
import type { ListingWithMedia } from '@/types/database'

export const metadata: Metadata = {
  title: 'Properties for Sale & Rent',
  description: 'Browse our comprehensive selection of properties for sale and rent. Find your perfect home today.',
}

interface PageProps {
  searchParams: Promise<{ status?: string; type?: string; location?: string; maxPrice?: string; page?: string }>
}

async function ListingsGrid({ searchParams }: { searchParams: Awaited<PageProps['searchParams']> }) {
  const supabase = await createClient()
  const page = parseInt(searchParams.page || '1')
  const limit = 12

  let query = supabase
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
        <h3 className="font-semibold text-slate-700 mb-2">No properties found</h3>
        <p className="text-slate-500 text-sm">Try adjusting your search filters.</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-6">{count} propert{count === 1 ? 'y' : 'ies'} found</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`?${new URLSearchParams({ ...searchParams, page: String(p) }).toString()}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                p === page
                  ? 'bg-amber-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {p}
            </a>
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Properties</h1>
        <p className="text-slate-500">Find your perfect home or investment property</p>
      </div>

      <div className="mb-6">
        <Suspense>
          <ListingFilters />
        </Suspense>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-slate-200 rounded-xl aspect-[4/3] animate-pulse" />
            ))}
          </div>
        }
      >
        <ListingsGrid searchParams={params} />
      </Suspense>
    </div>
  )
}
