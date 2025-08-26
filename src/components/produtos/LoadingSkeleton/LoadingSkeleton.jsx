export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-base-300 rounded w-20 animate-pulse"></div>
            ))}
          </div>
          <div className="h-8 bg-base-300 rounded w-32 animate-pulse"></div>
        </div>

        {/* Conteúdo principal skeleton */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Imagem skeleton */}
          <div className="lg:flex-1">
            <div className="aspect-square bg-base-300 rounded-2xl animate-pulse"></div>
          </div>

          {/* Informações skeleton */}
          <div className="lg:flex-1 space-y-6">
            <div>
              <div className="h-8 bg-base-300 rounded animate-pulse mb-4"></div>
              <div className="h-4 bg-base-300 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-base-300 rounded animate-pulse w-3/4"></div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-8 bg-base-300 rounded w-24 animate-pulse"></div>
                <div className="h-6 bg-base-300 rounded w-20 animate-pulse"></div>
              </div>
            </div>

            <div className="h-12 bg-base-300 rounded animate-pulse"></div>

            <div className="bg-base-200 rounded-lg p-4 mt-6">
              <div className="h-5 bg-base-300 rounded animate-pulse mb-3 w-1/2"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-3 bg-base-300 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}