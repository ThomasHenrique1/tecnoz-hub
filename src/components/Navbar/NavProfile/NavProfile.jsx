"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { useEffect } from "react"

export default function NavProfile({ user, fotoPerfil }) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Erro ao fazer logout:', error.message)
        return
      }
      
      // Força uma recarga completa para limpar qualquer estado da aplicação
      window.location.href = "/"
      
    } catch (error) {
      console.error('Erro inesperado ao fazer logout:', error)
    }
  }

  if (!user) return null

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar btn-sm">
        <div className="w-8 rounded-full bg-base-300 flex items-center justify-center">
          {fotoPerfil ? (
            <img 
              src={fotoPerfil} 
              alt="Foto do perfil" 
              className="w-full h-full object-cover"
              width={32}
              height={32}
            />
          ) : (
            <span className="text-lg">👤</span>
          )}
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><Link href="/perfil">Meu Perfil</Link></li>
        <li><Link href="/pedidos">Meus Pedidos</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li>
          <button onClick={handleLogout} className="w-full text-left">
            Sair
          </button>
        </li>
      </ul>
    </div>
  )
}