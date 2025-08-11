import Link from "next/link"

export default function EmptyCart() {
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h2 className="mt-4 text-xl font-bold text-gray-900">
          Seu carrinho está vazio
        </h2>
        <p className="mt-2 text-gray-600">
          Adicione produtos para começar a comprar
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