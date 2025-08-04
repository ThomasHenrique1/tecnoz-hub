'use client';

import { useState, useEffect } from 'react';
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);
  const router = useRouter();

  // Verificar se o usuário é admin ao carregar o componente
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push('/login');
          return;
        }

        const { data: usuarioData, error } = await supabase
          .from('usuarios')
          .select('tipo_usuario')
          .eq('auth_id', user.id)
          .single();

        if (error || !usuarioData || usuarioData.tipo_usuario !== 'admin') {
          router.push('/painel');
          return;
        }

        setIsAdmin(true);
      } catch (error) {
        console.error('Erro ao verificar admin:', error);
        router.push('/painel');
      } finally {
        setInitialCheckComplete(true);
      }
    };

    checkAdminStatus();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Verificar tamanho do arquivo (máximo 5MB)
      if (e.target.files[0].size > 5 * 1024 * 1024) {
        alert('O tamanho máximo da imagem é 5MB');
        return;
      }
      setImagemFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Verificação adicional de segurança
      if (!isAdmin) {
        throw new Error('Apenas administradores podem adicionar produtos');
      }

      let imagem_url = null;

      // 1. Upload da imagem
      if (imagemFile) {
        const fileExt = imagemFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `produtos/${fileName}`;

        const { data: { user } } = await supabase.auth.getUser();

        const { error: uploadError } = await supabase.storage
          .from('produtos')
          .upload(filePath, imagemFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: imagemFile.type
          });

        if (uploadError) {
          throw new Error(`Erro no upload da imagem: ${uploadError.message}`);
        }

        // 2. Obter URL pública
        const { data: { publicUrl } } = supabase.storage
          .from('produtos')
          .getPublicUrl(filePath);
        
        imagem_url = publicUrl;
      }

      // 3. Obter ID do usuário atual
      const { data: { user } } = await supabase.auth.getUser();

      // 4. Inserir produto no banco
      const { error } = await supabase.from('produtos').insert([{
        ...formData,
        preco: parseFloat(formData.preco),
        estoque: parseInt(formData.estoque),
        imagem_url,
        criado_em: new Date().toISOString(),
      }]);

      if (error) throw error;

      // Redirecionar e forçar atualização da lista
      router.push('/admin/produtos');
      router.refresh();

    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      alert(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Mostrar loading enquanto verifica permissões
  if (!initialCheckComplete) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  // Se não for admin (mesmo após verificação), não mostrar o formulário
  if (!isAdmin) {
    return null; // O useEffect já redirecionou
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Adicionar Novo Produto</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nome do Produto*</span>
          </label>
          <input
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            maxLength={100}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Descrição*</span>
          </label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
            rows={4}
            className="textarea textarea-bordered w-full"
            maxLength={500}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Preço (R$)*</span>
            </label>
            <input
              name="preco"
              type="number"
              step="0.01"
              min="0"
              value={formData.preco}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Estoque*</span>
            </label>
            <input
              name="estoque"
              type="number"
              min="0"
              value={formData.estoque}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Categoria*</span>
          </label>
          <input
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            maxLength={50}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Imagem do Produto</span>
            <span className="label-text-alt">(Opcional, máximo 5MB)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />
          {imagemFile && (
            <div className="mt-2">
              <span className="text-sm">Arquivo selecionado: {imagemFile.name} ({(imagemFile.size / 1024 / 1024).toFixed(2)} MB)</span>
            </div>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary w-full ${loading ? 'opacity-70' : ''}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-sm"></span>
                Salvando...
              </span>
            ) : (
              'Cadastrar Produto'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}