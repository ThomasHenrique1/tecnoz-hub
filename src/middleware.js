import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req) {
  let res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // 1. Obter usuário autenticado
  const { data: { user }, error } = await supabase.auth.getUser()
  const pathname = req.nextUrl.pathname

  // 2. Redirecionamento de rotas protegidas
  if (!user) {
    // Se tentar acessar /painel ou /admin sem estar logado → redirect para /login
    if (pathname.startsWith('/painel') || pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  } else {
    // Usuário logado, mas tentando acessar /login → redirect para painel
    if (pathname === '/login') {
      return NextResponse.redirect(new URL('/painel', req.url))
    }

    // Bloquear acesso a /admin se não for admin
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
  matcher: [
    '/painel/:path*',
    '/admin/:path*',
    '/login'
  ]
}