// components/ui/LoadingSpinner.jsx
export default function LoadingSpinner({ text = "Carregando..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-base-content/70">{text}</p>
    </div>
  )
}

