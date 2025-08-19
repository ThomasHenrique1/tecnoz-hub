// app/admin/pedidos/page.jsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import AdminRoute from '@/components/auth/AdminRoute'
import PedidosTable from '@/components/admin/PedidosTable/PedidosTable'
import { BackgroundParticles } from '@/components/ui/BackgroundParticles'
import BackButton from '@/components/ui/BackButton'

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const carregarPedidos = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data: pedidosData, error: pedidosError } = await supabase
        .from('pedidos')
        .select('id, usuario_id, total, status, criado_em')
        .order('criado_em', { ascending: false })

      if (pedidosError) throw pedidosError

      const userIds = pedidosData.map(p => p.usuario_id)
      const { data: usuariosData, error: usuariosError } = await supabase
        .from('usuarios')
        .select('auth_id, nome, sobrenome, foto_perfil')
        .in('auth_id', userIds)

      if (usuariosError) throw usuariosError

      const pedidosFormatados = pedidosData.map(pedido => {
        const usuario = usuariosData.find(u => u.auth_id === pedido.usuario_id) || {}
        return {
          ...pedido,
          usuario: {
            nome: `${usuario.nome || ''} ${usuario.sobrenome || ''}`.trim() || 'Cliente não encontrado',
            foto_perfil: usuario.foto_perfil || null,
            auth_id: usuario.auth_id || pedido.usuario_id
          }
        }
      })

      setPedidos(pedidosFormatados)
    } catch (err) {
      console.error('Erro ao carregar pedidos:', err)
      setError('Erro ao carregar pedidos. Tente recarregar a página.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarPedidos()
  }, [])

  return (
    <AdminRoute>
      <BackgroundParticles />
      <div className="min-h-screen bg-base-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Pedidos</h1>
          <p className="text-base-content/70 mt-1">
            Visualize e gerencie todos os pedidos do sistema
          </p>
        </div>
        <div className="mb-6">
          <BackButton />
        </div>

        {error && (
          <div className="alert alert-error shadow-lg mb-6">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <PedidosTable pedidos={pedidos} />
        )}

        {!loading && pedidos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-base-content/70">Nenhum pedido encontrado</p>
          </div>
        )}
      </div>
        </div>
      </div>
    </AdminRoute>
  )
}