'use client'

import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

interface WhatsAppButtonProps {
  message?: string
  floating?: boolean
  label?: string
}

export function WhatsAppButton({ message = 'Hello, I am interested in your services!', floating = false, label }: WhatsAppButtonProps) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890'
  const url = getWhatsAppUrl(phone, message)

  if (floating) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-medium max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm"
    >
      <MessageCircle className="w-4 h-4" />
      {label || 'Chat on WhatsApp'}
    </a>
  )
}

interface WhatsAppShareProps {
  text: string
  className?: string
}

export function WhatsAppShare({ text, className }: WhatsAppShareProps) {
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors ${className}`}
    >
      <MessageCircle className="w-4 h-4" />
      Share on WhatsApp
    </a>
  )
}
