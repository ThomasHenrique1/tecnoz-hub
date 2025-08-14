import Link from 'next/link'

export default function ErrorMessage({ message, isEmailExists = false }) {
  if (!message) return null
  
  return (
    <div className="alert alert-error mt-4">
      <div>
        <span>{message}</span>
        {isEmailExists && (
          <div className="mt-2">
            <Link href="/recuperar-senha" className="link link-hover text-sm">
              Esqueceu a senha? Clique aqui para redefinir
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}