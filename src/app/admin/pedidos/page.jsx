'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import AdminRoute from '@/components/auth/AdminRoute'

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const carregarPedidos = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // 1. Primeiro busca apenas os pedidos
      const { data: pedidosData, error: pedidosError } = await supabase
        .from('pedidos')
        .select('id, usuario_id, total, status, criado_em')
        .order('criado_em', { ascending: false })

      if (pedidosError) throw pedidosError

      // 2. Busca os usuários correspondentes
      const userIds = pedidosData.map(p => p.usuario_id)
      const { data: usuariosData, error: usuariosError } = await supabase
        .from('usuarios')
        .select('auth_id, nome, sobrenome , foto_perfil')
        .in('auth_id', userIds)

      if (usuariosError) throw usuariosError

      // 3. Combina os dados
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
      console.error('Erro detalhado:', err)
      setError('Erro ao carregar pedidos: ' + (err.message || 'Verifique o console'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarPedidos()
  }, [])

  const formatarData = (dataString) => {
    return new Date(dataString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor || 0)
  }

  return (
    <AdminRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Pedidos</h1>

        {error && (
          <div className="alert alert-error mb-6">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center my-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {!loading && (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data</th>
                  <th>Cliente</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Usuário ID</th>
                </tr>
              </thead>
                   <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.id.split('-')[0]}</td>
                    <td>{formatarData(pedido.criado_em)}</td>
                    <td>
                    <div className="flex items-center space-x-2">
                        {pedido.usuario.foto_perfil && (
                        <div className="avatar">
                            <div className="w-0 h-0 rounded-full  5px overflow-hidden">
                            <img 
                                src={pedido.usuario.foto_perfil} 
                                alt={pedido.usuario.nome}
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'cover',
                                  borderRadius: '50%'
                                }}
                                onError={(e) => {
                                  e.target.style.display = 'none'
                                }}
                              />
                            </div>
                        </div>
                        )}
                        <div className="text-sm">
                        {pedido.usuario.nome}
                        </div>
                    </div>
                    </td>
                    <td>
                      <span className={`badge ${
                        pedido.status === 'entregue' ? 'badge-success' :
                        pedido.status === 'cancelado' ? 'badge-error' :
                        'badge-warning'
                      }`}>
                        {pedido.status}
                      </span>
                    </td>
                    <td>{formatarMoeda(pedido.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminRoute>
  )
}