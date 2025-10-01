'use client'

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabaseClient"
import NavLogo from "./NavLogo/NavLogo"
import NavLinks from "./NavLinks/NavLinks"
import NavSearch from "./NavSearch/NavSearch"
import NavCart from "./NavCart/NavCart"
import NavProfile from "./NavProfile/NavProfile"
import NavAuth from "./NavAuth/NavAuth"
import ThemeToggle from "../ui/ThemeToggle"
import MobileMenuButton from "../ui/MobileMenuButton"

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [fotoPerfil, setFotoPerfil] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const supabase = createClient()

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Busca dados do usuário
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
    <>
      {/* Navbar Principal */}
      <div className="navbar bg-base-200 px-4 sm:px-6 py-3 gap-4 sticky top-0 z-50 shadow-sm">
        {/* Parte Esquerda (Mobile) */}
        <div className="flex items-center gap-2">
  
          <NavLogo />
        </div>

        {/* Links Centrais (Desktop) */}
        <div className="hidden lg:flex">
          <NavLinks />
        </div>

        {/* Parte Direita (Ícones) */}
        <div className="flex gap-2 sm:gap-4 items-center ml-auto">
          <NavSearch />
          <ThemeToggle />
          <NavCart user={user} />
          <NavProfile user={user} fotoPerfil={fotoPerfil} />
          <MobileMenuButton isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
          <NavAuth user={user} />
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-base-200 shadow-md animate-slideDown">
          <NavLinks mobile />
        
        </div>
      )}
    </>
  )
}