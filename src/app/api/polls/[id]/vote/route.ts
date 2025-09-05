import { NextResponse } from 'next/server'
import { createRouteSupabaseClient } from '@/lib/supabase/route'

interface Params {
  params: { id: string }
}

export async function POST(request: Request, { params }: Params) {
  const supabase = createRouteSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const json = await request.json()
  const optionIds: string[] = Array.isArray(json?.optionIds) ? json.optionIds : []
  if (optionIds.length === 0) return NextResponse.json({ error: 'No optionIds provided' }, { status: 400 })

  // Ensure options belong to poll
  const { data: options, error: optionsError } = await supabase
    .from('poll_options')
    .select('id,poll_id')
    .in('id', optionIds)
    .eq('poll_id', params.id)

  if (optionsError) return NextResponse.json({ error: optionsError.message }, { status: 400 })
  if (!options || options.length !== optionIds.length) return NextResponse.json({ error: 'Invalid options' }, { status: 400 })

  // Insert votes (unique per poll,user,option enforced by constraint)
  const payload = optionIds.map((optionId) => ({ poll_id: params.id, option_id: optionId, user_id: user.id }))
  const { error } = await supabase.from('votes').insert(payload)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ success: true }, { status: 201 })
}

export async function DELETE(request: Request, { params }: Params) {
  const supabase = createRouteSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const json = await request.json()
  const optionIds: string[] = Array.isArray(json?.optionIds) ? json.optionIds : []
  if (optionIds.length === 0) return NextResponse.json({ error: 'No optionIds provided' }, { status: 400 })

  const { error } = await supabase
    .from('votes')
    .delete()
    .eq('poll_id', params.id)
    .eq('user_id', user.id)
    .in('option_id', optionIds)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}


