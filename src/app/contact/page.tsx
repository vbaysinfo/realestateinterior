import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { LeadForm } from '@/components/forms/lead-form'
import { WhatsAppButton } from '@/components/common/whatsapp-button'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: "Get in touch with our real estate and interior design team. We're here to help.",
}

const CONTACT_INFO = [
  { icon: MapPin, label: 'Visit Us', value: '123 Real Estate Avenue, City, Country' },
  { icon: Phone, label: 'Call Us', value: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1 234 567 8900' },
  { icon: Mail, label: 'Email Us', value: 'info@primeestates.com' },
  { icon: Clock, label: 'Business Hours', value: 'Mon–Sat: 9am – 6pm' },
]

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Get In Touch</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Have a question about a property or design project? Our team is ready to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">{label}</div>
                <div className="text-sm font-medium text-slate-900">{value}</div>
              </div>
            ))}
          </div>

          <div className="bg-green-50 rounded-xl border border-green-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-2">Prefer WhatsApp?</h3>
            <p className="text-sm text-slate-600 mb-4">
              Chat with us instantly on WhatsApp for quick responses.
            </p>
            <WhatsAppButton label="Start WhatsApp Chat" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <LeadForm />
        </div>
      </div>
    </div>
  )
}
