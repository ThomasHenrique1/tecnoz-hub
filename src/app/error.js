// src/app/error.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function GlobalError({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error("Unhandled render error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center  from-gray-50 to-blue-50 p-6">
      <div className="max-w-md w-full rounded-2xl shadow-xl p-8 text-center">
        {/* Ícone de erro */}
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg 
            className="w-10 h-10 text-red-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>

        {/* Título e descrição */}
        <h1 className="text-3xl font-bold  mb-3">
          Oops! Algo deu errado
        </h1>
        
        <p className="text-gray-600 mb-2">
          Desculpe, encontramos um problema inesperado.
        </p>

        
        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">

          <Button 
            onClick={() => reset()}
            variant = "primary"
            className="justify-center flex-1 px6 py-4 rounded-lg to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 transition-all duration-200 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Tentar novamente
          </Button>
                    
          <Button
            onClick={() => router.push("/")}
            className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Pagina inicial
          </Button>
          
        </div>

        {/* Link de contato/suporte */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Se o problema persistir,{" "}
            <button 
              onClick={() => router.push("/contato")}
              className="text-blue-500 hover:text-blue-600 underline transition-colors"
            >
              entre em contato com o suporte
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}