"use client"

import { useCarrinho } from "@/context/CarrinhoContext"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function Navbar() {
  const { quantidade, animar } = useCarrinho()
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const verificarUsuario = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data?.user) setUser(data.user)
      else setUser(null)
    }

    verificarUsuario()
  }, [])

  const handleCarrinhoClick = () => {
    if (!user) {
      alert("Você precisa estar logado para acessar o carrinho.")
      router.push("/login")
    } else {
      router.push("/carrinho")
    }
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <Link href="/" className="text-xl font-bold">TecnozHub</Link>

      <div className="flex items-center gap-6">
        <Link href="/produtos">Produtos</Link>
        <Link href="/pedidos">Pedidos</Link>
        <button onClick={handleCarrinhoClick} className="relative">
          🛒 Carrinho
          {quantidade > 0 && (
            <span
              className={`absolute -top-2 -right-3 bg-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full transition-transform duration-300 ${
                animar ? "scale-125" : "scale-100"
              }`}
            >
              {quantidade}
            </span>
          )}
        </button>
      </div>
    </nav>
  )
}
