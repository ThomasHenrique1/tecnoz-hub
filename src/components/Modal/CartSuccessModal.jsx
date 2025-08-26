// components/CartSuccessModal/CartSuccessModal.jsx
import Modal from "@/components/Modal/Modal"

export default function CartSuccessModal({ isOpen, onClose, onContinueShopping, onViewCart }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 text-success mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-base-content mb-2">
          Produto adicionado!
        </h3>
        
        <p className="text-base-content/70 mb-6">
          O produto foi adicionado ao seu carrinho com sucesso.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onContinueShopping}
            className="btn btn-outline flex-1"
          >
            Continuar comprando
          </button>
          
          <button
            onClick={onViewCart}
            className="btn btn-primary flex-1"
          >
            Ver carrinho
          </button>
        </div>

        <button
          onClick={onClose}
          className="btn btn-ghost btn-sm mt-4"
        >
          Fechar
        </button>
      </div>
    </Modal>
  )
}