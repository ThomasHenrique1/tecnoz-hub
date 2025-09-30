// src/middleware.js
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value
        },
        set(name, value, options) {
          res.cookies.set(name, value, options)
        },
        remove(name, options) {
          res.cookies.delete(name, options)
        }
      }
    }
  )

  // 1. Obter usuário autenticado
  const {
    data: { user }
  } = await supabase.auth.getUser()

  const pathname = req.nextUrl.pathname

  // 2. Redirecionamento de rotas protegidas
  if (!user) {
    if (pathname.startsWith('/painel') || pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  } else {
    if (pathname === '/login') {
      return NextResponse.redirect(new URL('/painel', req.url))
    }

    if (pathname.startsWith('/admin')) {
      const { data: profile, error: profileError } = await supabase
        .from('usuarios')
        .select('tipo_usuario')
        .eq('auth_id', user.id)
        .single()

      if (profileError || !profile || profile.tipo_usuario !== 'admin') {
        return NextResponse.redirect(new URL('/painel', req.url))
      }
    }
  }

  return res
}

export const config = {
  matcher: ['/painel/:path*', '/admin/:path*', '/login']
}
