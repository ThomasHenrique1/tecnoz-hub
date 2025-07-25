"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

const CarrinhoContext = createContext()

export const CarrinhoProvider = ({ children }) => {
  const [quantidade, setQuantidade] = useState(0)

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
    atualizarQuantidade()
  }, [])

  return (
    <CarrinhoContext.Provider value={{ quantidade, atualizarQuantidade }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export const useCarrinho = () => useContext(CarrinhoContext)
