'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  leadId: string
  status: string
}

export function LeadStatusUpdater({ leadId, status }: Props) {
  const [current, setCurrent] = useState(status)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const update = async (newStatus: string) => {
    setLoading(true)
    const res = await fetch(`/api/leads/${leadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    if (res.ok) {
      setCurrent(newStatus)
      router.refresh()
    }
    setLoading(false)
  }

  const colors: Record<string, string> = {
    new: 'bg-green-100 text-green-700',
    contacted: 'bg-blue-100 text-blue-700',
    closed: 'bg-slate-100 text-slate-600',
  }

  return (
    <select
      value={current}
      onChange={(e) => update(e.target.value)}
      disabled={loading}
      className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${colors[current]} disabled:opacity-50`}
    >
      <option value="new">New</option>
      <option value="contacted">Contacted</option>
      <option value="closed">Closed</option>
    </select>
  )
}
