'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import SubmitButton from '../SignUp/SubmitButton/SubmitButton'
import ErrorMessage from '../SignUp/ErrorMessage/ErrorMessage'
import SuccessMessage from '../SignUp/SuccessMessage/SuccessMessage'
import FormInput from '../SignUp/FormInput/FormInput'
import { BackgroundParticles } from '../ui/BackgroundParticles'

export default function SignupPage() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center p-2 relative overflow-hidden bg-base-100">
      <BackgroundParticles />
      <div className="glass-card w-full max-w-md md:max-w-2xl rounded-lg md:rounded-2xl relative z-10 overflow-hidden mx-2">
        <div className="bg-gradient-to-r from-primary to-primary-focus text-white p-6 md:p-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            {registrationSuccess ? 'Cadastro Concluído!' : 'Crie sua conta'}
          </h1>
          <p className="mt-1 md:mt-2 text-sm md:text-base opacity-90">
            {registrationSuccess ? 'Verifique seu e-mail para confirmar' : 'Preencha seus dados para começar'}
          </p>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          {registrationSuccess ? (
            <SuccessMessage 
              show={true}
              message="Cadastro realizado com sucesso!"
              description="Verifique seu e-mail para confirmar sua conta."
              redirectUrl="/login"
              redirectText="Ir para Login"
              autoRedirect={true} 
            />
          ) : (
            <>
              <SignupForm onSuccess={() => setRegistrationSuccess(true)} />
              
              <div className="divider my-6 md:my-8 text-xs md:text-sm before:bg-base-content/20 after:bg-base-content/20">
                OU
              </div>
              
              <div className="text-center text-xs md:text-sm text-base-content/70">
                Já tem uma conta?{' '}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Faça login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function SignupForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    data_nascimento: '',
  })

  const [erro, setErro] = useState('')
  const [emailExists, setEmailExists] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (name === 'email' && emailExists) {
      setEmailExists(false)
      setErro('')
    }
  }

  const checkEmailExists = async (email) => {
    const { data } = await supabase
      .from('usuarios')
      .select('email')
      .eq('email', email)
      .maybeSingle()
    return !!data
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setLoading(true)

    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas não coincidem.')
      setLoading(false)
      return
    }

    try {
      const emailAlreadyExists = await checkEmailExists(formData.email)
      if (emailAlreadyExists) {
        setErro('Este e-mail já está cadastrado.')
        setEmailExists(true)
        setLoading(false)
        return
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.senha,
        options: {
          data: {
            nome: formData.nome,
            sobrenome: formData.sobrenome
          }
        }
      })

      if (signUpError) throw signUpError

      const { error: insertError } = await supabase.from('usuarios').insert([{
        auth_id: data.user?.id,
        nome: formData.nome,
        sobrenome: formData.sobrenome,
        telefone: formData.telefone,
        email: formData.email,
        data_nascimento: formData.data_nascimento,
        tipo_usuario: 'usuario',
      }])

      if (insertError) throw insertError

      onSuccess()
    } catch (error) {
      setErro(error.message || 'Ocorreu um erro durante o cadastro.')
      setEmailExists(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
        <FormInput 
          name="nome"
          type="text"
          label="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
          icon="user"
        />
        <FormInput 
          name="sobrenome"
          type="text"
          label="Sobrenome"
          value={formData.sobrenome}
          onChange={handleChange}
          required
          icon="user"
        />
      </div>

      <FormInput 
        name="email"
        type="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        required
        icon="envelope"
        error={emailExists}
      />

      <FormInput 
        name="telefone"
        type="tel"
        label="Telefone"
        value={formData.telefone}
        onChange={handleChange}
        required
        icon="phone"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
        <FormInput 
          name="senha"
          type="password"
          label="Senha"
          value={formData.senha}
          onChange={handleChange}
          required
          icon="lock"
        />
        <FormInput 
          name="confirmarSenha"
          type="password"
          label="Confirmar Senha"
          value={formData.confirmarSenha}
          onChange={handleChange}
          required
          icon="lock"
        />
      </div>

      <FormInput 
        name="data_nascimento"
        type="date"
        label="Data de Nascimento"
        value={formData.data_nascimento}
        onChange={handleChange}
        required
        icon="calendar"
      />

      <ErrorMessage message={erro} />

      <SubmitButton loading={loading} className="mt-2">
        Criar conta
      </SubmitButton>
      
      <div className="text-xs text-base-content/60 mt-3 md:mt-4">
        Ao se cadastrar, você concorda com nossos{' '}
        <Link href="/termos" className="text-primary font-medium hover:underline">
          Termos de Serviço
        </Link>{' '}
        e{' '}
        <Link href="/privacidade" className="text-primary font-medium hover:underline">
          Política de Privacidade
        </Link>
      </div>
    </form>
  )
}


