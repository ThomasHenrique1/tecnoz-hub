import { createClient } from "@/lib/supabaseClient";

const supabase = createClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  const { data: { user } = {}, error: userError } = await supabase.auth.api.getUser(token);
  if (userError || !user) {
    return res.status(401).json({ error: "Usuário inválido" });
  }

  try {
    // Buscar itens do carrinho (relacionamento: produto)
    const { data: carrinhoItens, error: carrinhoError } = await supabase
      .from("carrinho")
      .select(`
        produto_id,
        quantidade,
        produto:produto_id ( id, preco, estoque )
      `)
      .eq("usuario_id", user.id);

    if (carrinhoError) throw carrinhoError;
    if (!carrinhoItens || carrinhoItens.length === 0) {
      return res.status(400).json({ error: "Carrinho vazio" });
    }

    // Verificar estoques e calcular total (checagem preliminar)
    let total = 0;
    for (const item of carrinhoItens) {
      if (!item.produto) {
        return res.status(400).json({ error: `Produto não encontrado (ID: ${item.produto_id})` });
      }
      if (item.quantidade > item.produto.estoque) {
        return res.status(400).json({
          error: `Produto com estoque insuficiente (ID: ${item.produto_id})`
        });
      }
      total += item.quantidade * item.produto.preco;
    }

    // Criar pedido (status pendente)
    const { data: pedido, error: pedidoError } = await supabase
      .from("pedidos")
      .insert([{ usuario_id: user.id, total, status: "pendente" }])
      .select()
      .single();

    if (pedidoError) throw pedidoError;

    // Inserir itens do pedido
    const itensPedido = carrinhoItens.map((item) => ({
      pedido_id: pedido.id,
      produto_id: item.produto_id,
      quantidade: item.quantidade,
      preco_unitario: item.produto.preco,
    }));

    const { error: itensError } = await supabase.from("pedido_itens").insert(itensPedido);
    if (itensError) {
      // rollback: excluir o pedido
      await supabase.from("pedidos").delete().eq("id", pedido.id);
      throw itensError;
    }

    // Função auxiliar: restaurar estoques dos itens que já foram decrementados
    const restoreStocks = async (succeededItems) => {
      for (const s of succeededItems) {
        try {
          // obter estoque atual
          const { data: produtoAtual, error: selErr } = await supabase
            .from("produtos")
            .select("estoque")
            .eq("id", s.produto_id)
            .single();

          if (selErr || !produtoAtual) {
            console.error("Erro ao selecionar produto para restauração:", s.produto_id, selErr);
            continue;
          }

          const novo = (produtoAtual.estoque ?? 0) + s.quantidade;

          // atualizar estoque restaurando e marcando disponivel true
          const { error: updErr } = await supabase
            .from("produtos")
            .update({ estoque: novo, disponivel: true })
            .eq("id", s.produto_id);

          if (updErr) {
            console.error("Erro ao restaurar estoque (produto):", s.produto_id, updErr);
          }
        } catch (err) {
          console.error("Erro ao restaurar estoque interno:", err);
        }
      }
    };

    // Atualizar estoques com checagem condicional (atomicidade por linha)
    const succeeded = []; // itens que foram efetivamente decrementados
    for (const item of carrinhoItens) {
      const novoEstoque = item.produto.estoque - item.quantidade;

      // update só ocorre se estoque atual >= item.quantidade
      const { data: updatedRows, error: estoqueError } = await supabase
        .from("produtos")
        .update({
          estoque: novoEstoque,
          disponivel: novoEstoque === 0 ? false : true,
        })
        .eq("id", item.produto_id)
        .gte("estoque", item.quantidade)
        .select();

      if (estoqueError) {
        // rollback: restaurar o que já foi decrementado e apagar pedido/itens
        await restoreStocks(succeeded);
        await supabase.from("pedido_itens").delete().eq("pedido_id", pedido.id);
        await supabase.from("pedidos").delete().eq("id", pedido.id);
        console.error("Erro ao atualizar estoque:", estoqueError);
        return res.status(500).json({ error: "Erro ao atualizar estoque. Pedido revertido." });
      }

      if (!updatedRows || updatedRows.length === 0) {
        // Estoque insuficiente no momento do update — rollback completo
        await restoreStocks(succeeded);
        await supabase.from("pedido_itens").delete().eq("pedido_id", pedido.id);
        await supabase.from("pedidos").delete().eq("id", pedido.id);
        return res.status(400).json({
          error: `Estoque insuficiente no momento da finalização (Produto ID: ${item.produto_id}). Pedido revertido.`
        });
      }

      // registro de sucesso para possível restauração
      succeeded.push({ produto_id: item.produto_id, quantidade: item.quantidade });
    }

    // Limpar carrinho do usuário
    const { error: carrinhoErrorFinal } = await supabase
      .from("carrinho")
      .delete()
      .eq("usuario_id", user.id);

    if (carrinhoErrorFinal) {
      // rollback: restaurar estoques e apagar pedido/itens
      await restoreStocks(succeeded);
      await supabase.from("pedido_itens").delete().eq("pedido_id", pedido.id);
      await supabase.from("pedidos").delete().eq("id", pedido.id);
      console.error("Erro ao limpar carrinho:", carrinhoErrorFinal);
      return res.status(500).json({ error: "Erro ao limpar carrinho. Pedido revertido." });
    }

    return res.status(200).json({
      message: "Pedido finalizado com sucesso!",
      pedido_id: pedido.id,
    });

  } catch (error) {
    console.error("Erro ao finalizar pedido:", error);
    return res.status(500).json({ error: "Erro ao processar o pedido." });
  }
}
