export default function LoadingPedidos() {
  return (
    <div className="space-y-4 md:space-y-6 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div 
          key={i} 
          className="card bg-base-100 shadow-sm border border-base-300 rounded-box"
          style={{ borderRadius: 'var(--radius-box, 1rem)' }}
        >
          <div className="card-body p-4 md:p-6">
            {/* Cabeçalho */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="h-6 w-40 bg-base-300 rounded-selector" 
                   style={{ borderRadius: 'var(--radius-selector, 0.5rem)' }}></div>
              <div className="h-5 w-28 bg-base-300 rounded-selector" 
                   style={{ borderRadius: 'var(--radius-selector, 0.5rem)' }}></div>
            </div>
            
            {/* Itens */}
            <div className="space-y-4 mt-4">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="flex gap-4 items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-base-300 rounded-box" 
                       style={{ borderRadius: 'var(--radius-box, 1rem)' }}></div>
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="h-4 w-3/4 bg-base-300 rounded-field" 
                         style={{ borderRadius: 'var(--radius-field, 2rem)' }}></div>
                    <div className="h-3 w-1/2 bg-base-300 rounded-field" 
                         style={{ borderRadius: 'var(--radius-field, 2rem)' }}></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Rodapé */}
            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 mt-4 pt-4 border-t border-base-300">
              <div className="h-4 w-32 bg-base-300 rounded-field" 
                   style={{ borderRadius: 'var(--radius-field, 2rem)' }}></div>
              <div className="h-9 w-full sm:w-32 bg-base-300 rounded-btn ml-auto" 
                   style={{ borderRadius: 'var(--radius-field, 2rem)' }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}