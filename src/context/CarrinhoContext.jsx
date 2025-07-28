"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

const CarrinhoContext = createContext()

export const CarrinhoProvider = ({ children }) => {
  const [quantidade, setQuantidade] = useState(0)
  const [animar, setAnimar] = useState(false)


  const atualizarQuantidade = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return setQuantidade(0)

    const { data, error } = await supabase.from("carrinho").select("quantidade")

    if (!error && data) {
      const total = data.reduce((acc, item) => acc + item.quantidade, 0)
      setQuantidade(total)
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimar(true)
      setTimeout(() => setAnimar(false), 300)
    }, 5000)

    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    atualizarQuantidade()
  }, [])

  return (
    <CarrinhoContext.Provider value={{ quantidade, atualizarQuantidade, animar }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export const useCarrinho = () => useContext(CarrinhoContext)
