import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { slugify } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const country = searchParams.get('country')
  const search = searchParams.get('search')

  let query = supabase
    .from('gr_councils')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  if (country) query = query.eq('country', country)
  if (search) query = query.ilike('name', `%${search}%`)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { name, description, country, focus_area, is_public } = body

  if (!name || !country) {
    return NextResponse.json({ error: 'Name and country are required' }, { status: 400 })
  }

  const slug = slugify(name) + '-' + Date.now().toString(36)

  const { data, error } = await supabase
    .from('gr_councils')
    .insert({
      name,
      slug,
      description: description || null,
      country,
      focus_area: focus_area || null,
      is_public: is_public !== false,
      created_by: user.id,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data, { status: 201 })
}
