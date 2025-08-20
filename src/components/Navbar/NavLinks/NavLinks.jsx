'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavLinks({ mobile = false }) {
  const pathname = usePathname()
  
  const links = [
    { href: "/produtos", label: "Produtos" },
    { href: "/pedidos", label: "Pedidos" },
    { href: "/sobre", label: "Sobre" }
  ]

  // Estilo base para os links
  const baseStyle = "text-base-content transition-colors duration-200 hover:text-primary"
  
  // Estilo para mobile
  const mobileStyle = "w-full py-3 px-4 border-b border-base-300 text-lg"
  
  // Estilo para desktop
  const desktopStyle = "btn btn-ghost btn-sm hover:bg-base-300"

  return (
    <>
      {/* Versão Desktop (horizontal) */}
      <div className={`hidden md:flex gap-4 mx-4 ${mobile ? 'hidden' : ''}`}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${baseStyle} ${desktopStyle} ${
              pathname === link.href ? 'text-primary font-medium' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Versão Mobile (vertical) */}
      {mobile && (
        <div className="md:hidden bg-base-200 w-full">
          <div className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${baseStyle} ${mobileStyle} ${
                  pathname === link.href ? 'text-primary font-medium bg-base-300' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}