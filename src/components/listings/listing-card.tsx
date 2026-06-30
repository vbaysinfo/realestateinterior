import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Square, MapPin, MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatPrice, getWhatsAppUrl } from '@/lib/utils'
import type { ListingWithMedia } from '@/types/database'

interface ListingCardProps {
  listing: ListingWithMedia
}

export function ListingCard({ listing }: ListingCardProps) {
  const coverImage = listing.media?.find((m) => m.is_cover && m.type === 'image')
    || listing.media?.find((m) => m.type === 'image')

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'
  const waMessage = `Hi! I'm interested in "${listing.title}" listed at ${formatPrice(listing.price, listing.currency)}. Please provide more info.`

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300 group">
      <Link href={`/listings/${listing.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          {coverImage ? (
            <Image
              src={coverImage.url}
              alt={coverImage.alt_text || listing.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <span className="text-slate-400 text-sm">No image</span>
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={listing.status === 'sale' ? 'info' : 'success'}>
              For {listing.status === 'sale' ? 'Sale' : 'Rent'}
            </Badge>
            {listing.featured && <Badge variant="warning">Featured</Badge>}
          </div>
        </div>

        <div className="p-4">
          <p className="text-amber-600 font-bold text-xl">
            {formatPrice(listing.price, listing.currency)}
            {listing.status === 'rent' && <span className="text-sm font-normal text-slate-500">/mo</span>}
          </p>
          <h3 className="font-semibold text-slate-900 mt-1 line-clamp-1 group-hover:text-amber-600 transition-colors">
            {listing.title}
          </h3>
          {listing.location && (
            <div className="flex items-center gap-1 mt-1.5 text-slate-500 text-sm">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="line-clamp-1">{listing.location}</span>
            </div>
          )}
        </div>
      </Link>

      <div className="px-4 pb-4">
        <div className="flex items-center gap-4 text-sm text-slate-600 mb-3 pt-3 border-t border-slate-100">
          {listing.bedrooms !== null && (
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-slate-400" />
              {listing.bedrooms} bd
            </span>
          )}
          {listing.bathrooms !== null && (
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-slate-400" />
              {listing.bathrooms} ba
            </span>
          )}
          {listing.area_sqft !== null && (
            <span className="flex items-center gap-1.5">
              <Square className="w-4 h-4 text-slate-400" />
              {listing.area_sqft.toLocaleString()} sqft
            </span>
          )}
        </div>

        <a
          href={getWhatsAppUrl(whatsapp, waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <MessageCircle className="w-4 h-4" />
          Inquire on WhatsApp
        </a>
      </div>
    </article>
  )
}
