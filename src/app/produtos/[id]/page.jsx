import { supabase } from "@/lib/supabaseClient"
import Image from "next/image"
import Link from "next/link"

export const dynamic = "force-dynamic" // Força SSR para sempre buscar produto atualizado

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

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={
            produto.imagem_url?.trim()
              ? produto.imagem_url
              : "https://via.placeholder.com/300x300?text=Sem+Imagem"
          }
          alt={produto.nome}
          className="w-full md:w-80 h-80 object-cover rounded border"
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
        </div>
      </div>
    </div>
  )
}
