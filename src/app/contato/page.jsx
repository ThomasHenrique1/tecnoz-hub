"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhone,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPaperPlane
} from "react-icons/fa"
import { BackgroundParticles } from "@/components/ui/BackgroundParticles"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulação de envio do formulário
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitMessage("Mensagem enviada com sucesso! Entraremos em contato em breve.")
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        assunto: "",
        mensagem: ""
      })
    }, 1500)
  }

  const contactMethods = [
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      info: "+55 (11) 99999-9999",
      link: "https://wa.me/5511999999999",
      description: "Atendimento rápido pelo WhatsApp"
    },
    {
      icon: FaEnvelope,
      title: "E-mail",
      info: "contato@tecnohub.com",
      link: "mailto:contato@tecnohub.com",
      description: "Respondemos em até 24h"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Endereço",
      info: "Av. Paulista, 1000, São Paulo - SP",
      link: "https://goo.gl/maps/example",
      description: "Estamos localizados no coração de São Paulo"
    },
    {
      icon: FaPhone,
      title: "Telefone",
      info: "+55 (11) 3333-3333",
      link: "tel:+551133333333",
      description: "Horário comercial: 9h às 18h"
    }
  ]

  const socialLinks = [
    {
      icon: FaFacebook,
      name: "Facebook",
      url: "https://facebook.com/tecnohub",
      color: "bg-blue-600"
    },
    {
      icon: FaInstagram,
      name: "Instagram",
      url: "https://instagram.com/tecnohub",
      color: "bg-pink-600"
    },
    {
      icon: FaTwitter,
      name: "Twitter",
      url: "https://twitter.com/tecnohub",
      color: "bg-blue-400"
    },
    {
      icon: FaLinkedin,
      name: "LinkedIn",
      url: "https://linkedin.com/company/tecnohub",
      color: "bg-blue-700"
    }
  ]

  return (
    <div className="min-h-screen bg-base-100">
        <BackgroundParticles />
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Entre em Contato</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Estamos aqui para ajudar você com qualquer dúvida sobre nossos produtos e serviços
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/5511999999999" target="_blank" className="btn btn-secondary btn-lg">
              <FaWhatsapp className="mr-2" />
              Falar no WhatsApp
            </a>
            <Link href="/faq" className="btn btn-outline btn-primary-content btn-lg">
              Ver Perguntas Frequentes
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-base-content mb-8">Nossos Canais</h2>
              
              <div className="space-y-6 mb-10">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon
                  return (
                    <a
                      key={index}
                      href={method.link}
                      target={method.link.includes("http") ? "_blank" : undefined}
                      rel={method.link.includes("http") ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-base-200 hover:bg-base-300 transition-colors group"
                    >
                      <div className="bg-primary/10 text-primary rounded-lg p-3 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base-content">{method.title}</h3>
                        <p className="text-base-content/80">{method.info}</p>
                        <p className="text-sm text-base-content/60 mt-1">{method.description}</p>
                      </div>
                    </a>
                  )
                })}
              </div>

              {/* Business Hours */}
              <div className="bg-base-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FaClock className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-base-content">Horário de Atendimento</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Segunda a Sexta</span>
                    <span className="text-base-content">9h às 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Sábados</span>
                    <span className="text-base-content">9h às 14h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Domingos e Feriados</span>
                    <span className="text-base-content">Fechado</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="font-semibold text-base-content mb-4">Siga-nos nas Redes Sociais</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.color} text-white rounded-lg p-3 hover:opacity-90 transition-opacity`}
                        aria-label={social.name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-base-200 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-base-content mb-2">Envie uma Mensagem</h2>
                <p className="text-base-content/70 mb-8">
                  Preencha o formulário abaixo e entraremos em contato o mais breve possível
                </p>

                {submitMessage && (
                  <div className="bg-success/20 text-success-content p-4 rounded-xl mb-6">
                    {submitMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nome" className="block text-base-content/70 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-base-content/70 mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="telefone" className="block text-base-content/70 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label htmlFor="assunto" className="block text-base-content/70 mb-2">
                        Assunto *
                      </label>
                      <select
                        id="assunto"
                        name="assunto"
                        value={formData.assunto}
                        onChange={handleChange}
                        required
                        className="select select-bordered w-full"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="duvida">Dúvida sobre produto</option>
                        <option value="orcamento">Orçamento</option>
                        <option value="suporte">Suporte técnico</option>
                        <option value="reclamacao">Reclamação</option>
                        <option value="elogio">Elogio</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="block text-base-content/70 mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="textarea textarea-bordered w-full"
                      placeholder="Descreva sua dúvida, solicitação ou feedback..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-lg w-full group"
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2 group-hover:translate-x-1 transition-transform" />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* FAQ Preview */}
              <div className="mt-12 bg-primary/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-base-content mb-4">
                  Respostas Rápidas para Dúvidas Comuns
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Link href="/faq#pedidos" className="bg-base-100 p-4 rounded-xl hover:bg-base-200 transition-colors">
                    <h4 className="font-medium text-base-content">Prazos de entrega</h4>
                    <p className="text-sm text-base-content/70">Como funciona e prazos médios</p>
                  </Link>
                  <Link href="/faq#trocas" className="bg-base-100 p-4 rounded-xl hover:bg-base-200 transition-colors">
                    <h4 className="font-medium text-base-content">Política de trocas</h4>
                    <p className="text-sm text-base-content/70">Como solicitar trocas e devoluções</p>
                  </Link>
                  <Link href="/faq#garantia" className="bg-base-100 p-4 rounded-xl hover:bg-base-200 transition-colors">
                    <h4 className="font-medium text-base-content">Garantia dos produtos</h4>
                    <p className="text-sm text-base-content/70">Como acionar a garantia</p>
                  </Link>
                  <Link href="/faq#pagamentos" className="bg-base-100 p-4 rounded-xl hover:bg-base-200 transition-colors">
                    <h4 className="font-medium text-base-content">Formas de pagamento</h4>
                    <p className="text-sm text-base-content/70">Métodos aceitos e condições</p>
                  </Link>
                </div>
                <Link href="/faq" className="btn btn-outline btn-primary btn-sm">
                  Ver todas as perguntas frequentes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-base-content text-center mb-12">Nossa Localização</h2>
          <div className="bg-base-100 rounded-2xl overflow-hidden shadow-lg p-8">
            <div className="aspect-video bg-primary/10 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <FaMapMarkerAlt className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-base-content mb-2">Av. Paulista, 1000</h3>
                <p className="text-base-content/70">São Paulo - SP, 01310-100</p>
                <a 
                  href="https://goo.gl/maps/example" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm mt-4"
                >
                  Ver no Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}