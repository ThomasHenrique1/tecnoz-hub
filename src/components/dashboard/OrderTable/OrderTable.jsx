export default function OrderTable({ pedidos }) {
  if (pedidos.length === 0) {
    return (
      <div className="alert alert-info shadow-lg">
        <span>Você ainda não fez pedidos.</span>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Data</th>
            <th>Status</th>
            <th className="text-right">Total (R$)</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id} className="hover">
              <td>{pedido.id}</td>
              <td>
                {new Date(pedido.data_criacao).toLocaleDateString("pt-BR")}
              </td>
              <td>
                <span className={`badge ${getStatusBadgeClass(pedido.status)}`}>
                  {pedido.status}
                </span>
              </td>
              <td className="text-right">{pedido.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function getStatusBadgeClass(status) {
  switch (status.toLowerCase()) {
    case "pendente":
      return "badge-warning"
    case "entregue":
      return "badge-success"
    case "cancelado":
      return "badge-error"
    default:
      return "badge-info"
  }
}