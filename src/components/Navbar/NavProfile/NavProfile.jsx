'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { useEffect, useState } from "react"
import Image from "next/image" // Importe o componente Image do Next.js

export default function NavProfile({ user, fotoPerfil }) {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLogout = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Erro ao fazer logout:', error.message)
        return
      }
      
      // 1. Força atualização do estado da aplicação
      if (window && window.dispatchEvent) {
        window.dispatchEvent(new Event('storage'))
      }
      
      // 2. Redireciona para a página de login
      router.push('/login')
      
      // 3. Recarrega a página para garantir limpeza total
      setTimeout(() => {
        router.refresh()
      }, 100)
      
    } catch (error) {
      console.error('Erro inesperado ao fazer logout:', error)
    } finally {
      setIsDropdownOpen(false)
    }
  }


  if (!user) return null

  return (
   <div className="dropdown dropdown-end relative ">
      {/* Botão do perfil - versão responsiva */}
      <div 
        tabIndex={0} 
        role="button" 
        className="btn btn-ghost btn-circle avatar btn-sm hover:bg-base-300 transition-colors"
        aria-label="Menu do usuário"
      >
        <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center overflow-hidden">
          {fotoPerfil ? (
            // Usando o componente Image do Next.js com otimizações
            <Image
              src={fotoPerfil}
              alt="Foto do perfil"
              width={64}  // Carrega em resolução maior e redimensiona
              height={64}
              className="w-full h-full object-cover"
              quality={80} // Qualidade otimizada (1-100)
              priority={false} // Não priorizar carregamento
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/default-avatar.png' // Fallback caso a imagem não carregue
              }}
            />
          ) : (
            <span className="text-lg">👤</span>
          )}
        </div>
      </div>
      
      {/* Menu dropdown - estilizado para mobile/desktop */}
      <ul 
      tabIndex={0} 
        className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box ${
          isMobile ? 'w-full left-0' : 'w-52'
        }`}
      >
        <li>
          <Link href="/perfil" className="active:bg-base-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Meu Perfil
          </Link>
        </li>
        <li>
          <Link href="/pedidos" className="active:bg-base-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Meus Pedidos
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className="active:bg-base-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </Link>
        </li>
        <li className="border-t border-base-200 mt-1 pt-1">
            <button 
              onClick={handleLogout}
              className="text-error active:bg-error/10 w-full text-left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sair
            </button>
          </li>
      </ul>
    </div>
  )
}