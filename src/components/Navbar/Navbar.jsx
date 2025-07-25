import Link from "next/link"
import { useCarrinho } from "@/context/CarrinhoContext"

export default function Navbar() {
  const { quantidade } = useCarrinho()

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <Link href="/" className="text-xl font-bold">
        TecnozHub
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/produtos">Produtos</Link>
        <Link href="/carrinho" className="relative">
          🛒 Carrinho
          {quantidade > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {quantidade}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}
