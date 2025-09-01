// src/app/page.jsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  FaArrowRight, 
  FaHeadphones, 
  FaKeyboard, 
  FaMouse, 
  FaMicrochip,
  FaDesktop,
  FaLaptop,
  FaGamepad,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaStar,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa"
import HeroSection from "@/components/Home/HeroSection/HeroSection"
import CategoryGrid from "@/components/Home/CategoryGrid/CategoryGrid"
import FeaturedProducts from "@/components/Home/FeaturedProducts/FeaturedProducts"
import PromoBanner from "@/components/Home/PromoBanner/PromoBanner"
import FeaturesSection from "@/components/Home/FeaturesSection/FeaturesSection"
import TestimonialsSection from "@/components/Home/TestimonialsSection/TestimonialsSection"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const categorias = [
    { name: "Placa-Mãe", icon: FaMicrochip, count: "32 produtos" },
    { name: "Memória RAM", icon: FaMicrochip, count: "28 produtos" },
    { name: "Cooler", icon: FaDesktop, count: "15 produtos" },
    { name: "FAN", icon: FaDesktop, count: "12 produtos" },
    { name: "Mouse", icon: FaMouse, count: "45 produtos" },
    { name: "Teclado", icon: FaKeyboard, count: "38 produtos" },
    { name: "Fone", icon: FaHeadphones, count: "52 produtos" },
    { name: "Gabinete", icon: FaDesktop, count: "25 produtos" },
    { name: "Processadores", icon: FaMicrochip, count: "18 produtos" },
    { name: "SSD/HD", icon: FaMicrochip, count: "42 produtos" },
    { name: "Placa de Vídeo", icon: FaDesktop, count: "22 produtos" },
    { name: "Notebooks", icon: FaLaptop, count: "30 produtos" },
  ]

  const banners = [
    {
      title: "Ofertas de Verão",
      subtitle: "Até 40% OFF em Periféricos",
      image: "/banners/summer-sale.jpg",
      cta: "Ver Ofertas",
      link: "/produtos?ofertas=verao"
    },
    {
      title: "Novidades 2024",
      subtitle: "As melhores tecnologias chegaram",
      image: "/banners/new-arrivals.jpg",
      cta: "Descobrir",
      link: "/produtos?novidades=true"
    },
    {
      title: "Frete Grátis",
      subtitle: "Em compras acima de R$ 299",
      image: "/banners/free-shipping.jpg",
      cta: "Comprar Agora",
      link: "/produtos"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Categories Section */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
              Explore por Categoria
            </h2>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
              Descubra nossa seleção completa de produtos de tecnologia organizada por categoria
            </p>
          </div>

          <CategoryGrid categories={categorias} />
          
          <div className="text-center mt-12">
            <Link 
              href="/produtos" 
              className="btn btn-primary btn-lg group"
            >
              Ver Todos os Produtos
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner Carousel */}
      <section className="py-12 bg-base-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="carousel w-full rounded-2xl overflow-hidden">
              {banners.map((banner, index) => (
                <div
                  key={index}
                  className="carousel-item relative w-full"
                >
                   <PromoBanner
                    title="Ofertas de Verão"
                    subtitle="Até 40% OFF em produtos selecionados"
                    image="/banners/summer-sale.jpg"
                    cta="Ver Ofertas"
                    link="/ofertas"
                    badge="Queima Estoque"
                    discount="40%"
                    timer="02:15:33"
                  />
                </div>
              ))}
            </div>
            
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <button className="btn btn-circle btn-ghost text-white">
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button className="btn btn-circle btn-ghost text-white">
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
              Os produtos mais populares e melhor avaliados pelos nossos clientes
            </p>
          </div>

          <FeaturedProducts />
          
          <div className="text-center mt-12">
            <Link 
              href="/produtos?destaques=true" 
              className="btn btn-outline btn-primary btn-lg group"
            >
              Ver Mais Destaques
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-primary-content">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fique por Dentro das Novidades
            </h2>
            <p className="text-primary-content/80 text-lg mb-8">
              Cadastre-se para receber ofertas exclusivas e novidades em primeira mão
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Seu melhor email" 
                className="input input-bordered flex-1 text-base-content"
              />
              <button className="btn btn-secondary">
                Inscrever-se
              </button>
            </div>
            
            <p className="text-sm text-primary-content/60 mt-4">
              Respeitamos sua privacidade. Você pode cancelar a qualquer momento.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}