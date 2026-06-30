import { ProjectForm } from '@/components/admin/project-form'

export const metadata = { title: 'New Project' }

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Create New Project</h1>
      <ProjectForm />
    </div>
  )
}
