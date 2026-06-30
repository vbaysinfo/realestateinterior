import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json()

  const { error } = await (supabase as any).from('page_views').insert({
    path: body.path,
    listing_id: body.listing_id || null,
    project_id: body.project_id || null,
    referrer: body.referrer || null,
    user_agent: request.headers.get('user-agent') || null,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
