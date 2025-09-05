import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export const createServerSupabaseClient = () => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const store: any = cookies()
          return store.getAll()
        },
        setAll(cookiesToSet) {
          const store: any = cookies()
          try {
            cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options))
          } catch {}
        },
      },
    }
  )
}


