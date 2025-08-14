import Link from "next/link"

export default function EmptyPedidos() {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h2 className="mt-4 text-xl font-bold text-gray-900">
          Nenhum pedido encontrado
        </h2>
        <p className="mt-2 text-gray-600">
          Seus pedidos aparecerão aqui quando você fizer compras
        </p>
        <Link
          href="/produtos"
          className="btn btn-primary mt-6"
        >
          Ver produtos
        </Link>
      </div>
    </div>
  )
}