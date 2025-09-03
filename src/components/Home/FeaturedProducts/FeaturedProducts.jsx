"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { FaStar, FaShoppingCart, FaEye } from "react-icons/fa"
import { supabase } from "@/lib/supabaseClient"

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        
        // Busca produtos do banco de dados
        const { data: produtos, error: supabaseError } = await supabase
          .from("produtos")
          .select("id, nome, preco, imagem_url, categoria, estoque, descricao")
          .order('criado_em', { ascending: false }) // Pega os mais recentes
          .limit(8) // Limita a 8 produtos

        if (supabaseError) {
          setError(supabaseError.message)
          console.error("Erro ao buscar produtos:", supabaseError)
          return
        }

        // Embaralha os produtos para variedade
        const shuffledProducts = produtos.sort(() => Math.random() - 0.5)
        setProducts(shuffledProducts.slice(0, 4)) // Pega 4 produtos aleatórios

      } catch (err) {
        setError("Erro ao carregar produtos")
        console.error("Erro:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="card bg-base-100 border border-base-300 animate-pulse">
            <div className="h-48 bg-base-300 rounded-t-lg"></div>
            <div className="card-body p-4">
              <div className="h-4 bg-base-300 rounded mb-2"></div>
              <div className="h-4 bg-base-300 rounded w-3/4 mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-base-300 rounded w-1/3"></div>
                <div className="h-8 w-8 bg-base-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-base-200 rounded-lg p-6 border border-base-300">
          <svg className="w-12 h-12 text-warning mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.946-.833-2.716 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-base-content/70 mb-2">Erro ao carregar produtos</p>
          <p className="text-base-content/50 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-base-200 rounded-lg p-6 border border-base-300">
          <svg className="w-12 h-12 text-base-content/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 9h6m-6 4h6m-6 4h6" />
          </svg>
          <p className="text-base-content/70">Nenhum produto encontrado</p>
          <p className="text-base-content/50 text-sm mt-1">Em breve teremos novidades!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="card bg-base-100 border border-base-300 hover:shadow-xl transition-all duration-300 group">
          <figure className="relative h-48 overflow-hidden">
            <Image
              src={product.imagem_url || "/placeholder-product.jpg"}
              alt={product.nome}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.src = "/placeholder-product.jpg"
              }}
            />
            
            {/* Badge de categoria */}
            <div className="absolute top-2 left-2">
              <span className="badge badge-primary badge-sm">
                {product.categoria || "Geral"}
              </span>
            </div>
            
            {/* Badge de estoque */}
            {product.estoque === 0 && (
              <div className="absolute inset-0 bg-base-100/80 flex items-center justify-center">
                <span className="badge badge-error badge-lg">ESGOTADO</span>
              </div>
            )}
            
            {/* Overlay de ações */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-2">
                <Link 
                  href={`/produtos/${product.id}`}
                  className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white hover:text-primary"
                  title="Ver detalhes"
                >
                  <FaEye className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </figure>
          
          <div className="card-body p-4">
            <h3 className="card-title text-sm font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {product.nome}
            </h3>
            
            <p className="text-base-content/60 text-xs line-clamp-2 mb-3">
              {product.descricao || "Produto de alta qualidade"}
            </p>
            
            <div className="flex items-center justify-between mt-auto">
              <div>
                <span className="text-lg font-bold text-primary">
                  R$ {product.preco?.toFixed(2).replace('.', ',') || "0,00"}
                </span>
                {product.estoque > 0 && (
                  <p className="text-success text-xs mt-1">
                    {product.estoque} em estoque
                  </p>
                )}
              </div>
              
              <div className="flex gap-2">
                <Link 
                  href={`/produtos/${product.id}`}
                  className="btn btn-ghost btn-sm btn-square hover:btn-primary"
                  title="Ver detalhes"
                >
                  <FaEye className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}