"use client"

import { motion } from "framer-motion"
import PedidoItem from "@/components/pedidos/PedidoItem/PedidoItem"
import { formatDate } from "@/lib/utils"


export default function PedidoCard({ pedido }) {
  const status = getUpdatedStatus(pedido.status, pedido.criado_em)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card bg-base-100 shadow-sm hover:shadow-md transition-all duration-300 mb-6 border border-base-300 rounded-box overflow-hidden"
      style={{ borderRadius: 'var(--radius-box, 1rem)' }}
    >
      <div className="card-body p-4 sm:p-5 md:p-6">
       
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-base-content">
              Pedido #{pedido.id}
            </h2>
            <span className={`badge badge-lg ${getStatusBadgeClass(status)}`}>
              {status}
            </span>
          </div>
          <p className=" text-sm md:text-base text-base-content/70 mt-1 sm:mt-0 text-right w-full sm:w-auto font-bold">
            {formatDate(pedido.criado_em)}
          </p>
        </div>

        {/* Lista de itens */}
        <ul className="space-y-4 my-4">
          {pedido.itens.map((item, idx) => (
            <PedidoItem key={idx} item={item} />
          ))}
        </ul>

        {/* Rodapé com total */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 pt-5 border-t border-base-300">
          <div className="text-base-content/70 text-sm md:text-base">
            <span className="block sm:inline-block">Pedido realizado em  </span>
            <span className="font-medium"> {formatDate(pedido.criado_em, true)}</span>
          </div>
          <div className="text-right ml-auto">
            <p className="text-sm md:text-base text-base-content/70 mb-1">Total do Pedido</p>
            <p className="text-2xl md:text-3xl font-bold text-primary">
              R$ {pedido.total.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Atualiza status se passaram 2 dias sem pagamento
function getUpdatedStatus(status, criadoEm) {
  if (status.toLowerCase() !== "pendente") return status

  const criado = new Date(criadoEm)
  const agora = new Date()
  const diffMs = agora - criado
  const diffDias = diffMs / (1000 * 60 * 60 * 24)

  if (diffDias >= 2) return "cancelado"

  return status
}

function getStatusBadgeClass(status) {
  const baseClass = "rounded-btn capitalize"
  switch (status.toLowerCase()) {
    case "pendente":
      return `${baseClass} badge-warning`
    case "entregue":
      return `${baseClass} badge-success`
    case "cancelado":
      return `${baseClass} badge-error`
    case "processando":
      return `${baseClass} badge-info`
    case "enviado":
      return `${baseClass} badge-primary`
    default:
      return `${baseClass} badge-neutral`
  }
}
