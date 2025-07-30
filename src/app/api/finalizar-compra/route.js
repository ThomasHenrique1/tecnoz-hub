/*
import { NextResponse } from 'next/server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic' // Necessário para APIs que usam auth

export async function POST(request) {
  // 1. Configuração inicial
  const supabase = createServerComponentClient({ cookies })
  const origin = request.headers.get('origin')

  try {
    // 2. Autenticação
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new NextResponse(
        JSON.stringify({ error: 'Token de autenticação não fornecido' }),
        { status: 401, headers: { 'access-control-allow-origin': origin || '*' } }
      )
    }

    const token = authHeader.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return new NextResponse(
        JSON.stringify({ error: 'Não autorizado' }),
        { status: 401, headers: { 'access-control-allow-origin': origin || '*' } }
      )
    }

    // 3. Buscar itens do carrinho
    const { data: carrinhoItens, error: carrinhoError } = await supabase
      .from('carrinho')
      .select(`
        id,
        produto_id,
        quantidade,
        produto:produto_id (
          id,
          nome,
          preco,
          estoque
        )
      `)
      .eq('usuario_id', user.id)

    if (carrinhoError) throw carrinhoError
    if (!carrinhoItens || carrinhoItens.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: 'Carrinho vazio' }),
        { status: 400, headers: { 'access-control-allow-origin': origin || '*' } }
      )
    }

    // 4. Validação de estoque e cálculo do total
    let total = 0
    const problemasEstoque = []

    carrinhoItens.forEach(item => {
      if (item.quantidade > item.produto.estoque) {
        problemasEstoque.push({
          produto_id: item.produto_id,
          nome: item.produto.nome,
          estoque_disponivel: item.produto.estoque,
          quantidade_solicitada: item.quantidade
        })
      }
      total += item.quantidade * item.produto.preco
    })

    if (problemasEstoque.length > 0) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Problemas de estoque',
          detalhes: problemasEstoque 
        }),
        { status: 400, headers: { 'access-control-allow-origin': origin || '*' } }
      )
    }

    // 5. Criar pedido
    const { data: pedido, error: pedidoError } = await supabase
      .from('pedidos')
      .insert([{
        usuario_id: user.id,
        total,
        status: 'pendente',
        data_pedido: new Date().toISOString()
      }])
      .select()
      .single()

    if (pedidoError) throw pedidoError

    // 6. Registrar itens do pedido
    const itensPedido = carrinhoItens.map(item => ({
      pedido_id: pedido.id,
      produto_id: item.produto_id,
      quantidade: item.quantidade,
      preco_unitario: item.produto.preco,
      subtotal: item.quantidade * item.produto.preco
    }))

    const { error: itensError } = await supabase
      .from('pedido_itens')
      .insert(itensPedido)

    if (itensError) throw itensError

    // 7. Atualizar estoque (opcional - descomente se necessário)
    /*
    for (const item of carrinhoItens) {
      const { error: updateError } = await supabase
        .from('produtos')
        .update({ estoque: item.produto.estoque - item.quantidade })
        .eq('id', item.produto_id)
      
      if (updateError) throw updateError
    }
    

    // 8. Limpar carrinho
    const { error: deleteError } = await supabase
      .from('carrinho')
      .delete()
      .eq('usuario_id', user.id)

    if (deleteError) throw deleteError

    // 9. Retorno de sucesso
    return new NextResponse(
      JSON.stringify({ 
        success: true,
        pedido_id: pedido.id,
        total,
        itens: itensPedido.length
      }),
      { 
        status: 200,
        headers: { 
          'access-control-allow-origin': origin || '*',
          'content-type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error('Erro no processamento do pedido:', error)
    return new NextResponse(
      JSON.stringify({ 
        error: 'Erro interno no servidor',
        detalhes: error.message 
      }),
      { 
        status: 500,
        headers: { 
          'access-control-allow-origin': origin || '*',
          'content-type': 'application/json'
        }
      }
    )
  }
}
*/