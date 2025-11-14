"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import LoadingSpinner from "../ui/LoadingSpinner"

export default function AdminRoute({ children }) {
  const router = useRouter()
  const [authState, setAuthState] = useState({
    status: 'loading', // 'loading' | 'authorized' | 'unauthorized'
    error: null
  })
  const supabase = createClient()

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        // 1. Verificar sessão
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError || !session?.user) {
          throw new Error(sessionError?.message || "Não autenticado")
        }

        // 2. Verificar tipo de usuário
        const { data: usuarioData, error: usuarioError } = await supabase
          .from("usuarios")
          .select("tipo_usuario")
          .eq("auth_id", session.user.id)
          .single()

        if (usuarioError || !usuarioData) {
          throw new Error(usuarioError?.message || "Perfil de usuário não encontrado")
        }

        if (usuarioData.tipo_usuario !== "admin") {
          throw new Error("Acesso não autorizado")
        }

        // 3. Sucesso - usuário é admin
        setAuthState({
          status: 'authorized',
          error: null
        })

      } catch (error) {
        console.error("Erro na verificação de admin:", error)
        setAuthState({
          status: 'unauthorized',
          error: error.message
        })
        
        // Redirecionamentos adequados
        if (error.message.includes("Não autenticado")) {
          router.push("/login?redirect=" + encodeURIComponent(window.location.pathname))
        } else {
          router.push("/dashboard")
        }
      }
    }

    checkAdmin()
  }, [router , supabase])

  // Estados de renderização
  if (authState.status === 'loading') {
    return (
      <LoadingSpinner size={10} color="text-primary" label="Verificando permissões..." fullScreen />
    )
  }

  if (authState.status === 'unauthorized') {
    return null // Redirecionamento já foi tratado
  }

  return <>{children}</>
}