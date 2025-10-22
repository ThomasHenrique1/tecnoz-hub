"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  FaArrowRight,
  FaHeadphones,
  FaKeyboard,
  FaMouse,
  FaDesktop,
  FaLaptop,
  FaChevronLeft,
  FaChevronRight,
  FaMemory,
  FaFan,
  FaHdd
} from "react-icons/fa"
import { GiProcessor } from "react-icons/gi";
import { PiGraphicsCardFill } from "react-icons/pi";
import { BsFillMotherboardFill } from "react-icons/bs";
import HeroSection from "@/components/Home/HeroSection/HeroSection"
import CategoryGrid from "@/components/Home/CategoryGrid/CategoryGrid"
import FeaturedProducts from "@/components/Home/FeaturedProducts/FeaturedProducts"
import PromoBanner from "@/components/Home/PromoBanner/PromoBanner"
import FeaturesSection from "@/components/Home/FeaturesSection/FeaturesSection"
import TestimonialsSection from "@/components/Home/TestimonialsSection/TestimonialsSection"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const categorias = [
    { name: "Placa-Mãe", icon: BsFillMotherboardFill, count: "32 produtos" },
    { name: "Memória RAM", icon: FaMemory, count: "28 produtos" },
    { name: "Cooler", icon: FaFan, count: "15 produtos" },
    { name: "FAN", icon: FaFan, count: "12 produtos" },
    { name: "Mouse", icon: FaMouse, count: "45 produtos" },
    { name: "Teclado", icon: FaKeyboard, count: "38 produtos" },
    { name: "Fone", icon: FaHeadphones, count: "52 produtos" },
    { name: "Gabinete", icon: FaDesktop, count: "25 produtos" },
    { name: "Processadores", icon: GiProcessor, count: "18 produtos" },
    { name: "SSD/HD", icon: FaHdd, count: "42 produtos" },
    { name: "Placa de Vídeo", icon: PiGraphicsCardFill, count: "22 produtos" },
    { name: "Notebooks", icon: FaLaptop, count: "30 produtos" },
  ]

  const banners = [
    {
      title: "Ofertas",
      subtitle: "Até 40% OFF em Periféricos",
      image: "/banners/summer-sale.jpg",
      cta: "Ver Ofertas",
      link: "/produtos"
    },
    {
      title: "Novidades 2025",
      subtitle: "As melhores tecnologias chegaram",
      image: "/banners/new-arrivals.jpg",
      cta: "Descobrir",
      link: "/produtos"
    },
    {
      title: "Frete Grátis",
      subtitle: "Em compras acima de R$ 299",
      image: "/banners/free-shipping.jpg",
      cta: "Comprar Agora",
      link: "/produtos"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // Auto-play do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

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

      {/* Promo Banner Carousel - CORRIGIDO */}
      <section className="py-12 bg-base-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="carousel w-full rounded-2xl overflow-hidden">
              {banners.map((banner, index) => (
                <div
                  key={index}
                  className={`carousel-item relative w-full transition-opacity duration-500 ${
                    index === currentSlide ? 'block' : 'hidden'
                  }`}
                >
                  <PromoBanner
                    title={banner.title}
                    subtitle={banner.subtitle}
                    cta={banner.cta}
                    link={banner.link}
                    image={banner.image}
                    badge={index === 0 ? "Queima Estoque" : index === 1 ? "Novidade" : "Promoção"}
                    discount={index === 0 ? "40%" : index === 1 ? "Novo" : "Grátis"}
                  />
                </div>
              ))}
            </div>

            {/* Botões de navegação - CORRIGIDOS */}
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <button 
                onClick={prevSlide} 
                className="btn btn-circle btn-ghost hover:bg-white/20 text-white"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextSlide} 
                className="btn btn-circle btn-ghost hover:bg-white/20 text-white"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Indicadores - CORRIGIDOS (no local certo) */}
            <div className="flex justify-center mt-4 gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
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
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Fique por Dentro das Novidades
            </h2>
            <p className="text-lg md:text-xl mb-10">
              Cadastre-se para receber ofertas exclusivas e novidades em primeira mão
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="input input-bordered flex-1 text-base-content rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/60"
              />
              <button className="btn btn-secondary px-6 rounded-xl shadow-md hover:shadow-lg transition duration-200">
                Inscrever-se
              </button>
            </div>

            <p className="text-sm mt-5 italic">
              Respeitamos sua privacidade. Você pode cancelar a qualquer momento.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}