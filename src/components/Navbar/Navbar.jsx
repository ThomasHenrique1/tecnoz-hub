"use client"
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="w-full px-4 py-2 border-b">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">tecnozhub</Link>
        <div className="flex gap-4">
          <Link href="/produtos">Produtos</Link>
          <Link href="/painel">Painel</Link>
          <Link href="/login">Login</Link>
        </div>
      </nav>
    </div>
  )
}
