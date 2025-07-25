"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useCarrinho } from "@/context/CarrinhoContext"

export default function ProdutoDetalhes({ produto }) {
  const [adicionando, setAdicionando] = useState(false)
  const router = useRouter()

  const { atualizarQuantidade } = useCarrinho()

const handleAddCarrinho = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    alert("Você precisa estar logado para adicionar ao carrinho.")
    return
  }

  const { error } = await supabase.from("carrinho").upsert({
    usuario_id: user.id,
    produto_id: produto.id,
    quantidade: 1,
  })

  if (error) {
    alert("Erro ao adicionar ao carrinho.")
  } else {
    await atualizarQuantidade()
    alert("Produto adicionado com sucesso!")
  }
}

  const adicionarAoCarrinho = async () => {
    setAdicionando(true)

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      alert("Você precisa estar logado para adicionar ao carrinho.")
      router.push("/login")
      return
    }

    try {
      // Verifica se o produto já está no carrinho do usuário
      const { data: existente, error: buscaErro } = await supabase
        .from("carrinho")
        .select("id, quantidade")
        .eq("usuario_id", user.id)
        .eq("produto_id", produto.id)
        .single()

      if (buscaErro && buscaErro.code !== "PGRST116") {
        throw buscaErro
      }

      if (existente) {
        // Já existe, atualiza quantidade
        const { error: updateError } = await supabase
          .from("carrinho")
          .update({ quantidade: existente.quantidade + 1 })
          .eq("id", existente.id)

        if (updateError) throw updateError
      } else {
        // Insere novo
        const { error: insertError } = await supabase.from("carrinho").insert([
          {
            usuario_id: user.id,
            produto_id: produto.id,
            quantidade: 1,
          },
        ])

        if (insertError) throw insertError
      }

      alert("Produto adicionado ao carrinho!")
    } catch (err) {
      console.error("Erro ao adicionar:", err)
      alert("Erro ao adicionar ao carrinho.")
    } finally {
      setAdicionando(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <img
        src={
          produto.imagem_url?.trim()
            ? produto.imagem_url
            : "https://via.placeholder.com/300x300?text=Sem+Imagem"
        }
        alt={produto.nome}
        className="md:w-50 h-80 object-cover rounded border"
      />

      <div>
        <h1 className="text-3xl font-bold">{produto.nome}</h1>
        <p className="text-gray-600 mt-2">{produto.descricao}</p>

        <p className="mt-4 text-lg text-green-700 font-semibold">
          R$ {produto.preco.toFixed(2)}
        </p>

        <p className="text-sm text-gray-500 mt-1">Estoque: {produto.estoque}</p>
        <p className="text-sm text-gray-500">Categoria: {produto.categoria}</p>

        <p className="text-xs text-gray-400 mt-4">
          Adicionado em: {new Date(produto.criado_em).toLocaleDateString()}
        </p>

        <button
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          onClick={adicionarAoCarrinho}
          disabled={adicionando}
        >
          {adicionando ? "Adicionando..." : "Adicionar ao carrinho"}
        </button>
      </div>
    </div>
  )
}
