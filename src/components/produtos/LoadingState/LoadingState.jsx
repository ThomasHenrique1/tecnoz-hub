export default function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-base-content/70">Carregando produtos...</p>
      </div>
    </div>
  )
}