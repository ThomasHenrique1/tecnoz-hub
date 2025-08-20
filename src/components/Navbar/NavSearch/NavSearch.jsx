'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NavSearch() {
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/busca?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setIsSearchOpen(false)
    }
  }

  return (
    <>
      {/* Versão Desktop (sempre visível) */}
      <form 
        onSubmit={handleSearch}
        className="hidden lg:flex items-center"
      >
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered input-sm w-40 focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 hover:w-48 focus:w-48"
        />
        <button 
          type="submit"
          className="btn btn-ghost btn-sm ml-1"
          aria-label="Pesquisar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {/* Versão Mobile (ícone que expande) */}
      <div className="lg:hidden">
        {/* Ícone de busca (mostra o input quando clicado) */}
        {!isSearchOpen ? (
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="btn btn-ghost btn-sm"
            aria-label="Abrir busca"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        ) : (
          <form 
            onSubmit={handleSearch}
            className="absolute left-0 right-0 top-16 bg-base-200 px-4 py-2 shadow-md flex items-center z-50"
          >
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="input input-bordered input-sm flex-1 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button 
              type="submit"
              className="btn btn-ghost btn-sm ml-2"
              aria-label="Pesquisar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button 
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="btn btn-ghost btn-sm ml-1"
              aria-label="Fechar busca"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </form>
        )}
      </div>
    </>
  )
}