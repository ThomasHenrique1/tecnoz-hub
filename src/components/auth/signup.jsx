'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    setCarregando(false);

    if (error) {
      setErro(error.message);
    } else {
      // O usuário precisa verificar o e-mail (padrão Supabase)
      alert('Cadastro realizado! Verifique seu e-mail para confirmar.');
      router.push('/login');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Cadastro</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br/>
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      /><br/>
      <button type="submit" disabled={carregando}>
        {carregando ? 'Cadastrando...' : 'Cadastrar'}
      </button>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </form>
  );
}
