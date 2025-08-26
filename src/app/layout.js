import { CarrinhoProvider } from "@/context/CarrinhoContext"
import Navbar from "@/components/Navbar/Navbar"
import './globals.css' 

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" data-theme="light">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>TecnozHub</title>
      <head>
      </head>
      <body className="min-h-screen bg-base-100"> {/* Adicione classes Tailwind */}
        <CarrinhoProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-6"> {/* Container para o conteúdo */}
            {children}
          </main>
        </CarrinhoProvider>
      </body>
    </html>
  )
}