
import "./globals.css";

export const metadata = {
  title: "Tecnoz Hub",
  description: "Seu mundo digital começa aqui",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" data-theme="light">
      <body>
        
        <main className="p-4">{children}</main>
      </body>
    </html>
  )
}
