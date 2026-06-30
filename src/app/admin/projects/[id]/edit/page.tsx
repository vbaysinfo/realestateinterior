import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProjectForm } from '@/components/admin/project-form'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Edit Project' }

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: project } = await supabase.from('interior_projects').select('*').eq('id', id).single()

  if (!project) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  )
}
