'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { MediaUploader } from '@/components/admin/media-uploader'
import { slugify } from '@/lib/utils'
import type { Listing } from '@/types/database'

interface FormData {
  title: string
  slug?: string
  description: string
  location: string
  price: number
  currency: string
  status: 'sale' | 'rent'
  property_type: string
  area_sqft?: number | null
  bedrooms?: number | null
  bathrooms?: number | null
  featured: boolean
  published: boolean
  meta_title?: string
  meta_description?: string
}

interface Props {
  listing?: Listing
}

export function ListingForm({ listing }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [savedId, setSavedId] = useState<string | null>(listing?.id || null)

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: listing ? {
      ...listing,
      area_sqft: listing.area_sqft ?? undefined,
      bedrooms: listing.bedrooms ?? undefined,
      bathrooms: listing.bathrooms ?? undefined,
    } : {
      status: 'sale',
      currency: 'USD',
      property_type: 'apartment',
      featured: false,
      published: false,
    },
  })

  const title = watch('title')

  const onSubmit = async (data: FormData) => {
    setError(null)
    const payload = { ...data, slug: data.slug || slugify(data.title) }

    const res = await fetch(listing ? `/api/listings/${listing.id}` : '/api/listings', {
      method: listing ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.json()
      setError(err.error || 'Failed to save')
      return
    }

    const saved = await res.json()
    setSavedId(saved.id)
    if (!listing) {
      router.push(`/admin/listings/${saved.id}/edit`)
    } else {
      router.refresh()
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Listing Title"
                required
                placeholder="e.g. Luxury 3BR Apartment in Downtown"
                {...register('title')}
                error={errors.title?.message}
                onChange={(e) => {
                  register('title').onChange(e)
                  if (!listing) setValue('slug', slugify(e.target.value))
                }}
              />
            </div>
            <Input label="URL Slug" {...register('slug')} placeholder="auto-generated-from-title" error={errors.slug?.message} />
            <Input label="Location / Address" required {...register('location')} error={errors.location?.message} />
            <div className="sm:col-span-2">
              <Textarea label="Description" required rows={5} {...register('description')} error={errors.description?.message} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Pricing &amp; Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Price" type="number" required {...register('price')} error={errors.price?.message} />
            <Select
              label="Currency"
              {...register('currency')}
              options={[{ value: 'USD', label: 'USD' }, { value: 'EUR', label: 'EUR' }, { value: 'GBP', label: 'GBP' }, { value: 'AED', label: 'AED' }]}
            />
            <Select
              label="Status"
              {...register('status')}
              options={[{ value: 'sale', label: 'For Sale' }, { value: 'rent', label: 'For Rent' }]}
            />
            <Select
              label="Property Type"
              {...register('property_type')}
              options={[
                { value: 'apartment', label: 'Apartment' },
                { value: 'villa', label: 'Villa' },
                { value: 'townhouse', label: 'Townhouse' },
                { value: 'commercial', label: 'Commercial' },
                { value: 'land', label: 'Land' },
                { value: 'office', label: 'Office' },
              ]}
            />
            <Input label="Area (sqft)" type="number" {...register('area_sqft')} error={errors.area_sqft?.message} />
            <Input label="Bedrooms" type="number" {...register('bedrooms')} error={errors.bedrooms?.message} />
            <Input label="Bathrooms" type="number" {...register('bathrooms')} error={errors.bathrooms?.message} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">SEO &amp; Settings</h2>
          <div className="grid grid-cols-1 gap-4">
            <Input label="Meta Title" placeholder={title || 'SEO title'} {...register('meta_title')} />
            <Textarea label="Meta Description" rows={2} placeholder="SEO description (150-160 chars)" {...register('meta_description')} />
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('featured')} className="w-4 h-4 accent-amber-600" />
                <span className="text-sm text-slate-700">Featured listing</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('published')} className="w-4 h-4 accent-amber-600" />
                <span className="text-sm text-slate-700">Published (visible to public)</span>
              </label>
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}

        <div className="flex gap-3">
          <Button type="submit" loading={isSubmitting}>
            {listing ? 'Save Changes' : 'Create Listing'}
          </Button>
          {listing && (
            <Button type="button" variant="outline" onClick={() => window.open(`/listings/${listing.slug}`, '_blank')}>
              View Public Page
            </Button>
          )}
        </div>
      </form>

      {savedId && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Media &amp; Images</h2>
          <MediaUploader
            module="real-estate"
            listingId={savedId}
          />
        </div>
      )}
    </div>
  )
}
