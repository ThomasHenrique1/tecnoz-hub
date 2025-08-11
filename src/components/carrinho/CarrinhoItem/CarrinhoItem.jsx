"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal"

export default function CarrinhoItem({ 
  item, 
  onRemove, 
  onUpdateQuantity, 
  disabled 
}) {
  const [showModal, setShowModal] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = () => setShowModal(true)

  const confirmRemove = async () => {
    setIsRemoving(true)
    try {
      await onRemove(item.id)
    } finally {
      setIsRemoving(false)
      setShowModal(false)
    }
  }

  const cancelRemove = () => setShowModal(false)

  const handleDecrease = () => {
    if (item.quantidade > 1) {
      onUpdateQuantity(item.id, item.quantidade - 1)
    }
  }

  const handleIncrease = () => {
    if (item.quantidade < item.produto.estoque) {
      onUpdateQuantity(item.id, item.quantidade + 1)
    }
  }

  return (
    <>
      <AnimatePresence>
        {!isRemoving && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ 
              opacity: { duration: 0.2 },
              y: { type: "spring", stiffness: 300 },
              x: { duration: 0.3 }
            }}
            className="card card-side bg-base-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <figure className="w-24 min-w-[6rem]">
              <img
                src={item.produto.imagem_url || "/placeholder-product.jpg"}
                alt={item.produto.nome}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </figure>
            
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <h2 className="card-title text-lg line-clamp-2">
                  {item.produto.nome}
                </h2>
                <span className="text-lg font-bold text-primary">
                  R$ {(item.quantidade * item.produto.preco).toFixed(2)}
                </span>
              </div>

              <p className="text-gray-500">
                R$ {item.produto.preco.toFixed(2)} cada
              </p>
              
              <div className="card-actions justify-between items-center mt-2">
                <div className="join border border-base-300 rounded-box">
                  <button
                    className="join-item btn btn-sm btn-ghost"
                    onClick={handleDecrease}
                    disabled={disabled || item.quantidade <= 1}
                    aria-label="Reduzir quantidade"
                  >
                    -
                  </button>
                  <motion.span 
                    key={`quantity-${item.quantidade}`}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="join-item btn btn-sm btn-ghost no-animation pointer-events-none"
                  >
                    {item.quantidade}
                  </motion.span>
                  <button
                    className="join-item btn btn-sm btn-ghost"
                    onClick={handleIncrease}
                    disabled={disabled || item.quantidade >= item.produto.estoque}
                    aria-label="Aumentar quantidade"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={handleRemove}
                  className="btn btn-error btn-sm"
                  disabled={disabled}
                  aria-label="Remover item"
                >
                  Remover
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmationModal
        isOpen={showModal}
        onConfirm={confirmRemove}
        onCancel={cancelRemove}
        message={`Remover ${item.produto.nome} do carrinho?`}
      />
    </>
  )
}