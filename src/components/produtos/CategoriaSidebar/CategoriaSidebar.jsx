export default function CategoriaSidebar({
  categorias,
  categoriaSelecionada,
  onCategoriaChange,
  produtosCount
}) {
  return (
    <aside className="lg:w-1/4">
      <div className="bg-base-200 rounded-2xl p-6 shadow-sm sticky top-24">
        <h2 className="text-xl font-bold text-base-content mb-6 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Categorias
        </h2>
        
        <div className="space-y-2">
          <button
            onClick={() => onCategoriaChange("Todas")}
            className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
              categoriaSelecionada === "Todas"
                ? "bg-primary text-primary-content shadow-md"
                : "bg-base-100 hover:bg-base-300 text-base-content"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Todas as Categorias
          </button>

          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoriaChange(cat)}
              className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                cat === categoriaSelecionada
                  ? "bg-primary text-primary-content shadow-md"
                  : "bg-base-100 hover:bg-base-300 text-base-content"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-6 p-3 bg-base-300 rounded-lg">
          <p className="text-sm text-base-content/70">
            {produtosCount} produto{produtosCount !== 1 ? 's' : ''} encontrado{produtosCount !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </aside>
  )
}