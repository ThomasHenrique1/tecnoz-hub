'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import FormInput from '@/components/SignUp/FormInput/FormInput'
import SuccessMessage from '@/components/SignUp/SuccessMessage/SuccessMessage'
import ErrorMessage from '@/components/SignUp/ErrorMessage/ErrorMessage'
import SubmitButton from '@/components/SignUp/SubmitButton/SubmitButton'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-base-100 rounded-xl shadow-2xl overflow-hidden">
        {/* Cabeçalho */}
        <div className="bg-primary text-primary-content p-6 text-center">
          <h1 className="text-3xl font-bold">Cadastro</h1>
          <p className="mt-2 opacity-90">Preencha seus dados para se cadastrar</p>
        </div>

        {/* Corpo do formulário */}
        <div className="p-6 sm:p-8">
          <SignupForm />
          
          <div className="divider my-6">OU</div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-base-content/70">
              Já tem uma conta?{' '}
              <Link href="/login" className="link link-primary font-medium">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SignupForm() {
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
  const [sucesso, setSucesso] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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

      setSucesso(true)
    } catch (error) {
      setErro(error.message || 'Ocorreu um erro durante o cadastro.')
      setEmailExists(false)
    } finally {
      setLoading(false)
    }
  }

  if (sucesso) return <SuccessMessage />

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput 
          name="nome"
          type="text"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <FormInput 
          name="sobrenome"
          type="text"
          placeholder="Sobrenome"
          value={formData.sobrenome}
          onChange={handleChange}
          required
        />
      </div>

      <FormInput 
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <FormInput 
        name="telefone"
        type="tel"
        placeholder="Telefone"
        value={formData.telefone}
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput 
          name="senha"
          type="password"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />
        <FormInput 
          name="confirmarSenha"
          type="password"
          placeholder="Confirmar Senha"
          value={formData.confirmarSenha}
          onChange={handleChange}
          required
        />
      </div>

      <FormInput 
        name="data_nascimento"
        type="date"
        label="Data de Nascimento"
        value={formData.data_nascimento}
        onChange={handleChange}
        required
      />

      <ErrorMessage message={erro} isEmailExists={emailExists} />
      
      <SubmitButton loading={loading} className="mt-6" />
      
      <div className="text-xs text-base-content/60 mt-4">
        Ao se cadastrar, você concorda com nossos{' '}
        <Link href="/termos" className="link link-primary">
          Termos de Serviço
        </Link>{' '}
        e{' '}
        <Link href="/privacidade" className="link link-primary">
          Política de Privacidade
        </Link>
      </div>
    </form>
  )
}