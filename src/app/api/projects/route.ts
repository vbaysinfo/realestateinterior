import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const url = new URL(req.url)
  const category = url.searchParams.get('category')
  const featured = url.searchParams.get('featured')
  const page = parseInt(url.searchParams.get('page') || '1')
  const limit = parseInt(url.searchParams.get('limit') || '12')

  let query = supabase
    .from('interior_projects')
    .select('*, media(*)', { count: 'exact' })
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (category) query = query.eq('category', category)
  if (featured === 'true') query = query.eq('featured', true)

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data, count, page, limit })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const slug = body.slug || slugify(body.title)

  const { data, error } = await supabase
    .from('interior_projects')
    .insert({ ...body, slug, designer_id: user.id })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
