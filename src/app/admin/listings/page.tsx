import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { Pencil, Plus } from 'lucide-react'
import { DeleteButton } from '@/components/admin/delete-button'

export const metadata = { title: 'Manage Listings' }

export default async function AdminListingsPage() {
  const supabase = await createClient()
  const { data: listings } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false }) as any

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Listings</h1>
        <Link href="/admin/listings/new" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          New Listing
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {listings && listings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Title</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Price</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Published</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Date</th>
                  <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(listings as any[]).map((listing: any) => (
                  <tr key={listing.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900 line-clamp-1 max-w-xs">{listing.title}</div>
                      <div className="text-xs text-slate-400">{listing.location}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{formatPrice(listing.price, listing.currency)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={listing.status === 'sale' ? 'info' : 'success'} className="capitalize">
                        {listing.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={listing.published ? 'success' : 'warning'}>
                        {listing.published ? 'Published' : 'Draft'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {new Date(listing.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/listings/${listing.id}/edit`}
                          className="p-1.5 rounded text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <DeleteButton id={listing.id} type="listing" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500 mb-4">No listings yet.</p>
            <Link href="/admin/listings/new" className="inline-flex items-center gap-2 text-amber-600 hover:underline font-medium text-sm">
              <Plus className="w-4 h-4" />
              Create your first listing
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
