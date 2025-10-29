// src/app/politica-privacidade/page.jsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  FaChevronDown, 
  FaChevronUp,
  FaShieldAlt,
  FaUserLock,
  FaDatabase,
  FaCookie,
  FaEye,
  FaTrash,
  FaEdit,
  FaKey,
  FaUserCheck,
  FaExclamationTriangle
} from "react-icons/fa"
import { BackgroundParticles } from "@/components/ui/BackgroundParticles"

export default function PrivacyPolicyPage() {
  const [openSections, setOpenSections] = useState({})

  const toggleSection = (id) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const lastUpdate = "15 de Janeiro de 2024"

  const privacySections = [
    {
      id: "introducao",
      title: "1. Introdução",
      icon: FaShieldAlt,
      content: (
        <div className="space-y-4">
          <p>
            A TecnozHub ("nós", "nosso" ou "nossa") valoriza sua privacidade e está comprometida 
            em proteger seus dados pessoais. Esta Política de Privacidade explica como coletamos, 
            usamos, compartilhamos e protegemos suas informações quando você utiliza nosso site 
            e serviços.
          </p>
          <p>
            Ao acessar ou utilizar nosso site, você concorda com os termos desta Política de 
            Privacidade.
          </p>
          <p>
            Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) 
            e outras legislações aplicáveis de proteção de dados.
          </p>
        </div>
      )
    },
    {
      id: "dados-coletados",
      title: "2. Dados que Coletamos",
      icon: FaDatabase,
      content: (
        <div className="space-y-4">
          <p>Coletamos diferentes tipos de dados para fornecer e melhorar nossos serviços:</p>
          
          <h4 className="font-semibold mt-6 mb-3">Dados Pessoais Fornecidos por Você:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone</li>
            <li>Endereço de entrega e faturamento</li>
            <li>Documentos de identificação (para determinadas transações)</li>
            <li>Dados de pagamento (processados por gateways seguros)</li>
          </ul>

          <h4 className="font-semibold mt-6 mb-3">Dados Coletados Automaticamente:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Endereço IP e tipo de dispositivo</li>
            <li>Dados de navegação e cliques</li>
            <li>Informações de cookies e tecnologias similares</li>
            <li>Dados de uso do site e interações</li>
          </ul>

          <h4 className="font-semibold mt-6 mb-3">Dados de Terceiros:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Dados de redes sociais (quando você se conecta através delas)</li>
            <li>Informações de serviços de análise</li>
            <li>Dados de parceiros de marketing</li>
          </ul>
        </div>
      )
    },
    {
      id: "uso-dados",
      title: "3. Como Utilizamos Seus Dados",
      icon: FaEye,
      content: (
        <div className="space-y-4">
          <p>Utilizamos seus dados pessoais para as seguintes finalidades:</p>
          
          <h4 className="font-semibold mt-6 mb-3">Finalidades Principais:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Processar e entregar seus pedidos</li>
            <li>Gerenciar sua conta de usuário</li>
            <li>Fornecer suporte ao cliente</li>
            <li>Processar pagamentos e prevenir fraudes</li>
            <li>Cumprir obrigações legais e regulatórias</li>
          </ul>

          <h4 className="font-semibold mt-6 mb-3">Finalidades Legítimas:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personalizar sua experiência de compra</li>
            <li>Enviar comunicações de marketing (com seu consentimento)</li>
            <li>Melhorar nossos produtos e serviços</li>
            <li>Realizar pesquisas e análises de mercado</li>
            <li>Detectar, prevenir e abordar questões técnicas</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
            <p className="text-blue-700">
              <strong>Base Legal:</strong> Todo processamento de dados é realizado com base 
              em uma das bases legais previstas na LGPD, como consentimento, execução de contrato, 
              obrigação legal ou interesse legítimo.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "compartilhamento",
      title: "4. Compartilhamento de Dados",
      icon: FaUserCheck,
      content: (
        <div className="space-y-4">
          <p>Seus dados podem ser compartilhados com:</p>
          
          <h4 className="font-semibold mt-6 mb-3">Prestadores de Serviços:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Empresas de transporte e logística</li>
            <li>Processadores de pagamento</li>
            <li>Plataformas de e-mail marketing</li>
            <li>Serviços de análise de dados</li>
            <li>Prestadores de serviços de TI e hospedagem</li>
          </ul>

          <h4 className="font-semibold mt-6 mb-3">Autoridades Legais:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Quando exigido por lei, regulamento ou processo legal</li>
            <li>Para proteger nossos direitos, propriedade ou segurança</li>
            <li>Para prevenir fraudes ou atividades ilegais</li>
          </ul>

          <h4 className="font-semibold mt-6 mb-3">Parceiros de Negócios:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Em casos de fusão, aquisição ou venda de ativos</li>
            <li>Com empresas parceiras para ofertas conjuntas (com seu consentimento)</li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
            <p className="text-yellow-700">
              <strong>Importante:</strong> Exigimos que todos os terceiros respeitem a segurança 
              de seus dados e os tratem de acordo com a lei. Não permitimos que nossos prestadores 
              de serviços utilizem seus dados pessoais para seus próprios fins.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "cookies",
      title: "5. Cookies e Tecnologias Similares",
      icon: FaCookie,
      content: (
        <div className="space-y-4">
          <p>
            Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar 
            tráfego e personalizar conteúdo e anúncios.
          </p>
          
          <h4 className="font-semibold mt-6 mb-3">Tipos de Cookies que Utilizamos:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Essenciais:</strong> Necessários para o funcionamento básico do site
            </li>
            <li>
              <strong>Desempenho:</strong> Coletam informações sobre como os visitantes usam o site
            </li>
            <li>
              <strong>Funcionalidade:</strong> Permitem que o site forneça funcionalidades melhoradas
            </li>
            <li>
              <strong>Publicidade:</strong> Usados para entregar anúncios relevantes aos seus interesses
            </li>
          </ul>

          <h4 className="font-semibold mt-6 mb-3">Controle de Cookies:</h4>
          <p>
            Você pode controlar e/ou excluir cookies como desejar. Você pode excluir todos os 
            cookies que já estão no seu computador e configurar a maioria dos navegadores para 
            impedir que sejam colocados. No entanto, se você fizer isso, pode ter que ajustar 
            manualmente algumas preferências cada vez que visitar nosso site.
          </p>

          <div className="bg-base-200 p-4 rounded-lg mt-6">
            <p className="text-base-content">
              Utilizamos a seguinte ferramenta para gerenciamento de consentimento de cookies: 
              <strong> CookieYes</strong>. Você pode alterar suas preferências a qualquer momento 
              através do botão "Gerenciar Cookies" no rodapé do site.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "seguranca",
      title: "6. Segurança de Dados",
      icon: FaKey,
      content: (
        <div className="space-y-4">
          <p>
            Implementamos medidas de segurança técnicas e organizacionais apropriadas para 
            proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação 
            ou destruição.
          </p>
          
          <h4 className="font-semibold mt-6 mb-3">Medidas de Segurança Implementadas:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Criptografia SSL em todas as transações</li>
            <li>Sistemas de armazenamento seguros</li>
            <li>Controle de acesso baseado em função</li>
            <li>Monitoramento contínuo de segurança</li>
            <li>Backups regulares dos dados</li>
            <li>Protocolos de segurança para pagamentos</li>
          </ul>

          <h4 className="font-semibold mt-6 mb-3">Seus Esforços de Segurança:</h4>
          <p>
            A segurança de seus dados também depende de você. Recomendamos que:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mantenha sua senha em sigilo</li>
            <li>Use senhas fortes e únicas</li>
            <li>Ative a autenticação de dois fatores quando disponível</li>
            <li>Evite usar redes públicas não seguras para acessar sua conta</li>
            <li>Mantenha seu software e antivírus atualizados</li>
          </ul>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-6">
            <p className="text-green-700">
              <strong>Notificação de Violação:</strong> Em caso de violação de dados que possa 
              resultar em risco para seus direitos e liberdades, notificaremos você e a autoridade 
              competente dentro do prazo legal estabelecido pela LGPD.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "direitos",
      title: "7. Seus Direitos de Privacidade",
      icon: FaUserLock,
      content: (
        <div className="space-y-4">
          <p>
            De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
          </p>
          
          <h4 className="font-semibold mt-6 mb-3">Direitos do Titular:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Acesso:</strong> Direito de confirmar e acessar seus dados
            </li>
            <li>
              <strong>Correção:</strong> Direito de retificar dados incompletos, inexatos ou desatualizados
            </li>
            <li>
              <strong>Eliminação:</strong> Direito de excluir dados desnecessários ou excessivos
            </li>
            <li>
              <strong>Portabilidade:</strong> Direito à portabilidade dos dados a outro fornecedor
            </li>
            <li>
              <strong>Informação:</strong> Direito a informações claras sobre o tratamento
            </li>
            <li>
              <strong>Revogação:</strong> Direito de revogar o consentimento a qualquer momento
            </li>
            <li>
              <strong>Oposição:</strong> Direito de se opor ao tratamento em determinadas circunstâncias
            </li>
            <li>
              <strong>Revisão:</strong> Direito à revisão de decisões automatizadas
            </li>
          </ul>

          <h4 className="font-semibold mt-6 mb-3">Como Exercer Seus Direitos:</h4>
          <p>
            Para exercer qualquer um desses direitos, entre em contato conosco através dos 
            canais indicados na seção "Contato" desta política. Responderemos a todas as 
            solicitações dentro do prazo legal de 15 dias.
          </p>

          <div className="bg-base-200 p-4 rounded-lg mt-6">
            <p className="text-base-content">
              <strong>Identificação:</strong> Podemos solicitar informações adicionais para 
              verificar sua identidade antes de processar sua solicitação, como medida de 
              segurança para proteger seus dados.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "retencao",
      title: "8. Retenção de Dados",
      icon: FaDatabase,
      content: (
        <div className="space-y-4">
          <p>
            Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades 
            para as quais foram coletados, incluindo para fins de cumprimento de obrigações legais, 
            contábeis ou de relatórios.
          </p>
          
          <h4 className="font-semibold mt-6 mb-3">Prazos de Retenção:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Dados de pedidos:</strong> 5 anos (para cumprimento de obrigações fiscais)
            </li>
            <li>
              <strong>Dados de conta inativa:</strong> 2 anos após última atividade
            </li>
            <li>
              <strong>Registros de suporte:</strong> 3 anos após o encerramento do atendimento
            </li>
            <li>
              <strong>Dados de marketing:</strong> Até a revogação do consentimento
            </li>
            <li>
              <strong>Cookies:</strong> De acordo com a política de cada cookie
            </li>
          </ul>

          <h4 className="font-semibold mt-6 mb-3">Eliminação de Dados:</h4>
          <p>
            Após expiração dos prazos de retenção, seus dados pessoais serão eliminados ou 
            anonimizados de forma segura. Dados anonimizados podem ser retidos indefinidamente 
            para fins estatísticos ou de pesquisa.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
            <p className="text-blue-700">
              <strong>Exceções:</strong> Podemos reter determinadas informações por períodos 
              mais longos quando exigido ou permitido por lei, ou para estabelecer, exercer ou 
              defender direitos legais.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "menores",
      title: "9. Privacidade de Menores",
      icon: FaExclamationTriangle,
      content: (
        <div className="space-y-4">
          <p>
            Nosso site não é destinado a menores de 18 anos. Não coletamos intencionalmente 
            informações pessoais de crianças. Se você é pai/mãe ou responsável e acredita que 
            seu filho nos forneceu dados pessoais, entre em contato conosco.
          </p>
          
          <p>
            Se tomarmos conhecimento de que coletamos dados pessoais de menores sem verificação 
            do consentimento parental, tomaremos medidas para remover essas informações de 
            nossos servidores.
          </p>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-6">
            <p className="text-red-700">
              <strong>Importante:</strong> Se você tem menos de 18 anos, precisa obter 
              permissão de seu pai ou responsável antes de nos fornecer qualquer informação 
              pessoal.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "alteracoes",
      title: "10. Alterações nesta Política",
      icon: FaEdit,
      content: (
        <div className="space-y-4">
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças 
            em nossas práticas ou por outros motivos operacionais, legais ou regulatórios.
          </p>
          
          <p>
            Quando fizermos alterações significativas, notificaremos você por e-mail (para 
            alterações que afetem substancialmente nossos practices de tratamento) ou por meio 
            de um aviso em nosso site antes que a alteração se torne efetiva.
          </p>

          <p>
            A versão atualizada será indicada pela data "Última atualização" no início desta 
            política. Recomendamos que você revise esta política periodicamente para se manter 
            informado sobre como estamos protegendo suas informações.
          </p>

          <div className="bg-base-200 p-4 rounded-lg mt-6">
            <p className="text-base-content">
              <strong>Uso Continuado:</strong> O uso contínuo de nosso site após quaisquer 
              alterações nesta política constitui sua aceitação das mesmas.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "contato",
      title: "11. Contato e DPO",
      icon: FaUserLock,
      content: (
        <div className="space-y-4">
          <p>
            Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de 
            Privacidade ou ao tratamento de seus dados pessoais, entre em contato conosco ou 
            com nosso Encarregado de Proteção de Dados (DPO).
          </p>
          
          <h4 className="font-semibold mt-6 mb-3">Encarregado de Proteção de Dados (DPO):</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Nome:</strong> Ana Silva</li>
            <li><strong>E-mail:</strong> dpo@tecnohub.com</li>
            <li><strong>Telefone:</strong> (11) 3333-4444</li>
          </ul>

          <h4 className="font-semibold mt-6 mb-3">Canais de Atendimento:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>E-mail:</strong> privacidade@tecnohub.com</li>
            <li><strong>Telefone:</strong> (11) 3333-3333</li>
            <li><strong>WhatsApp:</strong> (11) 99999-9999</li>
            <li><strong>Endereço:</strong> Av. Paulista, 1000, São Paulo - SP, 01310-100</li>
          </ul>

          <h4 className="font-semibold mt-6 mb-3">Autoridade Nacional de Proteção de Dados (ANPD):</h4>
          <p>
            Caso não fique satisfeito com nossa resposta, você tem o direito de apresentar uma 
            reclamação à Autoridade Nacional de Proteção de Dados (ANPD):
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Site:</strong> www.gov.br/anpd</li>
            <li><strong>E-mail:</strong> ouvidoria@anpd.gov.br</li>
          </ul>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-base-100">
      <BackgroundParticles />
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Política de Privacidade</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Saiba como protegemos e tratamos seus dados pessoais
          </p>
          <div className="badge badge-secondary badge-lg p-5">
            Última atualização: {lastUpdate}
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="bg-base-200 rounded-2xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-base-content mb-4">Nossa Compromisso</h2>
                <p className="text-base-content/80">
                  Na TecnozHub, levamos a privacidade e a proteção de dados a sério. Esta política 
                  explica de forma transparente como coletamos, usamos e protegemos suas informações 
                  pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                </p>
              </div>

              {/* Privacy Sections */}
              <div className="space-y-6">
                {privacySections.map(section => {
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

              {/* Quick Actions */}
              <div className="mt-12  text-center gap-6">
                <div className="bg-primary/10 rounded-2xl p-6 text-center">
                  <FaUserLock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-base-content mb-4">
                    Exercer Seus Direitos
                  </h3>
                  <p className="text-base-content/70 mb-6">
                    Solicite acesso, correção ou exclusão de seus dados pessoais
                  </p>
                  <Link href="/contato" className="btn btn-primary">
                    Solicitar Agora
                  </Link>
                </div>
              </div>

              {/* Acceptance */}
              <div className="mt-8 bg-base-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary rounded-lg p-2 mt-1">
                    <FaShieldAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base-content mb-2">Transparência e Confiança</h4>
                    <p className="text-base-content/70">
                      Estamos comprometidos em proteger sua privacidade e ser transparentes sobre 
                      como tratamos seus dados. Ao utilizar nossos serviços, você confia em nós 
                      com suas informações, e levamos essa responsabilidade muito a sério.
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