import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const type = searchParams.get('type')
  const location = searchParams.get('location')
  const maxPrice = searchParams.get('maxPrice')
  const featured = searchParams.get('featured')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')
  const offset = (page - 1) * limit

  let query = (supabase as any).from('listings').select('*, media(*)', { count: 'exact' }).eq('published', true)

  if (status) query = query.eq('status', status)
  if (type) query = query.eq('property_type', type)
  if (location) query = query.ilike('location', `%${location}%`)
  if (maxPrice) query = query.lte('price', parseInt(maxPrice))
  if (featured === 'true') query = query.eq('featured', true)

  const { data, error, count } = await query.order('created_at', { ascending: false }).range(offset, offset + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, count, page, limit })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const payload = { ...body, slug: body.slug || slugify(body.title) }

  const { data, error } = await (supabase as any).from('listings').insert(payload).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
