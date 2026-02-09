import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('gr_reports')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })

  return NextResponse.json(data)
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { title, description, platform, content_url, violation_type, dsa_article, status, council_id, country } = body

  const updateData: Record<string, any> = { updated_at: new Date().toISOString() }
  if (title !== undefined) updateData.title = title
  if (description !== undefined) updateData.description = description
  if (platform !== undefined) updateData.platform = platform
  if (content_url !== undefined) updateData.content_url = content_url
  if (violation_type !== undefined) updateData.violation_type = violation_type
  if (dsa_article !== undefined) updateData.dsa_article = dsa_article
  if (status !== undefined) updateData.status = status
  if (council_id !== undefined) updateData.council_id = council_id
  if (country !== undefined) updateData.country = country

  const { data, error } = await supabase
    .from('gr_reports')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}
