import { createClient } from "@/lib/supabaseClient"
import Link from "next/link"
import ProdutoDetalhes from "../ProdutoDetalhes"
import ProdutoCard from "@/components/produtos/ProdutoCard/ProdutoCard"
export const dynamic = "force-dynamic"

export default async function ProdutoPage({ params }) {
  const { id } = await params

  const supabase = createClient()
  
  // Busca o produto principal
  const { data: produto, error } = await supabase
    .from("produtos")
    .select("id, nome, descricao, preco, estoque, categoria, imagem_url, criado_em")
    .eq("id", id)
    .single()

  // Busca produtos relacionados da mesma categoria (excluindo o produto atual)
  const { data: produtosRelacionados } = await supabase
    .from("produtos")
    .select("id, nome, descricao, preco, estoque, categoria, imagem_url")
    .eq("categoria", produto?.categoria || "")
    .neq("id", id)
    .limit(6)

  if (error || !produto) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 text-warning mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.946-.833-2.716 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-base-content mb-4">Produto não encontrado</h1>
          
          <p className="text-base-content/70 mb-6">
            O produto que você está procurando não existe ou foi removido.
          </p>

          <Link 
            href="/produtos" 
            className="btn btn-primary gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para produtos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Breadcrumb melhorado */}
        <nav className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm breadcrumbs bg-base-200 rounded-2xl px-4 py-3">
              <ul>
                <li>
                  <Link href="/" className="text-base-content/70 hover:text-primary transition-colors duration-200">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="/produtos" className="text-base-content/70 hover:text-primary transition-colors duration-200">
                    Produtos
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/produtos?categoria=${encodeURIComponent(produto.categoria || '')}`}
                    className="text-base-content/70 hover:text-primary transition-colors duration-200"
                  >
                    {produto.categoria || 'Sem categoria'}
                  </Link>
                </li>
                <li className="text-base-content font-semibold">
                  {produto.nome}
                </li>
              </ul>
            </div>

            <Link 
              href="/produtos" 
              className="btn btn-outline btn-primary gap-2 hover:bg-primary hover:text-primary-content transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar para produtos
            </Link>
          </div>
        </nav>

        {/* Conteúdo principal */}
        <ProdutoDetalhes produto={produto} />

        {/* Produtos relacionados da mesma categoria */}
        {produtosRelacionados && produtosRelacionados.length > 0 && (
          <section className="mt-16 border-t border-base-300 pt-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-base-content mb-4">
                Produtos Relacionados
              </h2>
              <p className="text-base-content/60 max-w-2xl mx-auto">
                Descubra outros produtos incríveis da mesma categoria
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {produtosRelacionados.map((produtoRelacionado) => (
                <ProdutoCard 
                  key={produtoRelacionado.id} 
                  produto={produtoRelacionado}
                />
              ))}
            </div>

            {/* Link para ver mais produtos da categoria */}
            <div className="text-center mt-8">
              <Link 
                href={`/produtos?categoria=${encodeURIComponent(produto.categoria || '')}`}
                className="btn btn-outline btn-primary gap-2 hover:bg-primary hover:text-primary-content transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
                Ver todos em {produto.categoria}
              </Link>
            </div>
          </section>
        )}

        {/* Mensagem quando não há produtos relacionados */}
        {(!produtosRelacionados || produtosRelacionados.length === 0) && (
          <section className="mt-16 border-t border-base-300 pt-12">
            <div className="text-center py-8">
              <div className="bg-base-200 rounded-3xl p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 text-base-content/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 9h6m-6 4h6m-6 4h6" />
                </svg>
                <h3 className="text-lg font-semibold text-base-content mb-2">
                  Nenhum produto relacionado
                </h3>
                <p className="text-base-content/60 mb-4">
                  Não encontramos outros produtos nesta categoria.
                </p>
                <Link 
                  href="/produtos"
                  className="btn btn-primary btn-sm gap-2"
                >
                  Explorar todos os produtos
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}