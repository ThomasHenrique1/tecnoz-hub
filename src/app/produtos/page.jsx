"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("")
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const categoriaDaUrl = searchParams.get("categoria")

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data, error } = await supabase
        .from("produtos")
        .select("id, nome, descricao, preco, categoria, imagem_url")

      if (error) {
        console.error("Erro ao buscar produtos:", error.message)
        return
      }

      setProdutos(data)

      const categoriasUnicas = [...new Set(data.map((p) => p.categoria || "Outros"))]
      setCategorias(categoriasUnicas)

      const categoriaInicial =
        categoriaDaUrl && categoriasUnicas.includes(categoriaDaUrl)
          ? categoriaDaUrl
          : categoriasUnicas[0]

      setCategoriaSelecionada(categoriaInicial)
      setLoading(false)
    }

    fetchProdutos()
  }, [categoriaDaUrl])

  if (loading) return <p className="p-6">Carregando produtos...</p>

  const produtosFiltrados = produtos.filter(
    (p) => p.categoria === categoriaSelecionada
  )

  return (
    <div className="flex flex-col md:flex-row p-6 gap-8 max-w-7xl mx-auto">
      <aside className="w-full md:w-1/4">
        <h2 className="text-lg font-bold mb-2">Categorias</h2>
        <ul className="space-y-2">
          {categorias.map((cat) => (
            <li key={cat}>
              <Link
                href={`/produtos?categoria=${encodeURIComponent(cat)}`}
                className={`block w-full text-left p-2 rounded transition ${
                  cat === categoriaSelecionada
                    ? "bg-blue-200 text-blue-900 font-semibold"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <section className="w-full md:w-3/4">
        <h2 className="text-xl font-bold mb-4">{categoriaSelecionada}</h2>
        {produtosFiltrados.length === 0 ? (
          <p>Nenhum produto nesta categoria.</p>
        ) : (
          <ul className="space-y-4">
            {produtosFiltrados.map((produto) => (
              <li
                key={produto.id}
                className="p-3 border rounded flex items-center gap-4"
              >
                <img
                  src={
                    produto.imagem_url?.trim()
                      ? produto.imagem_url
                      : "https://via.placeholder.com/80x80?text=Sem+Imagem"
                  }
                  alt={produto.nome}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <strong className="text-lg">{produto.nome}</strong>
                  <p className="text-sm text-gray-600">{produto.descricao}</p>
                  <p className="text-green-700 font-semibold">
                    R$ {produto.preco.toFixed(2)}
                  </p>
                </div>
                <Link href={`/produtos/${produto.id}`}>
                <strong className="text-lg hover:underline">Verificar produto</strong>
              </Link>
              </li>
              
              
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
