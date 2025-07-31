import { NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // 1. Verificar autenticação
  const { data: { user }, error } = await supabase.auth.getUser()
  
  // 2. Verificar se é admin (apenas para rotas /admin)
  if (user && req.nextUrl.pathname.startsWith('/admin')) {
    const { data: profile } = await supabase
      .from('usuarios')
      .select('tipo_usuario')
      .eq('auth_id', user.id)
      .single()

    if (!profile || profile.tipo_usuario !== 'admin') {
      return NextResponse.redirect(new URL('/painel', req.url))
    }
  }

  // 3. Redirecionamentos
  if (!user) {
    if (req.nextUrl.pathname.startsWith('/painel') || 
        req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  } else if (user && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/painel', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/painel/:path*',
    '/admin/:path*',
    '/login' // Adicionado para tratar redirecionamentos pós-login
  ]
}