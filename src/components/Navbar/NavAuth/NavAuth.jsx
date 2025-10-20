'use client'

import Link from "next/link"

export default function NavAuth({ user }) {
  if (user) return null

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Botão de Login - sempre visível */}
      <Link 
        href="/login" 
        className="group relative
                   btn btn-primary btn-sm sm:btn-md px-3 sm:px-6 
                   rounded-full transition-all duration-300 
                   hover:shadow-xl hover:-translate-y-1
                   focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
                   active:translate-y-0
                   overflow-hidden"
      >
        {/* Efeito de brilho no hover */}
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
        
        {/* Gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-100 rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
        
        {/* Conteúdo do botão */}
        <span className="relative z-10 flex items-center gap-2 text-white font-medium">
          <span className="hidden sm:inline">Entrar</span>
          <span className="sm:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </span>
        </span>

        {/* Efeito de pulso sutil */}
        <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 group-hover:animate-none transition-opacity duration-300" />
      </Link>
      
      {/* Botão de Cadastro - visível apenas em telas médias/grandes */}
      <Link 
        href="/signup" 
        className="group relative
                   btn btn-outline btn-sm sm:btn-md px-3 sm:px-6 
                   rounded-full border-2 transition-all duration-300 
                   hover:bg-base-200 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50
                   focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
                   active:translate-y-0 hidden sm:inline-flex
                   overflow-hidden"
      >
        {/* Efeito de background animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
        
        {/* Efeito de borda gradiente */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-[2px] rounded-full bg-base-100 group-hover:bg-base-200 transition-colors duration-300" />
        
        {/* Texto com transição de cor */}
        <span className="relative z-10 font-medium transition-colors duration-300 group-hover:text-primary">
          Cadastrar
        </span>

        {/* Ícone sutil no hover */}
        <svg 
          className="absolute right-3 w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      </Link>
    </div>
  )
}