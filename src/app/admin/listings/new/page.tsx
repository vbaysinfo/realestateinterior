import { ListingForm } from '@/components/admin/listing-form'

export const metadata = { title: 'New Listing' }

export default function NewListingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Create New Listing</h1>
      <ListingForm />
    </div>
  )
}
