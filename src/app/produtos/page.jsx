'use client'

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import LoadingState from "@/components/produtos/LoadingState/LoadingState"
import PageHeader from "@/components/produtos/PageHeader/PageHeader"
import CategoriaSidebar from "@/components/produtos/CategoriaSidebar/CategoriaSidebar"
import ProdutosGrid from "@/components/produtos/ProdutosGrid/ProdutosGrid"

export const dynamic = 'force-dynamic'

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
        .select("id, nome, descricao, preco, categoria, imagem_url, estoque")

      if (error) {
        console.error("Erro ao buscar produtos:", error.message)
        return
      }

      setProdutos(data)

      const categoriasUnicas = [...new Set(data.map((p) => p.categoria || "Sem Categoria"))]
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

  if (loading) {
    return <LoadingState />
  }

  const produtosFiltrados = categoriaSelecionada === "Todas" 
    ? produtos 
    : produtos.filter((p) => p.categoria === categoriaSelecionada)

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <PageHeader />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <CategoriaSidebar
            categorias={categorias}
            categoriaSelecionada={categoriaSelecionada}
            onCategoriaChange={setCategoriaSelecionada}
            produtosCount={produtosFiltrados.length}
          />
          
          <ProdutosGrid
            categoriaSelecionada={categoriaSelecionada}
            produtos={produtosFiltrados}
          />
        </div>
      </div>
    </div>
  )
}
