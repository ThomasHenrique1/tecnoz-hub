"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import AdminRoute from "@/components/auth/AdminRoute"

export default function NovoProdutoPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    imagem_url: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação simples
    if (!form.nome || !form.preco) {
      alert("Nome e preço são obrigatórios.")
      return
    }

    setLoading(true)

    const { error } = await supabase.from("produtos").insert([
      {
        nome: form.nome,
        descricao: form.descricao,
        preco: parseFloat(form.preco),
        estoque: parseInt(form.estoque) || 0,
        imagem_url: form.imagem_url || null,
      },
    ])

    setLoading(false)

    if (error) {
      alert("Erro ao criar produto: " + error.message)
    } else {
      alert("Produto criado com sucesso!")
      router.push("/admin/produtos")
    }
  }

  return (
    <AdminRoute>
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Novo Produto</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Preço (R$)</label>
          <input
            type="number"
            step="0.01"
            name="preco"
            value={form.preco}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Estoque</label>
          <input
            type="number"
            name="estoque"
            value={form.estoque}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            min={0}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">URL da Imagem</label>
          <input
            type="text"
            name="imagem_url"
            value={form.imagem_url}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? "Salvando..." : "Criar Produto"}
        </button>
      </form>
    </div>
    </AdminRoute>
  )
}
