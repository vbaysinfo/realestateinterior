import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { LeadStatusUpdater } from '@/components/admin/lead-status-updater'

export const metadata = { title: 'Manage Leads' }

export default async function AdminLeadsPage() {
  const supabase = await createClient()
  const { data: leads } = await supabase
    .from('leads')
    .select(`*, listings(title), interior_projects(title)`)
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Leads</h1>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {leads && leads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Contact</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Source</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Message</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{lead.name}</div>
                      <div className="text-xs text-slate-400">{lead.email}</div>
                      {lead.phone && <div className="text-xs text-slate-400">{lead.phone}</div>}
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-600">{lead.type}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs max-w-xs">
                      {lead.listings?.title || lead.interior_projects?.title || lead.source || '—'}
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-sm">
                      <p className="line-clamp-2 text-xs">{lead.message}</p>
                    </td>
                    <td className="px-4 py-3">
                      <LeadStatusUpdater leadId={lead.id} status={lead.status} />
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 text-slate-500 text-sm">No leads yet</div>
        )}
      </div>
    </div>
  )
}
