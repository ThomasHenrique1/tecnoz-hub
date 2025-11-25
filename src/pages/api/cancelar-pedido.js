import { createClient } from "@/lib/supabaseClient";

const supabase = createClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Não autorizado" });

    const { pedido_id } = req.body;
    if (!pedido_id) return res.status(400).json({ error: "pedido_id é obrigatório" });

    // autenticação do usuário
    const { data: userData, error: userError } = await supabase.auth.api.getUser(token);
    if (userError || !userData?.user) return res.status(401).json({ error: "Usuário inválido" });

    const user = userData.user;

    // buscar pedido e validar permissões (user dono do pedido ou admin)
    const { data: pedido, error: pedidoError } = await supabase
      .from("pedidos")
      .select("*")
      .eq("id", pedido_id)
      .single();

    if (pedidoError || !pedido) return res.status(404).json({ error: "Pedido não encontrado" });

    const isOwner = pedido.usuario_id === user.id;
    // Aqui você pode checar admin via perfil/perfis se tiver
    if (!isOwner) {
      // checar se admin (exemplo: tabela perfis ou campo is_admin) — ajustar conforme seu esquema
      const { data: perfil, error: perfilErr } = await supabase
        .from("perfis")
        .select("role")
        .eq("usuario_id", user.id)
        .single();

      const isAdmin = perfil && perfil.role && perfil.role === "admin";
      if (!isAdmin) return res.status(403).json({ error: "Sem permissão para cancelar este pedido" });
    }

    // só permitir cancelamento se estiver em status que permita (ex: pendente)
    if (pedido.status && pedido.status !== "pendente") {
      // ajustar conforme políticas (p.ex. não permitir cancelar pedido já finalizado/enviado)
      return res.status(400).json({ error: `Não é possível cancelar pedido no status ${pedido.status}` });
    }

    // buscar itens do pedido
    const { data: itens, error: itensError } = await supabase
      .from("pedido_itens")
      .select("produto_id, quantidade")
      .eq("pedido_id", pedido_id);

    if (itensError) throw itensError;

    // Para cada item, restaurar estoque chamando a função SQL incrementa_estoque
    for (const item of itens) {
      // chama RPC no supabase
      const { data: novoEstoque, error: rpcErr } = await supabase.rpc("incrementa_estoque", {
        produto_id: item.produto_id,
        qtd: item.quantidade,
      });

      if (rpcErr) {
        console.error("Erro ao restaurar estoque (produto):", item.produto_id, rpcErr);
        throw rpcErr;
      }
    }

    // atualizar status do pedido para 'cancelado'
    const { error: updateErr } = await supabase
      .from("pedidos")
      .update({ status: "cancelado" })
      .eq("id", pedido_id);

    if (updateErr) throw updateErr;

    return res.status(200).json({ message: "Pedido cancelado e estoque restaurado" });
  } catch (error) {
    console.error("Erro em cancelar-pedido:", error);
    return res.status(500).json({ error: "Erro ao cancelar o pedido" });
  }
}
