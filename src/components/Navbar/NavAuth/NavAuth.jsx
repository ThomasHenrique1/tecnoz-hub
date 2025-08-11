import Link from "next/link"

export default function NavAuth({ user }) {
  if (user) return null

  return (
    <div className="flex gap-2">
      <Link href="/login" className="btn btn-primary btn-sm px-3">
        Entrar
      </Link>
      <Link href="/cadastro" className="btn btn-outline btn-sm px-3 hidden sm:inline-flex">
        Cadastrar
      </Link>
    </div>
  )
}