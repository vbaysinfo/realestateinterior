import { createClient } from '@/lib/supabase/server'
import { Building2, Palette, Users, Eye } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'Admin Dashboard' }

async function getStats() {
  const supabase = await createClient()
  const [listings, projects, leads, views] = await Promise.all([
    supabase.from('listings').select('id', { count: 'exact', head: true }).eq('published', true),
    supabase.from('interior_projects').select('id', { count: 'exact', head: true }).eq('published', true),
    supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('page_views').select('id', { count: 'exact', head: true }).gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
  ])
  return {
    listings: listings.count || 0,
    projects: projects.count || 0,
    newLeads: leads.count || 0,
    weeklyViews: views.count || 0,
  }
}

async function getRecentLeads() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)
  return data || []
}

export default async function AdminDashboard() {
  const [stats, recentLeads] = await Promise.all([getStats(), getRecentLeads()])

  const STAT_CARDS = [
    { label: 'Published Listings', value: stats.listings, icon: Building2, href: '/admin/listings', color: 'text-blue-600 bg-blue-100' },
    { label: 'Design Projects', value: stats.projects, icon: Palette, href: '/admin/projects', color: 'text-purple-600 bg-purple-100' },
    { label: 'New Leads', value: stats.newLeads, icon: Users, href: '/admin/leads', color: 'text-green-600 bg-green-100' },
    { label: 'Views (7 days)', value: stats.weeklyViews, icon: Eye, href: '/admin/analytics', color: 'text-amber-600 bg-amber-100' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/listings/new" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            + New Listing
          </Link>
          <Link href="/admin/projects/new" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            + New Project
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {STAT_CARDS.map(({ label, value, icon: Icon, href, color }) => (
          <Link key={label} href={href} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{value}</div>
            <div className="text-sm text-slate-500 mt-0.5">{label}</div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent Leads</h2>
          <Link href="/admin/leads" className="text-sm text-amber-600 hover:text-amber-700 font-medium">View all →</Link>
        </div>
        {recentLeads.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {(recentLeads as any[]).map((lead: any) => (
              <div key={lead.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-medium text-slate-900 text-sm truncate">{lead.name}</div>
                  <div className="text-xs text-slate-500 truncate">{lead.email} • {lead.type}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    lead.status === 'new' ? 'bg-green-100 text-green-700' :
                    lead.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {lead.status}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 py-12 text-center text-slate-500 text-sm">No leads yet</div>
        )}
      </div>
    </div>
  )
}
