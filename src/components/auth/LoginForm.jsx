'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  })
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setLoading(true)

    try {
      // 1. Tentativa de login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.senha,
      })

      if (error) throw error

      // 2. Verificar tipo de usuário após login bem-sucedido
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('tipo_usuario')
        .eq('auth_id', data.user.id)
        .single()

      if (userError || !userData) throw new Error('Perfil de usuário não encontrado')

      // 3. Redirecionamento baseado no tipo de usuário
      await router.refresh() // Garante que o middleware processe a nova sessão
      
      const redirectPath = userData.tipo_usuario === 'admin' ? '/admin' : '/painel'
      router.push(redirectPath)

    } catch (error) {
      console.error('Erro no login:', error)
      setErro(error.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="senha" className="block text-sm font-medium">
          Senha
        </label>
        <input
          id="senha"
          name="senha"
          type="password"
          placeholder="••••••••"
          value={formData.senha}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
          disabled={loading}
        />
      </div>

      {erro && (
        <div className="alert alert-error p-3 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{erro}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full gap-2"
        aria-busy={loading}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner"></span>
            Entrando...
          </>
        ) : 'Entrar'}
      </button>
    </form>
  )
}