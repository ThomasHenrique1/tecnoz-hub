// src/app/erro/page.jsx
import Link from "next/link";

export default function ErroPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-lg w-full  rounded-2xl shadow-lg p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Ação não concluída</h1>
        <p className="text-sm  mb-4">
          Não foi possível completar a ação. Tente novamente ou contate o suporte.
        </p>

        <div className="flex gap-3 justify-center">
          <Link href="/" className="px-4 py-2 rounded-lg border">
            Voltar
          </Link>
          <Link href="/contato" className="px-4 py-2 rounded-lg bg-primary ">
            Suporte
          </Link>
        </div>
      </div>
    </div>
  );
}
