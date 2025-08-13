'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import FormInput from '@/components/SignUp/FormInput/FormInput'
import SubmitButton from '@/components/SignUp/SubmitButton/SubmitButton'
import ErrorMessage from '@/components/SignUp/ErrorMessage/ErrorMessage'
import Link from 'next/link'

export default function PasswordRecovery() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/atualizar-senha`,
      })

      if (error) throw error

      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Erro ao enviar e-mail de recuperação')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-green-100 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">E-mail enviado!</h2>
        <p className="text-gray-600 mb-6">
          Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
        </p>
        <Link href="/login" className="btn btn-primary px-6">
          Voltar ao Login
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Recuperar senha</h1>
        <p className="text-gray-600 mt-2">
          Digite seu e-mail para receber o link de recuperação
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          name="email"
          type="email"
          placeholder="Seu e-mail cadastrado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-lg"
        />
        
        <ErrorMessage message={error} />
        
        <SubmitButton 
          loading={loading} 
          text="Enviar link de recuperação"
          loadingText="Enviando..."
          className="w-full"
        />
        
        <div className="text-center text-sm text-gray-500">
          Lembrou sua senha?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Faça login aqui
          </Link>
        </div>
      </form>
    </div>
  )
}