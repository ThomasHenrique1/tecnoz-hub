"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import AdminRoute from "@/components/auth/AdminRoute"

export default function EditarProdutoPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    imagem_url: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Extrair id do caminho /admin/produtos/[id]/editar
  const id = pathname.split("/")[3]

  useEffect(() => {
    const fetchProduto = async () => {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        alert("Produto não encontrado: " + error.message)
        router.push("/admin/produtos")
        return
      }

      setForm({
        nome: data.nome || "",
        descricao: data.descricao || "",
        preco: data.preco ? data.preco.toString() : "",
        estoque: data.estoque ? data.estoque.toString() : "",
        imagem_url: data.imagem_url || "",
      })

      setLoading(false)
    }

    fetchProduto()
  }, [id, router])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.nome || !form.preco) {
      alert("Nome e preço são obrigatórios.")
      return
    }

    setSaving(true)

    const { error } = await supabase
      .from("produtos")
      .update({
        nome: form.nome,
        descricao: form.descricao,
        preco: parseFloat(form.preco),
        estoque: parseInt(form.estoque) || 0,
        imagem_url: form.imagem_url || null,
      })
      .eq("id", id)

    setSaving(false)

    if (error) {
      alert("Erro ao atualizar produto: " + error.message)
    } else {
      alert("Produto atualizado com sucesso!")
      router.push("/admin/produtos")
    }
  }

  if (loading) return <p className="p-4">Carregando dados do produto...</p>

  return (
    <AdminRoute>
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Produto</h1>

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
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {saving ? "Salvando..." : "Atualizar Produto"}
        </button>
      </form>
    </div>
    </AdminRoute>
  )
}
