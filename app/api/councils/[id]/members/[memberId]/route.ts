import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; memberId: string }> }
) {
  const { id, memberId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Verify requester is council admin
  const { data: requesterMembership } = await supabase
    .from('gr_council_members')
    .select('role')
    .eq('council_id', id)
    .eq('user_id', user.id)
    .single()

  if (requesterMembership?.role !== 'admin') {
    return NextResponse.json({ error: 'Only admins can manage members' }, { status: 403 })
  }

  const body = await request.json()
  const { role } = body

  if (!['member', 'moderator'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  // Don't allow changing own role
  if (memberId === user.id) {
    return NextResponse.json({ error: 'Cannot change your own role' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('gr_council_members')
    .update({ role })
    .eq('council_id', id)
    .eq('user_id', memberId)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; memberId: string }> }
) {
  const { id, memberId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Verify requester is council admin
  const { data: requesterMembership } = await supabase
    .from('gr_council_members')
    .select('role')
    .eq('council_id', id)
    .eq('user_id', user.id)
    .single()

  if (requesterMembership?.role !== 'admin') {
    return NextResponse.json({ error: 'Only admins can remove members' }, { status: 403 })
  }

  // Don't allow removing self (admin)
  if (memberId === user.id) {
    return NextResponse.json({ error: 'Cannot remove yourself as admin' }, { status: 400 })
  }

  const { error } = await supabase
    .from('gr_council_members')
    .delete()
    .eq('council_id', id)
    .eq('user_id', memberId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Decrement member count
  await supabase.rpc('decrement_member_count', { council_id_input: id }).catch(() => {
    // If RPC doesn't exist, ignore - count will be eventually consistent
  })

  return NextResponse.json({ success: true })
}
