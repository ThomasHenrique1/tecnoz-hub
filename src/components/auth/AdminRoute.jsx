"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function AdminRoute({ children }) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(null)

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      const session = sessionData?.session

      if (sessionError || !session?.user) {
        router.push("/login")
        return
      }

      const userId = session.user.id
      console.log("ID do usuário autenticado:", userId)

      const { data: usuarioData, error: usuarioError } = await supabase
        .from("usuarios")
        .select("tipo_usuario")
        .eq("auth_id", userId)
        .single()

      console.log("Usuário encontrado:", usuarioData)

      if (usuarioError || !usuarioData || usuarioData.tipo_usuario !== "admin") {
        router.push("/")
        return
      }

      setIsAdmin(true)
    }

    checkAdmin()
  }, [router])

  if (isAdmin === null) {
    return <p>Verificando permissões...</p>
  }

  return <>{children}</>
}
