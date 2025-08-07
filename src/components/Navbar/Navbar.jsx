"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import NavLogo from "./NavLogo/NavLogo"
import NavLinks from "./NavLinks/NavLinks"
import NavSearch from "./NavSearch/NavSearch"
import NavCart from "./NavCart/NavCart"
import NavProfile from "./NavProfile/NavProfile"
import NavAuth from "./NavAuth/NavAuth"



export default function Navbar() {
  const [user, setUser] = useState(null)
  const [fotoPerfil, setFotoPerfil] = useState(null)

  useEffect(() => {
    const buscarUsuario = async () => {
      const { data } = await supabase.auth.getUser()
      const usuario = data?.user || null
      setUser(usuario)

      if (usuario) {
        const { data: perfilData, error } = await supabase
          .from("usuarios")
          .select("foto_perfil")
          .or(`auth_id.eq.${usuario.id},email.eq.${usuario.email}`)
          .single()

        if (!error && perfilData?.foto_perfil) {
          if (perfilData.foto_perfil.startsWith('http')) {
            setFotoPerfil(perfilData.foto_perfil)
          } else {
            const { data: { publicUrl } } = supabase
              .storage
              .from('avatars')
              .getPublicUrl(perfilData.foto_perfil)
            setFotoPerfil(publicUrl)
          }
        }
      }
    }

    buscarUsuario()

    const { data: authListener } = supabase.auth.onAuthStateChange(async () => {
      await buscarUsuario()
    })

    return () => authListener?.subscription.unsubscribe()
  }, [])

  return (
    <div className="navbar bg-base-200 px-4 sm:px-6 py-3 gap-4 sticky top-0 z-50 shadow-sm">
      <NavLogo />
      <NavLinks />
      
      <div className="flex gap-2 sm:gap-4 items-center">
        <NavSearch />
        <NavCart user={user} />
        <NavProfile user={user} fotoPerfil={fotoPerfil} />
        <NavAuth user={user} />
      </div>
    </div>
  )
}