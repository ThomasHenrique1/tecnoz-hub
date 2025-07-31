import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const cookieOptions = {
  name: 'sb-auth',
  domain: process.env.NODE_ENV === 'production' ? '.seusite.com' : '',
  path: '/',
  sameSite: 'Lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 7 // 1 semana
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storage: {
      getItem: (key) => {
        if (typeof document !== 'undefined') {
          const cookies = document.cookie.split(';')
          for (const cookie of cookies) {
            const [cookieKey, cookieValue] = cookie.trim().split('=')
            if (cookieKey === key) {
              return decodeURIComponent(cookieValue)
            }
          }
        }
        return null
      },
      setItem: (key, value) => {
        if (typeof document !== 'undefined') {
          document.cookie = `${key}=${encodeURIComponent(value)}; ${Object.entries(cookieOptions)
            .map(([optKey, optValue]) => 
              optValue === true ? optKey : `${optKey}=${optValue}`)
            .join('; ')}`
        }
      },
      removeItem: (key) => {
        if (typeof document !== 'undefined') {
          document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        }
      }
    }
  },
  cookieOptions
})