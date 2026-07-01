import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Pencil, MapPin } from 'lucide-react'
import { DeleteLocationButton } from '@/components/admin/delete-location-button'

export const metadata = { title: 'Manage Locations' }

export default async function AdminLocationsPage() {
  const supabase = await createClient()
  const { data: locations } = await (supabase as any)
    .from('locations')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Locations</h1>
          <p className="text-sm text-slate-500 mt-1">Manage coastal areas shown on home page and filters</p>
        </div>
        <Link href="/admin/locations/new"
          className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Add Location
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {locations && locations.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Location</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Slug</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Color</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Order</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(locations as any[]).map((loc: any) => (
                <tr key={loc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{loc.emoji}</span>
                      <div>
                        <div className="font-medium text-slate-900">{loc.name}</div>
                        <div className="text-xs text-slate-400 line-clamp-1 max-w-xs">{loc.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">{loc.slug}</td>
                  <td className="px-4 py-3">
                    <div className={`w-16 h-5 rounded-full bg-gradient-to-r ${loc.color}`} />
                  </td>
                  <td className="px-4 py-3 text-slate-600">{loc.sort_order}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      loc.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {loc.active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/locations/${loc.id}`}
                        className="p-1.5 rounded text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteLocationButton id={loc.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-16">
            <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No locations yet</p>
            <p className="text-slate-400 text-sm mt-1">Add your first coastal area to get started</p>
            <Link href="/admin/locations/new"
              className="inline-flex items-center gap-2 mt-4 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <Plus className="w-4 h-4" /> Add Location
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
