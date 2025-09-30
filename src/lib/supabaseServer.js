// src/lib/supabaseServer.js
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabaseServer = () => {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies
  })
}
