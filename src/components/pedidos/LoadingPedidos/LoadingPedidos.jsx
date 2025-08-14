export default function LoadingPedidos() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex justify-between">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            <div className="space-y-4 mt-4">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="h-5 w-24 ml-auto bg-gray-200 rounded animate-pulse mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  )
}