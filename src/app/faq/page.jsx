"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  FaArrowRight, 
  FaChevronDown, 
  FaChevronUp,
  FaShoppingCart,
  FaShippingFast,
  FaUndo,
  FaShieldAlt,
  FaCreditCard,
  FaHeadset,
  FaBox
} from "react-icons/fa"
import { BackgroundParticles } from "@/components/ui/BackgroundParticles"

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("pedidos")
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const categories = [
    {
      id: "pedidos",
      name: "Pedidos e Entregas",
      icon: FaShoppingCart,
      questions: [
        {
          id: "pedido-1",
          question: "Como faço para rastrear meu pedido?",
          answer: "Após a confirmação do pagamento, você receberá um e-mail com o código de rastreamento. Você também pode acessar sua conta em nosso site e visualizar o status do pedido na seção 'Meus Pedidos'."
        },
        {
          id: "pedido-2",
          question: "Qual o prazo de entrega?",
          answer: "O prazo de entrega varia de acordo com sua localização. Para regiões metropolitanas, o prazo é de 3 a 5 dias úteis. Para interior e outras regiões, pode levar de 5 a 10 dias úteis. Produtos com entrega expressa chegam em até 2 dias úteis."
        },
        {
          id: "pedido-3",
          question: "Vocês entregam para todo o Brasil?",
          answer: "Sim, entregamos para todos os estados brasileiros. Consulte o frete durante a finalização da compra para verificar a disponibilidade para sua região."
        },
        {
          id: "pedido-4",
          question: "Posso alterar o endereço de entrega após a compra?",
          answer: "Sim, desde que o pedido ainda não tenha sido enviado para a transportadora. Entre em contato conosco imediatamente através do nosso WhatsApp ou e-mail para solicitar a alteração."
        }
      ]
    },
    {
      id: "pagamentos",
      name: "Pagamentos",
      icon: FaCreditCard,
      questions: [
        {
          id: "pagamento-1",
          question: "Quais formas de pagamento são aceitas?",
          answer: "Aceitamos cartão de crédito (em até 12x), débito, PIX (com 5% de desconto), boleto bancário e transferência bancária. Parcelamentos no cartão estão sujeitos à análise da operadora."
        },
        {
          id: "pagamento-2",
          question: "É seguro comprar no site?",
          answer: "Sim, utilizamos certificado SSL e criptografia de dados para garantir a segurança de todas as transações. Não armazenamos dados sensíveis dos cartões de crédito em nossos servidores."
        },
        {
          id: "pagamento-3",
          question: "Como funciona o desconto no PIX?",
          answer: "Ao selecionar a opção PIX no checkout, o desconto de 5% é aplicado automaticamente sobre o valor total da compra. O pagamento deve ser realizado em até 30 minutos para garantir o preço promocional."
        },
        {
          id: "pagamento-4",
          question: "Preciso pagar alguma taxa para parcelar no cartão?",
          answer: "Não cobramos taxas adicionais para parcelamento. No entanto, as operadoras de cartão podem cobrar juros a partir de certa quantidade de parcelas, de acordo com suas políticas."
        }
      ]
    },
    {
      id: "trocas",
      name: "Trocas e Devoluções",
      icon: FaUndo,
      questions: [
        {
          id: "troca-1",
          question: "Qual o prazo para troca ou devolução?",
          answer: "O prazo para solicitar troca ou devolução é de até 30 dias após o recebimento do produto, de acordo com o Código de Defesa do Consumidor. Produtos com defeito de fabricação têm garantia de acordo com o fabricante."
        },
        {
          id: "troca-2",
          question: "Como solicitar uma troca?",
          answer: "Acesse a seção 'Minhas Trocas' em sua conta ou entre em contato com nosso atendimento. É necessário informar o número do pedido e o motivo da troca. Após a análise, enviaremos as instruções para envio do produto."
        },
        {
          id: "troca-3",
          question: "Quem paga o frete para troca?",
          answer: "Custamos o frete de retorno para produtos com defeito ou engano nosso. Para trocas por arrependimento, o frete de retorno é por conta do cliente."
        },
        {
          id: "troca-4",
          question: "Posso trocar um produto que não atendeu minhas expectativas?",
          answer: "Sim, desde que o produto esteja em perfeito estado, com todos os acessórios e embalagem original. Não aceitamos trocas de produtos danificados pelo uso ou sem a embalagem adequada."
        }
      ]
    },
    {
      id: "garantia",
      name: "Garantia e Suporte",
      icon: FaShieldAlt,
      questions: [
        {
          id: "garantia-1",
          question: "Como aciono a garantia do produto?",
          answer: "Entre em contato conosco informando o número do pedido e o problema apresentado. Iremos orientar sobre os procedimentos para acionar a garantia junto ao fabricante ou providenciaremos a troca, conforme o caso."
        },
        {
          id: "garantia-2",
          question: "Qual a garantia dos produtos?",
          answer: "A garantia varia conforme o fabricante e o produto. Em geral, componentes têm garantia de 12 meses, enquanto periféricos variam de 3 a 12 meses. Consulte a garantia específica na página de cada produto."
        },
        {
          id: "garantia-3",
          question: "Oferecem suporte técnico para montagem?",
          answer: "Sim, nossa equipe técnica está disponível para orientar sobre compatibilidade entre componentes e dar dicas de montagem. Entre em contato pelo WhatsApp ou e-mail para assistência."
        },
        {
          id: "garantia-4",
          question: "O que fazer se o produto chegar com danos?",
          answer: "Se o produto chegar com avarias visíveis, recuse o recebimento e entre em contato conosco imediatamente. Se você já recebeu e identificou o problema depois, registre fotos e nos envie para análise."
        }
      ]
    },
    {
      id: "produtos",
      name: "Produtos e Compatibilidade",
      icon: FaBox,
      questions: [
        {
          id: "produto-1",
          question: "Como sei se os componentes são compatíveis?",
          answer: "Em nossa página de produto, disponibilizamos informações detalhadas sobre compatibilidade. Você também pode usar nossa ferramenta 'Montador de PC' ou entrar em contato com nosso suporte para verificação."
        },
        {
          id: "produto-2",
          question: "Os produtos são originais e novos?",
          answer: "Sim, todos os produtos são 100% originais, lacrados e novos. Trabalhamos apenas com distribuidores autorizados e fabricantes reconhecidos no mercado."
        },
        {
          id: "produto-3",
          question: "Vocês fazem montagem de PCs?",
          answer: "Sim, oferecemos serviço de montagem profissional para quem compra os componentes conosco. Consulte a disponibilidade e custo adicional durante a finalização do pedido."
        },
        {
          id: "produto-4",
          question: "Posso encomendar produtos que não estão no site?",
          answer: "Sim, entre em contato conosco para consultar disponibilidade e preço de produtos sob encomenda. Atendemos solicitações especiais de clientes."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-base-100">
        <BackgroundParticles />
      {/* Hero Section */}
      <section className="py-16  text-primary-content">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Perguntas Frequentes</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Encontre respostas para as dúvidas mais comuns sobre nossos produtos e serviços
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato" className="btn btn-secondary btn-lg">
              Falar com Atendimento
            </Link>
            <Link href="/produtos" className="btn btn-outline btn-primary-content btn-lg">
              Ver Produtos
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Categories Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-base-200 rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-base-content mb-6">Categorias</h2>
                <div className="space-y-2">
                  {categories.map(category => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-colors ${
                          activeCategory === category.id 
                            ? 'bg-primary text-primary-content' 
                            : 'hover:bg-base-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{category.name}</span>
                      </button>
                    )
                  })}
                </div>
                
                <div className="mt-8 p-4 bg-base-100 rounded-xl">
                  <h3 className="font-semibold text-base-content mb-3">Não encontrou sua resposta?</h3>
                  <p className="text-sm text-base-content/70 mb-4">Nosso time de atendimento está pronto para ajudar você</p>
                  <Link href="/contato" className="btn btn-primary btn-sm w-full">
                    Entrar em Contato
                  </Link>
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="lg:w-3/4">
              <div className="bg-base-200 rounded-2xl p-6 mb-8">
                <h2 className="text-2xl font-semibold text-base-content mb-2">
                  {categories.find(c => c.id === activeCategory)?.name}
                </h2>
                <p className="text-base-content/70">
                  Confira as dúvidas mais frequentes sobre {categories.find(c => c.id === activeCategory)?.name.toLowerCase()}
                </p>
              </div>

              <div className="space-y-4">
                {categories
                  .find(c => c.id === activeCategory)
                  ?.questions.map(item => {
                    const isOpen = openItems[item.id]
                    return (
                      <div key={item.id} className="bg-base-200 rounded-2xl overflow-hidden">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-base-300 transition-colors"
                        >
                          <span className="font-medium text-base-content">{item.question}</span>
                          {isOpen ? (
                            <FaChevronUp className="w-4 h-4 flex-shrink-0 text-primary" />
                          ) : (
                            <FaChevronDown className="w-4 h-4 flex-shrink-0 text-base-content/70" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <div className="p-6 pt-0 border-t border-base-300">
                            <p className="text-base-content/80">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>

              {/* Still have questions */}
              <div className="mt-12 bg-primary/10 rounded-2xl p-8 text-center">
                <FaHeadset className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-base-content mb-3">Ainda com dúvidas?</h3>
                <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">
                  Nossa equipe de atendimento está disponível para ajudar com qualquer dúvida que você possa ter
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contato" className="btn btn-primary">
                    <FaHeadset className="mr-2" />
                    Falar com Atendimento
                  </Link>
                  <a href="https://wa.me/5511999999999" target="_blank" className="btn btn-success">
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 text-primary-content">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fique Por Dentro das Novidades
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