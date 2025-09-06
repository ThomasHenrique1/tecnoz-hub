import { FaShieldAlt, FaTruck, FaUndo, FaHeadphones } from "react-icons/fa"

export default function FeaturesSection() {
  const features = [
    {
      icon: FaShieldAlt,
      title: "Garantia Extendida",
      description: "Todos os produtos com garantia de até 2 anos"
    },
    {
      icon: FaTruck,
      title: "Entrega Rápida",
      description: "Entregas para todo o Brasil em até 5 dias úteis"
    },
    {
      icon: FaUndo,
      title: "Trocas Fáceis",
      description: "Política de trocas simplificada em 30 dias"
    },
    {
      icon: FaHeadphones,
      title: "Suporte 24/7",
      description: "Atendimento especializado sempre disponível"
    }
  ]

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            Por que escolher a TecnoZHub?
          </h2>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            Oferecemos a melhor experiência em compras de tecnologia online
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-2xl">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <h3 className="font-semibold text-base-content mb-2 text-lg">
                {feature.title}
              </h3>
              
              <p className="text-base-content/70 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}