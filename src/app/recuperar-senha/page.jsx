'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import FormInput from '@/components/SignUp/FormInput/FormInput'
import SubmitButton from '@/components/SignUp/SubmitButton/SubmitButton'
import ErrorMessage from '@/components/SignUp/ErrorMessage/ErrorMessage'
import Link from 'next/link'
import { BackgroundParticles } from '@/components/ui/BackgroundParticles'

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
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
        <div className="max-w-md w-full bg-base-100 rounded-box shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/20 text-success mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-3">E-mail enviado!</h2>
          <p className="text-base-content/70 mb-8">
            Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
          </p>
          <Link href="/login" className="btn btn-primary px-6">
            Voltar ao Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-7">
      <BackgroundParticles />
      <div className="max-w-md w-full bg-base-100 rounded-box shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-primary-content p-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-focus rounded-box mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Recuperar senha</h1>
          <p className="opacity-90 mt-2">
            Digite seu e-mail para receber o link de recuperação
          </p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              name="email"
              type="email"
              placeholder="Seu e-mail cadastrado"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon="envelope"
              className="input-bordered input-lg"
            />
            
            <ErrorMessage message={error} />
            
            <SubmitButton 
              loading={loading} 
              text="Enviar link de recuperação"
              loadingText="Enviando..."
              className="w-full"
              icon="envelope"
            ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>Enviar</SubmitButton>
            
            <div className="text-center text-sm text-base-content/70">
              Lembrou sua senha?{' '}
              <Link href="/login" className="font-medium text-primary hover:text-primary-focus">
                Faça login aqui
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}