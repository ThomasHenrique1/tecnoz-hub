'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavLinks({ mobile = false }) {
  const pathname = usePathname()
  
  const links = [
    { href: "/produtos", label: "Produtos" },
    { href: "/sobre", label: "Sobre" }
  ]

  // Estilo base para os links
  const baseStyle = "transition-all duration-300 group relative"
  
  // Estilo para mobile
  const mobileStyle = "w-full py-4 px-6 border-b border-base-300/50 text-lg font-medium"
  
  // Estilo para desktop
  const desktopStyle = "btn btn-ghost btn-sm rounded-xl px-4 py-2 mx-1"

  const getLinkStyle = (href, isMobile) => {
    const isActive = pathname === href
    
    if (isMobile) {
      return `
        ${baseStyle} ${mobileStyle}
        ${isActive 
          ? 'text-primary bg-gradient-to-r from-primary/10 to-secondary/10 border-r-4 border-primary shadow-sm' 
          : 'text-base-content/90 hover:text-primary hover:bg-base-300/50'
        }
      `
    }
    
    return `
      ${baseStyle} ${desktopStyle}
      ${isActive 
        ? 'text-primary bg-base-300/80 shadow-md scale-105' 
        : 'text-base-content/80 hover:text-primary hover:bg-base-300/60 hover:shadow-lg hover:scale-105'
      }
    `
  }

  return (
    <>
      {/* Versão Desktop (horizontal) */}
      <div className={`hidden md:flex gap-2 mx-4 ${mobile ? 'hidden' : ''}`}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={getLinkStyle(link.href, false)}
          >
            {/* Efeito de background animado */}
            <div className={`
              absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              ${pathname === link.href ? 'opacity-100' : ''}
            `} />
            
            {/* Texto com z-index para ficar acima do background */}
            <span className="relative z-10 flex items-center gap-2">
              {link.label}
              
              {/* Indicador de página ativa */}
              {pathname === link.href && (
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              )}
            </span>
            
            {/* Efeito de sublinhado animado */}
            <div className={`
              absolute bottom-0 left-1/2 transform -translate-x-1/2 
              h-0.5 bg-gradient-to-r from-primary to-secondary 
              transition-all duration-300
              ${pathname === link.href ? 'w-4/5' : 'w-0 group-hover:w-3/4'}
            `} />
          </Link>
        ))}
      </div>

      {/* Versão Mobile (vertical) */}
      {mobile && (
        <div className="md:hidden bg-base-200/80 backdrop-blur-sm w-full border-t border-base-300">
          <div className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={getLinkStyle(link.href, true)}
              >
                <div className="flex items-center justify-between">
                  <span className="relative z-10 flex items-center gap-3">
                    {link.label}
                    
                    {/* Ícone de seta para mobile */}
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        pathname === link.href ? 'text-primary rotate-90' : 'text-base-content/40'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  
                  {/* Badge de página ativa */}
                  {pathname === link.href && (
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-sm" />
                  )}
                </div>
                
                {/* Efeito de brilho no hover para mobile */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}