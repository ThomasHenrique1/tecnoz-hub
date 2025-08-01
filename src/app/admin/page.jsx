// /app/admin/page.jsx
'use client'

import AdminRoute from '@/components/auth/AdminRoute'
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <AdminRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Produtos */}
          <Link href="/admin/produtos" className="card bg-base-200 hover:bg-base-300 transition-colors">
            <div className="card-body">
              <h2 className="card-title">Produtos</h2>
              <p>Gerenciar catálogo de produtos</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-primary">Acessar</button>
              </div>
            </div>
          </Link>

          {/* Card Usuários */}
          <Link href="/admin/usuarios" className="card bg-base-200 hover:bg-base-300 transition-colors">
            <div className="card-body">
              <h2 className="card-title">Usuários</h2>
              <p>Gerenciar usuários do sistema</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-primary">Acessar</button>
              </div>
            </div>
          </Link>

          {/* Card Pedidos */}
          <Link href="/admin/pedidos" className="card bg-base-200 hover:bg-base-300 transition-colors">
            <div className="card-body">
              <h2 className="card-title">Pedidos</h2>
              <p>Visualizar pedidos realizados</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-primary">Acessar</button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AdminRoute>
  )
}