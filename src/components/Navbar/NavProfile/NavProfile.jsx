'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabaseClient"

export default function NavProfile({ user, fotoPerfil }) {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const supabase = createClient()
  const dropdownRef = useRef(null)

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Fecha dropdown ao clicar fora (mousedown + touchstart para maior confiabilidade)
  useEffect(() => {
    const handleClickOutside = (event) => {
      const el = dropdownRef.current
      if (isDropdownOpen && el && !el.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isDropdownOpen])

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Erro ao fazer logout:', error.message)
        return
      }
      
      // Força atualização do estado da aplicação
      if (window && window.dispatchEvent) {
        window.dispatchEvent(new Event('storage'))
      }
      
      // Redireciona para a página de login
      router.push('/login')
      router.refresh()
      
      // Recarrega a página para garantir limpeza total
      setTimeout(() => {
        router.refresh()
      }, 100)
      
    } catch (error) {
      console.error('Erro inesperado ao fazer logout:', error)
    } finally {
      setIsDropdownOpen(false)
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev)
  }

  if (!user) return null

  return (
    <div ref={dropdownRef} className="dropdown dropdown-end relative">
      {/* Botão do perfil - versão responsiva com efeitos */}
      <div 
        tabIndex={0} 
        role="button" 
        className="group relative btn btn-ghost btn-circle avatar btn-sm hover:bg-base-300 transition-all duration-300 hover:scale-105"
        aria-label="Menu do usuário"
        onClick={toggleDropdown}
      >
        {/* Efeito de brilho no hover */}
        <div className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden border-2 border-base-300 group-hover:border-primary/30 transition-colors duration-300">
          {fotoPerfil && !imageError ? (
            <Image
              src={fotoPerfil}
              alt="Foto do perfil"
              width={64}
              height={64}
              className="w-full h-full object-cover"
              quality={80}
              priority={false}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.email ? user.email[0].toUpperCase() : 'U'}
              </span>
            </div>
          )}
        </div>

        {/* Indicador de estado do dropdown */}
        <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border-2 border-base-100 transition-all duration-300 ${
          isDropdownOpen ? 'bg-success scale-125' : 'bg-base-300 group-hover:bg-warning'
        }`} />
      </div>
      
      {/* Menu dropdown - estilizado para mobile/desktop */}
      <ul 
        tabIndex={0} 
        className={`menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow-2xl bg-base-100 rounded-box border border-base-300/50 backdrop-blur-sm transition-all duration-300 ${
          isMobile ? 'left-auto min-w-[100px] ' : 'left-auto min-w-[200px]'
        } ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events'}`}
      >
        {/* Header do usuário */}
        <li className="menu-title p-3 border-b border-base-300/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
              {user.email ? user.email[0].toUpperCase() : 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base-content truncate">
                {user.email || 'Usuário'}
              </p>
              <p className="text-xs text-base-content/60 truncate">
                Bem-vindo de volta!
              </p>
            </div>
          </div>
        </li>

        {/* Itens do menu */}
        <li>
          <Link 
            href="/perfil" 
            className="py-3 transition-all duration-200 hover:bg-base-300/50 hover:translate-x-1 active:bg-base-200"
            onClick={() => setIsDropdownOpen(false)}
          >
            <div className="p-1 rounded-lg bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="font-medium">Meu Perfil</span>
          </Link>
        </li>
        
        <li>
          <Link 
            href="/pedidos" 
            className="py-3 transition-all duration-200 hover:bg-base-300/50 hover:translate-x-1 active:bg-base-200"
            onClick={() => setIsDropdownOpen(false)}
          >
            <div className="p-1 rounded-lg bg-secondary/10 text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="font-medium">Meus Pedidos</span>
          </Link>
        </li>
        
        <li>
          <Link 
            href="/dashboard" 
            className="py-3 transition-all duration-200 hover:bg-base-300/50 hover:translate-x-1 active:bg-base-200"
            onClick={() => setIsDropdownOpen(false)}
          >
            <div className="p-1 rounded-lg bg-accent/10 text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <span className="font-medium">Dashboard</span>
          </Link>
        </li>

        {/* Divisor */}
        <div className="divider my-1" />

        {/* Botão Sair */}
        <li>
          <button 
            onClick={handleLogout}
            className="py-3 text-error transition-all duration-200 hover:bg-error/10 hover:translate-x-1 active:bg-error/20 group"
          >
            <div className="p-1 rounded-lg bg-error/10 text-error group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <span className="font-medium">Sair</span>
          </button>
        </li>
      </ul>
    </div>
  )
}
