import { NextResponse } from 'next/server'
import { createRouteSupabaseClient } from '@/lib/supabase/route'
import { createPollSchema } from '@/lib/validations/poll'

export async function GET() {
  const supabase = createRouteSupabaseClient()

  // Auth check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Fetch polls with options
  const { data, error } = await supabase
    .from('polls')
    .select('id,user_id,title,description,is_multiple,expires_at,created_at,updated_at,poll_options(id,poll_id,label,order_index)')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createRouteSupabaseClient()

  // Auth check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const json = await request.json()
  const parsed = createPollSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const input = parsed.data

  // Insert poll
  const { data: poll, error: pollError } = await supabase
    .from('polls')
    .insert({
      user_id: user.id,
      title: input.title,
      description: input.description ?? null,
      is_multiple: input.isMultiple ?? false,
      expires_at: input.expiresAt ?? null,
    })
    .select('id,user_id,title,description,is_multiple,expires_at,created_at,updated_at')
    .single()

  if (pollError) return NextResponse.json({ error: pollError.message }, { status: 500 })

  // Insert options
  if (input.options?.length) {
    const payload = input.options.map((o, idx) => ({
      poll_id: poll.id,
      label: o.label,
      order_index: idx,
    }))
    const { error: optionsError } = await supabase.from('poll_options').insert(payload)
    if (optionsError) return NextResponse.json({ error: optionsError.message }, { status: 500 })
  }

  // Return full poll with options
  const { data: full, error: fullError } = await supabase
    .from('polls')
    .select('id,user_id,title,description,is_multiple,expires_at,created_at,updated_at,poll_options(id,poll_id,label,order_index)')
    .eq('id', poll.id)
    .single()

  if (fullError) return NextResponse.json({ error: fullError.message }, { status: 500 })

  return NextResponse.json(full, { status: 201 })
}


