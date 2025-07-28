"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchPedidos = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      const { data, error } = await supabase
        .from("pedidos")
        .select(`
          id,
          criado_em,
          total,
          status,
          itens:pedido_itens (
            quantidade,
            preco_unitario,
            produto:produto_id (
              nome,
              imagem_url
            )
          )
        `)
        .eq("usuario_id", user.id)
        .order("criado_em", { ascending: false })

      if (error) {
        console.error("Erro ao buscar pedidos:", error)
      } else {
        setPedidos(data)
      }

      setLoading(false)
    }

    fetchPedidos()
  }, [router])

  if (loading) return <p className="p-6">Carregando pedidos...</p>

  if (pedidos.length === 0)
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Você ainda não fez nenhum pedido</h1>
        <Link href="/produtos" className="text-blue-600 hover:underline">
          Ver produtos
        </Link>
      </div>
    )

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Meus Pedidos</h1>

      {pedidos.map((pedido) => (
        <div key={pedido.id} className="border p-4 mb-6 rounded">
          <h2 className="font-semibold text-lg mb-2">Pedido #{pedido.id}</h2>
          <p className="text-sm text-gray-600">
            Data: {new Date(pedido.criado_em).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Status: {pedido.status}</p>

          <ul className="mt-3 space-y-3">
            {pedido.itens.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <img
                  src={item.produto.imagem_url}
                  alt={item.produto.nome}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.produto.nome}</p>
                  <p className="text-sm text-gray-500">
                    Quantidade: {item.quantidade} — R${" "}
                    {item.preco_unitario.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-right font-semibold">
            Total do pedido: R$ {pedido.total.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  )
}
