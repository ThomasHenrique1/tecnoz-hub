'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function SignupForm() {
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
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.senha,
    })

    if (signUpError) {
      setErro(signUpError.message)
      setLoading(false)
      return
    }

    const userId = data?.user?.id

    const { error: insertError } = await supabase.from('usuarios').insert([
      {
        auth_id: userId,
        nome: formData.nome,
        sobrenome: formData.sobrenome,
        telefone: formData.telefone,
        email: formData.email,
        data_nascimento: formData.data_nascimento,
        tipo_usuario: 'usuario',
      },
    ])

    if (insertError) {
      setErro(insertError.message || 'Erro ao salvar os dados adicionais.')
      setLoading(false)
      return
    }

    setLoading(false)
    setSucesso(true)
  }

  return (
    <>
      {!sucesso ? (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <input name="nome" type="text" placeholder="Nome" onChange={handleChange} required className="input input-bordered w-full" />
          <input name="sobrenome" type="text" placeholder="Sobrenome" onChange={handleChange} required className="input input-bordered w-full" />
          <input name="telefone" type="tel" placeholder="Telefone" onChange={handleChange} required className="input input-bordered w-full" />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="input input-bordered w-full" />
          <input name="senha" type="password" placeholder="Senha" onChange={handleChange} required className="input input-bordered w-full" />
          <input name="confirmarSenha" type="password" placeholder="Confirmar Senha" onChange={handleChange} required className="input input-bordered w-full" />
          <input name="data_nascimento" type="date" onChange={handleChange} required className="input input-bordered w-full" />

          {erro && <p className="text-red-500">{erro}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      ) : (
        <div className="max-w-md mx-auto p-4 border border-green-500 rounded text-green-700 text-center">
          <p className="mb-4 font-semibold">Cadastro realizado! Você pode acessar sua conta.</p>
          {/* Opcional: botão para ir ao login */}
          <a href="/login" className="btn btn-outline btn-primary">
            Ir para Login
          </a>
        </div>
      )}
    </>
  )
}
