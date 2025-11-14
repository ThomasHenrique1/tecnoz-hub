"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import AdminRoute from "@/components/auth/AdminRoute"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import ProductTableRow from "@/components/admin/Produtos/ProductTableRow/ProductTableRow"
import SearchFilter from "@/components/admin/Produtos/SearchFilter/SearchFilter"
import { BackgroundParticles } from "@/components/ui/BackgroundParticles"

export default function ProdutosComponent() {
  const router = useRouter()
  const [produtos, setProdutos] = useState([])
  const [filteredProdutos, setFilteredProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })
  const supabase = createClient()

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data, error } = await supabase.from("produtos").select("*").order('criado_em', { ascending: false })
      if (error) {
        alert("Erro ao buscar produtos: " + error.message)
      } else {
        setProdutos(data)
        setFilteredProdutos(data)
      }
      setLoading(false)
    }

    fetchProdutos()
  }, [])

  // Filtrar produtos baseado no termo de busca
  useEffect(() => {
    const filtered = produtos.filter(produto =>
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProdutos(filtered)
  }, [searchTerm, produtos])

  // Ordenar produtos
  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    
    const sorted = [...filteredProdutos].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1
      }
      return 0
    })
    
    setFilteredProdutos(sorted)
    setSortConfig({ key, direction })
  }

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.")) return
    
    const { error } = await supabase.from("produtos").delete().eq("id", id)
    if (error) {
      alert("Erro ao deletar produto: " + error.message)
    } else {
      setProdutos(produtos.filter((p) => p.id !== id))
      // Feedback visual poderia ser implementado com toast notification
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <LoadingSpinner size={10} color="text-primary" label="Carregando produtos..." fullScreen />
      </div>
    )
  }

  return (
    <AdminRoute>
      <BackgroundParticles />
      <div className="min-h-screen bg-base-200 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-base-content mb-2">Administração de Produtos</h1>
              <p className="text-base-content/70">
                {produtos.length} {produtos.length === 1 ? 'produto' : 'produtos'} cadastrado{produtos.length === 1 ? '' : 's'}
              </p>
            </div>
            
            <button
              onClick={() => router.push("/admin/produtos/novo")}
              className="btn btn-primary rounded-btn px-6 py-3 flex items-center gap-2 hover:shadow-md transition-shadow"
              style={{ borderRadius: 'var(--radius-field, 1rem)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Novo Produto
            </button>
          </div>

          {/* Card principal */}
          <div className="card bg-base-100 border border-base-300 rounded-box shadow-lg overflow-hidden">
            <div className="p-1 bg-primary"></div>
            
            <div className="p-6">
              {/* Barra de pesquisa e filtros */}
              <SearchFilter 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Buscar por nome ou categoria..."
                resultCount={filteredProdutos.length}
                totalCount={produtos.length}
              />

              {filteredProdutos.length === 0 ? (
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-base-content/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 9h6m-6 4h6m-6 4h6" />
                  </svg>
                  <p className="text-base-content/60 text-lg mb-4">Nenhum produto encontrado</p>
                  {searchTerm ? (
                    <p className="text-base-content/40">Tente ajustar sua busca ou <button onClick={() => setSearchTerm('')} className="link link-primary">limpar os filtros</button></p>
                  ) : (
                    <button
                      onClick={() => router.push("/admin/produtos/novo")}
                      className="btn btn-primary btn-sm"
                    >
                      Cadastrar primeiro produto
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th className="bg-base-200">
                          <button 
                            onClick={() => handleSort('nome')}
                            className="flex items-center gap-1 font-semibold text-left w-full h-full hover:text-primary transition-colors"
                          >
                            Nome
                            <SortIcon direction={sortConfig.key === 'nome' ? sortConfig.direction : null} />
                          </button>
                        </th>
                        <th className="bg-base-200">
                          <button 
                            onClick={() => handleSort('preco')}
                            className="flex items-center gap-4 font-semibold text-left w-full hover:text-primary transition-colors"
                          >
                            Preço
                            <SortIcon direction={sortConfig.key === 'preco' ? sortConfig.direction : null} />
                          </button>
                        </th>
                        <th className="bg-base-200 ">
                          <button 
                            onClick={() => handleSort('estoque')}
                            className="flex items-center gap-14 font-semibold text-left w-full h-full hover:text-primary transition-colors"
                          >
                            Estoque
                            <SortIcon direction={sortConfig.key === 'estoque' ? sortConfig.direction : null} />
                          </button>
                        </th>
                        <th className="bg-base-200 w-50 h-full">
                          <span className="font-semibolditems-center gap-44 font-semibold text-left w-50 h-full hover:text-primary transition-colors ">Categoria</span>
                        </th>
                        <th className="bg-base-200 text-center ">
                          <span className="font-semibold ">Ações</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProdutos.map((produto) => (
                        <ProductTableRow 
                          key={produto.id} 
                          produto={produto} 
                          onEdit={() => router.push(`/admin/produtos/${produto.id}/editar`)}
                          onDelete={() => handleDelete(produto.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  )
}

// Componente auxiliar para ícone de ordenação
const SortIcon = ({ direction }) => {
  if (!direction) return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
  </svg>
  
  return direction === 'ascending' ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}