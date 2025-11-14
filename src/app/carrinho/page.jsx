"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import EmptyCart from "@/components/carrinho/EmptyCart/EmptyCart"
import CarrinhoHeader from "@/components/carrinho/CarrinhoHeader/CarrinhoHeader"
import CarrinhoItem from "@/components/carrinho/CarrinhoItem/CarrinhoItem"
import CarrinhoTotal from "@/components/carrinho/CarrinhoTotal/CarrinhoTotal"
import ConfirmationModal from "@/components/carrinho/ConfirmationModal/ConfirmationModal"

// Componente de Notificação
function Notification({ message, type, onClose }) {
  if (!message) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`alert ${
          type === "success" ? "alert-success" : "alert-error"
        } shadow-lg`}
      >
        <span>{message}</span>
        <button onClick={onClose} className="btn btn-sm btn-ghost">
          ✕
        </button>
      </div>
    </div>
  )
}

export default function CarrinhoPage() {
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true)
  const [finalizando, setFinalizando] = useState(false)
  const [itemToRemove, setItemToRemove] = useState(null)
  const [notification, setNotification] = useState({ message: "", type: "" })
  const router = useRouter()
  const supabase = createClient()

  // Função para exibir notificações
  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: "", type: "" }), 4000)
  }

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
        showNotification("Erro ao carregar o carrinho.", "error")
      } else {
        setItens(data || [])
      }

      setLoading(false)
    }

    fetchCarrinho()
  }, [router])

  const confirmRemove = async () => {
    if (!itemToRemove) return

    const { error } = await supabase.from("carrinho").delete().eq("id", itemToRemove)
    if (error) {
      console.error("Erro ao remover:", error)
      showNotification("Erro ao remover item.", "error")
    } else {
      setItens((prev) => prev.filter((item) => item.id !== itemToRemove))
      showNotification("Item removido do carrinho.", "success")
    }
    setItemToRemove(null)
  }

  const handleAtualizarQuantidade = async (id, novaQtd) => {
    if (novaQtd < 1) return

    const itemAtual = itens.find((item) => item.id === id)
    if (itemAtual && novaQtd > itemAtual.produto.estoque) {
      showNotification("Quantidade maior que o estoque disponível.", "error")
      return
    }

    const { error } = await supabase
      .from("carrinho")
      .update({ quantidade: novaQtd })
      .eq("id", id)

    if (error) {
      console.error("Erro ao atualizar quantidade:", error)
      showNotification("Erro ao atualizar quantidade.", "error")
      return
    }

    setItens((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantidade: novaQtd } : item
      )
    )
    showNotification("Quantidade atualizada.", "success")
  }

  const handleFinalizarCompra = async () => {
    setFinalizando(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        showNotification("Você precisa estar logado para finalizar a compra.", "error")
        router.push("/login")
        return
      }

      if (itens.length === 0) {
        showNotification("Carrinho vazio.", "error")
        return
      }

      for (const item of itens) {
        if (item.quantidade > item.produto.estoque) {
          showNotification(`Estoque insuficiente para ${item.produto.nome}.`, "error")
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
      showNotification("Pedido finalizado com sucesso!", "success")
      router.push("/pedidos")
    } catch (error) {
      console.error("Erro ao finalizar compra:", error)
      showNotification("Erro inesperado ao finalizar compra.", "error")
    } finally {
      setFinalizando(false)
    }
  }

  if (loading) return <LoadingSpinner size={10} color="text-primary" label="Carregando carrinho..." fullScreen />
  if (itens.length === 0) return <EmptyCart />

  const total = itens.reduce(
    (acc, item) => acc + item.quantidade * item.produto.preco,
    0
  )

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Notificação */}
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />

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
                onRemove={setItemToRemove}
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
        onCancel={() => setItemToRemove(null)}
        message="Deseja remover este item do carrinho?"
      />
    </main>
  )
}
