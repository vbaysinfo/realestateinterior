import { LocationForm } from '@/components/admin/location-form'

export const metadata = { title: 'Add Location' }

export default function NewLocationPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Add New Location</h1>
      <LocationForm />
    </div>
  )
}
