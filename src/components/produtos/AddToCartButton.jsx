"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AddToCartButton({ produtoId }) {
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    setLoading(true)

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      alert("Você precisa estar logado para adicionar ao carrinho.")
      setLoading(false)
      return
    }

    const { error } = await supabase.from("carrinho").upsert({
      usuario_id: user.id,
      produto_id: produtoId,
      quantidade: 1,
    }, {
      onConflict: "usuario_id,produto_id" // se já existir, não duplica
    })

    if (error) {
      console.error(error)
      alert("Erro ao adicionar ao carrinho.")
    } else {
      alert("Produto adicionado ao carrinho!")
    }

    setLoading(false)
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
    >
      {loading ? "Adicionando..." : "Adicionar ao Carrinho"}
    </button>
  )
}
