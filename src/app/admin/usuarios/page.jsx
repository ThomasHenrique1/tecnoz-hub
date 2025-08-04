'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import AdminRoute from '@/components/auth/AdminRoute'

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [busca, setBusca] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null) // Para controlar o loading por botão

  // Buscar usuários
  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        setLoading(true)
        
        let query = supabase
          .from('usuarios')
          .select(`
            id,
            auth_id,
            nome,
            email,
            tipo_usuario,
            created_at
          `)
          .order('created_at', { ascending: false })

        if (busca) {
          query = query.or(
            `nome.ilike.%${busca}%,email.ilike.%${busca}%`
          )
        }

        const { data, error } = await query

        if (error) throw error
        setUsuarios(data || [])
      } catch (err) {
        console.error('Erro ao carregar usuários:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    carregarUsuarios()
  }, [busca])

  // Atualizar tipo de usuário
  const atualizarTipoUsuario = async (authId, novoTipo) => {
    try {
      const { error } = await supabase
        .from('usuarios')
        .update({ tipo_usuario: novoTipo })
        .eq('auth_id', authId)

      if (error) throw error

      setUsuarios(usuarios.map(user => 
        user.auth_id === authId ? { ...user, tipo_usuario: novoTipo } : user
      ))
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err)
      setError(err.message)
    }
  }

  // Excluir usuário
  const deletarUsuario = async (authId, nome) => {
    if (!confirm(`Tem certeza que deseja remover permanentemente ${nome}?`)) return
    
    try {
      setDeletingId(authId)
      
      // 1. Primeiro deleta da tabela de usuários
      const { error: userError } = await supabase
        .from('usuarios')
        .delete()
        .eq('auth_id', authId)

      if (userError) throw userError

      // 2. Depois deleta o usuário do Auth
      const { error: authError } = await supabase.auth.admin.deleteUser(authId)
      
      if (authError) throw authError

      // Atualiza a lista local
      setUsuarios(usuarios.filter(user => user.auth_id !== authId))
      
    } catch (err) {
      console.error('Erro ao excluir usuário:', err)
      setError(`Erro ao excluir: ${err.message}`)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <AdminRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Gerenciamento de Usuários</h1>
        
        {/* Barra de busca */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="input input-bordered w-full max-w-md"
          />
        </div>

        {/* Mensagens de status */}
        {error && (
          <div className="alert alert-error mb-6">
            <span>{error}</span>
            <button className="btn btn-sm" onClick={() => setError(null)}>Fechar</button>
          </div>
        )}

        {loading && (
          <div className="flex justify-center my-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {/* Tabela de usuários */}
        {!loading && (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Tipo</th>
                  <th>Cadastrado em</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length > 0 ? (
                  usuarios.map((usuario) => (
                    <tr key={usuario.auth_id}>
                      <td>{usuario.nome}</td>
                      <td>{usuario.email}</td>
                      <td>
                        <select
                          value={usuario.tipo_usuario}
                          onChange={(e) => 
                            atualizarTipoUsuario(usuario.auth_id, e.target.value)
                          }
                          className="select select-bordered select-sm"
                        >
                          <option value="user">Usuário</option>
                          <option value="admin">Administrador</option>
                        </select>
                      </td>
                      <td>
                        {new Date(usuario.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          onClick={() => deletarUsuario(usuario.auth_id, usuario.nome)}
                          className="btn btn-error btn-sm"
                          disabled={usuario.tipo_usuario === 'admin' || deletingId === usuario.auth_id}
                        >
                          {deletingId === usuario.auth_id ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            'Remover'
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      {busca ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminRoute>
  )
}