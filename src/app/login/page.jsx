import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <p className="text-center mb-4">Faça login para acessar sua conta</p>
      {/* Renderiza o formulário de login */}
      <LoginForm />
    </div>
  )
}
