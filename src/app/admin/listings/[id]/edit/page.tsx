import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ListingForm } from '@/components/admin/listing-form'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Edit Listing' }

export default async function EditListingPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: listing } = await supabase.from('listings').select('*').eq('id', id).single()

  if (!listing) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit Listing</h1>
      <ListingForm listing={listing} />
    </div>
  )
}
