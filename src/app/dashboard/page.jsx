"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [usuario, setUsuario] = useState(null)
  const [produtos, setProdutos] = useState([])
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user: currentUser },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !currentUser) {
        router.push("/login")
        return
      }

      // Buscar dados do usuário na tabela usuarios
      const { data: usuarioData, error: usuarioError } = await supabase
        .from("usuarios")
        .select("nome")
        .eq("auth_id", currentUser.id)
        .single()

      if (usuarioError) {
        console.error("Erro ao buscar dados do usuário:", usuarioError)
      } else {
        setUsuario(usuarioData)
      }

      // Busca produtos
      const { data: produtosData, error: produtosError } = await supabase
        .from("produtos")
        .select("*")

      if (produtosError) {
        console.error("Erro ao buscar produtos:", produtosError)
      } else {
        setProdutos(produtosData)
      }

      // Busca pedidos do usuário
      const { data: pedidosData, error: pedidosError } = await supabase
        .from("pedidos")
        .select("*")
        .eq("usuario_id", currentUser.id)

      if (pedidosError) {
        console.error("Erro ao buscar pedidos:", pedidosError)
      } else {
        setPedidos(pedidosData)
      }

      setLoading(false)
    }

    fetchData()
  }, [router])

  if (loading) return <p className="p-4">Carregando dashboard...</p>

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Bem-vindo, {usuario ? usuario.nome : "Usuário"}
      </h1>

      {/* Lista de produtos */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Produtos Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {produtos.length === 0 ? (
            <p>Nenhum produto disponível.</p>
          ) : (
            produtos.map((produto) => (
              <div
                key={produto.id}
                className="border rounded p-4 shadow hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg">{produto.nome}</h3>
                <p className="text-gray-700">{produto.descricao}</p>
                <p className="mt-2 font-bold">R$ {produto.preco.toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Lista de pedidos */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Meus Pedidos</h2>
        {pedidos.length === 0 ? (
          <p>Você ainda não fez pedidos.</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID Pedido</th>
                <th className="border px-4 py-2">Data</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Total (R$)</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{pedido.id}</td>
                  <td className="border px-4 py-2">
                    {new Date(pedido.data_criacao).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{pedido.status}</td>
                  <td className="border px-4 py-2">{pedido.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}
