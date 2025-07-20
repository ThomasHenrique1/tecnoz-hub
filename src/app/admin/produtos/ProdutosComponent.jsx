"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function ProdutosComponent() {
  const router = useRouter()
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data, error } = await supabase.from("produtos").select("*")
      if (error) {
        alert("Erro ao buscar produtos: " + error.message)
      } else {
        setProdutos(data)
      }
      setLoading(false)
    }

    fetchProdutos()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm("Deseja realmente excluir este produto?")) return
    const { error } = await supabase.from("produtos").delete().eq("id", id)
    if (error) {
      alert("Erro ao deletar produto: " + error.message)
    } else {
      setProdutos(produtos.filter((p) => p.id !== id))
      alert("Produto deletado com sucesso!")
    }
  }

  if (loading) return <p>Carregando produtos...</p>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Administração de Produtos</h1>
      <button
        onClick={() => router.push("/admin/produtos/novo")}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Novo Produto
      </button>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Nome</th>
              <th className="border px-4 py-2">Preço</th>
              <th className="border px-4 py-2">Estoque</th>
              <th className="border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{produto.nome}</td>
                <td className="border px-4 py-2">R$ {produto.preco.toFixed(2)}</td>
                <td className="border px-4 py-2">{produto.estoque}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() =>
                      router.push(`/admin/produtos/${produto.id}/editar`)
                    }
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(produto.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
