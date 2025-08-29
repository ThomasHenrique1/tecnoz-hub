import ProdutoCard from "@/components/produtos/ProdutoCard/ProdutoCard"

export default function ProdutosGrid({ categoriaSelecionada, produtos }) {
  return (
    <section className="lg:w-3/4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-base-content">
          {categoriaSelecionada === "Todas" ? "Todos os Produtos" : categoriaSelecionada}
        </h2>
        <span className="badge badge-primary badge-lg">
          {produtos.length} itens
        </span>
      </div>

      {produtos.length === 0 ? (
        <div className="text-center py-16 bg-base-200 rounded-2xl">
          <svg className="w-16 h-16 text-base-content/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 9h6m-6 4h6m-6 4h6" />
          </svg>
          <p className="text-base-content/60 text-lg">Nenhum produto encontrado</p>
          <p className="text-base-content/40 mt-2">Tente selecionar outra categoria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </section>
  )
}