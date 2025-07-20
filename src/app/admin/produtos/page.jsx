"use client"

import AdminRoute from "@/components/auth/AdminRoute"
import ProdutosComponent from "./ProdutosComponent"

export default function AdminProdutosPage() {
  return (
    <AdminRoute>
      <ProdutosComponent />
    </AdminRoute>
  )
}
