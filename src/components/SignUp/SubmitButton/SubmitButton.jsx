'use client'

export default function SubmitButton({ loading, children, className = '' }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`relative w-full px-6 py-3 bg-gradient-to-r from-primary to-primary-focus text-white font-semibold rounded-btn overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-80 disabled:cursor-not-allowed group transform hover:-translate-y-0.5 active:translate-y-0 ${className}`}
      style={{ borderRadius: 'var(--radius-field, 0.5rem)' }}
    >
      {/* Camada de fundo animada */}
      <span className="absolute inset-0 bg-gradient-to-r from-primary-focus to-primary opacity-0 group-hover:opacity-100 transition-all duration-300 z-0"></span>
      
      {/* Efeito de brilho */}
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity duration-300 z-0"></span>

      {/* Conteúdo */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <svg 
            className="animate-spin h-4 w-4 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </span>

      {/* Efeito de borda sutil no hover */}
      <span className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-btn transition-all duration-300 z-0"></span>
    </button>
  )
}