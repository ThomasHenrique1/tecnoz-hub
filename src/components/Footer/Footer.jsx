// components/Footer/Footer.jsx
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp, FaEnvelope, FaClock, FaPhoneAlt, FaCreditCard, FaQrcode, FaBarcode, FaPaypal} from 'react-icons/fa'
import { HiShoppingBag, HiSupport, HiQuestionMarkCircle, HiUserGroup } from 'react-icons/hi'

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <HiShoppingBag className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold text-base-content">TecnozHub</h3>
            </div>
            <p className="text-base-content/70 text-sm leading-relaxed mb-6">
              Sua loja de tecnologia de confiança. Oferecemos os melhores produtos 
              com garantia de qualidade e entrega rápida para todo o Brasil.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="p-2 bg-base-300 rounded-lg hover:bg-primary hover:text-primary-content transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-base-300 rounded-lg hover:bg-pink-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-base-300 rounded-lg hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-base-300 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base-content mb-6 flex items-center gap-2">
              <HiSupport className="h-5 w-5 text-primary" />
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/produtos", label: "Nossos Produtos", icon: HiShoppingBag },
                { href: "/sobre", label: "Sobre Nós", icon: HiUserGroup },
                { href: "/contato", label: "Fale Conosco", icon: FaWhatsapp },
                { href: "/faq", label: "Perguntas Frequentes", icon: HiQuestionMarkCircle },
              ].map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href} 
                    className="text-base-content/70 hover:text-primary transition-colors duration-200 flex items-center gap-2 group text-sm"
                  >
                    {item.icon && <item.icon className="h-4 w-4 opacity-70 group-hover:opacity-100" />}
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-base-content mb-6 flex items-center gap-2">
              <HiShoppingBag className="h-5 w-5 text-primary" />
              Categorias
            </h4>
            <ul className="space-y-3">
              {[
                "Laptops & Computadores",
                "Acessórios",
                "Headphones",
                "Gaming",
                "Periféricos"
              ].map((category) => (
                <li key={category}>
                  <a 
                    href={`/produtos?categoria=${encodeURIComponent(category)}`}
                    className="text-base-content/70 hover:text-primary transition-colors duration-200 text-sm block py-1"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-base-content mb-6 flex items-center gap-2">
              <FaPhoneAlt className="h-5 w-5 text-primary" />
              Contato & Suporte
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FaWhatsapp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-base-content font-medium text-sm">WhatsApp</p>
                  <a 
                    href="https://wa.me/5511999999999" 
                    className="text-base-content/70 hover:text-primary transition-colors text-sm"
                  >
                    (11) 99999-9999
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FaEnvelope className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-base-content font-medium text-sm">Email</p>
                  <a 
                    href="mailto:contato@tecnohub.com.br" 
                    className="text-base-content/70 hover:text-primary transition-colors text-sm"
                  >
                    contato@tecnohub.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FaClock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-base-content font-medium text-sm">Horário</p>
                  <p className="text-base-content/70 text-sm">
                    Seg à Sex: 9h-18h<br />
                    Sáb: 9h-14h
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6 p-4 bg-base-300/50 rounded-lg">
              <h5 className="font-medium text-base-content mb-2 text-sm">Newsletter</h5>
              <p className="text-base-content/70 text-xs mb-3">
                Cadastre-se para receber ofertas exclusivas
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Seu email" 
                  className="input input-bordered input-sm flex-1" 
                />
                <button className="btn btn-primary btn-sm">
                  <FaEnvelope className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-300 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-base-content/60 text-sm text-center lg:text-left">
              © {new Date().getFullYear()} TecnozHub. Todos os direitos reservados.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a 
                href="/termos" 
                className="text-base-content/60 hover:text-primary transition-colors"
              >
                Termos de Uso
              </a>
              <a 
                href="/privacidade" 
                className="text-base-content/60 hover:text-primary transition-colors"
              >
                Política de Privacidade
              </a>
            </div>
          </div>

          {/* Payment Methods */}
         <div className="text-center">
    <p className="text-base-content/70 text-sm mb-4 font-medium">Métodos de pagamento aceitos:</p>
  <div className="flex justify-center gap-4">
    <div className="flex flex-col items-center group">
      <div className="bg-base-100 rounded-lg p-3 shadow-md border border-base-300 group-hover:shadow-lg group-hover:border-primary/30 transition-all duration-300">
        <FaCreditCard className="text-2xl text-blue-500" />
      </div>
      <span className="text-xs mt-2 text-base-content/70 group-hover:text-primary transition-colors">Cartão</span>
    </div>
    
    <div className="flex flex-col items-center group">
      <div className="bg-base-100 rounded-lg p-3 shadow-md border border-base-300 group-hover:shadow-lg group-hover:border-primary/30 transition-all duration-300">
        <FaQrcode className="text-2xl text-purple-500" />
      </div>
      <span className="text-xs mt-2 text-base-content/70 group-hover:text-primary transition-colors">PIX</span>
    </div>
    
    <div className="flex flex-col items-center group">
      <div className="bg-base-100 rounded-lg p-3 shadow-md border border-base-300 group-hover:shadow-lg group-hover:border-primary/30 transition-all duration-300">
        <FaBarcode className="text-2xl text-green-500" />
      </div>
      <span className="text-xs mt-2 text-base-content/70 group-hover:text-primary transition-colors">Boleto</span>
    </div>
    
    <div className="flex flex-col items-center group">
      <div className="bg-base-100 rounded-lg p-3 shadow-md border border-base-300 group-hover:shadow-lg group-hover:border-primary/30 transition-all duration-300">
        <FaPaypal className="text-2xl text-blue-600" />
      </div>
      <span className="text-xs mt-2 text-base-content/70 group-hover:text-primary transition-colors">PayPal</span>
    </div>
  </div>
</div>
        </div>
      </div>
    </footer>
  )
}