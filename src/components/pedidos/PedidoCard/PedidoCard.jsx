"use client"

import { motion } from "framer-motion"
import PedidoItem from "@/components/pedidos/PedidoItem/PedidoItem"
import { formatDate } from "@/lib/utils"

export default function PedidoCard({ pedido }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card bg-white shadow-sm hover:shadow-md transition-all duration-300 mb-6 border border-gray-100 rounded-lg overflow-hidden"
    >
      <div className="card-body p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex items-center flex-wrap gap-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Pedido #{pedido.id}
            </h2>
            <span className={`badge ${getStatusBadgeClass(pedido.status)} text-sm font-medium px-3 py-1`}>
              {pedido.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            {formatDate(pedido.criado_em)}
          </p>
        </div>

        <ul className="divide-y divide-gray-100 my-4">
          {pedido.itens.map((item, idx) => (
            <PedidoItem key={idx} item={item} />
          ))}
        </ul>

        <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Total do Pedido</p>
            <p className="text-2xl font-bold text-primary">
              R$ {pedido.total.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function getStatusBadgeClass(status) {
  const baseClass = "badge rounded-full"
  switch (status.toLowerCase()) {
    case "pendente":
      return `${baseClass} bg-amber-100 text-amber-800`
    case "entregue":
      return `${baseClass} bg-green-100 text-green-800`
    case "cancelado":
      return `${baseClass} bg-red-100 text-red-800`
    case "processando":
      return `${baseClass} bg-blue-100 text-blue-800`
    default:
      return `${baseClass} bg-gray-100 text-gray-800`
  }
}