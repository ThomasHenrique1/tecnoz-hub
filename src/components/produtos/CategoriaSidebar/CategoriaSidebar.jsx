export default function CategoriaSidebar({
  categorias,
  categoriaSelecionada,
  onCategoriaChange,
  produtosCount
}) {
  return (
    <aside className="lg:w-80"> {/* Largura fixa mais generosa */}
      <div className="bg-base-200 rounded-2xl p-6 shadow-lg border border-base-300 ">
        {/* Header mais elegante */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-base-content mb-2 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            Categorias
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
        </div>
        
        {/* Lista de categorias com design mais clean */}
        <div className="space-y-3">
          <button
            onClick={() => onCategoriaChange("Todas")}
            className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
              categoriaSelecionada === "Todas"
                ? "bg-gradient-to-r from-primary to-primary/90 text-primary-content shadow-lg transform scale-[1.02]"
                : "bg-base-100 hover:bg-base-300 hover:shadow-md text-base-content border border-base-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                categoriaSelecionada === "Todas" 
                  ? "bg-primary-content/20" 
                  : "bg-base-200 group-hover:bg-base-300"
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <span className="font-medium">Todas as Categorias</span>
            </div>
            {categoriaSelecionada === "Todas" && (
              <div className="w-2 h-2 bg-primary-content rounded-full"></div>
            )}
          </button>

          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoriaChange(cat)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                cat === categoriaSelecionada
                  ? "bg-gradient-to-r from-primary to-primary/90 text-primary-content shadow-lg transform scale-[1.02]"
                  : "bg-base-100 hover:bg-base-300 hover:shadow-md text-base-content border border-base-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  cat === categoriaSelecionada 
                    ? "bg-primary-content/20" 
                    : "bg-base-200 group-hover:bg-base-300"
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <span className="font-medium">{cat}</span>
              </div>
              {cat === categoriaSelecionada && (
                <div className="w-2 h-2 bg-primary-content rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Contador de produtos mais elegante */}
        <div className="mt-8 p-4 bg-gradient-to-r from-base-300 to-base-200 rounded-xl border border-base-300">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-base-content/80">
              Produtos encontrados
            </span>
            <span className="text-lg font-bold text-primary bg-base-100 px-3 py-1 rounded-lg">
              {produtosCount}
            </span>
          </div>
          <div className="mt-2 w-full bg-base-100 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-1 rounded-full transition-all duration-500"
              style={{ 
                width: `${Math.min((produtosCount / 50) * 100, 100)}%` 
              }}
            ></div>
          </div>
        </div>
      </div>
    </aside>
  )
}