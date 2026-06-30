import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatPrice(price: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const cleaned = phone.replace(/\D/g, '')
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`
}

export function getWhatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export function getYouTubeThumbnail(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
  return null
}

export function isYouTubeUrl(url: string): boolean {
  return /youtube\.com|youtu\.be/.test(url)
}

export function isVimeoUrl(url: string): boolean {
  return /vimeo\.com/.test(url)
}

export function getEmbedUrl(url: string): string {
  if (isYouTubeUrl(url)) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    if (match) return `https://www.youtube.com/embed/${match[1]}`
  }
  if (isVimeoUrl(url)) {
    const match = url.match(/vimeo\.com\/(\d+)/)
    if (match) return `https://player.vimeo.com/video/${match[1]}`
  }
  return url
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}
