import Link from 'next/link'

export default function SuccessMessage() {
  return (
    <div className="max-w-md mx-auto p-4 border border-green-500 rounded text-green-700 text-center">
      <p className="mb-4 font-semibold">Cadastro realizado! Você pode acessar sua conta.</p>
      <Link href="/login" className="btn btn-outline btn-primary">
        Ir para Login
      </Link>
    </div>
  )
}