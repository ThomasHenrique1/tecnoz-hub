'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setErro(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })

    if (error) {
      setErro(error.message)
      return
    }

    // Obtém o ID do usuário logado
    const userId = data.user.id

    // Busca o perfil associado
    const { data: perfil, error: perfilError } = await supabase
      .from('perfis')
      .select('role')
      .eq('id', userId)
      .single()

    if (perfilError) {
      setErro('Erro ao buscar perfil.')
      return
    }

    // Redireciona com base no role
    if (perfil.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/painel')
    }
  }

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center">Login</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="input input-bordered w-full"
      />
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha"
        required
        className="input input-bordered w-full"
      />
      

      {erro && <p className="text-red-500 text-sm">{erro}</p>}

        <p>
          Não tem conta?{' '}
          <Link href="/signup" className="text-blue-500 underline">
            Cadastre-se
          </Link>
        </p>

      <button type="submit" className="btn btn-primary w-full">
        Entrar
      </button>
    </form>
  )
}
