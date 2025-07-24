// src/components/produtos/ProdutoDetalhes.jsx

"use client"

export default function ProdutoDetalhes({ produto }) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <img
        src={
          produto.imagem_url?.trim()
            ? produto.imagem_url
            : "https://via.placeholder.com/300x300?text=Sem+Imagem"
        }
        alt={produto.nome}
        className=" md:w-50 h-80 object-cover rounded border"
      />

      <div>
        <h1 className="text-3xl font-bold">{produto.nome}</h1>
        <p className="text-gray-600 mt-2">{produto.descricao}</p>

        <p className="mt-4 text-lg text-green-700 font-semibold">
          R$ {produto.preco.toFixed(2)}
        </p>

        <p className="text-sm text-gray-500 mt-1">Estoque: {produto.estoque}</p>
        <p className="text-sm text-gray-500">Categoria: {produto.categoria}</p>

        <p className="text-xs text-gray-400 mt-4">
          Adicionado em: {new Date(produto.criado_em).toLocaleDateString()}
        </p>

        <button
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => alert("Produto adicionado ao carrinho (em breve funcional!)")}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}
