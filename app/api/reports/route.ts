import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')

  let query = supabase
    .from('gr_reports')
    .select('*')
    .eq('submitted_by', user.id)
    .order('created_at', { ascending: false })

  if (status) query = query.eq('status', status)

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
  const { title, description, platform, content_url, violation_type, dsa_article, council_id, country } = body

  if (!title || !platform || !violation_type) {
    return NextResponse.json({ error: 'Title, platform, and violation type are required' }, { status: 400 })
  }

  // Check EMOD training completion (resilience-council certification path)
  const { data: requiredCourses } = await supabase
    .from('plus_courses')
    .select('id')
    .eq('certification_path', 'resilience-council')
    .eq('status', 'published')

  if (requiredCourses && requiredCourses.length > 0) {
    const { data: certs } = await supabase
      .from('plus_certificates')
      .select('id')
      .eq('user_id', user.id)
      .in('course_id', requiredCourses.map(c => c.id))

    const completedCount = certs?.length || 0
    if (completedCount < requiredCourses.length) {
      return NextResponse.json(
        { error: 'You must complete the required DSA reporting training on EMOD+ before submitting reports.' },
        { status: 403 }
      )
    }
  }

  // If council_id provided, verify user is a member
  if (council_id) {
    const { data: membership } = await supabase
      .from('gr_council_members')
      .select('id')
      .eq('council_id', council_id)
      .eq('user_id', user.id)
      .single()

    if (!membership) {
      return NextResponse.json({ error: 'You must be a member of this council' }, { status: 403 })
    }
  }

  const { data, error } = await supabase
    .from('gr_reports')
    .insert({
      title,
      description: description || null,
      platform,
      content_url: content_url || null,
      violation_type,
      dsa_article: dsa_article || null,
      status: 'submitted',
      council_id: council_id || null,
      submitted_by: user.id,
      country: country || null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data, { status: 201 })
}
