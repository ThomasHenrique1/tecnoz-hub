"use client"

import { useEffect, useRef } from "react"

export default function ConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  message = "Tem certeza que deseja remover este item?"
}) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [isOpen])

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirmação</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button className="btn" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn btn-error" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </dialog>
  )
}