// components/ErrorModal/ErrorModal.jsx
"use client"

import Modal from "@/components/Modal/Modal"

export default function ErrorModal({ isOpen, onClose, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 text-center">
        {/* Ícone de erro */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error/20 text-error mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-base-content mb-2">
          Ocorreu um erro
        </h3>
        
        <p className="text-base-content/70 mb-6">
          {message}
        </p>

        <button
          onClick={onClose}
          className="btn btn-primary w-full"
        >
          Entendi
        </button>
      </div>
    </Modal>
  )
}