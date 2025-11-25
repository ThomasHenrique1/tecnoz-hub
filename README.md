# TecnozHub

**Resumo (curto e direto):**
Loja e-commerce de hardware construída com Next.js (App Router) e Supabase. Funcionalidades principais: catálogo de produtos, carrinho com atualização em tempo real, painel administrativo (CRUD de produtos e gerenciamento de pedidos), autenticação via Supabase e upload de avatares. Projeto organizado em `src/` com foco em separação de responsabilidades.

---

## Tecnologias

* Next.js (App Router)
* React (Client & Server Components)
* Supabase (Auth, Storage, Database)
* TailwindCSS + DaisyUI (estilo)
* Vercel (configuração pronta em `vercel.json`)

---

## Estrutura principal (resumida)

```
src/
 ┣ app/                # rotas do Next.js (App Router)
 ┣ components/         # componentes compartilhados
 ┣ context/            # Context API (ex.: CarrinhoContext)
 ┣ hooks/              # hooks customizados
 ┣ lib/                # clientes e utilitários (supabaseClient, utils)
 ┣ middleware.js       # proteção de rotas
```

---

## Funcionalidades implementadas

* Listagem de produtos e filtros básicos
* Carrinho persistente com contexto e atualização imediata
* Autenticação de usuários (Supabase)
* Upload de imagens (bucket `avatars` no Supabase)
* Painel admin: listar, criar e editar produtos; visualizar pedidos
* Roteamento protegido para `/dashboard` e `/admin`

---

## Variáveis de ambiente necessárias

Crie um arquivo `.env.local` na raiz do projeto com pelo menos as variáveis abaixo:

```
NEXT_PUBLIC_SUPABASE_URL=https://<seu-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<sua-anon-key>
# (Opcional) se usar chaves de servidor em rotas API privadas:
# SUPABASE_SERVICE_ROLE_KEY=<sua-service-role-key>
```

Observação: o código atual usa `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` tanto no cliente quanto no servidor (via `@supabase/ssr`).

---

## Como rodar localmente

1. Instale dependências

```bash
npm install
# ou
yarn
```

2. Rode em modo desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

3. Build para produção

```bash
npm run build
npm run start
```

> Se estiver implantando no Vercel, as mesmas variáveis de ambiente devem ser definidas no painel do Vercel.

---

## Observações técnicas importantes

* **RLS / Policies:** o projeto pressupõe regras de RLS configuradas no Supabase; confirme permissões de leitura/escrita para as tabelas `produtos`, `perfis`, `pedidos` e `pedido_itens`.
* **Carrinho (real-time):** o `CarrinhoContext` atualiza a quantidade exibida periodicamente. Verificar se deseja usar `realtime` do Supabase para elimina polling.
* **Uploads:** imagens e banners estão armazenados no bucket público `banners`/`avatars` (ver referências em `src/app/*`).
* **Proteção de rotas:** `middleware.js` redireciona acessos não autorizados a `/login` quando necessário. Ajuste conforme políticas de autenticação.

---

## Checklist / Próximos passos recomendados (curto prazo)

* Adicionar `package.json` e scripts (se não existir no root do projeto). ✅
* Revisar e documentar políticas de RLS no Supabase.
* Implementar testes básicos (unit e integration) para componentes críticos (carrinho e finalização de pedido).
* Substituir polling por `realtime` do Supabase para carrinho/estoque.

---

## Como contribuir / fluxo padrão

1. Crie branch com prefixo `feature/` ou `fix/`.
2. Faça commits pequenos e atômicos com mensagens claras.
3. Abra PR com descrição do que foi alterado e como testar.

---

## MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.




## Anexos úteis (comandos rápidos)

* Instalar dependências: `npm install`
* Dev: `npm run dev`
* Build: `npm run build`
* Start: `npm run start`

---

Se quiser, eu:

* gero o `README.md` pronto e com mais seções (ex.: exemplos de .env, endpoints API, estrutura de tabelas do Supabase);
* crio também um `CONTRIBUTING.md` e `LICENSE`.

Diga qual opção prefere e eu já crio os arquivos.
