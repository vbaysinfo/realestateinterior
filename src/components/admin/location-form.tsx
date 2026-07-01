'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const COLOR_OPTIONS = [
  { label: 'Cyan → Blue', value: 'from-cyan-500 to-blue-600' },
  { label: 'Blue → Indigo', value: 'from-blue-500 to-indigo-600' },
  { label: 'Teal → Cyan', value: 'from-teal-500 to-cyan-600' },
  { label: 'Emerald → Teal', value: 'from-emerald-500 to-teal-600' },
  { label: 'Orange → Amber', value: 'from-orange-500 to-amber-600' },
  { label: 'Rose → Orange', value: 'from-rose-500 to-orange-500' },
  { label: 'Green → Teal', value: 'from-green-500 to-teal-600' },
  { label: 'Violet → Purple', value: 'from-violet-500 to-purple-600' },
  { label: 'Sky → Cyan', value: 'from-sky-500 to-cyan-600' },
  { label: 'Pink → Rose', value: 'from-pink-500 to-rose-600' },
]

interface Props {
  initialData?: any
}

export function LocationForm({ initialData }: Props) {
  const router = useRouter()
  const isEdit = !!initialData?.id
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    emoji: initialData?.emoji || '📍',
    description: initialData?.description || '',
    color: initialData?.color || 'from-cyan-500 to-blue-600',
    sort_order: initialData?.sort_order ?? 0,
    active: initialData?.active ?? true,
  })

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const url = isEdit ? `/api/locations/${initialData.id}` : '/api/locations'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      router.push('/admin/locations')
      router.refresh()
    } else {
      const d = await res.json()
      setError(d.error || 'Something went wrong')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-3 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Location Name *</label>
          <input
            required
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="e.g. Bheemunipatnam"
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Slug</label>
          <input
            value={form.slug}
            onChange={e => set('slug', e.target.value)}
            placeholder="auto-generated if empty"
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Emoji</label>
          <input
            value={form.emoji}
            onChange={e => set('emoji', e.target.value)}
            placeholder="🏖️"
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Sort Order</label>
          <input
            type="number"
            value={form.sort_order}
            onChange={e => set('sort_order', parseInt(e.target.value) || 0)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={e => set('description', e.target.value)}
          placeholder="Short description shown on the home page location card..."
          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Card Color Gradient</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {COLOR_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => set('color', value)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                form.color === value
                  ? 'border-cyan-500 ring-2 ring-cyan-200 bg-cyan-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className={`w-8 h-4 rounded bg-gradient-to-r ${value} flex-shrink-0`} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={form.active}
            onChange={e => set('active', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-cyan-600 peer-focus:ring-2 peer-focus:ring-cyan-300 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
        </label>
        <span className="text-sm font-medium text-slate-700">Active (show on site)</span>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving…' : isEdit ? 'Update Location' : 'Add Location'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/locations')}
          className="px-6 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
