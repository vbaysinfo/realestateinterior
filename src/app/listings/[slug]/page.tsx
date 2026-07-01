import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { LeadForm } from '@/components/forms/lead-form'
import { WhatsAppButton } from '@/components/common/whatsapp-button'
import {
  Bed, Bath, Square, MapPin, Home, Calendar,
  CheckCircle2, Phone, ChevronRight, Play, ExternalLink,
  Shield, FileText, TrendingUp
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { getUnitForCategory } from '@/lib/property-categories'
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
    .single()
  return data as ListingWithMedia | null
}

async function getSimilarListings(listing: ListingWithMedia): Promise<ListingWithMedia[]> {
  try {
    const supabase = await createClient()
    const { data } = await (supabase as any)
      .from('listings')
      .select('*, media(*)')
      .eq('published', true)
      .neq('id', listing.id)
      .eq('status', listing.status)
      .limit(3)
    return (data as ListingWithMedia[]) || []
  } catch { return [] }
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match ? match[1] : null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListing(slug)
  if (!listing) return { title: 'Property Not Found' }
  const image = listing.media?.find((m) => m.is_cover && m.type === 'image') || listing.media?.find((m) => m.type === 'image')
  return {
    title: listing.meta_title || `${listing.title} | Bhogapuram Lands`,
    description: listing.meta_description || listing.description?.slice(0, 160) || `${listing.title} for ${listing.status} at ${formatPrice(listing.price, listing.currency)} in ${listing.location}`,
    openGraph: {
      title: listing.title,
      description: listing.description?.slice(0, 160),
      images: image ? [{ url: image.url, alt: listing.title }] : [],
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
  const otherLinks = listing.media?.filter((m) => m.type === 'link' && !/youtube|youtu\.be|vimeo/i.test(m.url)) || []

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'
  const waMessage = `Hi! I'm interested in "${listing.title}" (${formatPrice(listing.price, listing.currency)}) at ${listing.location}. Please send me more details.`
  const areaUnit = (listing as any).area_unit || getUnitForCategory((listing as any).category || '') || 'Sq Feet'

  const similar = await getSimilarListings(listing)

  const coverImage = images.find((m) => m.is_cover) || images[0]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    description: listing.description,
    url: `${siteUrl}/listings/${listing.slug}`,
    offers: { '@type': 'Offer', price: listing.price, priceCurrency: listing.currency || 'INR' },
    address: { '@type': 'PostalAddress', streetAddress: listing.location, addressRegion: 'Andhra Pradesh', addressCountry: 'IN' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Image Banner */}
      <div className="relative h-[55vh] min-h-[400px] bg-blue-950 overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage.url}
            alt={coverImage.alt_text || listing.title}
            fill className="object-cover opacity-60"
            priority sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/30 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/listings" className="hover:text-white transition-colors">Properties</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/50 truncate max-w-xs">{listing.title}</span>
          </nav>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-black ${listing.status === 'sale' ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'}`}>
              For {listing.status === 'sale' ? 'Sale' : 'Rent'}
            </span>
            {listing.property_type && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm">
                {listing.property_type}
              </span>
            )}
            {listing.featured && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">Featured</span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl">
            {listing.title}
          </h1>
          <div className="flex items-center gap-1.5 text-white/70 mt-2 text-sm">
            <MapPin className="w-4 h-4 flex-shrink-0" />{listing.location}
          </div>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="absolute bottom-0 right-6 pb-8 hidden lg:flex gap-2">
            {images.slice(1, 4).map((img, i) => (
              <div key={img.id} className="relative w-24 h-16 rounded-xl overflow-hidden border-2 border-white/30">
                <Image src={img.url} alt={img.alt_text || `Photo ${i + 2}`} fill className="object-cover" sizes="96px" />
                {i === 2 && images.length > 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">+{images.length - 4}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── MAIN CONTENT ── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Price + Key Stats */}
            <div className="bg-white rounded-3xl border-2 border-slate-100 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">Asking Price</p>
                  <div className="text-4xl font-black text-blue-700">
                    {formatPrice(listing.price, listing.currency)}
                    {listing.status === 'rent' && <span className="text-base font-normal text-slate-400 ml-1">/month</span>}
                  </div>
                  {listing.area_sqft && (
                    <p className="text-slate-400 text-sm mt-1">
                      ≈ {formatPrice(Math.round(listing.price / listing.area_sqft), listing.currency)}/{areaUnit}
                    </p>
                  )}
                </div>
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waMessage)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl transition-colors flex-shrink-0" aria-label="WhatsApp Enquiry"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>

              {/* Property stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
                {listing.area_sqft !== null && (
                  <div className="text-center p-3 bg-slate-50 rounded-2xl">
                    <Square className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                    <div className="font-black text-slate-900 text-sm">{listing.area_sqft.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">{areaUnit}</div>
                  </div>
                )}
                {listing.bedrooms !== null && (
                  <div className="text-center p-3 bg-slate-50 rounded-2xl">
                    <Bed className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="font-black text-slate-900 text-sm">{listing.bedrooms}</div>
                    <div className="text-xs text-slate-400">Bedrooms</div>
                  </div>
                )}
                {listing.bathrooms !== null && (
                  <div className="text-center p-3 bg-slate-50 rounded-2xl">
                    <Bath className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="font-black text-slate-900 text-sm">{listing.bathrooms}</div>
                    <div className="text-xs text-slate-400">Bathrooms</div>
                  </div>
                )}
                <div className="text-center p-3 bg-slate-50 rounded-2xl">
                  <Calendar className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="font-black text-slate-900 text-sm">
                    {format(new Date(listing.created_at), 'MMM yyyy')}
                  </div>
                  <div className="text-xs text-slate-400">Listed on</div>
                </div>
              </div>
            </div>

            {/* Full Image Gallery */}
            {images.length > 0 && (
              <div>
                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-600 rounded-full inline-block" />
                  Property Photos
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map((img, i) => (
                    <div key={img.id} className={`relative rounded-2xl overflow-hidden ${i === 0 ? 'col-span-2 row-span-2 aspect-video' : 'aspect-square'}`}>
                      <Image
                        src={img.url}
                        alt={img.alt_text || `${listing.title} photo ${i + 1}`}
                        fill className="object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                        sizes={i === 0 ? '(max-width:640px)100vw,50vw' : '(max-width:640px)50vw,33vw'}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {listing.description && (
              <div>
                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-600 rounded-full inline-block" />
                  Property Description
                </h2>
                <div className="bg-slate-50 rounded-2xl p-6 text-slate-600 leading-relaxed text-sm whitespace-pre-wrap">
                  {listing.description}
                </div>
              </div>
            )}

            {/* Video Tours */}
            {videos.length > 0 && (
              <div>
                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-amber-500 rounded-full inline-block" />
                  <Play className="w-5 h-5 text-amber-500" />
                  Video Tours
                </h2>
                <div className="space-y-5">
                  {videos.map((video) => {
                    const ytId = getYouTubeId(video.url)
                    const vimeoId = getVimeoId(video.url)
                    return (
                      <div key={video.id} className="rounded-2xl overflow-hidden shadow-md border border-slate-100">
                        {ytId ? (
                          <div className="relative aspect-video bg-black">
                            <iframe
                              src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
                              title={video.alt_text || listing.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full"
                            />
                          </div>
                        ) : vimeoId ? (
                          <div className="relative aspect-video bg-black">
                            <iframe
                              src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
                              title={video.alt_text || listing.title}
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="relative aspect-video bg-black">
                            <video controls className="absolute inset-0 w-full h-full object-cover">
                              <source src={video.url} />
                            </video>
                          </div>
                        )}
                        {video.alt_text && (
                          <div className="p-3 bg-slate-50">
                            <p className="text-sm text-slate-600 font-medium">{video.alt_text}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Property Details Table */}
            <div>
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full inline-block" />
                Property Details
              </h2>
              <div className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      { label: 'Property Type', value: listing.property_type },
                      { label: 'Status', value: listing.status === 'sale' ? 'For Sale' : 'For Rent' },
                      { label: 'Location', value: listing.location },
                      { label: 'Total Area', value: listing.area_sqft ? `${listing.area_sqft.toLocaleString()} sq ft` : null },
                      { label: 'Bedrooms', value: listing.bedrooms != null ? `${listing.bedrooms} BHK` : null },
                      { label: 'Bathrooms', value: listing.bathrooms != null ? `${listing.bathrooms}` : null },
                      { label: 'Price', value: formatPrice(listing.price, listing.currency) },
                      { label: 'Price per sqft', value: listing.area_sqft ? formatPrice(Math.round(listing.price / listing.area_sqft), listing.currency) : null },
                      { label: 'Listed Date', value: format(new Date(listing.created_at), 'MMMM d, yyyy') },
                    ].filter((r) => r.value).map(({ label, value }, i) => (
                      <tr key={label} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                        <td className="px-5 py-3 font-semibold text-slate-500 w-1/2">{label}</td>
                        <td className="px-5 py-3 text-slate-900 font-semibold">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>


            {/* Other media links */}
            {otherLinks.length > 0 && (
              <div>
                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-600 rounded-full inline-block" />
                  Additional Links
                </h2>
                <div className="space-y-2">
                  {otherLinks.map((link) => (
                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl text-blue-700 font-medium text-sm transition-colors">
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      {link.alt_text || link.url}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Location Section */}
            <div>
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full inline-block" />
                <MapPin className="w-5 h-5 text-blue-600" />
                Location & Nearby
              </h2>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <p className="text-slate-700 font-semibold text-sm mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" /> {listing.location}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    { place: 'Bhogapuram Airport', dist: '~5 km' },
                    { place: 'NH-16 Highway', dist: '~3 km' },
                    { place: 'Visakhapatnam City', dist: '~45 km' },
                    { place: 'Railway Station', dist: '~8 km' },
                    { place: 'Schools & Colleges', dist: '~2 km' },
                    { place: 'Hospitals', dist: '~4 km' },
                  ].map(({ place, dist }) => (
                    <div key={place} className="flex items-start gap-2 p-2 bg-white rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-700">{place}</p>
                        <p className="text-slate-400">{dist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="space-y-5">
            <div className="sticky top-20">
              {/* Price card */}
              <div className="bg-blue-950 rounded-3xl p-6 text-white mb-5">
                <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-1">Asking Price</p>
                <div className="text-3xl font-black text-amber-400 mb-1">
                  {formatPrice(listing.price, listing.currency)}
                </div>
                {listing.area_sqft && (
                  <p className="text-blue-300 text-xs mb-4">
                    {listing.area_sqft.toLocaleString()} sqft •{' '}
                    {formatPrice(Math.round(listing.price / listing.area_sqft), listing.currency)}/sqft
                  </p>
                )}
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waMessage)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3.5 rounded-xl transition-colors" aria-label="Chat on WhatsApp"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>

              {/* Lead Form */}
              <div className="bg-white rounded-3xl border-2 border-slate-100 p-6 shadow-sm">
                <h3 className="font-black text-slate-900 text-lg mb-1">Book a Site Visit</h3>
                <p className="text-slate-400 text-xs mb-5">We'll call you back within 2 hours</p>
                <LeadForm listingId={listing.id} listingTitle={listing.title} compact />
              </div>

              {/* Agent card */}
              <div className="bg-amber-50 rounded-3xl border border-amber-100 p-5 mt-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-black text-lg">
                    BL
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm">Bhogapuram Lands</p>
                    <p className="text-xs text-slate-500">Verified Real Estate Agent</p>
                  </div>
                </div>
                <a href={`tel:${whatsapp}`}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-amber-100 text-amber-800 font-bold py-2.5 rounded-xl transition-colors text-sm border border-amber-200">
                  <Phone className="w-4 h-4" /> {whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── SIMILAR PROPERTIES ── */}
        {similar.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">You May Also Like</span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">Similar Properties</h2>
              </div>
              <Link href="/listings" className="text-blue-700 hover:text-blue-900 font-bold text-sm flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p: any) => {
                const img = p.media?.find((m: any) => m.is_cover && m.type === 'image') || p.media?.find((m: any) => m.type === 'image')
                return (
                  <Link key={p.id} href={`/listings/${p.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      {img ? (
                        <Image src={img.url} alt={p.title} fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                      ) : (
                        <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
                          <Home className="w-8 h-8 text-blue-200" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                          For {p.status === 'sale' ? 'Sale' : 'Rent'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-blue-700 font-black text-base">{formatPrice(p.price, p.currency)}</p>
                      <h3 className="text-slate-800 font-bold text-sm mt-0.5 line-clamp-1 group-hover:text-blue-700">{p.title}</h3>
                      <div className="flex items-center gap-1 text-slate-400 text-xs mt-1.5">
                        <MapPin className="w-3 h-3" />{p.location}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
