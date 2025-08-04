"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function PerfilPage() {
  const router = useRouter()
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState(null)
  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    telefone: "",
    data_nascimento: "",
  })

  // Buscar dados do usuário autenticado e popular form
  useEffect(() => {
    const fetchPerfil = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        router.push("/login")
        return
      }

      const { data, error: userError } = await supabase
        .from("usuarios")
        .select("*")
        .eq("auth_id", user.id)
        .single()

      if (userError) {
        console.error("Erro ao buscar dados:", userError)
      } else {
        setUsuario(data)
        setForm({
          nome: data.nome || "",
          sobrenome: data.sobrenome || "",
          telefone: data.telefone || "",
          data_nascimento: data.data_nascimento ? data.data_nascimento.slice(0, 10) : "",
        })
      }

      setLoading(false)
    }

    fetchPerfil()
  }, [router])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { error } = await supabase
      .from("usuarios")
      .update({
        nome: form.nome,
        sobrenome: form.sobrenome,
        telefone: form.telefone,
        data_nascimento: form.data_nascimento,
      })
      .eq("auth_id", user.id)

    if (error) {
      alert("Erro ao atualizar dados: " + error.message)
      return
    }

    alert("Perfil atualizado com sucesso!")
    // Atualiza estado local para mostrar novas infos imediatamente
    setUsuario((old) => ({ ...old, ...form }))
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!selectedFile) return alert("Selecione uma imagem!")

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return alert("Erro de autenticação. Faça login novamente.")
    }

    const fileExt = selectedFile.name.split(".").pop()
    const fileName = `${user.id}.${fileExt}`
    const filePath = fileName

    // 1. Upload
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, selectedFile, { upsert: true })

    if (uploadError) {
      console.error("Erro upload:", uploadError)
      return alert("Erro ao enviar imagem.")
    }

    // 2. Gerar URL pública
    const { data: publicData } = supabase.storage.from("avatars").getPublicUrl(filePath)
    const imageUrl = publicData?.publicUrl

    if (!imageUrl) {
      return alert("Erro ao obter URL da imagem.")
    }

    // 3. Atualizar banco
    const { error: updateError } = await supabase
      .from("usuarios")
      .update({ foto_perfil: imageUrl })
      .eq("auth_id", user.id)

    if (updateError) {
      console.error("Erro ao atualizar imagem:", updateError)
      return alert("Erro ao salvar imagem.")
    }

    alert("Imagem enviada com sucesso!")
    setUsuario((old) => ({ ...old, foto_perfil: imageUrl }))
    setSelectedFile(null)
  }

  if (loading) return <p className="p-4">Carregando...</p>
  if (!usuario) return <p className="p-4">Usuário não encontrado.</p>

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Perfil do Usuário</h1>

      {/* Imagem de perfil */}
      {usuario.foto_perfil ? (
        <img
          src={usuario.foto_perfil}
          alt="Foto de perfil"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4 text-3xl">
          👤
        </div>
      )}

      {/* Formulário de edição */}
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
          <label className="block mb-1 font-semibold">Sobrenome</label>
          <input
            type="text"
            name="sobrenome"
            value={form.sobrenome}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Telefone</label>
          <input
            type="tel"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Data de Nascimento</label>
          <input
            type="date"
            name="data_nascimento"
            value={form.data_nascimento}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Salvar Alterações
        </button>
      </form>

      {/* Upload de imagem */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Alterar Foto</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-8 h-8 border border-gray-300 rounded mt-2"
        />
        <button
          onClick={handleUpload}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={!selectedFile}
        >
          Enviar Imagem
        </button>
      </div>
    </div>
  )
}
