"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import LoadingSpinner from "@/components/dashboard/LoadingSpinner/LoadingSpinner"
import DashboardHeader from "@/components/dashboard/DashboardHeader/DashboardHeader"
import ProductList from "@/components/dashboard/ProductList/ProductList"
import OrderTable from "@/components/dashboard/OrderTable/OrderTable"



export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [usuario, setUsuario] = useState(null)
  const [produtos, setProdutos] = useState([])
  const [pedidos, setPedidos] = useState([])
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser()

        if (authError || !currentUser) {
          router.push("/login")
          return
        }

        // Buscar dados em paralelo para melhor performance
        const [usuarioData, produtosData, pedidosData] = await Promise.all([
          supabase.from("usuarios").select("nome").eq("auth_id", currentUser.id).single(),
          supabase.from("produtos").select("*"),
          supabase.from("pedidos").select("*").eq("usuario_id", currentUser.id)
        ])

        if (usuarioData.data) setUsuario(usuarioData.data)
        if (produtosData.data) setProdutos(produtosData.data)
        if (pedidosData.data) setPedidos(pedidosData.data)

      } catch (error) {
        console.error("Erro ao carregar dashboard:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  if (loading) return <LoadingSpinner />

  return (
    <main className="container mx-auto px-4 py-8">
      <DashboardHeader nomeUsuario={usuario?.nome} />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Produtos Disponíveis</h2>
        <ProductList produtos={produtos} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Meus Pedidos</h2>
        <OrderTable pedidos={pedidos} />
      </section>
    </main>
  )
}