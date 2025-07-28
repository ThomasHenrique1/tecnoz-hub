import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" })
  }

  // Obter usuário autenticado pelo token enviado no header (Authorization: Bearer ...)
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ error: "Não autorizado" })
  }

  const { data: { user }, error: userError } = await supabase.auth.api.getUser(token)
  if (userError || !user) {
    return res.status(401).json({ error: "Usuário inválido" })
  }

  try {
    // Buscar itens do carrinho do usuário
    const { data: carrinhoItens, error: carrinhoError } = await supabase
      .from("carrinho")
      .select(`
        produto_id,
        quantidade,
        produto:produto_id ( preco, estoque )
      `)
      .eq("usuario_id", user.id)

    if (carrinhoError) throw carrinhoError
    if (carrinhoItens.length === 0) {
      return res.status(400).json({ error: "Carrinho vazio" })
    }

    // Calcular total e verificar estoque disponível
    let total = 0
    for (const item of carrinhoItens) {
      if (item.quantidade > item.produto.estoque) {
        return res.status(400).json({ error: `Estoque insuficiente para o produto ${item.produto_id}` })
      }
      total += item.quantidade * item.produto.preco
    }

    // Criar pedido
    const { data: pedido, error: pedidoError } = await supabase
      .from("pedidos")
      .insert([
        {
          usuario_id: user.id,
          total,
          status: "pendente",
        }
      ])
      .select()
      .single()

    if (pedidoError) throw pedidoError

    // Inserir itens do pedido
    const itensPedido = carrinhoItens.map((item) => ({
      pedido_id: pedido.id,
      produto_id: item.produto_id,
      quantidade: item.quantidade,
      preco_unitario: item.produto.preco,
    }))

    const { error: itensError } = await supabase
      .from("pedido_itens")
      .insert(itensPedido)

    if (itensError) throw itensError

    // Limpar carrinho
    const { error: deleteError } = await supabase
      .from("carrinho")
      .delete()
      .eq("usuario_id", user.id)

    if (deleteError) throw deleteError

    // (Opcional) Atualizar estoque - se desejar, podemos implementar depois

    return res.status(200).json({ message: "Pedido finalizado com sucesso!", pedido_id: pedido.id })

  } catch (error) {
    console.error("Erro ao finalizar pedido:", error)
    return res.status(500).json({ error: "Erro interno" })
  }
}
