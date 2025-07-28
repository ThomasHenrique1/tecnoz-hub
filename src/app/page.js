// src/app/page.jsx

"use client"

import Navbar from "@/components/Navbar/Navbar"
import Link from "next/link"

export default function HomePage() {
  const categorias = [
    "Placa-Mãe",
    "Memória RAM",
    "Cooler",
    "FAN",
    "Mouse",
    "Teclado",
    "Fone",
    "Gabinete",
  ]

  return (
     
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo à TecnoZHub</h1>
<Navbar></Navbar>
      <p className="mb-6 text-gray-700">
        Este projeto foi criado com o objetivo de organizar e disponibilizar informações
        sobre peças de hardware de forma prática. Ideal para testes, catálogos, organização interna
        e futuras vendas.
      </p>

      <section>
        <h2 className="text-xl font-semibold mb-4">Categorias de produtos</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categorias.map((categoria) => (
            <Link
              key={categoria}
              href={`/produtos?categoria=${encodeURIComponent(categoria)}`}
              className="block p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition"
            >
              {categoria}
            </Link>
          ))}
        </div>
      </section>
    </main>
  
  )
}
