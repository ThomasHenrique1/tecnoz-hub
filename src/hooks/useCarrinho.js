"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export function useCarrinho() {
  const [quantidade, setQuantidade] = useState(0)

  useEffect(() => {
    const fetchQuantidade = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data, error } = await supabase
        .from("carrinho")
        .select("quantidade")

      if (!error && data) {
        const total = data.reduce((acc, item) => acc + item.quantidade, 0)
        setQuantidade(total)
      }
    }

    fetchQuantidade()

    // Opcional: você pode usar um intervalo para auto atualizar (simplesmente exemplo)
    const interval = setInterval(fetchQuantidade, 10000)
    return () => clearInterval(interval)
  }, [])

  return quantidade
}
