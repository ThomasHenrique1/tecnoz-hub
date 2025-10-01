// app/admin/usuarios/page.jsx
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabaseClient'
import AdminRoute from '@/components/auth/AdminRoute'
import UsersTable from '@/components/admin/UsersTable/UsersTable'
import BackButton from '@/components/ui/BackButton'
import { CiSearch } from "react-icons/ci";
import { BackgroundParticles } from '@/components/ui/BackgroundParticles'

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [busca, setBusca] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const supabase = createClient()

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

    const debounceTimer = setTimeout(() => {
      carregarUsuarios()
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [busca])

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

  const deletarUsuario = async (authId, nome) => {
    if (!confirm(`Tem certeza que deseja remover permanentemente ${nome}?`)) return
    
    try {
      setDeletingId(authId)
      
      const { error: userError } = await supabase
        .from('usuarios')
        .delete()
        .eq('auth_id', authId)

      if (userError) throw userError

      const { error: authError } = await supabase.auth.admin.deleteUser(authId)
      if (authError) throw authError

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
      <BackgroundParticles />
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Gerenciamento de Usuários</h1>
            <p className="text-base-content/70 mt-1">
              Administre os usuários do sistema
            </p>
          </div>
          <BackButton />
        </div>

        {/* Barra de busca */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <CiSearch />
            </span>
          </div>
        </div>

        {error && (
          <div className="alert alert-error shadow-lg mb-6">
            <div>
              <span>{error}</span>
            </div>
            <button className="btn btn-sm" onClick={() => setError(null)}>
              Fechar
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <UsersTable
            usuarios={usuarios}
            onUpdateUserType={atualizarTipoUsuario}
            onDeleteUser={deletarUsuario}
            deletingId={deletingId}
            busca={busca}
          />
        )}
      </div>
    </AdminRoute>
  )
}