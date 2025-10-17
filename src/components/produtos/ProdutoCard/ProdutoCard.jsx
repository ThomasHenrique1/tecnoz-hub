import Image from "next/image"
import Link from "next/link"

export default function ProdutoCard({ produto }) {
  return (
    <div className="bg-base-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-base-300 hover:border-primary/20 flex flex-col h-full max-w-sm mx-auto">
      {/* Imagem */}
      <div className="relative aspect-square overflow-hidden bg-base-200 flex-shrink-0">
        <Image
          src={produto.imagem_url?.trim() || "https://via.placeholder.com/400x400?text=Sem+Imagem"}
          alt={produto.nome}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-base-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badge de estoque */}
        {produto.estoque === 0 && (
          <div className="absolute inset-0 bg-base-100/90 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-error text-error-content px-4 py-2 rounded-full font-semibold shadow-lg">
              ESGOTADO
            </div>
          </div>
        )}
        
        {/* Indicador de estoque baixo */}
        {produto.estoque > 0 && produto.estoque <= 5 && (
          <div className="absolute top-4 right-4 bg-warning text-warning-content px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ÚLTIMAS {produto.estoque}
          </div>
        )}
      </div>

      {/* Conteúdo - cresce para ocupar espaço disponível */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Nome do produto */}
        <div className="mb-3">
          <h3 className="font-bold text-xl text-base-content text-center mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight">
            {produto.nome}
          </h3>
        </div>

        {/* Descrição */}
        <div className="mb-4 flex-grow">
          <p className="text-base-content/60 text-sm text-center leading-relaxed line-clamp-3">
            {produto.descricao}
          </p>
        </div>

        {/* Preço e Estoque - em linhas separadas */}
        <div className="space-y-3 mb-6">
          {/* Linha do preço */}
          <div className="text-center">
            <span className="text-3xl font-bold text-primary block">
              R$ {produto.preco.toFixed(2).replace('.', ',')}
            </span>
            <span className="text-xs text-base-content/50 mt-1 block">
              ou em até 12x
            </span>
          </div>

          {/* Linha do estoque */}
          <div className="text-center space-y-3 font-semibold">
            <div className={`badge badge-lg ${
              produto.estoque > 10 ? 'badge-success' :
              produto.estoque > 0 ? 'badge-warning' :
              'badge-error'
            } shadow-sm mx-auto`}>
              {produto.estoque} em estoque
            </div>
          </div>
        </div>

        {/* Botão - fixo na parte inferior */}
        <div className="mt-auto">
          <Link 
            href={`/produtos/${produto.id}`}
            className="btn btn-primary w-full rounded-xl shadow-lg hover:shadow-xl transform group-hover:scale-[1.02] transition-all duration-300 font-semibold gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  )
}