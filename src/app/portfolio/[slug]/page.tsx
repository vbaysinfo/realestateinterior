import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { MediaGallery, VideoGallery } from '@/components/common/lightbox'
import { LeadForm } from '@/components/forms/lead-form'
import { WhatsAppButton, WhatsAppShare } from '@/components/common/whatsapp-button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'
import type { ProjectWithMedia } from '@/types/database'

interface Props {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string): Promise<ProjectWithMedia | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('interior_projects')
    .select('*, media(*)')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  return data as ProjectWithMedia | null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return { title: 'Project Not Found' }

  const image = project.media?.find((m) => m.is_cover && m.type === 'image') || project.media?.find((m) => m.type === 'image')

  return {
    title: project.meta_title || project.title,
    description: project.meta_description || project.description?.slice(0, 160),
    openGraph: {
      title: project.title,
      description: project.description?.slice(0, 160),
      images: image ? [{ url: image.url, alt: project.title }] : [],
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  const images = project.media?.filter((m) => m.type === 'image') || []
  const videos = project.media?.filter((m) => m.type === 'video' || m.type === 'link') || []

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  const shareText = `Check out this amazing interior design project: ${project.title} — ${siteUrl}/portfolio/${project.slug}`
  const waMessage = `Hi! I'm interested in your interior design services. I saw your project "${project.title}". Please tell me more.`

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6 flex gap-2 items-center flex-wrap">
        <a href="/" className="hover:text-slate-700">Home</a>
        <span>/</span>
        <a href="/portfolio" className="hover:text-slate-700">Portfolio</a>
        <span>/</span>
        <span className="text-slate-900 truncate max-w-xs">{project.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <MediaGallery media={images} />

          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="default" className="capitalize">{project.category}</Badge>
              {project.featured && <Badge variant="warning">Featured</Badge>}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">{project.title}</h1>
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
              <Calendar className="w-4 h-4" />
              {format(new Date(project.created_at), 'MMMM yyyy')}
            </div>

            {project.description && (
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                {project.description}
              </div>
            )}
          </div>

          {videos.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Project Videos</h2>
              <VideoGallery videos={videos} />
            </div>
          )}

          <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
            <span className="text-sm text-slate-500">Share:</span>
            <WhatsAppShare text={shareText} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sticky top-20">
            <h3 className="font-semibold text-slate-900 mb-3">Interested in this style?</h3>
            <WhatsAppButton message={waMessage} label="Discuss Your Project" />
            <div className="mt-4 pt-4 border-t border-slate-100">
              <LeadForm projectId={project.id} listingTitle={project.title} compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
