import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import type { ProjectWithMedia } from '@/types/database'

interface ProjectCardProps {
  project: ProjectWithMedia
}

export function ProjectCard({ project }: ProjectCardProps) {
  const coverImage = project.media?.find((m) => m.is_cover && m.type === 'image')
    || project.media?.find((m) => m.type === 'image')

  return (
    <article className="group cursor-pointer">
      <Link href={`/portfolio/${project.slug}`}>
        <div className="relative overflow-hidden rounded-xl bg-slate-100 aspect-[4/3]">
          {coverImage ? (
            <Image
              src={coverImage.url}
              alt={coverImage.alt_text || project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <span className="text-slate-400 text-sm">No image</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {project.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="warning">Featured</Badge>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white/80 text-sm line-clamp-2">{project.description}</p>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
              {project.title}
            </h3>
            <Badge variant="default" className="flex-shrink-0 capitalize">
              {project.category}
            </Badge>
          </div>
        </div>
      </Link>
    </article>
  )
}
