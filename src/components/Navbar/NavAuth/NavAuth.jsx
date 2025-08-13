import Link from "next/link"

export default function NavAuth({ user }) {
  if (user) return null

  return (
    <div className="flex items-center gap-3">
      <Link 
        href="/login" 
        className="btn btn-primary btn-sm sm:btn-md px-4 sm:px-6 
                   rounded-full transition-all duration-200 
                   hover:shadow-lg hover:-translate-y-0.5
                   focus:outline-none focus:ring-2 focus:ring-primary/50
                   active:translate-y-0"
      >
        Entrar
      </Link>
      <Link 
        href="/signup" 
        className="btn btn-outline btn-sm sm:btn-md px-4 sm:px-6 
                   rounded-full border-2 transition-all duration-200 
                   hover:bg-base-200 hover:shadow-lg hover:-translate-y-0.5
                   focus:outline-none focus:ring-2 focus:ring-primary/50
                   active:translate-y-0 hidden sm:inline-flex"
      >
        Cadastrar
      </Link>
    </div>
  )
}