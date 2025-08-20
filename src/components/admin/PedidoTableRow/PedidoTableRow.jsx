// components/admin/PedidoTableRow.jsx
'use client'

import Image from 'next/image'

export default function PedidoTableRow({ pedido }) {
  const formatarData = (dataString) => {
    return new Date(dataString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor || 0)
  }

  const statusClasses = {
    entregue: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800',
    pendente: 'bg-yellow-100 text-yellow-800',
    processando: 'bg-blue-100 text-blue-800'
  }

  return (
    <tr className="hover:bg-base-200 transition-colors">
      <td className="py-4 px-4 font-medium">{pedido.id.split('-')[0]}</td>
      <td className="py-4 px-4 whitespace-nowrap">{formatarData(pedido.criado_em)}</td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          {pedido.usuario.foto_perfil ? (
            <div className="avatar">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={pedido.usuario.foto_perfil}
                  alt={pedido.usuario.nome}
                  width={40}
                  height={40}
                  className="object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-10">
                <span className="text-xs">
                  {pedido.usuario.nome.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}
          <div>
            <div className="font-medium">{pedido.usuario.nome}</div>
            <div className="text-sm text-base-content/70">
              {pedido.usuario.auth_id?.substring(0, 8)}...
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusClasses[pedido.status] || 'bg-gray-100 text-gray-800'
        }`}>
          {pedido.status}
        </span>
      </td>
      <td className="py-4 px-4 font-medium">{formatarMoeda(pedido.total)}</td>
    </tr>
  )
}