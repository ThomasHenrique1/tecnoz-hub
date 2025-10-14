"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { createClient } from "@/lib/supabaseClient"
import AdminRoute from "@/components/auth/AdminRoute"
import FormField from "@/components/admin/Produtos/FormField/FormField"
import LoadingSpinner from "@/components/admin/Produtos/LoadingSpinner/LoadingSpinner"

export default function EditarProdutoPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [categorias, setCategorias] = useState([])
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    imagem_url: "",
    categoria: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const id = pathname.split("/")[3]

  // Buscar produto e categorias
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: produto, error: produtoError } = await supabase
          .from("produtos")
          .select("*")
          .eq("id", id)
          .single()

        if (produtoError) {
          alert("Produto não encontrado: " + produtoError.message)
          router.push("/admin/produtos")
          return
        }

        setForm({
          nome: produto.nome || "",
          descricao: produto.descricao || "",
          preco: produto.preco ? produto.preco.toString() : "",
          estoque: produto.estoque ? produto.estoque.toString() : "",
          imagem_url: produto.imagem_url || "",
          categoria: produto.categoria || "",
        })

        const { data: categoriasData, error: categoriasError } = await supabase
          .from("categorias")
          .select("*")
          .order("nome", { ascending: true })

        if (categoriasError) throw categoriasError

        setCategorias(categoriasData)
      } catch (err) {
        console.error("Erro ao carregar dados:", err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, router])


const handleChange = (e) => {
  const { name, value } = e.target;
  
  let cleanedValue = value;
  
  if (name === 'nome' || name === 'descricao') {
    // Remove apenas as pontuações problemáticas
     cleanedValue = value.replace(/[;+@#$%^&*=<>[\]{}|\\]/g, '');
  }
  
  setForm(prev => ({ ...prev, [name]: cleanedValue }));
};

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
        nome: String(form.nome).trim(),
        descricao: String(form.descricao).trim(),
        preco: parseFloat(form.preco),
        estoque: parseInt(form.estoque) || 0,
        imagem_url: form.imagem_url || null,
        categoria: form.categoria,
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner text="Carregando dados do produto..." />
      </div>
    )

  return (
    <AdminRoute>
      <div className="min-h-screen bg-base-200 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary text-primary-content rounded-box shadow-md mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-base-content mb-2">Editar Produto</h1>
            <p className="text-base-content/70">
              Atualizando produto <span className="font-semibold text-primary">#{id}</span>
            </p>
          </div>

          {/* Formulário */}
          <div className="card bg-base-100 border border-base-300 rounded-box shadow-lg overflow-hidden">
            <div className="p-1 bg-primary"></div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              <div className="space-y-5">
                <FormField
                  label="Nome"
                  name="nome"
                  type="text"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  placeholder="Nome do produto"
                  rows={1}
                  maxLength={255} // Aumente conforme necessário
                  />

               <FormField
                label="Descrição"
                name="descricao"
                type="textarea"
                value={form.descricao}
                onChange={handleChange} // Sem validação especial para descrição
                placeholder="Descrição detalhada do produto"
                rows={6}
                maxLength={1000} // Ou mais, conforme necessário
              />

                {/* Categoria */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Categoria</span>
                  </label>
                  <select
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                    required
                    className="select select-bordered w-full"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.nome}>
                        {cat.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    label="Preço (R$)"
                    name="preco"
                    type="number"
                    value={form.preco}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    placeholder="0,00"
                  />

                  <FormField
                    label="Estoque"
                    name="estoque"
                    type="number"
                    value={form.estoque}
                    onChange={handleChange}
                    min="0"
                    placeholder="0"
                  />
                </div>

                <FormField
                  label="URL da Imagem"
                  name="imagem_url"
                  type="url"
                  value={form.imagem_url}
                  onChange={handleChange}
                  placeholder="https://exemplo.com/imagem.jpg"
                  icon="photograph"
                />

                {form.imagem_url && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Preview da Imagem</label>
                    <div className="relative w-80 h-60 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <img
                        src={form.imagem_url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none"
                          e.target.nextElementSibling.style.display = "flex"
                        }}
                      />
                      <div className="absolute inset-0 hidden items-center justify-center bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Botões */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-base-300">
                <button
                  type="button"
                  onClick={() => router.push("/admin/produtos")}
                  disabled={saving}
                  className="btn btn-outline rounded-btn px-6 py-3 min-w-[120px] transition-all duration-200 hover:shadow-md"
                  style={{ borderRadius: "var(--radius-field, 1rem)" }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary rounded-btn px-6 py-3 min-w-[160px] transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                  style={{ borderRadius: "var(--radius-field, 1rem)" }}
                >
                  {saving ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Atualizar Produto
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminRoute>
  )
}
