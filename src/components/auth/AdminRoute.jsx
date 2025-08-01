"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function AdminRoute({ children }) {
  const router = useRouter()
  const [authState, setAuthState] = useState({
    status: 'loading', // 'loading' | 'authorized' | 'unauthorized'
    error: null
  })

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
          router.push("/painel")
        }
      }
    }

    checkAdmin()
  }, [router])

  // Estados de renderização
  if (authState.status === 'loading') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '1rem'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ fontSize: '1.2rem' }}>Verificando permissões...</p>
      </div>
    )
  }

  if (authState.status === 'unauthorized') {
    return null // Redirecionamento já foi tratado
  }

  return <>{children}</>
}

// Adicione isso no seu CSS global (globals.css)
/*
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/