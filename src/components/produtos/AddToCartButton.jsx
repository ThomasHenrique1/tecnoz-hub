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
      onConflict: "usuario_id,produto_id"
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
      className="btn btn-primary mt-6 w-full md:w-auto"
    >
      {loading ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          Adicionando...
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Adicionar ao Carrinho
        </>
      )}
    </button>
  )
}