import { FaStar } from "react-icons/fa"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Designer Gráfico",
      rating: 5,
      comment: "Produtos de alta qualidade e entrega super rápida. Recomendo!",
      avatar: "https://ypxcrzudxqtntiksnydu.supabase.co/storage/v1/object/public/image-logo/designer-no-trabalho-no-escritorio.jpg"
    },
    {
      name: "Maria Santos",
      role: "Desenvolvedora",
      rating: 5,
      comment: "Atendimento excelente e preços imbatíveis. Minha loja favorita!",
      avatar: "https://ypxcrzudxqtntiksnydu.supabase.co/storage/v1/object/public/image-logo/proprietario-da-empresa-trabalhando-em-sua-estrategia.jpg"
    },
    {
      name: "João Pereira",
      role: "Gamer",
      rating: 5,
      comment: "Melhor custo-benefício do mercado. Sempre compro aqui!",
      avatar: "https://ypxcrzudxqtntiksnydu.supabase.co/storage/v1/object/public/image-logo/homem-de-desenho-animado-com-oculos.jpg"
    }
  ]

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            Confira as avaliações de quem já comprou na nossa loja
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card bg-base-200 border border-base-300 p-6">
              <div className="flex items-center mb-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={testimonial.avatar} alt={testimonial.name} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-base-content/60">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                ))}
              </div>
              
              <p className="text-base-content/80 italic">
                "{testimonial.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}