import Link from "next/link"

export default function NavLinks() {
  return (
    <div className="hidden md:flex gap-4 mx-4">
      <Link href="/produtos" className="btn btn-ghost btn-sm hover:bg-base-300 text-base-content">
        Produtos
      </Link>
      <Link href="/pedidos" className="btn btn-ghost btn-sm hover:bg-base-300 text-base-content">
        Pedidos
      </Link>
      <Link href="/sobre" className="btn btn-ghost btn-sm hover:bg-base-300 text-base-content">
        Sobre
      </Link>
    </div>
  )
}