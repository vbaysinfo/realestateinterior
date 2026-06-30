import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { MediaGallery, VideoGallery } from '@/components/common/lightbox'
import { LeadForm } from '@/components/forms/lead-form'
import { WhatsAppButton, WhatsAppShare } from '@/components/common/whatsapp-button'
import { Badge } from '@/components/ui/badge'
import { Bed, Bath, Square, MapPin, Home, Calendar } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { ListingWithMedia } from '@/types/database'
import { format } from 'date-fns'

interface Props {
  params: Promise<{ slug: string }>
}

async function getListing(slug: string): Promise<ListingWithMedia | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('listings')
    .select('*, media(*)')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  return data as ListingWithMedia | null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListing(slug)
  if (!listing) return { title: 'Property Not Found' }

  const image = listing.media?.find((m) => m.is_cover && m.type === 'image') || listing.media?.find((m) => m.type === 'image')

  return {
    title: listing.meta_title || listing.title,
    description: listing.meta_description || listing.description?.slice(0, 160),
    openGraph: {
      title: listing.title,
      description: listing.description?.slice(0, 160),
      images: image ? [{ url: image.url, alt: listing.title }] : [],
      type: 'website',
    },
  }
}

export default async function ListingDetailPage({ params }: Props) {
  const { slug } = await params
  const listing = await getListing(slug)
  if (!listing) notFound()

  const images = listing.media?.filter((m) => m.type === 'image') || []
  const videos = listing.media?.filter((m) => m.type === 'video' || m.type === 'link').filter(
    (m) => /youtube|youtu\.be|vimeo/i.test(m.url)
  ) || []
  const mediaLinks = listing.media?.filter((m) => m.type === 'link' && !/youtube|youtu\.be|vimeo/i.test(m.url)) || []

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  const shareText = `Check out this property: ${listing.title} — ${formatPrice(listing.price, listing.currency)} — ${siteUrl}/listings/${listing.slug}`
  const waMessage = `Hi! I'm interested in "${listing.title}" (${formatPrice(listing.price, listing.currency)}) at ${listing.location}. Please send me more details.`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    description: listing.description,
    url: `${siteUrl}/listings/${listing.slug}`,
    offers: {
      '@type': 'Offer',
      price: listing.price,
      priceCurrency: listing.currency,
    },
    address: { '@type': 'PostalAddress', streetAddress: listing.location },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6 flex gap-2 items-center flex-wrap">
          <a href="/" className="hover:text-slate-700">Home</a>
          <span>/</span>
          <a href="/listings" className="hover:text-slate-700">Properties</a>
          <span>/</span>
          <span className="text-slate-900 truncate max-w-xs">{listing.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <MediaGallery media={images} />

            {/* Title & Key Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant={listing.status === 'sale' ? 'info' : 'success'} className="capitalize">
                  For {listing.status === 'sale' ? 'Sale' : 'Rent'}
                </Badge>
                <Badge variant="default" className="capitalize">{listing.property_type}</Badge>
                {listing.featured && <Badge variant="warning">Featured</Badge>}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{listing.title}</h1>

              <div className="flex items-center gap-1.5 text-slate-500 mb-4">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{listing.location}</span>
              </div>

              <div className="text-3xl font-bold text-amber-600 mb-4">
                {formatPrice(listing.price, listing.currency)}
                {listing.status === 'rent' && <span className="text-base font-normal text-slate-500">/month</span>}
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-slate-700 border-y border-slate-200 py-4 mb-4">
                {listing.bedrooms !== null && (
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-slate-400" />
                    <span><strong>{listing.bedrooms}</strong> Bedrooms</span>
                  </div>
                )}
                {listing.bathrooms !== null && (
                  <div className="flex items-center gap-2">
                    <Bath className="w-4 h-4 text-slate-400" />
                    <span><strong>{listing.bathrooms}</strong> Bathrooms</span>
                  </div>
                )}
                {listing.area_sqft !== null && (
                  <div className="flex items-center gap-2">
                    <Square className="w-4 h-4 text-slate-400" />
                    <span><strong>{listing.area_sqft.toLocaleString()}</strong> sqft</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-slate-400" />
                  <span className="capitalize">{listing.property_type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Listed {format(new Date(listing.created_at), 'MMM d, yyyy')}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            {listing.description && (
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Description</h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {listing.description}
                </div>
              </div>
            )}

            {/* Videos */}
            {videos.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Video Tours</h2>
                <VideoGallery videos={videos} />
              </div>
            )}

            {/* Media Links */}
            {mediaLinks.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Media Links</h2>
                <div className="space-y-2">
                  {mediaLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium"
                    >
                      → {link.alt_text || link.url}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
              <span className="text-sm text-slate-500">Share:</span>
              <WhatsAppShare text={shareText} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sticky top-20">
              <WhatsAppButton
                message={waMessage}
                label={`Chat about this property`}
              />
              <div className="mt-4 pt-4 border-t border-slate-100">
                <LeadForm
                  listingId={listing.id}
                  listingTitle={listing.title}
                  compact
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
