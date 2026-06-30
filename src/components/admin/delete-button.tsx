'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  id: string
  type: 'listing' | 'project' | 'lead'
}

export function DeleteButton({ id, type }: Props) {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const endpoint = type === 'listing' ? `/api/listings/${id}` : type === 'project' ? `/api/projects/${id}` : `/api/leads/${id}`

  const handleDelete = async () => {
    setLoading(true)
    const res = await fetch(endpoint, { method: 'DELETE' })
    if (res.ok) {
      router.refresh()
    } else {
      alert('Failed to delete. Please try again.')
      setLoading(false)
      setConfirming(false)
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? '...' : 'Confirm'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-2 py-1 text-xs bg-slate-200 text-slate-700 rounded hover:bg-slate-300"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-1.5 rounded text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
