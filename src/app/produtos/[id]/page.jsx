import { createClient } from "@/lib/supabaseClient"
import Link from "next/link"
import ProdutoDetalhes from "../ProdutoDetalhes"
export const dynamic = "force-dynamic"

export default async function ProdutoPage({ params }) {
  const { id } = await params

  const supabase = createClient()
  
  const { data: produto, error } = await supabase
    .from("produtos")
    .select("id, nome, descricao, preco, estoque, categoria, imagem_url, criado_em")
    .eq("id", id)
    .single()

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
        {/* Breadcrumb e navegação */}
        <nav className="mb-8">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link href="/" className="text-base-content/70 hover:text-primary">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="text-base-content/70 hover:text-primary">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href={`/produtos?categoria=${encodeURIComponent(produto.categoria || '')}`} className="text-base-content/70 hover:text-primary">
                  {produto.categoria || 'Sem categoria'}
                </Link>
              </li>
              <li className="text-base-content">
                {produto.nome}
              </li>
            </ul>
          </div>

          <Link 
            href="/produtos" 
            className="btn btn-ghost btn-sm gap-2 mt-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para produtos
          </Link>
        </nav>

        {/* Conteúdo principal */}
        <ProdutoDetalhes produto={produto} />

        {/* Produtos relacionados (opcional) */}
        <section className="mt-16 border-t border-base-300 pt-12">
          <h2 className="text-2xl font-bold text-base-content mb-8 text-center">
            Produtos Relacionados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Aqui você pode adicionar produtos da mesma categoria */}
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-base-content/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 9h6m-6 4h6m-6 4h6" />
              </svg>
              <p className="text-base-content/60">
                Em breve: produtos similares
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}