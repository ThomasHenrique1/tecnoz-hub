'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleSession = async () => {
      // Recupera a sessão do Supabase após clique no link do email
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Erro ao recuperar sessão:', error.message)
        router.push('/login')
        return
      }

      if (data?.session) {
        // Se a sessão for válida, redireciona para o painel
        await router.refresh()
      const redirectPath = data.session.user.tipo_usuario === 'admin' ? '/admin' : '/perfil'
      router.push(redirectPath)
      } else {
        // Caso contrário, volta para login
        router.push('/login')
      }
    }

    handleSession()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium">Confirmando sua conta...</p>
    </div>
  )
}
