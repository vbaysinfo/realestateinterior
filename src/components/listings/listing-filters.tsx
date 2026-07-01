'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Search, MapPin, X } from 'lucide-react'

const PROPERTY_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'Beachfront Plot', label: '🏖️ Beachfront Plot' },
  { value: 'Sea View Villa Plot', label: '🌊 Sea View Villa Plot' },
  { value: 'Coastal Residential', label: '🐚 Coastal Residential' },
  { value: 'Commercial Coastal', label: '🏢 Commercial Coastal' },
  { value: 'Tourism / Resort Land', label: '⛵ Tourism / Resort Land' },
  { value: 'Hillside Sea View', label: '⛰️ Hillside Sea View' },
]

const COASTAL_LOCATIONS = [
  { label: 'Bheemunipatnam', emoji: '🏖️' },
  { label: 'Rushikonda', emoji: '🌊' },
  { label: 'Bheemili', emoji: '🐚' },
  { label: 'Rishikonda Hills', emoji: '⛰️' },
  { label: 'Vizag Beach Road', emoji: '🛣️' },
  { label: 'Bhogapuram Coast', emoji: '🌅' },
  { label: 'Nakkapalle Coast', emoji: '🌴' },
  { label: 'Airport Zone', emoji: '✈️' },
]

export function ListingFilters() {
  const router = useRouter()
  const params = useSearchParams()
  const activeLocation = params.get('location') || ''
  const activeType = params.get('type') || ''

  const update = useCallback((key: string, value: string) => {
    const p = new URLSearchParams(params.toString())
    if (value) p.set(key, value)
    else p.delete(key)
    p.delete('page')
    router.push(`/listings?${p.toString()}`)
  }, [params, router])

  const toggleLocation = (loc: string) => {
    update('location', activeLocation === loc ? '' : loc)
  }

  const reset = () => router.push('/listings')
  const hasFilters = params.toString().length > 0

  return (
    <div className="space-y-4">

      {/* Search + Type row */}
      <div className="bg-white rounded-2xl border border-cyan-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 bg-sky-50 rounded-xl px-4 py-2.5 border border-sky-100">
            <Search className="w-4 h-4 text-sky-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by location, area name…"
              defaultValue={activeLocation}
              onChange={(e) => update('location', e.target.value)}
              className="w-full text-sm text-slate-700 placeholder:text-slate-400 bg-transparent outline-none"
            />
          </div>
          <select
            value={activeType}
            onChange={(e) => update('type', e.target.value)}
            className="px-4 py-2.5 bg-sky-50 border border-sky-100 rounded-xl text-sm text-slate-700 outline-none cursor-pointer min-w-[200px]"
          >
            {PROPERTY_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Max price (₹)"
            defaultValue={params.get('maxPrice') || ''}
            onChange={(e) => update('maxPrice', e.target.value)}
            className="px-4 py-2.5 bg-sky-50 border border-sky-100 rounded-xl text-sm text-slate-700 outline-none w-full sm:w-40"
          />
          {hasFilters && (
            <button onClick={reset}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-sm font-semibold transition-colors">
              <X className="w-4 h-4" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Location chips */}
      <div className="bg-white rounded-2xl border border-cyan-100 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-bold text-cyan-900 uppercase tracking-widest">Filter by Coastal Area</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => update('location', '')}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
              !activeLocation
                ? 'bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-200'
                : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-400 hover:text-cyan-700'
            }`}>
            🌊 All Areas
          </button>
          {COASTAL_LOCATIONS.map(({ label, emoji }) => (
            <button key={label}
              onClick={() => toggleLocation(label)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                activeLocation === label
                  ? 'bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-400 hover:text-cyan-700'
              }`}>
              {emoji} {label}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}
