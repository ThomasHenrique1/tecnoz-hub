"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  FaArrowRight, 
  FaShoppingCart, 
  FaHeadphones, 
  FaLaptop, 
  FaMobileAlt,
  FaGamepad,
  FaTruck,
  FaShieldAlt,
  FaStar
} from "react-icons/fa"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      title: "Tecnologia de Ponta",
      subtitle: "Os melhores produtos com preços imbatíveis",
      highlight: "Ofertas Especiais",
      image: "https://ypxcrzudxqtntiksnydu.supabase.co/storage/v1/object/public/image-logo/configuracao-de-jogos-epicos.jpg"
    },
    {
      title: "Experiência Completa",
      subtitle: "Tudo que você precisa em um só lugar",
      highlight: "Novos Lançamentos",
      image: "https://ypxcrzudxqtntiksnydu.supabase.co/storage/v1/object/public/image-logo/configuracao-de-jogos-epicos.jpg"
    },
    {
      title: "Qualidade Garantida",
      subtitle: "Produtos testados e aprovados",
      highlight: "Frete Grátis",
      image: "https://ypxcrzudxqtntiksnydu.supabase.co/storage/v1/object/public/image-logo/configuracao-de-jogos-epicos.jpg"
    }
  ]

  const stats = [
    { icon: FaShoppingCart, number: "2K+", label: "Vendas Mensais" },
    { icon: FaHeadphones, number: "24/7", label: "Suporte" },
    { icon: FaTruck, number: "100+", label: "Cidades Atendidas" },
    { icon: FaShieldAlt, number: "2 anos", label: "Garantia" }
  ]

  const featuredCategories = [
    { icon: FaLaptop, name: "Notebooks", count: "32 produtos" },
    { icon: FaMobileAlt, name: "Smartphones", count: "45 produtos" },
    { icon: FaGamepad, name: "Gaming", count: "28 produtos" },
    { icon: FaHeadphones, name: "Áudio", count: "38 produtos" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-base-100">
      {/* Background Slideshow com overlay mais suave */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000  ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-base-200/70"></div>
            <Image
              src={slide.image || "/placeholder-hero.jpg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl w-full">
          {/* Main Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center bg-primary/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span className="text-primary-content font-semibold text-sm">
                {heroSlides[currentSlide].highlight}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-base-content">
              Bem-vindo à{" "}
              <span className="text-primary">
                TecnoZHub
              </span>
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl mb-8 font-light max-w-3xl mx-auto leading-relaxed text-base-content/90">
              {heroSlides[currentSlide].subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              href="/produtos" 
              className="btn btn-primary btn-lg group rounded-btn px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              style={{ borderRadius: 'var(--radius-field, 1rem)' }}
            >
              Explorar Produtos
              <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
            
            <Link 
              href="/sobre" 
              className="btn btn-outline btn-lg border-base-content/30 text-base-content hover:bg-base-content hover:text-base-100 group rounded-btn px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              style={{ borderRadius: 'var(--radius-field, 1rem)' }}
            >
              Nossa História
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary/20 rounded-2xl backdrop-blur-sm">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-base-content mb-1">
                  {stat.number}
                </div>
                <div className="text-base-content/70 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Featured Categories */}
          <div className="bg-base-200/50 backdrop-blur-lg rounded-box p-6 border border-base-300">
            <h3 className="text-base-content text-lg font-semibold mb-6">
              Categorias em Destaque
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredCategories.map((category, index) => (
                <Link
                  key={index}
                  href={`/produtos?categoria=${encodeURIComponent(category.name)}`}
                  className="group p-4 bg-base-100/50 rounded-box border border-base-300 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                  style={{ borderRadius: 'var(--radius-box, 1rem)' }}
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-2 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <h4 className="text-base-content font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h4>
                  <p className="text-base-content/60 text-xs">
                    {category.count}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary w-8' 
                    : 'bg-base-content/30 hover:bg-base-content/50'
                }`}
              />
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-base-content/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-base-content/50 rounded-full mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay mais suave */}
      <div className="absolute inset-0 bg-gradient-to-t from-base-100/50 via-transparent to-base-100/30"></div>
    </section>
  )
}