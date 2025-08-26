"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useCarrinho } from "@/context/CarrinhoContext"
import Image from "next/image"
import AuthModal from "@/components/Modal/AuthModal"
import CartSuccessModal from "@/components/Modal/CartSuccessModal"
import ErrorModal from "@/components/Modal/ErrorModal"

export default function ProdutoDetalhes({ produto }) {
  const [adicionando, setAdicionando] = useState(false)
  const [imagemCarregando, setImagemCarregando] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  const { atualizarQuantidade } = useCarrinho()

  const adicionarAoCarrinho = async () => {
    setAdicionando(true)

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      setShowAuthModal(true)
      setAdicionando(false)
      return
    }

    try {
      // Verifica se já existe no carrinho
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
            produto_id: produto.id,
            quantidade: 1,
          },
        ])

        if (insertError) throw insertError
      }

      await atualizarQuantidade()
      setShowSuccessModal(true)
    } catch (err) {
      console.error("Erro ao adicionar ao carrinho:", err)
      setErrorMessage("Erro ao adicionar ao carrinho. Tente novamente.")
      setShowErrorModal(true)
    } finally {
      setAdicionando(false)
    }
  }

  const handleLoginRedirect = () => {
    setShowAuthModal(false)
    router.push("/login")
  }

  const handleContinueShopping = () => {
    setShowSuccessModal(false)
  }

  const handleViewCart = () => {
    setShowSuccessModal(false)
    router.push("/carrinho")
  }

  const handleCloseErrorModal = () => {
    setShowErrorModal(false)
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Imagem do produto */}
          <div className="lg:flex-1">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-lg border border-base-300">
              <Image
                src={
                  produto.imagem_url?.trim()
                    ? produto.imagem_url
                    : "https://via.placeholder.com/600x600?text=Sem+Imagem"
                }
                alt={produto.nome}
                fill
                className={`object-cover transition-opacity duration-500 ${
                  imagemCarregando ? "opacity-0" : "opacity-100"
                }`}
                onLoadingComplete={() => setImagemCarregando(false)}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {imagemCarregando && (
                <div className="absolute inset-0 bg-base-200 animate-pulse flex items-center justify-center">
                  <svg className="w-12 h-12 text-base-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Informações do produto */}
          <div className="lg:flex-1 space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-base-content">{produto.nome}</h1>
              <p className="text-lg text-base-content/70 mt-3 leading-relaxed">{produto.descricao}</p>
            </div>

            {/* Preço e informações de estoque */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">
                  R$ {produto.preco.toFixed(2).replace('.', ',')}
                </span>
                <span className={`badge badge-lg ${
                  produto.estoque > 10 ? 'badge-success' :
                  produto.estoque > 0 ? 'badge-warning' :
                  'badge-error'
                }`}>
                  {produto.estoque > 0 ? `${produto.estoque} em estoque` : 'Esgotado'}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="badge badge-outline badge-lg">{produto.categoria || 'Sem categoria'}</span>
                <span className="text-sm text-base-content/60">
                  Adicionado em: {new Date(produto.criado_em).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            {/* Botão de adicionar ao carrinho */}
            <div className="pt-4">
              <button
                className={`btn btn-primary btn-lg w-full lg:w-auto min-w-[200px] ${
                  adicionando ? 'loading' : ''
                }`}
                onClick={adicionarAoCarrinho}
                disabled={adicionando || produto.estoque === 0}
              >
                {adicionando ? (
                  "Adicionando..."
                ) : produto.estoque === 0 ? (
                  "Produto Esgotado"
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Adicionar ao Carrinho
                  </>
                )}
              </button>
              
              {produto.estoque === 0 && (
                <p className="text-warning text-sm mt-2">
                  Este produto está temporariamente esgotado
                </p>
              )}
            </div>

            {/* Informações adicionais */}
            <div className="bg-base-200 rounded-lg p-4 mt-6">
              <h3 className="font-semibold text-base-content mb-2">Informações do produto</h3>
              <ul className="space-y-1 text-sm text-base-content/70">
                <li>• Entrega em todo o Brasil</li>
                <li>• Garantia do fabricante</li>
                <li>• Pagamento seguro</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Autenticação */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLoginRedirect}
      />

      {/* Modal de Sucesso */}
      <CartSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onContinueShopping={handleContinueShopping}
        onViewCart={handleViewCart}
      />

      {/* Modal de Erro */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={handleCloseErrorModal}
        message={errorMessage}
      />
    </>
  )
}