'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, SlidersHorizontal } from 'lucide-react'

const PROPERTY_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'land', label: 'Land' },
]

const STATUS_OPTIONS = [
  { value: '', label: 'Sale & Rent' },
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
]

export function ListingFilters() {
  const router = useRouter()
  const params = useSearchParams()

  const update = useCallback((key: string, value: string) => {
    const p = new URLSearchParams(params.toString())
    if (value) p.set(key, value)
    else p.delete(key)
    p.delete('page')
    router.push(`/listings?${p.toString()}`)
  }, [params, router])

  const reset = () => router.push('/listings')

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-4 h-4 text-slate-500" />
        <span className="font-medium text-slate-700 text-sm">Filter Properties</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search location..."
            defaultValue={params.get('location') || ''}
            onChange={(e) => update('location', e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <Select
          options={STATUS_OPTIONS}
          value={params.get('status') || ''}
          onChange={(e) => update('status', e.target.value)}
        />

        <Select
          options={PROPERTY_TYPES}
          value={params.get('type') || ''}
          onChange={(e) => update('type', e.target.value)}
        />

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Max price"
            defaultValue={params.get('maxPrice') || ''}
            onChange={(e) => update('maxPrice', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {params.toString() && (
            <Button variant="ghost" size="sm" onClick={reset} className="whitespace-nowrap">
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
