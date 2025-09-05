// components/Home/PromoBanner/PromoBanner.jsx
import Link from "next/link"
import Image from "next/image"
import { FaArrowRight, FaTag, FaClock, FaTruck, FaImage } from "react-icons/fa"
import { useState } from "react"

export default function PromoBanner({ 
  title = "Ofertas Especiais", 
  subtitle = "Aproveite nossas promoções exclusivas", 
  image = null, 
  cta = "Ver Ofertas", 
  link = "/produtos",
  badge,
  timer,
  discount 
}) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(!!image)

  // Placeholder gradiente baseado nas cores do tema
  const gradientBg = "bg-gradient-to-r from-primary to-secondary"

  return (
    <div className="relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden group">
      {/* Imagem de fundo (apenas se for fornecida e não tiver erro) */}
      {image && !imageError && (
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoadingComplete={() => setImageLoading(false)}
          onError={() => setImageError(true)}
        />
      )}
      
      {/* Loading state para imagem */}
      {imageLoading && (
        <div className="absolute inset-0 bg-base-300 animate-pulse flex items-center justify-center">
          <FaImage className="w-12 h-12 text-base-content/30 animate-pulse" />
        </div>
      )}
      
      {/* Fundo gradiente quando não há imagem ou ocorre erro */}
      {(!image || imageError) && (
        <div className={`absolute inset-0 ${gradientBg}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
      )}
      
      {/* Overlay gradiente */}
      <div className={`absolute inset-0 ${
        image && !imageError 
          ? 'bg-gradient-to-r from-black/60 via-black/40 to-black/20' 
          : 'bg-black/30'
      } group-hover:bg-black/40 transition-all duration-500`}></div>
      
     
      <div className="absolute top-6 left-6 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-6 right-6 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse"></div>

      {/* Conteúdo */}
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <div className="max-w-2xl mx-auto p-6 text-center relative z-10">
          
          {/* Badge de promoção */}
          {(badge || discount) && (
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full mb-6 animate-bounce border border-white/30">
              <FaTag className="h-4 w-4 mr-2" />
              <span className="font-semibold text-sm">
                {badge || ` ${discount} OFF`}
              </span>
            </div>
          )}

          {/* Timer de oferta (opcional) */}
          {timer && (
            <div className="flex justify-center items-center gap-3 mb-6 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 inline-flex border border-white/30">
              <FaClock className="h-4 w-4 text-yellow-300" />
              <span className="text-yellow-300 font-mono font-semibold">{timer}</span>
            </div>
          )}

          {/* Título principal */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight drop-shadow-2xl">
            {title}
          </h2>

          {/* Subtítulo */}
          <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-95 leading-relaxed max-w-md mx-auto drop-shadow-lg">
            {subtitle}
          </p>

          {/* CTA Button */}
          <Link 
            href={link}
            className="btn btn-secondary btn-lg group relative overflow-hidden rounded-btn px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
            style={{ borderRadius: 'var(--radius-field, 1rem)' }}
          >
            <span className="relative z-10 flex items-center">
              {cta}
              <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
            </span>
            
            {/* Efeito de brilho no hover */}
            <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
          </Link>

          {/* Informações adicionais */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <FaTruck className="h-4 w-4 text-green-300" />
              <span>Frete Grátis</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTag className="h-4 w-4 text-yellow-300" />
              <span>Pagamento Seguro</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}