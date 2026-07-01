import { createClient } from '@/lib/supabase/server'
import { LocationForm } from '@/components/admin/location-form'
import { notFound } from 'next/navigation'

export const metadata = { title: 'Edit Location' }

export default async function EditLocationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data, error } = await (supabase as any)
    .from('locations')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit Location</h1>
      <LocationForm initialData={data} />
    </div>
  )
}
