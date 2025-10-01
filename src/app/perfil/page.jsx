'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { ProfileAvatar } from '@/components/perfil/ProfileAvatar/ProfileAvatar'
import { ProfileFormField } from '@/components/perfil/ProfileFormField/ProfileFormField'

const initialFormState = {
  nome: '',
  sobrenome: '',
  telefone: '',
  data_nascimento: ''
}

export default function PerfilPage() {
  const router = useRouter()
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState(null)
  const [form, setForm] = useState(initialFormState)
  const supabase = createClient()

  // Busca os dados do perfil
  const fetchPerfil = useCallback(async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        router.push('/login')
        return
      }

      const { data, error: userError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('auth_id', user.id)
        .single()

      if (userError) throw userError

      setUsuario(data)
      setForm({
        nome: data.nome || '',
        sobrenome: data.sobrenome || '',
        telefone: data.telefone || '',
        data_nascimento: data.data_nascimento?.slice(0, 10) || ''
      })
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchPerfil()
  }, [fetchPerfil])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('usuarios')
        .update(form)
        .eq('auth_id', user.id)

      if (error) throw error

      alert('Perfil atualizado com sucesso!')
      setUsuario(prev => prev ? { ...prev, ...form } : null)
    } catch (error) {
      alert('Erro ao atualizar dados: ' + error.message)
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile || !usuario) return

    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) return

      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${user.id}.${fileExt}`
      const filePath = `avatars/${fileName}`  
            
      // Upload da imagem
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, selectedFile, { upsert: true })
      
      if (uploadError) throw uploadError

      // Obtém URL pública
      const { data: { publicUrl } } = await supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      const updatedUrl = `${publicUrl}?t=${Date.now()}` // Força atualização do cache

      // Atualiza perfil com a nova URL
      const { error: updateError } = await supabase
        .from('usuarios')
        .update({ foto_perfil: updatedUrl })
        .eq('auth_id', user.id)

      if (updateError) throw updateError

      alert('Imagem enviada com sucesso!')
     setUsuario(prev => prev ? { ...prev, foto_perfil: updatedUrl } : null)
      setSelectedFile(null)
    } catch (error) {
      console.error('Erro no upload:', error)
      alert('Erro ao processar imagem: ' + error.message)
    }
  }

  if (loading) return (
    <div className="flex justify-center p-8">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  )

  if (!usuario) return (
    <p className="p-8 text-center">Usuário não encontrado</p>
  )

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl font-bold mb-6">Meu Perfil</h1>
          
          <ProfileAvatar
            src={usuario.foto_perfil}
            onFileChange={setSelectedFile}
            onUpload={handleFileUpload}
            selectedFile={selectedFile}
          />

          <form onSubmit={handleSubmit} className="space-y-4">
            <ProfileFormField
              label="Nome"
              name="nome"
              type="text"
              value={form.nome}
              onChange={handleChange}
              required
            />

            <ProfileFormField
              label="Sobrenome"
              name="sobrenome"
              type="text"
              value={form.sobrenome}
              onChange={handleChange}
              required
            />

            <ProfileFormField
              label="Telefone"
              name="telefone"
              type="tel"
              value={form.telefone}
              onChange={handleChange}
            />

            <ProfileFormField
              label="Data de Nascimento"
              name="data_nascimento"
              type="date"
              value={form.data_nascimento}
              onChange={handleChange}
            />

            <div className="card-actions justify-end mt-6">
              <button type="submit" className="btn btn-primary">
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}