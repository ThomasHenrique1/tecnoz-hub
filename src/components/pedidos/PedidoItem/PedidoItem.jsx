import Link from "next/link"
import Image from "next/image"

export default function PedidoItem({ item }) {
  return (
    <li className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-box border border-base-300 bg-base-100/50 transition-all duration-300 hover:bg-base-200/30">
      {/* Imagem responsiva */}
      <div className="relative w-full sm:w-40 md:w-48 lg:w-56 h-40 sm:h-40 md:h-44 lg:h-48 flex-shrink-0 rounded-box overflow-hidden border border-base-300 bg-base-200/50 self-center sm:self-auto">
        <Image
          src={item.produto.imagem_url || "/placeholder-product.jpg"}
          alt={item.produto.nome}
          fill
          className="object-cover transition-opacity opacity-0 duration-500"
          onLoadingComplete={(image) => {
            image.classList.remove("opacity-0")
            image.classList.add("opacity-100")
          }}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 40vw, (max-width: 1024px) 30vw, 256px"
          quality={85}
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9IiNGNUY1RjUiLz48L3N2Zz4="
        />
      </div>
      
      {/* Conteúdo */}
      <div className="flex-1 min-w-0 w-full">
        <Link 
          href={`/produtos/${item.produto.id}`} 
          className="font-semibold text-lg md:text-xl text-base-content hover:text-primary transition-colors duration-300 line-clamp-2 hover:underline underline-offset-2"
          title={item.produto.nome}
        >
          {item.produto.nome}
        </Link>
        
        {/* Informações adicionais em layout responsivo */}
        <div className="mt-3 md:mt-4 space-y-2 md:space-y-3">
          <div className="flex flex-wrap gap-2 md:gap-3 items-center">
            <span className="badge badge-outline text-sm md:text-base py-1.5 px-3">
              Quantidade: {item.quantidade}
            </span>
            <span className="badge badge-ghost text-sm md:text-base py-1.5 px-3">
              Unidade
            </span>
          </div>
          
          <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 md:gap-4 pt-2 md:pt-3 border-t border-base-300/50">
            <div className="text-sm md:text-base text-base-content/70">
              Subtotal: <span className="font-medium text-base-content">R$ {(item.preco_unitario * item.quantidade).toFixed(2).replace('.', ',')}</span>
            </div>
            <span className="text-lg md:text-xl font-bold text-primary">
              R$ {item.preco_unitario.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      </div>
    </li>
  )
}