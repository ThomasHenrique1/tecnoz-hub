'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

export default function NavLogo() {
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

  return (
    <div className="flex-1 min-w-[100px]">
      <Link 
        href="/" 
        className="btn btn-ghost hover:bg-transparent focus:bg-transparent active:bg-transparent px-2"
      >
        {/* Logo completo em telas maiores */}
        <span className="text-xl md:text-2xl font-bold text-primary hidden sm:block">
          TecnozHub
        </span>
        
        {/* Versão compacta para mobile */}
        {isMobile && (
          <div className="sm:hidden flex items-center">
            <span className="text-lg font-bold text-primary ml-1">TH</span>
          </div>
        )}
      </Link>
    </div>
  )
}