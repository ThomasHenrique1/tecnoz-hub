"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import LoadingSpinner from "@/components/carrinho/LoadingSpinner/LoadingSpinner"
import EmptyCart from "@/components/carrinho/EmptyCart/EmptyCart"
import CarrinhoHeader from "@/components/carrinho/CarrinhoHeader/CarrinhoHeader"
import CarrinhoItem from "@/components/carrinho/CarrinhoItem/CarrinhoItem"
import CarrinhoTotal from "@/components/carrinho/CarrinhoTotal/CarrinhoTotal"
import ConfirmationModal from "@/components/carrinho/ConfirmationModal/ConfirmationModal"

export default function CarrinhoPage() {
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true)
  const [finalizando, setFinalizando] = useState(false)
  const [itemToRemove, setItemToRemove] = useState(null)
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
            imagem_url,
            estoque
          )
        `)
        .eq("usuario_id", user.id)

      if (error) {
        console.error("Erro ao buscar carrinho:", error)
      } else {
        setItens(data || [])
      }

      setLoading(false)
    }

    fetchCarrinho()
  }, [router])

  const handleRemover = async (id) => {
    setItemToRemove(id)
  }

  const confirmRemove = async () => {
    if (!itemToRemove) return

    const { error } = await supabase.from("carrinho").delete().eq("id", itemToRemove)
    if (error) {
      console.error("Erro ao remover:", error)
      alert("Erro ao remover item.")
    } else {
      setItens((prev) => prev.filter((item) => item.id !== itemToRemove))
    }
    setItemToRemove(null)
  }

  const cancelRemove = () => {
    setItemToRemove(null)
  }

  const handleAtualizarQuantidade = async (id, novaQtd) => {
    if (novaQtd < 1) return

    const itemAtual = itens.find((item) => item.id === id)
    if (itemAtual && novaQtd > itemAtual.produto.estoque) {
      alert("Quantidade solicitada maior que o estoque disponível.")
      return
    }

    const { error } = await supabase
      .from("carrinho")
      .update({ quantidade: novaQtd })
      .eq("id", id)

    if (error) {
      console.error("Erro ao atualizar quantidade:", error)
      alert("Erro ao atualizar quantidade.")
      return
    }

    setItens((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantidade: novaQtd } : item
      )
    )
  }

  const handleFinalizarCompra = async () => {
    setFinalizando(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        alert("Você precisa estar logado para finalizar a compra.")
        router.push("/login")
        return
      }

      if (itens.length === 0) {
        alert("Carrinho vazio.")
        return
      }

      for (const item of itens) {
        if (item.quantidade > item.produto.estoque) {
          alert(`Estoque insuficiente para o produto ${item.produto.nome}.`)
          setFinalizando(false)
          return
        }
      }

      const total = itens.reduce(
        (acc, item) => acc + item.quantidade * item.produto.preco,
        0
      )

      const { data: pedido, error: pedidoError } = await supabase
        .from("pedidos")
        .insert([
          {
            usuario_id: user.id,
            total: total,
            status: "pendente",
          },
        ])
        .select()
        .single()

      if (pedidoError) throw pedidoError

      const itensFormatados = itens.map((item) => ({
        pedido_id: pedido.id,
        produto_id: item.produto.id,
        quantidade: item.quantidade,
        preco_unitario: item.produto.preco,
      }))

      const { error: itensErro } = await supabase
        .from("pedido_itens")
        .insert(itensFormatados)

      if (itensErro) throw itensErro

      await supabase.from("carrinho").delete().eq("usuario_id", user.id)
      setItens([])
      alert("Pedido finalizado com sucesso!")
      router.push("/pedidos")
    } catch (error) {
      console.error("Erro ao finalizar compra:", error)
      alert("Erro inesperado ao finalizar compra.")
    } finally {
      setFinalizando(false)
    }
  }

  if (loading) return <LoadingSpinner />

  if (itens.length === 0) return <EmptyCart />

  const total = itens.reduce(
    (acc, item) => acc + item.quantidade * item.produto.preco,
    0
  )

  return (
    <main className="container mx-auto px-4 py-8">
      <CarrinhoHeader />
      
      <ul className="space-y-4">
        <AnimatePresence>
          {itens.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <CarrinhoItem
                item={item}
                onRemove={handleRemover}
                onUpdateQuantity={handleAtualizarQuantidade}
                disabled={finalizando}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </ul>

      <CarrinhoTotal 
        total={total} 
        onCheckout={handleFinalizarCompra} 
        loading={finalizando} 
      />

      <ConfirmationModal
        isOpen={!!itemToRemove}
        onConfirm={confirmRemove}
        onCancel={cancelRemove}
        message="Deseja remover este item do carrinho?"
      />
    </main>
  )
}