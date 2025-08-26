// components/AuthModal/AuthModal.jsx
"use client"

import Modal from "@/components/Modal/Modal"

export default function AuthModal({ isOpen, onClose, onLogin }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 text-center">
        {/* Ícone de alerta */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warning/20 text-warning mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.946-.833-2.716 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-base-content mb-2">
          Acesso necessário
        </h3>
        
        <p className="text-base-content/70 mb-6">
          Você precisa estar logado para adicionar produtos ao carrinho.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="btn btn-outline flex-1"
          >
            Continuar comprando
          </button>
          
          <button
            onClick={onLogin}
            className="btn btn-primary flex-1"
          >
            Fazer Login
          </button>
        </div>
      </div>
    </Modal>
  )
}