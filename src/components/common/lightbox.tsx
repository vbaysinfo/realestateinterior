'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { cn, getEmbedUrl, isYouTubeUrl, isVimeoUrl } from '@/lib/utils'
import type { Media } from '@/types/database'

interface LightboxProps {
  media: Media[]
  initialIndex?: number
  onClose: () => void
}

function LightboxModal({ media, initialIndex = 0, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const current = media[index]

  const prev = () => setIndex((i) => (i - 1 + media.length) % media.length)
  const next = () => setIndex((i) => (i + 1) % media.length)

  const isVideo = current.type === 'video' || isYouTubeUrl(current.url) || isVimeoUrl(current.url)

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors z-10"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {media.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-lg transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-lg transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <div
        className="relative max-w-5xl max-h-[85vh] w-full mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <div className="aspect-video w-full">
            <iframe
              src={getEmbedUrl(current.url)}
              className="w-full h-full rounded-lg"
              allowFullScreen
              title={current.alt_text || 'Video'}
            />
          </div>
        ) : (
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={current.url}
              alt={current.alt_text || ''}
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        )}
      </div>

      {media.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {media.map((_, i) => (
            <button
              key={i}
              className={cn('w-2 h-2 rounded-full transition-colors', i === index ? 'bg-white' : 'bg-white/40')}
              onClick={(e) => { e.stopPropagation(); setIndex(i) }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface MediaGalleryProps {
  media: Media[]
  className?: string
}

export function MediaGallery({ media, className }: MediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const images = media.filter((m) => m.type === 'image')
  const coverImage = images.find((m) => m.is_cover) || images[0]
  const restImages = images.filter((m) => m.id !== coverImage?.id).slice(0, 4)

  if (images.length === 0) {
    return (
      <div className={cn('bg-slate-100 rounded-xl flex items-center justify-center aspect-video', className)}>
        <p className="text-slate-400 text-sm">No images available</p>
      </div>
    )
  }

  return (
    <>
      <div className={cn('grid gap-2', className)}>
        <div className="grid grid-cols-2 gap-2">
          {/* Main image */}
          {coverImage && (
            <div
              className={cn('relative cursor-pointer rounded-xl overflow-hidden bg-slate-100', restImages.length > 0 ? 'row-span-2' : 'col-span-2')}
              style={{ aspectRatio: restImages.length > 0 ? '4/3' : '16/9' }}
              onClick={() => setLightboxIndex(images.indexOf(coverImage))}
            >
              <Image
                src={coverImage.url}
                alt={coverImage.alt_text || ''}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </div>
          )}

          {/* Thumbnails */}
          {restImages.map((img, i) => (
            <div
              key={img.id}
              className="relative cursor-pointer rounded-xl overflow-hidden bg-slate-100 aspect-[4/3]"
              onClick={() => {
                const imgIdx = images.indexOf(img)
                if (i === 3 && images.length > 5) {
                  setLightboxIndex(imgIdx)
                } else {
                  setLightboxIndex(imgIdx)
                }
              }}
            >
              <Image
                src={img.url}
                alt={img.alt_text || ''}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 30vw"
              />
              {i === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">+{images.length - 5}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <LightboxModal
          media={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}

interface VideoGalleryProps {
  videos: Media[]
}

export function VideoGallery({ videos }: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<Media | null>(null)

  if (videos.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {videos.map((video) => (
          <button
            key={video.id}
            className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 group"
            onClick={() => setActiveVideo(video)}
          >
            {video.thumbnail_url ? (
              <Image src={video.thumbnail_url} alt="" fill className="object-cover opacity-70 group-hover:opacity-90 transition-opacity" sizes="300px" />
            ) : (
              <div className="absolute inset-0 bg-slate-800" />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Play className="w-5 h-5 text-white ml-0.5" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setActiveVideo(null)}
        >
          <button className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg" onClick={() => setActiveVideo(null)}>
            <X className="w-6 h-6" />
          </button>
          <div className="w-full max-w-4xl mx-8 aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={getEmbedUrl(activeVideo.url)}
              className="w-full h-full rounded-lg"
              allowFullScreen
              title="Video"
            />
          </div>
        </div>
      )}
    </>
  )
}
