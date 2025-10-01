import { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type')
  
  console.log('🔐 Processando confirmação de email:', { code, type })
  
  // Só processa se for confirmação de cadastro (signup)
  if (type !== 'signup') {
    console.log('❌ Tipo de confirmação inválido:', type)
    return NextResponse.redirect(new URL('/login?error=Tipo de confirmação inválido', request.url))
  }

  if (!code) {
    console.log('❌ Código de confirmação não encontrado')
    return NextResponse.redirect(new URL('/login?error=Código de confirmação inválido', request.url))
  }

  const supabase = createClient()
  
  try {
    console.log('🔄 Trocando código por sessão...')
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('❌ Erro ao confirmar email:', error.message)
      return NextResponse.redirect(new URL('/login?error=Link de confirmação expirado ou inválido', request.url))
    }
    
    console.log('✅ Email confirmado com sucesso para:', data.user?.email)
    
    // Buscar tipo de usuário para redirecionamento correto
    const { data: userData } = await supabase
      .from('usuarios')
      .select('tipo_usuario')
      .eq('auth_id', data.user.id)
      .single()

    const redirectPath = userData?.tipo_usuario === 'admin' ? '/admin' : '/perfil'
    console.log('🔄 Redirecionando para:', redirectPath)
    
    return NextResponse.redirect(new URL(
      `${redirectPath}?message=Email confirmado com sucesso!`, 
      request.url
    ))
    
  } catch (error) {
    console.error('❌ Erro no processo de confirmação:', error)
    return NextResponse.redirect(new URL('/login?error=Erro interno no servidor', request.url))
  }
}