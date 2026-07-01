import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { LeadForm } from '@/components/forms/lead-form'
import { WhatsAppButton } from '@/components/common/whatsapp-button'

export const metadata: Metadata = {
  title: 'Contact Us — Plot Dealer in Bhogapuram, Visakhapatnam',
  description: 'Contact Bhogapuram Lands for plots and land in Bhogapuram, Visakhapatnam. Call or WhatsApp for site visits, pricing and availability. Serving Bhogapuram, Atchutapuram, Nakkapalle & Vizag.',
  keywords: ['contact plot dealer Bhogapuram', 'land sale enquiry Visakhapatnam', 'plot enquiry Bhogapuram', 'site visit Bhogapuram plots'],
}

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919999999999'

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Visit Our Office',
    value: 'Main Road, Bhogapuram, Visakhapatnam District, Andhra Pradesh — 531163',
  },
  {
    icon: Phone,
    label: 'Call / WhatsApp',
    value: whatsappNumber,
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'info@bhogapuramlands.com',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon–Sat: 9am – 7pm | Sunday: 10am – 4pm',
  },
]

export default function ContactPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-slate-900 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">Bhogapuram, Visakhapatnam</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Get In Touch</h1>
          <p className="text-slate-300">
            Looking for plots in Bhogapuram or interior design services in Visakhapatnam? Our team is ready to help — call, WhatsApp, or fill the form below.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left: info */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
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

            {/* WhatsApp CTA */}
            <div className="bg-green-50 rounded-xl border border-green-200 p-5 mb-6">
              <h3 className="font-semibold text-slate-900 mb-2">💬 Prefer WhatsApp?</h3>
              <p className="text-sm text-slate-600 mb-4">
                Chat with us instantly for plot availability, pricing, and to book a free site visit in Bhogapuram.
              </p>
              <WhatsAppButton label="WhatsApp for Plot Enquiry" />
            </div>

            {/* Areas covered */}
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-3">📍 Areas We Cover</h3>
              <div className="flex flex-wrap gap-2">
                {['Bhogapuram', 'Atchutapuram', 'Nakkapalle', 'Pedagantyada', 'Sabbavaram', 'Duvvada', 'Vizianagaram', 'Visakhapatnam'].map((area) => (
                  <span key={area} className="text-xs bg-white border border-amber-200 text-amber-700 font-medium px-3 py-1 rounded-full">{area}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-1">Send a Plot Enquiry</h2>
            <p className="text-slate-500 text-sm mb-6">Tell us what you're looking for and we'll get back within a few hours.</p>
            <LeadForm />
          </div>
        </div>
      </div>
    </div>
  )
}
