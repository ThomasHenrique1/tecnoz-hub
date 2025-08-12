'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import FormInput from '@/components/SignUp/FormInput/FormInput'
import SubmitButton from '@/components/SignUp/SubmitButton/SubmitButton'
import ErrorMessage from '@/components/SignUp/ErrorMessage/ErrorMessage'
import Link from 'next/link'

export default function UpdatePassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) throw error

      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Erro ao atualizar senha')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto p-8 bg-base-100 rounded-xl shadow-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-base-content mb-2">Senha atualizada!</h2>
        <p className="text-base-content/70 mb-6">Sua senha foi redefinida com sucesso.</p>
        <Link href="/login" className="btn btn-primary w-full max-w-xs">
          Ir para Login
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 sm:p-8 bg-base-100 rounded-xl shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-base-content">Redefinir Senha</h1>
        <p className="text-base-content/70 mt-2">Digite sua nova senha abaixo</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          name="password"
          type="password"
          placeholder="Nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-lg"
        />
        
        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="Confirme a nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="input-lg"
        />
        
        <ErrorMessage message={error} />
        
        <SubmitButton 
          loading={loading} 
          text="Atualizar Senha"
          loadingText="Atualizando..."
          className="mt-6"
        />
      </form>
    </div>
  )
}