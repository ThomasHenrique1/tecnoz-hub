import Image from 'next/image'

export default function ProductTableRow({ produto, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-base-200 transition-colors group">
      <td>
        <div className="flex items-center gap-3">
          {produto.imagem_url ? (
            <div className="relative w-10 h-10 rounded-box overflow-hidden bg-base-300 flex-shrink-0">
              <Image
                src={produto.imagem_url}
                alt={produto.nome}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-box bg-base-300 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <div>
            <div className="font-medium text-base-content">{produto.nome}</div>
            <div className="text-sm text-base-content/60 line-clamp-1">{produto.descricao}</div>
          </div>
        </div>
      </td>
      <td>
        <span className="font-semibold text-primary">R$ {produto.preco.toFixed(2).replace('.', ',')}</span>
      </td>
      <td>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          produto.estoque > 10 ? 'bg-success/20 text-success' :
          produto.estoque > 0 ? 'bg-warning/20 text-warning' :
          'bg-error/20 text-error'
        }`}>
          {produto.estoque} em estoque
        </span>
      </td>
      <td>
        <span className="badge badge-outline badge-sm">{produto.categoria || 'Sem categoria'}</span>
      </td>
      <td>
        <div className="flex justify-end gap-2">
          <button
            onClick={onEdit}
            className="btn btn-ghost btn-sm text-primary hover:text-primary-focus hover:bg-primary/10 transition-colors"
            title="Editar produto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="btn btn-ghost btn-sm text-error hover:text-error-focus hover:bg-error/10 transition-colors"
            title="Excluir produto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  )
}