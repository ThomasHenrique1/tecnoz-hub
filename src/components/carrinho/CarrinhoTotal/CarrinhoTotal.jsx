export default function CarrinhoTotal({ total, onCheckout, loading }) {
  return (
    <div className="card bg-base-200 mt-6">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Total</h3>

          <p className="text-xl font-bold text-primary  px-5 py-1 rounded-full">
            R$ {total.toFixed(2)}
          </p>
        </div>
        
        <button
          onClick={onCheckout}
          className="btn btn-primary mt-4"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner"></span>
              Finalizando...
            </>
          ) : (
            "Finalizar compra"
          )}
        </button>
      </div>
    </div>
  )
}