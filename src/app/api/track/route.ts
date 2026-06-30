import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { page, listing_id, project_id } = body
    const supabase = await createClient()

    await supabase.from('page_views').insert({
      page: page || '/',
      listing_id: listing_id || null,
      project_id: project_id || null,
      referrer: req.headers.get('referer'),
      user_agent: req.headers.get('user-agent'),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
