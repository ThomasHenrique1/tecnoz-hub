// src/app/sobre/page.jsx
import { BackgroundParticles } from "@/components/ui/BackgroundParticles"
import Image from "next/image"
import Link from "next/link"
import { 
  FaAward, 
  FaUsers, 
  FaShippingFast, 
  FaHeadset, 
  FaShieldAlt,
  FaArrowRight
} from "react-icons/fa"

export default function SobrePage() {
  const valores = [
    {
      icon: FaShieldAlt,
      title: "Qualidade Garantida",
      description: "Todos os produtos passam por rigorosos testes de qualidade antes do envio."
    },
    {
      icon: FaShippingFast,
      title: "Entrega Rápida",
      description: "Entregamos em todo o Brasil com prazos curtos e acompanhamento em tempo real."
    },
    {
      icon: FaHeadset,
      title: "Suporte Técnico",
      description: "Nossa equipe especializada está pronta para ajudar com qualquer dúvida técnica."
    },
    {
      icon: FaUsers,
      title: "Foco no Cliente",
      description: "Sua satisfação é nossa prioridade. Trabalhamos para superar expectativas."
    }
  ]

  const timeline = [
    {
      year: "2018",
      title: "Fundação da TecnozHub",
      description: "Iniciamos nossa jornada como uma pequena loja especializada em hardware."
    },
    {
      year: "2019",
      title: "Expansão para E-commerce",
      description: "Lançamos nossa plataforma online para atender todo o Brasil."
    },
    {
      year: "2020",
      title: "Parceria com Grandes Marcas",
      description: "Firmamos parcerias com fabricantes líderes do mercado."
    },
    {
      year: "2022",
      title: "Centro de Distribuição Próprio",
      description: "Inauguramos nosso próprio centro de distribuição em São Paulo."
    },
    {
      year: "2023",
      title: "+10.000 Clientes Atendidos",
      description: "Atingimos a marca de 10 mil clientes satisfeitos em todo o país."
    }
  ]

  const team = [
    {
      name: "Carlos Silva",
      role: "CEO & Fundador",
      image: "https://ypxcrzudxqtntiksnydu.supabase.co/storage/v1/object/public/team/carlos-silva.jpg",
      bio: "Especialista em hardware com mais de 15 anos de experiência no mercado."
    },
    {
      name: "Ana Costa",
      role: "Head de Tecnologia",
      image: "https://ypxcrzudxqtntiksnydu.supabase.co/storage/v1/object/public/team/ana-costa.jpg", 
      bio: "Responsável pela curadoria técnica de todos os produtos da loja."
    },
    {
      name: "Ricardo Oliveira",
      role: "Gerente de Vendas",
      image: "https://ypxcrzudxqtntiksnydu.supabase.co/storage/v1/object/public/team/ricardo-oliveira.jpg",
      bio: "Conectando clientes com as melhores soluções em hardware há 8 anos."
    },
    {
      name: "Mariana Santos",
      role: "Especialista em Atendimento",
      image: "https://ypxcrzudxqtntiksnydu.supabase.co/storage/v1/object/public/team/mariana-santos.jpg",
      bio: "Garantindo a melhor experiência de compra para nossos clientes."
    }
  ]

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="relative py-20 ">
        <BackgroundParticles />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre a TecnozHub</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Sua loja especializada em componentes de PC e periféricos de alta performance
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/produtos" className="btn btn-secondary btn-lg">
              Ver Produtos
            </Link>
            <Link href="/contato" className="btn btn-outline btn-primary-content btn-lg">
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg bg-primary/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <FaAward className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-base-content">Imagem da Nossa Oficina</h3>
                  <p className="text-base-content/70 mt-2">
                    <Image
                      src="https://ypxcrzudxqtntiksnydu.supabase.co/storage/v1/object/public/favicon/Logo.png"
                      alt="Nossa Oficina"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-2xl shadow-md border border-base-200"
                      style={{ 
                        objectPosition: '50% 50%', // Centraliza a imagem
                        transform: 'scale(1.1)' // Dá um zoom para melhorar o enquadramento
                      }}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-base-content mb-6">Nossa História</h2>
              <p className="text-base-content/80 text-lg mb-6">
                A TecnozHub nasceu em 2018 da paixão por tecnologia e hardware. Começamos como uma pequena 
                loja especializada em componentes para PCs gamers e entusiastas, com o objetivo de oferecer 
                produtos de qualidade e um atendimento técnico especializado.
              </p>
              <p className="text-base-content/80 text-lg mb-6">
                Ao longo dos anos, crescemos e nos tornamos referência no mercado de hardware, sempre 
                mantendo nosso compromisso com a qualidade dos produtos e a satisfação dos clientes.
              </p>
              <div className="bg-base-200 p-6 rounded-2xl border-l-4 border-primary">
                <p className="text-base-content italic text-lg">
                  "Nosso propósito é conectar pessoas com a tecnologia certa, oferecendo produtos de 
                  qualidade e um atendimento que faz a diferença."
                </p>
                <p className="font-semibold mt-4">— Carlos Silva, Fundador</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destaques em Números */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-base-content text-center mb-12">TecnozHub em Números</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-base-100 p-6 rounded-2xl shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-base-content/70">Anos no Mercado</div>
            </div>
            <div className="bg-base-100 p-6 rounded-2xl shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-base-content/70">Clientes Satisfeitos</div>
            </div>
            <div className="bg-base-100 p-6 rounded-2xl shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">2K+</div>
              <div className="text-base-content/70">Produtos em Catálogo</div>
            </div>
            <div className="bg-base-100 p-6 rounded-2xl shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">27</div>
              <div className="text-base-content/70">Estados com Entrega</div>
            </div>
          </div>
        </div>
      </section>

     {/* Linha do Tempo */}
<section className="py-16 bg-base-100">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-base-content text-center mb-12">Nossa Jornada</h2>
    <div className="max-w-4xl mx-auto">
      <ul className="timeline timeline-vertical">
        {timeline.map((item, index) => (
          <li key={index}>
            {/* Linha entre os itens */}
            {index !== 0 && <hr className="bg-primary/20" />}
            
            {/* Conteúdo do lado esquerdo para índices pares */}
            {index % 2 === 0 && (
              <>
                <div className="timeline-start timeline-box bg-base-200 border-base-300 text-base-content">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-base-content/70">{item.description}</p>
                </div>
                <div className="timeline-middle">
                  <div className="bg-primary text-primary-content rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    {item.year}
                  </div>
                </div>
              </>
            )}
            
            {/* Conteúdo do lado direito para índices ímpares */}
            {index % 2 === 1 && (
              <>
                <div className="timeline-middle">
                  <div className="bg-primary text-primary-content rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    {item.year}
                  </div>
                </div>
                <div className="timeline-end timeline-box bg-base-200 border-base-300 text-base-content">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-base-content/70">{item.description}</p>
                </div>
              </>
            )}
            
            {/* Linha após o último item */}
            {index !== timeline.length - 1 && <hr className="bg-primary/20" />}
          </li>
        ))}
      </ul>
    </div>
  </div>
</section>

      {/* Valores */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-base-content text-center mb-12">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => {
              const Icon = valor.icon
              return (
                <div key={index} className="bg-base-100 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-base-content mb-3">{valor.title}</h3>
                  <p className="text-base-content/70">{valor.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Equipe - Versão com verificação de imagem */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-base-content text-center mb-12">Nossa Equipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-base-200 rounded-2xl overflow-hidden text-center shadow-sm">
                <div className="h-48 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    style={{ 
                        objectPosition: '70% 0%', // Ajusta o enquadramento da imagem
                        transform: 'scale(1.1)' // Dá um zoom para melhorar o enquadramento
                    }}
                  />
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center hidden">
                    <div className="text-center p-4">
                      <div className="bg-primary/20 text-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                        <FaUsers className="w-10 h-10" />
                      </div>
                      <p className="text-sm text-base-content/70">Imagem de {member.name}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-base-content mb-1">{member.name}</h3>
                  <p className="text-primary mb-3">{member.role}</p>
                  <p className="text-base-content/70 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para montar seu PC dos sonhos?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Conte com a TecnozHub para encontrar os melhores componentes com preços competitivos
          </p>
          <Link href="/produtos" className="btn btn-secondary btn-lg group">
            Explorar Produtos
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}