"use client"

import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-base-100 dark:from-primary-900/10 dark:to-base-900 px-4 py-8">
      <div className="max-w-lg w-full text-center">
        {/* Ilustração / Badge */}
        <div className="relative mb-8">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/800 dark:to-primary/700 rounded-full flex items-center justify-center shadow-xl">
            <div className="text-8xl font-extrabold text-primary dark:text-primary-content">404</div>
          </div>

          <div className="absolute -top-4 -right-4 w-24 h-24 bg-error/10 dark:bg-error/20 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-error"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8a7.962 7.962 0 01-2 5.291"
              />
            </svg>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-base-content dark:text-white">
            Página não encontrada
          </h1>

          <p className="text-lg text-base-content/70 dark:text-base-content/60 leading-relaxed">
            Ops! A página que você está procurando não existe, foi movida ou está temporariamente indisponível.
          </p>
        </div>

        {/* Sugestões */}
        <div className="bg-primary/8 dark:bg-primary/900 border border-primary/20 dark:border-primary/800 rounded-xl p-4 mb-8 text-left">
          <h3 className="font-semibold text-primary dark:text-primary-content mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Sugestões:
          </h3>

          <ul className="text-sm text-primary dark:text-primary-content/80 space-y-1 list-disc list-inside">
            <li>Verifique se o endereço está correto</li>
            <li>Volte para a página anterior</li>
            <li>Ou retorne à página inicial</li>
          </ul>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-base-100 dark:bg-base-800 border border-base-300 dark:border-base-700 text-base-content dark:text-base-content rounded-xl hover:bg-base-200 dark:hover:bg-base-900 transition-all duration-200 font-medium shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </button>

          <button
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-base-100 dark:bg-base-800 border border-base-300 dark:border-base-700 text-base-content dark:text-base-content rounded-xl hover:bg-base-200 dark:hover:bg-base-900 transition-all duration-200 font-medium shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Página Inicial
          </button>
        </div>

        {/* Link de ajuda */}
        <div className="mt-8 pt-6 border-t border-base-200 dark:border-base-700">
          <p className="text-sm text-base-content/60 dark:text-base-content/50">
            Precisa de ajuda?{" "}
            <a
              href="/contato"
              className="text-primary hover:text-primary-focus dark:text-primary-content font-medium transition-colors"
            >
              Entre em contato com o suporte
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
