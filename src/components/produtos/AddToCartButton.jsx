"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useCarrinho } from "@/context/CarrinhoContext"
import { useRouter } from "next/navigation"
import CartSuccessModal from "@/components/CartSuccessModal/CartSuccessModal"

export default function AddToCartButton({ produtoId, className = "", disabled = false }) {
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const { atualizarQuantidade } = useCarrinho()
  const router = useRouter()

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

    try {
      // Verifica se já existe no carrinho
      const { data: existente, error: buscaErro } = await supabase
        .from("carrinho")
        .select("id, quantidade")
        .eq("usuario_id", user.id)
        .eq("produto_id", produtoId)
        .single()

      if (buscaErro && buscaErro.code !== "PGRST116") {
        throw buscaErro
      }

      if (existente) {
        // Atualiza quantidade
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
            produto_id: produtoId,
            quantidade: 1,
          },
        ])

        if (insertError) throw insertError
      }

      // Atualiza o contexto do carrinho
      await atualizarQuantidade()
      
      // Mostra modal de sucesso
      setShowSuccessModal(true)
      
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error)
      alert("Erro ao adicionar ao carrinho. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleContinueShopping = () => {
    setShowSuccessModal(false)
  }

  const handleViewCart = () => {
    setShowSuccessModal(false)
    router.push("/carrinho")
  }

  const handleCloseModal = () => {
    setShowSuccessModal(false)
  }

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={loading || disabled}
        className={`btn btn-primary gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Adicionando...
          </>
        ) : (
          <>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            Adicionar ao Carrinho
          </>
        )}
      </button>

      <CartSuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        onContinueShopping={handleContinueShopping}
        onViewCart={handleViewCart}
      />
    </>
  )
}