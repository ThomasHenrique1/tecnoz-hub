// src/app/produtos/[id]/page.jsx


import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"
import ProdutoDetalhes from "../ProdutoDetalhes"


export const dynamic = "force-dynamic"

export default async function ProdutoPage({ params }) {
  const { id } = params

  const { data: produto, error } = await supabase
    .from("produtos")
    .select("id, nome, descricao, preco, estoque, categoria, imagem_url, criado_em")
    .eq("id", id)
    .single()

  if (error || !produto) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        <Link href="/produtos" className="text-blue-600 hover:underline">
          Voltar para produtos
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link href="/produtos" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Voltar para produtos
      </Link>

      <ProdutoDetalhes produto={produto} />
    </div>
  )
}
