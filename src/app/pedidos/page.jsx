"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import PedidosHeader from "@/components/pedidos/PedidosHeader/PedidosHeader"
import LoadingPedidos from "@/components/pedidos/LoadingPedidos/LoadingPedidos"
import EmptyPedidos from "@/components/pedidos/EmptyPedidos/EmptyPedidos"
import PedidoCard from "@/components/pedidos/PedidoCard/PedidoCard"


export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()

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
                id,
                nome,
                imagem_url
              )
            )
          `)
          .eq("usuario_id", user.id)
          .order("criado_em", { ascending: false })

        if (error) throw error
        setPedidos(data || [])
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPedidos()
  }, [router])

  if (loading) return <LoadingPedidos />
  if (pedidos.length === 0) return <EmptyPedidos />

  return (
    <main className="container mx-auto px-4 py-8">
      <PedidosHeader />
      
      <div className="space-y-6">
        <AnimatePresence>
          {pedidos.map((pedido) => (
            <PedidoCard key={pedido.id} pedido={pedido} />
          ))}
        </AnimatePresence>
      </div>
    </main>
  )
}