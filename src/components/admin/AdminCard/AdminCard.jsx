// components/admin/AdminCard.jsx
'use client'

import Link from 'next/link'
import { FiPackage, FiUsers, FiShoppingBag } from 'react-icons/fi'

const iconComponents = {
  produtos: <FiPackage className="text-xl" />,
  usuarios: <FiUsers className="text-xl" />,
  pedidos: <FiShoppingBag className="text-xl" />
}

export default function AdminCard({ title, description, href }) {
  const iconKey = href.split('/')[2] // Extrai 'produtos', 'usuarios' ou 'pedidos'
  const icon = iconComponents[iconKey] || <FiPackage className="text-xl" />

  return (
    <Link 
      href={href}
      className="card bg-base-200 hover:bg-base-300 transition-all duration-300 border border-base-300 hover:border-primary/20"
    >
      <div className="card-body">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div>
            <h2 className="card-title text-lg font-semibold">{title}</h2>
            <p className="text-base-content/70 text-sm">{description}</p>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-sm btn-primary">
            Acessar
          </button>
        </div>
      </div>
    </Link>
  )
}