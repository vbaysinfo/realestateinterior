'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Eye, Users, Building2, Palette } from 'lucide-react'
import { format } from 'date-fns'

interface Props {
  totalViews: number
  chartData: { date: string; views: number }[]
  topListings: { title: string; count: number }[]
  topProjects: { title: string; count: number }[]
  leads: { created_at: string; type: string; status: string }[]
  totalLeads: number
}

export function AnalyticsDashboard({ totalViews, chartData, topListings, topProjects, leads, totalLeads }: Props) {
  const newLeads = leads.filter((l) => l.status === 'new').length

  const stats = [
    { label: 'Total Page Views', value: totalViews, icon: Eye, color: 'text-blue-600 bg-blue-100' },
    { label: 'Leads (30 days)', value: totalLeads, icon: Users, color: 'text-green-600 bg-green-100' },
    { label: 'New Leads', value: newLeads, icon: Users, color: 'text-amber-600 bg-amber-100' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{value.toLocaleString()}</div>
            <div className="text-sm text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Views chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Page Views (Last 30 Days)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="views" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="date"
              tickFormatter={(d) => format(new Date(d + 'T00:00:00'), 'MMM d')}
              tick={{ fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
            <Tooltip
              labelFormatter={(d) => format(new Date(d + 'T00:00:00'), 'MMM d, yyyy')}
              formatter={(v: number) => [v, 'Views']}
            />
            <Area type="monotone" dataKey="views" stroke="#d97706" fill="url(#views)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Top content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-4 h-4 text-slate-500" />
            <h3 className="font-semibold text-slate-900">Top Listings</h3>
          </div>
          {topListings.length > 0 ? (
            <div className="space-y-3">
              {topListings.map(({ title, count }) => (
                <div key={title} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-slate-700 truncate">{title}</div>
                    <div className="h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${(count / (topListings[0]?.count || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-500 flex-shrink-0">{count} views</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No data yet</p>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-4 h-4 text-slate-500" />
            <h3 className="font-semibold text-slate-900">Top Projects</h3>
          </div>
          {topProjects.length > 0 ? (
            <div className="space-y-3">
              {topProjects.map(({ title, count }) => (
                <div key={title} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-slate-700 truncate">{title}</div>
                    <div className="h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${(count / (topProjects[0]?.count || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-500 flex-shrink-0">{count} views</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No data yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
