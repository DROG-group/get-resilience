import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Don't let the last admin leave
  const { data: members } = await supabase
    .from('gr_council_members')
    .select('*')
    .eq('council_id', id)
    .eq('role', 'admin')

  const isAdmin = members?.some((m) => m.user_id === user.id)
  const adminCount = members?.length || 0

  if (isAdmin && adminCount <= 1) {
    return NextResponse.json(
      { error: 'Cannot leave: you are the only admin. Transfer admin role first or delete the council.' },
      { status: 400 }
    )
  }

  const { error } = await supabase
    .from('gr_council_members')
    .delete()
    .eq('council_id', id)
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
