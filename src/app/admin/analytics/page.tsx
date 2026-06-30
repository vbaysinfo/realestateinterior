import { createClient } from '@/lib/supabase/server'
import { AnalyticsDashboard } from '@/components/analytics/dashboard'

export const metadata = { title: 'Analytics' }

async function getAnalytics() {
  const supabase = await createClient()
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const [totalViews, recentViews, topListings, topProjects, leadsStats] = await Promise.all([
    supabase.from('page_views').select('id', { count: 'exact', head: true }),
    supabase.from('page_views').select('created_at').gte('created_at', thirtyDaysAgo).order('created_at') as any,
    supabase.from('page_views').select('listing_id, listings(title)').not('listing_id', 'is', null).limit(100),
    supabase.from('page_views').select('project_id, interior_projects(title)').not('project_id', 'is', null).limit(100),
    supabase.from('leads').select('created_at, type, status').gte('created_at', thirtyDaysAgo),
  ])

  // Build daily views chart data (last 30 days)
  const viewsByDay: Record<string, number> = {}
  recentViews.data?.forEach((v: any) => {
    const day = v.created_at.slice(0, 10)
    viewsByDay[day] = (viewsByDay[day] || 0) + 1
  })

  const chartData = Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    const key = d.toISOString().slice(0, 10)
    return { date: key, views: viewsByDay[key] || 0 }
  })

  // Top listings
  const listingCounts: Record<string, { title: string; count: number }> = {}
  topListings.data?.forEach((v: any) => {
    if (v.listing_id && v.listings?.title) {
      if (!listingCounts[v.listing_id]) listingCounts[v.listing_id] = { title: v.listings.title, count: 0 }
      listingCounts[v.listing_id].count++
    }
  })

  const projectCounts: Record<string, { title: string; count: number }> = {}
  topProjects.data?.forEach((v: any) => {
    if (v.project_id && v.interior_projects?.title) {
      if (!projectCounts[v.project_id]) projectCounts[v.project_id] = { title: v.interior_projects.title, count: 0 }
      projectCounts[v.project_id].count++
    }
  })

  return {
    totalViews: totalViews.count || 0,
    chartData,
    topListings: Object.values(listingCounts).sort((a, b) => b.count - a.count).slice(0, 5),
    topProjects: Object.values(projectCounts).sort((a, b) => b.count - a.count).slice(0, 5),
    leads: leadsStats.data || [],
    totalLeads: leadsStats.data?.length || 0,
  }
}

export default async function AnalyticsPage() {
  const analytics = await getAnalytics()
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Analytics</h1>
      <AnalyticsDashboard {...analytics} />
    </div>
  )
}
