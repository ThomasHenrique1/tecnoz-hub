"use client"

import { createContext, useContext, useState, useCallback } from "react"
import ErrorModal from "@/components/Modal/ErrorModal"

const ErrorContext = createContext(undefined)

export function ErrorProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const showError = useCallback((msg = "Erro desconhecido") => {
    setMessage(String(msg))
    setIsOpen(true)
  }, [])

  const closeError = useCallback(() => {
    setIsOpen(false)
    setMessage("")
  }, [])

  return (
    <ErrorContext.Provider value={{ showError, closeError }}>
      {children}

      {/* Modal global já utilizando o seu ErrorModal */}
      <ErrorModal
        isOpen={isOpen}
        onClose={closeError}
        message={message}
      />
    </ErrorContext.Provider>
  )
}

export function useError() {
  const ctx = useContext(ErrorContext)
  if (!ctx) throw new Error("useError deve ser usado dentro de <ErrorProvider>")
  return ctx
}
