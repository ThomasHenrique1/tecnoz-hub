"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CarrinhoPage() {
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true)
  const [finalizando, setFinalizando] = useState(false)
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

  const handleAtualizarQuantidade = async (id, novaQtd) => {
    if (novaQtd < 1) return

    // Verifica estoque antes de atualizar
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

      // Verifica estoque antes de criar pedido
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

      if (pedidoError) {
        console.error("Erro ao criar pedido:", pedidoError)
        alert("Erro ao finalizar pedido.")
        setFinalizando(false)
        return
      }

      const itensFormatados = itens.map((item) => ({
        pedido_id: pedido.id,
        produto_id: item.produto.id,
        quantidade: item.quantidade,
        preco_unitario: item.produto.preco,
      }))

      const { error: itensErro } = await supabase
        .from("pedido_itens")
        .insert(itensFormatados)

      if (itensErro) {
        console.error("Erro ao registrar itens do pedido:", itensErro)
        alert("Erro ao registrar itens do pedido.")
        setFinalizando(false)
        return
      }

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
              <p className="text-sm text-gray-600">
                Preço unitário: R$ {item.produto.preco.toFixed(2)}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  className="px-2 py-1 bg-gray-300 rounded"
                  onClick={() =>
                    handleAtualizarQuantidade(item.id, item.quantidade - 1)
                  }
                  disabled={finalizando}
                >
                  -
                </button>
                <span>{item.quantidade}</span>
                <button
                  className="px-2 py-1 bg-gray-300 rounded"
                  onClick={() =>
                    handleAtualizarQuantidade(item.id, item.quantidade + 1)
                  }
                  disabled={finalizando}
                >
                  +
                </button>
              </div>

              <p className="text-sm font-bold text-green-700 mt-1">
                Total: R$ {(item.quantidade * item.produto.preco).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => handleRemover(item.id)}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              disabled={finalizando}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right">
        <p className="text-lg font-semibold">Total geral: R$ {total.toFixed(2)}</p>
        <button
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          onClick={handleFinalizarCompra}
          disabled={finalizando}
        >
          {finalizando ? "Finalizando..." : "Finalizar compra"}
        </button>
      </div>
    </div>
  )
}
