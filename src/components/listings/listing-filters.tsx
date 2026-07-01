'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Search, X } from 'lucide-react'
import { PROPERTY_CATEGORIES, getTypesForCategory } from '@/lib/property-categories'


export function ListingFilters() {
  const router = useRouter()
  const params = useSearchParams()
  const activeLocation = params.get('location') || ''
  const activeCategory = params.get('category') || ''
  const activeType = params.get('type') || ''

const update = useCallback((key: string, value: string) => {
    const p = new URLSearchParams(params.toString())
    if (value) p.set(key, value)
    else p.delete(key)
    p.delete('page')
    router.push(`/listings?${p.toString()}`)
  }, [params, router])

  const selectCategory = (cat: string) => {
    const p = new URLSearchParams(params.toString())
    if (cat) p.set('category', cat)
    else p.delete('category')
    p.delete('type')
    p.delete('page')
    router.push(`/listings?${p.toString()}`)
  }

const reset = () => router.push('/listings')
  const hasFilters = params.toString().length > 0
  const propertyTypes = getTypesForCategory(activeCategory)

  return (
    <div className="space-y-4">

      {/* Search + price + clear */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 bg-stone-50 rounded-xl px-4 py-2.5 border border-stone-100">
            <Search className="w-4 h-4 text-stone-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by location, area name…"
              defaultValue={activeLocation}
              onChange={(e) => update('location', e.target.value)}
              className="w-full text-sm text-slate-700 placeholder:text-slate-400 bg-transparent outline-none"
            />
          </div>
          <input
            type="number"
            placeholder="Max price (₹)"
            defaultValue={params.get('maxPrice') || ''}
            onChange={(e) => update('maxPrice', e.target.value)}
            className="px-4 py-2.5 bg-stone-50 border border-stone-100 rounded-xl text-sm text-slate-700 outline-none w-full sm:w-44"
          />
          {hasFilters && (
            <button onClick={reset}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-sm font-semibold transition-colors">
              <X className="w-4 h-4" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4">
        <p className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-3">Filter by Category</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => selectCategory('')}
            className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 text-xs font-semibold transition-all ${
              !activeCategory
                ? 'border-amber-500 bg-amber-50 text-amber-800'
                : 'border-slate-200 text-slate-500 hover:border-amber-200 hover:text-amber-700'
            }`}
          >
            <span className="text-xl">🏘️</span>
            All
          </button>
          {PROPERTY_CATEGORIES.map(({ label, emoji, unit }) => (
            <button key={label}
              onClick={() => selectCategory(label)}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 text-xs font-semibold transition-all ${
                activeCategory === label
                  ? 'border-amber-500 bg-amber-50 text-amber-800'
                  : 'border-slate-200 text-slate-500 hover:border-amber-200 hover:text-amber-700'
              }`}
            >
              <span className="text-xl">{emoji}</span>
              <span className="text-center leading-tight">{label}</span>
              <span className="text-[10px] font-normal text-slate-400">{unit}</span>
            </button>
          ))}
        </div>

        {/* Sub-type chips when category has types */}
        {activeCategory && propertyTypes.length > 0 && (
          <div className="mt-3 pt-3 border-t border-stone-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Property Type</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => update('type', '')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  !activeType
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400 hover:text-amber-700'
                }`}>
                All
              </button>
              {propertyTypes.map((type) => (
                <button key={type}
                  onClick={() => update('type', activeType === type ? '' : type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    activeType === type
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400 hover:text-amber-700'
                  }`}>
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>


    </div>
  )
}
