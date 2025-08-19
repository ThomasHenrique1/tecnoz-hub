// /app/admin/page.jsx
'use client'

import AdminRoute from '@/components/auth/AdminRoute'
import { BackgroundParticles } from '@/components/ui/BackgroundParticles'
import Link from 'next/link'
import AdminCard from '@/components/admin/AdminCard/AdminCard'

export default function AdminDashboard() {
  const cards = [
    {
      title: "Produtos",
      description: "Gerencie seu catálogo de produtos",
      href: "/admin/produtos"
    },
    {
      title: "Usuários",
      description: "Administre os usuários do sistema",
      href: "/admin/usuarios"
    },
    {
      title: "Pedidos",
      description: "Acompanhe todos os pedidos",
      href: "/admin/pedidos"
    }
  ]
  return (
    <AdminRoute>
      <BackgroundParticles />
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            Painel Administrativo
          </h1>
          <p className="text-base-content/70 mt-2">
            Gerencie todas as áreas do seu e-commerce
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((card, index) => (
            <AdminCard
              key={index}
              title={card.title}
              description={card.description}
              href={card.href}
            />
          ))}
        </div>
      </div>
    </AdminRoute>
  )
}