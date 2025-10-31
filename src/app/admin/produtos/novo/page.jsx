'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import AdminRoute from '@/components/auth/AdminRoute';
import FormField from '@/components/admin/Produtos/FormField/FormField';
import FileUpload from '@/components/admin/Produtos/FileUpload/FileUpload';
import LoadingSpinner from '@/components/admin/Produtos/LoadingSpinner/LoadingSpinner';




export default function NovoProduto() {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    estoque: '',
    categoria: '',
  });
  const [categorias, setCategorias] = useState([]);
  const [imagemFile, setImagemFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);
  const router = useRouter();
  const supabase = createClient();

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
          router.push('/');
          return;
        }

        setIsAdmin(true);
      } catch (error) {
        console.error('Erro ao verificar admin:', error);
        router.push('/');
      } finally {
        setInitialCheckComplete(true);
      }
    };

    checkAdminStatus();
  }, [router]);

  // Buscar categorias do Supabase
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const { data, error } = await supabase
          .from("categorias")
          .select("*")
          .order("nome", { ascending: true });

        if (error) throw error;
        setCategorias(data);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err.message);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let cleanedValue = value;
    
    if (name === 'nome' || name === 'descricao') {
      // Remove apenas as pontuações problemáticas
      cleanedValue = value.replace(/[;+@#$%^&*=<>[\]{}|\\]/g, '');
    }
    
    setFormData(prev => ({ ...prev, [name]: cleanedValue }));
  };

  const handleFileChange = (file) => {
    setImagemFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isAdmin) {
        throw new Error('Apenas administradores podem adicionar produtos');
      }

      let imagem_url = null;

      if (imagemFile) {
        const fileExt = imagemFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `produtos/${fileName}`;

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

        const { data: { publicUrl } } = supabase.storage
          .from('produtos')
          .getPublicUrl(filePath);
        
        imagem_url = publicUrl;
      }
        const { error } = await supabase.from('produtos').insert([{
          nome: String(formData.nome).trim(),
          descricao: String(formData.descricao).trim(),
          preco: parseFloat(formData.preco),
          estoque: parseInt(formData.estoque),
          categoria: formData.categoria,
          imagem_url,
          criado_em: new Date().toISOString(),
        }]);

      if (error) throw error;

      router.push('/admin/produtos');
      router.refresh();

    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      alert(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!initialCheckComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <LoadingSpinner text="Verificando permissões de acesso..." />
      </div>
    );
  }

  return (
    <AdminRoute>
      <div className="min-h-screen bg-base-200 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary text-primary-content rounded-box shadow-md mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-base-content mb-2">Adicionar Novo Produto</h1>
            <p className="text-base-content/70">Preencha os detalhes do novo produto</p>
          </div>

          <div className="card bg-base-100 border border-base-300 rounded-box shadow-lg overflow-hidden">
            <div className="p-1 bg-primary"></div>
            
            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              <div className="space-y-5">
                <FormField
                  label="Nome do Produto"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  placeholder="Digite o nome do produto"
                  maxLength={500}
                />

                <FormField
                  label="Descrição"
                  name="descricao"
                  type="textarea"
                  value={formData.descricao}
                  onChange={handleChange}
                  required
                  placeholder="Descreva o produto em detalhes..."
                  maxLength={1000}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    label="Preço (R$)"
                    name="preco"
                    type="number"
                    value={formData.preco}
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
                    value={formData.estoque}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="0"
                  />
                </div>

                {/* Campo Categoria dinâmico */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Categoria</span>
                  </label>
                  <select
                    name="categoria"
                    value={formData.categoria}
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

                <FileUpload
                  onFileChange={handleFileChange}
                  maxSize={20}
                  acceptedTypes="image/*"
                  label="Imagem do Produto"
                  helperText="Opcional, máximo 5MB"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-base-300">
                <button
                  type="button"
                  onClick={() => router.push('/admin/produtos')}
                  disabled={loading}
                  className="btn btn-outline rounded-btn px-6 py-3 min-w-[120px] transition-all duration-200 hover:shadow-md"
                  style={{ borderRadius: 'var(--radius-field, 1rem)' }}
                >
                  Cancelar
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary rounded-btn px-6 py-3 min-w-[160px] transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                  style={{ borderRadius: 'var(--radius-field, 1rem)' }}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Cadastrando...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Cadastrar Produto
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}
