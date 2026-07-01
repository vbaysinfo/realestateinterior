import Link from 'next/link'
import Image from 'next/image'
import { Square, MapPin, MessageCircle, Building2 } from 'lucide-react'
import { formatPrice, getWhatsAppUrl } from '@/lib/utils'
import type { ListingWithMedia } from '@/types/database'

interface ListingCardProps {
  listing: ListingWithMedia
}

export function ListingCard({ listing }: ListingCardProps) {
  const coverImage = listing.media?.find((m) => m.is_cover && m.type === 'image')
    || listing.media?.find((m) => m.type === 'image')

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'
  const waMessage = `Hi! I'm interested in "${listing.title}" at ${formatPrice(listing.price, listing.currency)}. Please share more details.`

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
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
            <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
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
          <p className="text-blue-700 font-black text-lg">
            {formatPrice(listing.price, listing.currency)}
            {listing.status === 'rent' && <span className="text-sm font-normal text-slate-400">/mo</span>}
          </p>
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
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Enquire on WhatsApp
        </a>
      </div>
    </article>
  )
}
