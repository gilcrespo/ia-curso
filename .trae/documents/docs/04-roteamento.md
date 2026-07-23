# 04 — Roteamento e Camada de Rotas

## Stack de roteamento

O projeto usa **TanStack Router** sobre **TanStack Start**, configurado via plugin do `@lovable.dev/vite-tanstack-config`. Não há `pages/`, `_app/`, nem `app/layout.tsx` — o roteamento é **file-based** dentro de [`src/routes/`](../../../src/routes/).

| Conceito | Onde mora | Função |
| --- | --- | --- |
| `createRootRouteWithContext` | [`src/routes/__root.tsx`](../../../src/routes/__root.tsx) | Define o shell HTML, metadados, QueryClient e boundary global. |
| `createFileRoute` | [`src/routes/index.tsx`](../../../src/routes/index.tsx) | Define a rota `/`. |
| `createRouter` | [`src/router.tsx`](../../../src/router.tsx) | Constrói o `Router` com `routeTree` e contexto. |
| `createStart` | [`src/start.ts`](../../../src/start.ts) | Inicializa o Start com middlewares. |
| Entry SSR | [`src/server.ts`](../../../src/server.ts) | Adapter para o handler do Nitro. |

## Convenção de arquivos (file-based routing)

> Documentação local: [`src/routes/README.md`](../../../src/routes/README.md).

| Arquivo | URL | Observação |
| --- | --- | --- |
| `__root.tsx` | (shell global) | Único root layout. Preserva `<Outlet />`. |
| `index.tsx` | `/` | Rota principal (a apresentação). |
| `about.tsx` | `/about` | Exemplo de rota estática. |
| `users/$id.tsx` | `/users/:id` | Dinâmico. Bare `$`, sem chaves. |
| `posts/{-$category}.tsx` | `/posts/:category?` | Segmento opcional com `{-$}`. |
| `files/$.tsx` | `/files/*` | Splat — lê via `_splat`, nunca `*`. |
| `_layout.tsx` | layout aninhado | Renderiza `<Outlet />`. |

**Regra de ouro:** qualquer arquivo `.tsx` em [`src/routes/`](../../../src/routes/) vira uma rota. `routeTree.gen.ts` é gerado e **não deve** ser editado manualmente.

## Root route (`__root.tsx`)

[`src/routes/__root.tsx`](../../../src/routes/__root.tsx) faz quatro coisas importantes:

1. **Define o contexto** (`queryClient`) usado pelas rotas filhas.
2. **Configura metadados SEO/OG/Twitter** para a apresentação.
3. **Injeta fontes** (Poppins via Google Fonts) e `favicon.ico`.
4. **Declara boundaries globais** (`notFoundComponent`, `errorComponent`).

### `notFoundComponent`

Página 404 estática, com link para `/`. Renderiza layout simples usando tokens do Tailwind.

### `errorComponent`

- Loga o erro no console.
- Reporta via [`reportLovableError`](../../../src/lib/lovable-error-reporting.ts).
- Mostra UI amigável com "Try again" (`router.invalidate()` + `reset()`) e "Go home".

### Shell HTML

```tsx
<html lang="en">
  <head><HeadContent /></head>
  <body>
    {children}
    <Scripts />
  </body>
</html>
```

`HeadContent` injeta `<meta>` e `<link>`; `Scripts` injeta os chunks do cliente (HMR ou produção).

## Factory do router (`router.tsx`)

[`src/router.tsx`](../../../src/router.tsx) é uma **factory** (não singleton), importante para evitar vazamento de estado entre SSR requests:

```ts
export const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });
  return router;
};
```

- `scrollRestoration: true` mantém a posição do scroll ao navegar.
- `defaultPreloadStaleTime: 0` força refetch sempre que o usuário volta a uma rota.

## Apresentação como rota única

[`src/routes/index.tsx`](../../../src/routes/index.tsx) define:

```ts
export const Route = createFileRoute("/")({
  component: Presentation,
});
```

A lógica da apresentação vive dentro do componente `Presentation`. Como ele depende de `useState`, `useEffect`, `useLayoutEffect` e `useContext` (`StepContext`), o roteador cuida do ciclo de vida cliente/SSR.

## SSR com TanStack Start

### `start.ts`

[`src/start.ts`](../../../src/start.ts) define um `errorMiddleware` aplicado em `requestMiddleware`:

```ts
const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try { return await next(); }
  catch (error) {
    if (error?.statusCode) throw error;
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500, headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});
```

Comportamento:

- Erros com `statusCode` definido (HTTPError do h3) **passam adiante** — o h3 os formata como resposta.
- Outros erros são convertidos em HTML 500 amigável (`renderErrorPage()`).

### `server.ts`

[`src/server.ts`](../../../src/server.ts) implementa o entry que o Nitro chama:

1. Lazy-importa `@tanstack/react-start/server-entry`.
2. Encapsula `handler.fetch(request, env, ctx)`.
3. Chama `normalizeCatastrophicSsrResponse(response)` que:
   - Detecta respostas 5xx com body `{"unhandled":true,"message":"HTTPError"}` (formato do h3).
   - Substitui por uma página HTML estática.
4. Em caso de exceção na chamada, devolve a página de erro 500.

### `error-capture.ts`

[`src/lib/error-capture.ts`](../../../src/lib/error-capture.ts) registra `process.on("unhandledRejection", ...)` e armazena o último erro capturado. O `server.ts` consulta esse erro para logar o motivo real do 500 "engolido" pelo h3.

## Fluxo completo de uma request

```
┌──────────────────────┐
│ Browser faz request  │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ Nitro (cloudflare)   │
│  chama server.fetch  │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ src/server.ts        │
│  - getServerEntry()  │
│  - handler.fetch()   │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ start.errorMiddleware│
│  - try/catch         │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ Router (createRouter)│
│  - match /           │
│  - render root +     │
│    <Outlet>          │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ Presentation (React) │
│  - SSR render        │
│  - HTML response     │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ Browser hidrata      │
│ cliente assume state │
└──────────────────────┘
```

## Dicas e armadilhas

1. **Não criar `src/pages/`.** É convenção Next.js — não funciona aqui.
2. **Não editar `routeTree.gen.ts`.** Ele é regenerado em build/dev.
3. **Não usar `server-only` do Next.js.** O lint bloqueia. Use `*.server.ts` ou `@tanstack/react-start/server-only`.
4. **`getRouter()` como factory.** Nunca faça `export const router = createRouter(...)` no top-level; isso quebra SSR multi-tenant.
5. **Compartilhar estado entre rotas.** Use `context` (ex.: `queryClient`) no `createRootRouteWithContext`.

## Próximos passos

- [05 — Apresentação](./05-apresentacao.md): o coração do app.
- [09 — Erros](./09-erros.md) se você pretende personalizar o tratamento de falhas.
