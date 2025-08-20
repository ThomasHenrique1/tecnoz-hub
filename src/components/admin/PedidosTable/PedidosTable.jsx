// components/admin/PedidosTable.jsx
'use client'

import PedidoTableRow from '@/components/admin/PedidoTableRow/PedidoTableRow'

export default function PedidosTable({ pedidos }) {
  return (
    <div className="overflow-hidden rounded-lg border border-base-300 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-base-300">
          <thead className="bg-base-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider">
                Data
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-base-100 divide-y divide-base-300">
            {pedidos.map((pedido) => (
              <PedidoTableRow key={pedido.id} pedido={pedido} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}