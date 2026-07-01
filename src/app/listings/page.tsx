import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { ListingFilters } from '@/components/listings/listing-filters'
import { Building2, MapPin, Square, MessageCircle, Search } from 'lucide-react'
import { formatPrice, getWhatsAppUrl } from '@/lib/utils'
import type { ListingWithMedia } from '@/types/database'

export const metadata: Metadata = {
  title: 'Plots & Land for Sale in Bhogapuram, Visakhapatnam | Bhogapuram Lands',
  description: 'Browse verified plots and land for sale in Bhogapuram, Visakhapatnam, Andhra Pradesh. Residential, villa, commercial & agricultural plots with clear titles near Bhogapuram Airport.',
}

interface PageProps {
  searchParams: Promise<{ status?: string; type?: string; location?: string; maxPrice?: string; page?: string }>
}

async function ListingsGrid({ searchParams }: { searchParams: Awaited<PageProps['searchParams']> }) {
  const supabase = await createClient()
  const page = parseInt(searchParams.page || '1')
  const limit = 12
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'

  let query = supabase
    .from('listings')
    .select('*, media(*)', { count: 'exact' })
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (searchParams.status) query = query.eq('status', searchParams.status)
  if (searchParams.type) query = query.ilike('property_type', `%${searchParams.type}%`)
  if (searchParams.location) query = query.ilike('location', `%${searchParams.location}%`)
  if (searchParams.maxPrice) query = query.lte('price', parseFloat(searchParams.maxPrice))

  const { data, count } = await query
  const listings = (data as ListingWithMedia[]) || []
  const totalPages = Math.ceil((count || 0) / limit)

  if (listings.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <Search className="w-8 h-8 text-blue-300" />
        </div>
        <h3 className="font-black text-slate-700 text-xl mb-2">No properties found</h3>
        <p className="text-slate-400 text-sm mb-6">Try adjusting your search filters or browse all properties.</p>
        <Link href="/listings" className="px-6 py-2.5 bg-blue-700 text-white font-bold rounded-xl text-sm">
          Clear Filters
        </Link>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-6 font-medium">
        <span className="font-black text-blue-700">{count}</span> propert{count === 1 ? 'y' : 'ies'} found in Bhogapuram & Visakhapatnam
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => {
          const coverImage = listing.media?.find((m) => m.is_cover && m.type === 'image') || listing.media?.find((m) => m.type === 'image')
          const waMessage = `Hi! I'm interested in "${listing.title}" at ${formatPrice(listing.price, listing.currency)}. Please share more details.`
          return (
            <article key={listing.id}
              className="group bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <Link href={`/listings/${listing.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  {coverImage ? (
                    <Image
                      src={coverImage.url}
                      alt={coverImage.alt_text || listing.title}
                      fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                      <Building2 className="w-12 h-12 text-blue-200" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${listing.status === 'sale' ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'}`}>
                      For {listing.status === 'sale' ? 'Sale' : 'Rent'}
                    </span>
                    {listing.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-600 text-white">Featured</span>
                    )}
                  </div>
                  {listing.property_type && (
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-700">
                        {listing.property_type}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-blue-700 font-black text-lg">{formatPrice(listing.price, listing.currency)}</p>
                  <h3 className="font-bold text-slate-900 mt-1 line-clamp-1 group-hover:text-blue-700 transition-colors text-sm">
                    {listing.title}
                  </h3>
                  {listing.location && (
                    <div className="flex items-center gap-1 mt-1.5 text-slate-400 text-xs">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="line-clamp-1">{listing.location}</span>
                    </div>
                  )}
                </div>
              </Link>

              <div className="px-4 pb-4">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 pt-3 border-t border-slate-100">
                  {listing.area_sqft !== null && (
                    <span className="flex items-center gap-1">
                      <Square className="w-3.5 h-3.5 text-slate-400" />
                      {listing.area_sqft.toLocaleString()} sqft
                    </span>
                  )}
                </div>
                <a
                  href={getWhatsAppUrl(whatsapp, waMessage)}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Enquire on WhatsApp
                </a>
              </div>
            </article>
          )
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`?${new URLSearchParams({ ...searchParams, page: String(p) }).toString()}`}
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${
                p === page
                  ? 'bg-blue-700 text-white shadow-md shadow-blue-200'
                  : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700'
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
    <div>
      {/* Page header */}
      <div className="bg-blue-950 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-400 text-xs mb-4">
            <Link href="/" className="hover:text-blue-200 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-blue-200">Properties</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">
            Plots & Land for Sale
          </h1>
          <p className="text-blue-300 text-sm">
            Verified properties in Bhogapuram, Visakhapatnam & surrounding areas
          </p>
          {/* SEO chips */}
          <div className="flex flex-wrap gap-2 mt-5">
            {['Bhogapuram', 'Near Airport', 'Visakhapatnam', 'Atchutapuram', 'NH-16 Corridor'].map((tag) => (
              <Link key={tag} href={`/listings?location=${encodeURIComponent(tag)}`}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-xs font-semibold transition-colors">
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <Suspense>
            <ListingFilters />
          </Suspense>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-slate-200 rounded-2xl aspect-[4/3] animate-pulse" />
              ))}
            </div>
          }
        >
          <ListingsGrid searchParams={params} />
        </Suspense>
      </div>
    </div>
  )
}
