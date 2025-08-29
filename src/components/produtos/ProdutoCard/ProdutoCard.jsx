// components/Produtos/ProdutoCard/ProdutoCard.jsx
import Image from "next/image"
import Link from "next/link"

export default function ProdutoCard({ produto }) {
  return (
    <div className="bg-base-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={produto.imagem_url?.trim() || "https://via.placeholder.com/400x400?text=Sem+Imagem"}
          alt={produto.nome}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {produto.estoque === 0 && (
          <div className="absolute inset-0 bg-base-100/80 flex items-center justify-center">
            <span className="badge badge-error badge-lg">ESGOTADO</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-lg text-base-content mb-2 line-clamp-2">
          {produto.nome}
        </h3>
        
        <p className="text-base-content/70 text-sm mb-4 line-clamp-2">
          {produto.descricao}
        </p>
        
        <span className={`w-40 h-5 font-bold p-4 badge ${
          produto.estoque > 10 ? 'badge-success' :
          produto.estoque > 0 ? 'badge-warning' :
          'badge-error'
        }`}>
          {produto.estoque} em estoque
        </span>

        <div className="flex items-center justify-between mb-6 mt-4">
          <span className="text-2xl font-bold text-primary">
            R$ {produto.preco.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <Link 
          href={`/produtos/${produto.id}`}
          className="btn btn-primary btn-outline w-full group-hover:btn-primary transition-all duration-200"
        >
          Ver Detalhes
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}