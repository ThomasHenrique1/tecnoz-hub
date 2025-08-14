export default function SubmitButton({ loading, text = 'Cadastrar', loadingText = 'Cadastrando...' }) {
  return (
    <button 
      type="submit" 
      disabled={loading} 
      className="btn btn-primary w-full"
    >
      {loading ? loadingText : text}
    </button>
  )
}