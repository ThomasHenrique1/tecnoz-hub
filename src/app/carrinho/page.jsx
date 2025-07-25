"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CarrinhoPage() {
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchCarrinho = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        router.push("/login")
        return
      }

      const { data, error } = await supabase
        .from("carrinho")
        .select(`
          id,
          quantidade,
          produto:produto_id (
            id,
            nome,
            preco,
            imagem_url
          )
        `)
        .eq("usuario_id", user.id)

      if (error) {
        console.error("Erro ao buscar carrinho:", error)
      } else {
        setItens(data)
      }

      setLoading(false)
    }

    fetchCarrinho()
  }, [router])

  const handleRemover = async (id) => {
    if (!confirm("Deseja remover este item do carrinho?")) return

    const { error } = await supabase.from("carrinho").delete().eq("id", id)
    if (error) {
      console.error("Erro ao remover:", error)
      return alert("Erro ao remover item.")
    }

    setItens((prev) => prev.filter((item) => item.id !== id))
  }

  if (loading) return <p className="p-6">Carregando carrinho...</p>

  if (itens.length === 0)
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
        <Link href="/produtos" className="text-blue-600 hover:underline">
          Ver produtos
        </Link>
      </div>
    )

  const total = itens.reduce(
    (acc, item) => acc + item.quantidade * item.produto.preco,
    0
  )

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Seu Carrinho</h1>

      <ul className="space-y-4">
        {itens.map((item) => (
          <li key={item.id} className="flex items-center gap-4 border p-3 rounded">
            <img
              src={item.produto.imagem_url}
              alt={item.produto.nome}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h2 className="font-semibold">{item.produto.nome}</h2>
              <p className="text-sm text-gray-500">
                Quantidade: {item.quantidade}
              </p>
              <p className="text-sm text-gray-600">
                Preço unitário: R$ {item.produto.preco.toFixed(2)}
              </p>
              <p className="text-sm font-bold text-green-700">
                Total: R$ {(item.quantidade * item.produto.preco).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => handleRemover(item.id)}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right">
        <p className="text-lg font-semibold">
          Total geral: R$ {total.toFixed(2)}
        </p>
        <button
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => alert("Finalização em breve!")}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  )
}
