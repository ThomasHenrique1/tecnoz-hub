'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { ErrorMessage } from '@/components/login/ErrorMessage/ErrorMessage'
import { FormField } from '@/components/login/FormField/FormField'
import { SubmitButton } from '@/components/login/SubmitButton/SubmitButton'
import { BackgroundParticles } from '@/components/ui/BackgroundParticles'

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.senha,
      })

      if (error) throw error

      // Verificar se o email foi confirmado corretamente
      if (!data.user.email_confirmed_at) {
        setErro('Email não confirmado. Verifique sua caixa de entrada.')
        return
      }

      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('tipo_usuario')
        .eq('auth_id', data.user.id)
        .single()

      if (userError || !userData) throw new Error('Perfil de usuário não encontrado')

      await router.refresh()
      const redirectPath = userData.tipo_usuario === 'admin' ? '/admin' : '/perfil'
      router.push(redirectPath)

    } catch (error) {
      console.error('Erro no login:', error)
      setErro(error.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundParticles />

      <form onSubmit={handleSubmit} className="glass-card max-w-md w-full p-8 rounded-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta</h1>
          <p className="text-white/80">Entre na sua conta para continuar</p>
        </div>

        <div className="space-y-6">
          <FormField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            required
            disabled={loading}
          />
          <FormField
            label="Senha"
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="••••••••"
            required
            disabled={loading}
          />
        </div>

        <div className="flex justify-end mt-2">
          <a href="/recuperar-senha" className="text-sm text-white/70 hover:text-white transition-colors">
            Esqueceu a senha?
          </a>
        </div>

        <ErrorMessage message={erro} />

        <SubmitButton loading={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </SubmitButton>

        <div className="text-center mt-6 text-white/70 text-sm">
          Não tem uma conta?{' '}
          <a href="/signup" className="text-white font-medium hover:underline">
            Cadastre-se
          </a>
        </div>
      </form>
    </div>
  )
}
