import { CarrinhoProvider } from "@/context/CarrinhoContext"

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <CarrinhoProvider>
          {children}
        </CarrinhoProvider>
      </body>
    </html>
  )
}
