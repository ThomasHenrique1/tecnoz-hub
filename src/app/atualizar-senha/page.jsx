'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import FormInput from '@/components/SignUp/FormInput/FormInput'
import SubmitButton from '@/components/SignUp/SubmitButton/SubmitButton'
import ErrorMessage from '@/components/SignUp/ErrorMessage/ErrorMessage'
import Link from 'next/link'
import { BackgroundParticles } from '@/components/ui/BackgroundParticles'

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

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
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
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
        <div className="max-w-md w-full bg-base-100 rounded-box shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/20 text-success mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-3">Senha atualizada!</h2>
          <p className="text-base-content/70 mb-8">Sua senha foi redefinida com sucesso.</p>
          <Link 
            href="/login" 
            className="btn btn-primary w-full max-w-xs"
          >
            Ir para Login
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
      <BackgroundParticles />
      <div className="max-w-md w-full bg-base-100 rounded-box shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-primary-content p-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-focus rounded-box mb-4 radius-full">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Redefinir Senha</h1>
          <p className="opacity-90 mt-2">Digite sua nova senha abaixo</p>
        </div>
        
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6 bg-base-100 p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <FormInput
                name="password"
                type="password"
                placeholder="Nova senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                icon="lock"
                className="input-bordered input-lg"
              />
              
              <FormInput
                name="confirmPassword"
                type="password"
                placeholder="Confirme a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                icon="lock"
                className="input-bordered input-lg"
              />
            </div>
            
            <ErrorMessage message={error} />
            
            <SubmitButton 
              loading={loading} 
              text="Atualizar Senha"
              loadingText="Atualizando..."
              className="btn btn-primary w-full"
              icon="lock"
            ><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
            </svg>Atualizar</SubmitButton>
          </form>
          
          <div className="mt-6 text-center">
            <Link 
              href="/login" 
              className="inline-flex items-center text-primary hover:text-primary-focus transition-colors duration-200 text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}