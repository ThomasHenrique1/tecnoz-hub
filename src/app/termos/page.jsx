"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  FaChevronDown, 
  FaChevronUp,
  FaFileContract,
  FaUserShield,
  FaShoppingCart,
  FaExclamationTriangle,
  FaBalanceScale,
  FaGavel,
  FaLock
} from "react-icons/fa"
import { BackgroundParticles } from "@/components/ui/BackgroundParticles"

export default function TermsPage() {
  const [openSections, setOpenSections] = useState({})

  const toggleSection = (id) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const lastUpdate = "15 de Janeiro de 2024"

  const termsSections = [
    {
      id: "aceitacao",
      title: "1. Aceitação dos Termos",
      icon: FaFileContract,
      content: (
        <div className="space-y-4">
          <p>
            Ao acessar e utilizar o site da TecnozHub (doravante denominado "Site"), 
            você concorda em cumprir e ficar vinculado aos seguintes Termos e Condições de Uso, 
            bem como à nossa Política de Privacidade.
          </p>
          <p>
            Estes Termos constituem um acordo legal entre você e a TecnozHub. Se você não concordar 
            com qualquer parte destes Termos, não deverá acessar ou utilizar nosso Site.
          </p>
          <p>
            Reservamo-nos o direito de modificar estes Termos a qualquer momento, sendo tais alterações 
            efetivas imediatamente após sua publicação no Site. O uso continuado do Site após tais 
            modificações constitui sua aceitação dos Termos revisados.
          </p>
        </div>
      )
    },
    {
      id: "cadastro",
      title: "2. Cadastro e Conta do Usuário",
      icon: FaUserShield,
      content: (
        <div className="space-y-4">
          <p>
            Para acessar certas funcionalidades do Site, você poderá ser solicitado a criar uma conta 
            de usuário. Você é responsável por:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fornecer informações precisas, completas e atualizadas durante o registro</li>
            <li>Manter a confidencialidade de sua senha e informações de conta</li>
            <li>Restringir o acesso à sua conta e computador</li>
            <li>Aceitar responsabilidade por todas as atividades que ocorram em sua conta</li>
          </ul>
          <p>
            Reservamo-nos o direito de recusar serviço, encerrar contas ou remover ou editar conteúdo 
            a nosso exclusivo critério.
          </p>
        </div>
      )
    },
    {
      id: "compras",
      title: "3. Processo de Compra",
      icon: FaShoppingCart,
      content: (
        <div className="space-y-4">
          <p>
            Ao realizar um pedido através do Site, você concorda em adquirir produtos apenas para uso 
            pessoal ou para presentear, e não para revenda comercial.
          </p>
          <p>
            <strong>Processo de Compra:</strong>
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Seleção dos produtos desejados</li>
            <li>Revisão do carrinho de compras</li>
            <li>Preenchimento dos dados de entrega e pagamento</li>
            <li>Confirmação do pedido</li>
            <li>Recebimento do e-mail de confirmação</li>
          </ol>
          <p>
            Todos os pedidos estão sujeitos à disponibilidade de estoque e confirmação do preço. 
            Eventuais erros de preço ou descrição podem resultar no cancelamento do pedido.
          </p>
        </div>
      )
    },
    {
      id: "precos",
      title: "4. Preços e Pagamento",
      icon: FaBalanceScale,
      content: (
        <div className="space-y-4">
          <p>
            Todos os preços são exibidos em Reais (BRL) e incluem todos os impostos aplicáveis, 
            unless otherwise stated.
          </p>
          <p>
            <strong>Formas de Pagamento Aceitas:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cartão de crédito (em até 12x)</li>
            <li>Cartão de débito</li>
            <li>PIX (com 5% de desconto)</li>
            <li>Boleto bancário</li>
            <li>Transferência bancária</li>
          </ul>
          <p>
            Reservamo-nos o direito de alterar os preços a qualquer momento sem aviso prévio. 
            No entanto, tal alteração não afetará os pedidos já confirmados.
          </p>
        </div>
      )
    },
    {
      id: "entregas",
      title: "5. Prazos e Entregas",
      icon: FaShoppingCart,
      content: (
        <div className="space-y-4">
          <p>
            Os prazos de entrega são calculados a partir da confirmação do pagamento e podem variar 
            conforme a localidade do destinatário.
          </p>
          <p>
            <strong>Prazos Estimados:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Regiões Metropolitanas: 3-5 dias úteis</li>
            <li>Interior: 5-10 dias úteis</li>
            <li>Entregas Expressas: 1-2 dias úteis (mediante acréscimo no frete)</li>
          </ul>
          <p>
            Não nos responsabilizamos por atrasos causados por fatores beyond our control, 
            tais como problemas com transportadoras, condições climáticas adversas ou eventos 
            de força maior.
          </p>
        </div>
      )
    },
    {
      id: "trocas",
      title: "6. Trocas e Devoluções",
      icon: FaExclamationTriangle,
      content: (
        <div className="space-y-4">
          <p>
            Nossa política de trocas e devoluções segue as diretrizes do Código de Defesa do Consumidor.
          </p>
          <p>
            <strong>Direito de Arrependimento:</strong> Você tem até 7 dias corridos a partir do recebimento 
            do produto para desistir da compra, desde que o produto esteja em perfeitas condições, 
            com todos os acessórios e embalagem original.
          </p>
          <p>
            <strong>Produtos com Defeito:</strong> Em caso de defeito de fabricação, entre em contato 
            conosco dentro do prazo de garantia para orientações sobre a troca ou reparo.
          </p>
          <p>
            Para solicitar troca ou devolução, acesse a seção "Minhas Trocas" em sua conta ou entre 
            em contato com nosso atendimento ao cliente.
          </p>
        </div>
      )
    },
    {
      id: "propriedade",
      title: "7. Propriedade Intelectual",
      icon: FaLock,
      content: (
        <div className="space-y-4">
          <p>
            Todo o conteúdo do Site, incluindo but not limited to textos, gráficos, logos, ícones, 
            imagens, clipes de áudio, downloads digitais, compilações de dados e software, 
            é propriedade da TecnozHub ou de seus fornecedores de conteúdo e é protegido por 
            leis de direitos autorais brasileiras e internacionais.
          </p>
          <p>
            A compilação de todo o conteúdo do Site é de exclusiva propriedade da TecnozHub e 
            protegida pelas leis de direitos autorais.
          </p>
          <p>
            Você concorda em não reproduzir, duplicar, copiar, vender, revender ou explorar 
            comercialmente qualquer parte do Site, uso do Site ou acesso ao Site sem expressa 
            autorização por escrito de nossa parte.
          </p>
        </div>
      )
    },
    {
      id: "limitacao",
      title: "8. Limitação de Responsabilidade",
      icon: FaGavel,
      content: (
        <div className="space-y-4">
          <p>
            A TecnozHub não será responsável por quaisquer danos diretos, indiretos, incidentais, 
            especiais ou consequenciais resultantes do uso ou incapacidade de usar o Site ou 
            produtos adquiridos através do Site.
          </p>
          <p>
            Em nenhuma circunstância nossa responsabilidade total para com você por todos os 
            danos, perdas e causas de ação (seja em contrato, delito incluindo mas não limitado 
            a negligência, ou otherwise) excederá o valor pago por você, se algum, para acessar 
            ou usar o Site ou adquirir produtos através do Site.
          </p>
          <p>
            Não garantimos que o Site estará livre de erros, vírus ou outros componentes 
            prejudiciais, ou que defeitos serão corrigidos.
          </p>
        </div>
      )
    },
    {
      id: "lei",
      title: "9. Lei Aplicável e Jurisdição",
      icon: FaBalanceScale,
      content: (
        <div className="space-y-4">
          <p>
            Estes Termos serão regidos e interpretados de acordo com as leis da República Federativa 
            do Brasil, sem consideração a seus conflitos de disposições legais.
          </p>
          <p>
            Qualquer disputa decorrente ou relacionada a estes Termos ou ao uso do Site estará 
            sujeita à jurisdição exclusiva dos tribunais do Estado de São Paulo, Brasil.
          </p>
          <p>
            Você concorda que qualquer causa de ação que possa surgir sob estes Termos deve ser 
            iniciada dentro de um (1) ano após a causa de ação ter surgido; caso contrário, 
            tal causa de ação é permanentemente barrada.
          </p>
        </div>
      )
    },
    {
      id: "disposicoes",
      title: "10. Disposições Gerais",
      icon: FaFileContract,
      content: (
        <div className="space-y-4">
          <p>
            Se qualquer disposição destes Termos for considerada inválida, ilegal ou inexequível 
            por um tribunal de competência jurídica, tal disposição será eliminada ou limitada 
            à extensão mínima necessária, e as disposições remanescentes destes Termos permanecerão 
            em pleno vigor e efeito.
          </p>
          <p>
            Nossa falência em exercer ou executar qualquer direito ou disposição destes Termos 
            não constituirá uma renúncia a tal direito ou disposição.
          </p>
          <p>
            Estes Termos constituem o acordo completo entre você e a TecnozHub em relação ao 
            uso do Site e substituem todos os acordos anteriores e contemporâneos, 
            comunicações e propostas, whether oral or written, entre você e a TecnozHub.
          </p>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-base-100">
        <BackgroundParticles />
      {/* Hero Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Termos de Uso</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Conheça os termos e condições que regem o uso do nosso site e serviços
          </p>
          <div className="badge badge-secondary badge-lg p-5">
            Última atualização: {lastUpdate}
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="bg-base-200 rounded-2xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-base-content mb-4">Importante</h2>
                <p className="text-base-content/80">
                  Estes Termos de Uso constituem um acordo legal entre você e a TecnozHub. 
                  Recomendamos que você leia atentamente todos os termos antes de utilizar 
                  nosso site e serviços.
                </p>
              </div>

              {/* Terms Sections */}
              <div className="space-y-6">
                {termsSections.map(section => {
                  const Icon = section.icon
                  const isOpen = openSections[section.id]
                  
                  return (
                    <div key={section.id} className="bg-base-200 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-base-300 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 text-primary rounded-lg p-2">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-semibold text-base-content">{section.title}</span>
                        </div>
                        {isOpen ? (
                          <FaChevronUp className="w-4 h-4 flex-shrink-0 text-primary" />
                        ) : (
                          <FaChevronDown className="w-4 h-4 flex-shrink-0 text-base-content/70" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="p-6 pt-0 border-t border-base-300">
                          <div className="text-base-content/80">
                            {section.content}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Contact for Questions */}
              <div className="mt-12 bg-primary/10 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-semibold text-base-content mb-4">
                  Ainda com dúvidas sobre nossos Termos de Uso?
                </h3>
                <p className="text-base-content/70 mb-6">
                  Nossa equipe jurídica está disponível para esclarecer qualquer questão
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/contato" className="btn btn-primary">
                    Entrar em Contato
                  </Link>
                  <Link href="/politica-privacidade" className="btn btn-outline btn-primary">
                    Ver Política de Privacidade
                  </Link>
                </div>
              </div>

              {/* Acceptance */}
              <div className="mt-8 bg-base-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary rounded-lg p-2 mt-1">
                    <FaFileContract className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base-content mb-2">Aceitação dos Termos</h4>
                    <p className="text-base-content/70">
                      Ao utilizar nosso site e serviços, você declara que leu, compreendeu e 
                      concorda com estes Termos de Uso em sua integralidade.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}