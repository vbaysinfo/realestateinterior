'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  type: z.enum(['inquiry', 'callback', 'general']),
})

type FormData = z.infer<typeof schema>

interface LeadFormProps {
  listingId?: string
  projectId?: string
  listingTitle?: string
  compact?: boolean
}

export function LeadForm({ listingId, projectId, listingTitle, compact = false }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'inquiry',
      message: listingTitle ? `I am interested in "${listingTitle}". Please contact me with more details.` : '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setError(null)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, listing_id: listingId, project_id: projectId }),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or contact us via WhatsApp.')
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
        <CheckCircle className="w-12 h-12 text-green-500" />
        <h3 className="font-semibold text-lg text-slate-900">Thank you!</h3>
        <p className="text-slate-500 text-sm max-w-sm">
          We've received your inquiry and will get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {!compact && (
        <div>
          <h3 className="font-semibold text-lg text-slate-900">Send an Inquiry</h3>
          <p className="text-sm text-slate-500 mt-1">Fill in the form below and we'll get back to you shortly.</p>
        </div>
      )}

      <div className={compact ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
        <Input
          label="Your Name"
          placeholder="John Doe"
          required
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          required
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      <div className={compact ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 234 567 8900"
          {...register('phone')}
          error={errors.phone?.message}
        />
        <Select
          label="Inquiry Type"
          {...register('type')}
          error={errors.type?.message}
          options={[
            { value: 'inquiry', label: 'General Inquiry' },
            { value: 'callback', label: 'Request Callback' },
            { value: 'general', label: 'Other' },
          ]}
        />
      </div>

      <Textarea
        label="Message"
        placeholder="Tell us about your requirements..."
        required
        rows={compact ? 3 : 4}
        {...register('message')}
        error={errors.message?.message}
      />

      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

      <Button type="submit" loading={isSubmitting} size={compact ? 'md' : 'lg'} className="w-full">
        Send Inquiry
      </Button>
    </form>
  )
}
