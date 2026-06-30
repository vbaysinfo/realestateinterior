'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { MediaUploader } from '@/components/admin/media-uploader'
import { slugify } from '@/lib/utils'
import type { InteriorProject } from '@/types/database'

interface FormData {
  title: string
  slug?: string
  description: string
  category: string
  featured: boolean
  published: boolean
  meta_title?: string
  meta_description?: string
}

interface Props {
  project?: InteriorProject
}

export function ProjectForm({ project }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [savedId, setSavedId] = useState<string | null>(project?.id || null)

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: project || {
      category: 'residential',
      featured: false,
      published: false,
    },
  })

  const title = watch('title')

  const onSubmit = async (data: FormData) => {
    setError(null)
    const payload = { ...data, slug: data.slug || slugify(data.title) }

    const res = await fetch(project ? `/api/projects/${project.id}` : '/api/projects', {
      method: project ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.json()
      setError(err.error || 'Failed to save')
      return
    }

    const saved = await res.json()
    setSavedId(saved.id)
    if (!project) {
      router.push(`/admin/projects/${saved.id}/edit`)
    } else {
      router.refresh()
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Project Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Project Title"
                required
                {...register('title')}
                error={errors.title?.message}
                onChange={(e) => {
                  register('title').onChange(e)
                  if (!project) setValue('slug', slugify(e.target.value))
                }}
              />
            </div>
            <Input label="URL Slug" {...register('slug')} placeholder="auto-generated" />
            <Select
              label="Category"
              {...register('category')}
              options={[
                { value: 'residential', label: 'Residential' },
                { value: 'commercial', label: 'Commercial' },
                { value: 'luxury', label: 'Luxury' },
                { value: 'office', label: 'Office' },
                { value: 'hospitality', label: 'Hospitality' },
              ]}
            />
            <div className="sm:col-span-2">
              <Textarea label="Description" required rows={5} {...register('description')} error={errors.description?.message} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">SEO &amp; Settings</h2>
          <div className="grid grid-cols-1 gap-4">
            <Input label="Meta Title" placeholder={title || 'SEO title'} {...register('meta_title')} />
            <Textarea label="Meta Description" rows={2} {...register('meta_description')} />
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('featured')} className="w-4 h-4 accent-amber-600" />
                <span className="text-sm text-slate-700">Featured project</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('published')} className="w-4 h-4 accent-amber-600" />
                <span className="text-sm text-slate-700">Published</span>
              </label>
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}

        <div className="flex gap-3">
          <Button type="submit" loading={isSubmitting}>
            {project ? 'Save Changes' : 'Create Project'}
          </Button>
          {project && (
            <Button type="button" variant="outline" onClick={() => window.open(`/portfolio/${project.slug}`, '_blank')}>
              View Public Page
            </Button>
          )}
        </div>
      </form>

      {savedId && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Media &amp; Images</h2>
          <MediaUploader module="interior-design" projectId={savedId} />
        </div>
      )}
    </div>
  )
}
