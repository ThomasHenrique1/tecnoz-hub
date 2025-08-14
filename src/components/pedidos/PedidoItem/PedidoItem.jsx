import Link from "next/link"
import Image from "next/image"

export default function PedidoItem({ item }) {
  return (
    <li className="flex items-start gap-6 py-4">
      <div className="relative w-64 h-64 flex-shrink-0 rounded-box overflow-hidden border-2 border-base-200 bg-base-200/50">
        <Image
          src={item.produto.imagem_url || "/placeholder-product.jpg"}
          alt={item.produto.nome}
          fill
          className="object-cover transition-opacity opacity-0 duration-300"
          onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          sizes="(max-width: 768px) 100vw, 256px"
          quality={90}
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9IiNGNUY1RjUiLz48L3N2Zz4="
        />
      </div>
      
      <div className="flex-1 min-w-0 self-center">
        <Link 
          href={`/produtos/${item.produto.id}`} 
          className="font-medium text-lg text-base-content hover:text-primary transition-colors duration-200 line-clamp-2"
          title={item.produto.nome}
        >
          {item.produto.nome}
        </Link>
        <div className="flex justify-between items-center mt-3">
          <span className="text-base text-base-content/80">
            Quantidade: {item.quantidade}
          </span>
          <span className="text-base font-semibold text-primary">
            R$ {item.preco_unitario.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>
    </li>
  )
}