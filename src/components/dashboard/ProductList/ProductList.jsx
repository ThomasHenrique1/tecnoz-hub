import AddToCartButton from "@/components/produtos/AddToCartButton"

export default function ProductList({ produtos }) {
  if (produtos.length === 0) {
    return (
      <div className="alert alert-info shadow-lg">
        <span>Nenhum produto disponível no momento.</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {produtos.map((produto) => (
        <div
          key={produto.id}
          className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
        >
          <figure className="px-4 pt-4">
            <img
              src={produto.imagem_url || "/placeholder-product.jpg"}
              alt={produto.nome}
              className="rounded-xl h-40 w-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h3 className="card-title">{produto.nome}</h3>
            <p className="text-gray-600 line-clamp-2">{produto.descricao}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xl font-bold text-primary">
                R$ {produto.preco.toFixed(2)}
              </span>
              <AddToCartButton produtoId={produto.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}