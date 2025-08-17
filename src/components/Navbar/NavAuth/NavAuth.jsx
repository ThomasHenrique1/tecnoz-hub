'use client'

import Link from "next/link"

export default function NavAuth({ user }) {
  if (user) return null

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Botão de Login - sempre visível */}
      <Link 
        href="/login" 
        className="btn btn-primary btn-sm sm:btn-md px-3 sm:px-6 
                   rounded-full transition-all duration-200 
                   hover:shadow-lg hover:-translate-y-0.5
                   focus:outline-none focus:ring-2 focus:ring-primary/50
                   active:translate-y-0"
      >
        <span className="hidden sm:inline">Entrar</span>
        <span className="sm:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        </span>
      </Link>
      
      {/* Botão de Cadastro - visível apenas em telas médias/grandes */}
      <Link 
        href="/signup" 
        className="btn btn-outline btn-sm sm:btn-md px-3 sm:px-6 
                   rounded-full border-2 transition-all duration-200 
                   hover:bg-base-200 hover:shadow-lg hover:-translate-y-0.5
                   focus:outline-none focus:ring-2 focus:ring-primary/50
                   active:translate-y-0 hidden sm:inline-flex"
      >
        Cadastrar
      </Link>
    </div>
  )
}