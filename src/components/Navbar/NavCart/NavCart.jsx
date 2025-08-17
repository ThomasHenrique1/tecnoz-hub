'use client'

import { useCarrinho } from "@/context/CarrinhoContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function NavCart({ user }) {
  const router = useRouter()
  const { quantidade, animar } = useCarrinho()
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

  const handleClick = () => {
    if (!user) {
      alert("Você precisa estar logado para acessar o carrinho.")
      router.push("/login")
    } else {
      router.push("/carrinho")
    }
  }

  return (
    <div className="relative">
      {/* Versão Mobile - só mostra em mobile */}
      {isMobile ? (
        <button
          onClick={handleClick}
          className="btn btn-ghost btn-circle btn-sm relative hover:bg-base-300"
          aria-label="Carrinho"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          
          {quantidade > 0 && (
            <span className={`absolute -top-1 -right-1 bg-secondary text-secondary-content text-xs w-5 h-5 flex items-center justify-center rounded-full ${animar ? 'scale-125' : 'scale-100'} transition-transform`}>
              {quantidade}
            </span>
          )}
        </button>
      ) : (
        /* Versão Desktop - só mostra em desktop */
        <button
          onClick={handleClick}
          className="btn btn-ghost flex items-center gap-2 hover:bg-base-300"
          aria-label="Meu Carrinho"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {quantidade > 0 && (
            <span className={`badge badge-secondary ${animar ? 'scale-110' : 'scale-100'} transition-transform`}>
              {quantidade}
            </span>
          )}
        </button>
      )}
    </div>
  )
}