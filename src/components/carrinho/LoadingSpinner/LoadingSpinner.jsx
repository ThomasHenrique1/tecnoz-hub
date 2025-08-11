export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <span className="ml-2">Carregando carrinho...</span>
    </div>
  )
}