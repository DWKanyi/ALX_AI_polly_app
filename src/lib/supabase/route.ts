import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/ssr'

export const createRouteSupabaseClient = () => {
  const cookieStore = cookies()
  return createRouteHandlerClient({ cookies: () => cookieStore })
}


