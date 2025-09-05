import { NextResponse } from 'next/server'
import { createRouteSupabaseClient } from '@/lib/supabase/route'

interface Params {
  params: { id: string }
}

export async function GET(_req: Request, { params }: Params) {
  const supabase = createRouteSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('polls')
    .select('id,user_id,title,description,is_multiple,expires_at,created_at,updated_at,poll_options(id,poll_id,label,order_index)')
    .eq('id', params.id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

export async function PUT(request: Request, { params }: Params) {
  const supabase = createRouteSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const json = await request.json()

  const { data: poll, error } = await supabase
    .from('polls')
    .update({
      title: json.title,
      description: json.description,
      is_multiple: json.isMultiple,
      expires_at: json.expiresAt,
    })
    .eq('id', params.id)
    .eq('user_id', user.id)
    .select('id,user_id,title,description,is_multiple,expires_at,created_at,updated_at')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(poll)
}

export async function DELETE(_request: Request, { params }: Params) {
  const supabase = createRouteSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabase
    .from('polls')
    .delete()
    .eq('id', params.id)
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}


