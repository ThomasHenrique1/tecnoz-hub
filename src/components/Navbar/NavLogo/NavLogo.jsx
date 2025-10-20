'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

export default function NavLogo() {
  const [isMobile, setIsMobile] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Detecta scroll para adicionar efeito
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex-1 min-w-[100px]">
      <Link 
        href="/" 
        className={`
          group relative
          btn btn-ghost 
          hover:bg-transparent focus:bg-transparent active:bg-transparent 
          px-2 sm:px-4
          transition-all duration-300
          ${isScrolled ? 'scale-95' : 'scale-100'}
        `}
      >
        {/* Efeito de fundo sutil no hover */}
        <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Logo completo em telas maiores */}
        <div className="relative">
          <span className="text-xl md:text-2xl font-bold text-primary hidden sm:block tracking-tight">
            Tecno
            <span className="text-secondary drop-shadow-sm">z</span>
            Hub
          </span>
          
          {/* Versão compacta para mobile */}
          {isMobile && (
            <div className="sm:hidden flex items-center space-x-1">
              {/* Ícone/Logo compacto */}
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm tracking-tighter">TH</span>
                </div>
                {/* Efeito de brilho */}
                <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
              </div>
            </div>
          )}
        </div>

        {/* Efeito de sublinhado animado */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-4/5 transition-all duration-300" />
      </Link>
    </div>
  )
}