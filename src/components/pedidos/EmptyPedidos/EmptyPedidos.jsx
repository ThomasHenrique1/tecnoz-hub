import Link from "next/link"

export default function EmptyPedidos() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] px-4">
      <div className="max-w-md mx-auto text-center">
        {/* Ícone */}
        <div className="mb-6 flex justify-center">
          <div className="p-4 rounded-full bg-base-200">
            <svg
              className="h-12 w-12 text-base-content/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
        </div>
        
        {/* Texto */}
        <h2 className="text-2xl font-bold text-base-content mb-3">
          Nenhum pedido encontrado
        </h2>
        <p className="text-base-content/70 mb-8 max-w-xs mx-auto">
          Seus pedidos aparecerão aqui quando você fizer compras em nossa loja
        </p>
        
        {/* Botão */}
        <Link
          href="/produtos"
          className="btn btn-primary rounded-btn px-8 py-3 text-lg font-medium"
          style={{ borderRadius: 'var(--radius-field, 2rem)' }}
        >
          Explorar Produtos
        </Link>
        
        {/* Sugestão adicional */}
        <p className="mt-8 text-sm text-base-content/50">
          Ou <Link href="/" className="link link-primary link-hover">voltar para a página inicial</Link>
        </p>
      </div>
    </div>
  )
}