import { CarrinhoProvider } from "@/context/CarrinhoContext"
import Navbar from "@/components/Navbar/Navbar"
import Footer from "@/components/Footer/Footer"
import { ErrorProvider } from "@/context/ErrorProvider"
import './globals.css'

export const metadata = {
  title: {
    default: "TecnozHub - Sua Loja de Tecnologia",
    template: "%s | TecnozHub"
  },
  description: "Encontre os melhores produtos de tecnologia com os preços mais competitivos. Smartphones, laptops, acessórios e muito mais.",
  keywords: "tecnologia, smartphones, laptops, eletrônicos, acessórios, loja online",
  authors: [{ name: "TecnozHub Team" }],
  creator: "TecnozHub",
  publisher: "TecnozHub",
  openGraph: {
    title: "TecnozHub - Sua Loja de Tecnologia",
    description: "Encontre os melhores produtos de tecnologia com os preços mais competitivos.",
    type: 'website',
    locale: 'pt_BR',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="https://ypxcrzudxqtntiksnydu.supabase.co/storage/v1/object/public/favicon/android-chrome-512x512.png" sizes="any" />
        <link rel="apple-touch-icon" href="https://ypxcrzudxqtntiksnydu.supabase.co/storage/v1/object/public/favicon/apple-touch-icon.png" />
        
        {/* Meta tags essenciais */}
        <meta name="theme-color" content="#3B82F6" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "TecnozHub",
              "description": "Sua loja de tecnologia de confiança",
              "url": "https://tecnohub.com.br",
            })
          }}
        />
      </head>
      
      <body className="min-h-screen bg-base-100 flex flex-col">
        <CarrinhoProvider>
          {/* Header */}
          <Navbar />
          
          {/* Conteúdo Principal */}
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          
          {/* Footer */}
          <Footer />
          <ErrorProvider />

        </CarrinhoProvider>
        
      </body>
    </html>
  )
}