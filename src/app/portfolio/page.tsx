import { Suspense } from 'react'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { ProjectCard } from '@/components/interior/project-card'
import { Palette } from 'lucide-react'
import type { ProjectWithMedia } from '@/types/database'

export const metadata: Metadata = {
  title: 'Interior Design Portfolio',
  description: 'Explore our stunning interior design projects across residential, commercial, and luxury categories.',
}

const CATEGORIES = ['all', 'residential', 'commercial', 'luxury', 'office', 'hospitality']

interface PageProps {
  searchParams: Promise<{ category?: string; page?: string }>
}

async function ProjectsGrid({ searchParams }: { searchParams: Awaited<PageProps['searchParams']> }) {
  const supabase = await createClient()
  const page = parseInt(searchParams.page || '1')
  const limit = 12

  let query = supabase
    .from('interior_projects')
    .select('*, media(*)', { count: 'exact' })
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (searchParams.category && searchParams.category !== 'all') {
    query = query.eq('category', searchParams.category)
  }

  const { data, count } = await query
  const projects = (data as ProjectWithMedia[]) || []

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <Palette className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="font-semibold text-slate-700 mb-2">No projects found</h3>
        <p className="text-slate-500 text-sm">Try a different category filter.</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-6">{count} project{count !== 1 ? 's' : ''}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

export default async function PortfolioPage({ searchParams }: PageProps) {
  const params = await searchParams
  const activeCategory = params.category || 'all'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-amber-600 text-sm font-medium mb-3">
          <Palette className="w-4 h-4" />
          Our Work
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Interior Design Portfolio</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Transforming spaces into extraordinary living and working environments through thoughtful design.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={`/portfolio${cat !== 'all' ? `?category=${cat}` : ''}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
              activeCategory === cat
                ? 'bg-amber-600 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </a>
        ))}
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-slate-200 rounded-xl aspect-[4/3] animate-pulse" />
            ))}
          </div>
        }
      >
        <ProjectsGrid searchParams={params} />
      </Suspense>
    </div>
  )
}
