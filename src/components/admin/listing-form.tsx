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
import { PROPERTY_CATEGORIES, getUnitForCategory, getTypesForCategory } from '@/lib/property-categories'
import type { Listing } from '@/types/database'

interface FormData {
  title: string
  slug?: string
  description: string
  location: string
  price: number
  currency: string
  status: 'sale' | 'rent'
  category: string
  property_type: string
  area_sqft?: number | null
  area_unit?: string
  bedrooms?: number | null
  bathrooms?: number | null
  featured: boolean
  published: boolean
  meta_title?: string
  meta_description?: string
}

interface Props {
  listing?: Listing & { category?: string; area_unit?: string }
}

export function ListingForm({ listing }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [savedId, setSavedId] = useState<string | null>(listing?.id || null)

  const defaultCategory = listing?.category || 'Open Plots'
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory)

  const propertyTypes = getTypesForCategory(selectedCategory)
  const areaUnit = getUnitForCategory(selectedCategory)

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: listing ? {
      ...listing,
      category: defaultCategory,
      area_unit: listing.area_unit || areaUnit,
      area_sqft: listing.area_sqft ?? undefined,
      bedrooms: listing.bedrooms ?? undefined,
      bathrooms: listing.bathrooms ?? undefined,
    } : {
      status: 'sale',
      currency: 'INR',
      category: 'Open Plots',
      property_type: '',
      area_unit: 'Sq Yard',
      featured: false,
      published: true,
    },
  })

  const title = watch('title')
  const isResidential = selectedCategory === 'Residential'

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat)
    setValue('category', cat)
    setValue('area_unit', getUnitForCategory(cat))
    setValue('property_type', '')
    if (cat !== 'Residential') {
      setValue('bedrooms', null)
      setValue('bathrooms', null)
    }
  }

  const onSubmit = async (data: FormData) => {
    setError(null)
    const payload = {
      ...data,
      slug: data.slug || slugify(data.title),
      area_unit: areaUnit,
    }

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

        {/* Basic Information */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Listing Title"
                required
                placeholder="e.g. 200 Sq Yard Open Plot in Rushikonda"
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

        {/* Category & Property Type */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Category & Type</h2>

          {/* Category picker cards */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">Project Category *</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PROPERTY_CATEGORIES.map(({ label, emoji, unit }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleCategoryChange(label)}
                  className={`flex flex-col items-center gap-1.5 px-3 py-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                    selectedCategory === label
                      ? 'border-cyan-500 bg-cyan-50 text-cyan-800 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-center leading-tight">{label}</span>
                  <span className="text-[10px] font-normal text-slate-400">Unit: {unit}</span>
                </button>
              ))}
            </div>
            <input type="hidden" {...register('category')} />
          </div>

          {/* Property Type (only if category has sub-types) */}
          {propertyTypes.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Property Type *</label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => {
                  const current = watch('property_type')
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setValue('property_type', type)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        current === type
                          ? 'border-cyan-500 bg-cyan-600 text-white'
                          : 'border-slate-200 text-slate-600 hover:border-cyan-300 hover:text-cyan-700'
                      }`}
                    >
                      {type}
                    </button>
                  )
                })}
              </div>
              <input type="hidden" {...register('property_type')} />
            </div>
          )}

          {/* Area unit badge */}
          <div className="flex items-center gap-2 mt-2 p-3 bg-sky-50 border border-sky-100 rounded-lg">
            <span className="text-xs text-sky-700 font-medium">Area unit for this category:</span>
            <span className="text-xs font-black text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-full">{areaUnit}</span>
          </div>
        </div>

        {/* Pricing & Details */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Pricing &amp; Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Price (₹)" type="number" required {...register('price')} error={errors.price?.message} />
            <Select
              label="Currency"
              {...register('currency')}
              options={[
                { value: 'INR', label: 'INR (₹)' },
                { value: 'USD', label: 'USD ($)' },
              ]}
            />
            <Select
              label="Status"
              {...register('status')}
              options={[{ value: 'sale', label: 'For Sale' }, { value: 'rent', label: 'For Rent' }]}
            />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Area ({areaUnit})</label>
              <input
                type="number"
                step="0.01"
                placeholder={`Enter in ${areaUnit}`}
                {...register('area_sqft')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* Bedrooms / Bathrooms only for Residential */}
            {isResidential && (
              <>
                <Input label="Bedrooms" type="number" {...register('bedrooms')} error={errors.bedrooms?.message} />
                <Input label="Bathrooms" type="number" {...register('bathrooms')} error={errors.bathrooms?.message} />
              </>
            )}
          </div>
        </div>

        {/* SEO & Settings */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">SEO &amp; Settings</h2>
          <div className="grid grid-cols-1 gap-4">
            <Input label="Meta Title" placeholder={title || 'SEO title'} {...register('meta_title')} />
            <Textarea label="Meta Description" rows={2} placeholder="SEO description (150-160 chars)" {...register('meta_description')} />
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('featured')} className="w-4 h-4 accent-cyan-600" />
                <span className="text-sm text-slate-700">Featured listing</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('published')} className="w-4 h-4 accent-cyan-600" />
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
          <MediaUploader module="real-estate" listingId={savedId} />
        </div>
      )}
    </div>
  )
}
