'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export default function NovoProduto() {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    estoque: '',
    categoria: '',
  });
  const [imagemFile, setImagemFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImagemFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imagem_url = null;

    // 1. Upload da imagem
    if (imagemFile) {
      const fileExt = imagemFile.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('produtos')
        .upload(filePath, imagemFile);

      if (uploadError) {
        alert('Erro ao fazer upload da imagem');
        console.error(uploadError);
        setLoading(false);
        return;
      }

      // 2. Obter URL pública
      const { data } = supabase.storage.from('produtos').getPublicUrl(filePath);
      imagem_url = data.publicUrl;
    }

    // 3. Inserir produto no banco
    const { error } = await supabase.from('produtos').insert([
      {
        ...formData,
        preco: parseFloat(formData.preco),
        estoque: parseInt(formData.estoque),
        imagem_url,
      },
    ]);

    if (error) {
      alert('Erro ao salvar produto');
      console.error(error);
    } else {
      router.push('/admin/produtos');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Novo Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nome" placeholder="Nome" onChange={handleChange} required className="input input-bordered w-full" />
        <textarea name="descricao" placeholder="Descrição" onChange={handleChange} required className="textarea textarea-bordered w-full" />
        <input name="preco" type="number" step="0.01" placeholder="Preço" onChange={handleChange} required className="input input-bordered w-full" />
        <input name="estoque" type="number" placeholder="Estoque" onChange={handleChange} required className="input input-bordered w-full" />
        <input name="categoria" placeholder="Categoria" onChange={handleChange} required className="input input-bordered w-full" />
        <input type="file" accept="image/*" onChange={handleFileChange} className="file-input w-full" />
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? 'Salvando...' : 'Cadastrar Produto'}
        </button>
      </form>
    </div>
  );
}
