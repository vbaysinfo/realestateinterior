import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File
  const path = formData.get('path') as string

  if (!file || !path) return NextResponse.json({ error: 'Missing file or path' }, { status: 400 })

  const buffer = await file.arrayBuffer()
  const { error } = await supabase.storage.from('media').upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(path)
  return NextResponse.json({ publicUrl, path })
}
