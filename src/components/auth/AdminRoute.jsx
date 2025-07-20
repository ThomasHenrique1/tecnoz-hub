"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function AdminRoute({ children }) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(null)

  console.log("AdminRoute: componente renderizado") // Teste de renderização

  useEffect(() => {
    console.log("AdminRoute: useEffect executado")

    const checkAdmin = async () => {
      console.log("AdminRoute: iniciando checkAdmin")

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      console.log("AdminRoute: user =", user)
      console.log("AdminRoute: authError =", authError)

      if (authError || !user) {
        console.warn("AdminRoute: não autenticado, redirecionando /login")
        router.push("/login")
        return
      }

      const { data: usuarioData, error: usuarioError } = await supabase
        .from("usuarios")
        .select("tipo_usuario")
        .eq("auth_id", user.id)
        .single()

      console.log("AdminRoute: usuarioData =", usuarioData)
      console.log("AdminRoute: usuarioError =", usuarioError)

      if (usuarioError || !usuarioData) {
        console.warn("AdminRoute: usuário inválido, redirecionando /")
        router.push("/")
        return
      }

      if (usuarioData.tipo_usuario !== "admin") {
        console.warn("AdminRoute: usuário não é admin, redirecionando /")
        router.push("/")
        return
      }

      console.log("AdminRoute: usuário é admin, liberando acesso")
      setIsAdmin(true)
    }

    checkAdmin()
  }, [router])

  if (isAdmin === null) {
    return <p>Verificando permissões...</p>
  }

  return <>{children}</>
}
