import type { Metadata } from 'next'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { ProjectCard } from '@/components/interior/project-card'
import { Palette } from 'lucide-react'
import Link from 'next/link'
import type { ProjectWithMedia } from '@/types/database'

export const metadata: Metadata = {
  title: 'Interior Design Portfolio — Visakhapatnam',
  description: 'Explore our interior design portfolio for homes, villas, offices and commercial spaces in Visakhapatnam, Bhogapuram and Andhra Pradesh. Modern, luxury and contemporary designs.',
  keywords: ['interior design Visakhapatnam', 'home interior Vizag', 'interior designer Bhogapuram', 'villa interiors Visakhapatnam', 'office interiors Vizag'],
}

const CATEGORIES = [
  { value: '', label: 'All Projects' },
  { value: 'residential', label: 'Residential' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'office', label: 'Office' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'hospitality', label: 'Hospitality' },
]

async function ProjectsGrid({ category }: { category: string }) {
  const supabase = await createClient()
  let query = (supabase as any)
    .from('interior_projects')
    .select('*, media(*)')
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (category) query = query.eq('category', category)

  const { data } = await query
  const projects = (data as ProjectWithMedia[]) || []

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <Palette className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="font-semibold text-slate-700 mb-2">No projects yet</h3>
        <p className="text-slate-500 text-sm">Check back soon or <Link href="/contact" className="text-amber-600 underline">contact us</Link> to discuss your project.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category = '' } = await searchParams
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-amber-600 text-xs font-bold tracking-widest uppercase mb-1">Visakhapatnam & Bhogapuram</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Interior Design Portfolio</h1>
        <p className="text-slate-500 text-sm mt-1">Transforming homes, villas &amp; offices across Visakhapatnam and Andhra Pradesh with stunning interior design.</p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(({ value, label }) => (
          <Link
            key={value}
            href={value ? `/portfolio?category=${value}` : '/portfolio'}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              category === value
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400 hover:text-amber-600'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <Suspense fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(null).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 h-64 animate-pulse" />
          ))}
        </div>
      }>
        <ProjectsGrid category={category} />
      </Suspense>
    </div>
  )
}
