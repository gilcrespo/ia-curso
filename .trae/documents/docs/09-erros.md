# 09 — Tratamento de Erros e Observabilidade

> Arquivos relevantes:
> - [`src/server.ts`](../../../src/server.ts) — entry SSR.
> - [`src/start.ts`](../../../src/start.ts) — middlewares do Start.
> - [`src/lib/error-capture.ts`](../../../src/lib/error-capture.ts) — captura de erros fora de banda.
> - [`src/lib/error-page.ts`](../../../src/lib/error-page.ts) — HTML estático de fallback.
> - [`src/lib/lovable-error-reporting.ts`](../../../src/lib/lovable-error-reporting.ts) — reporter para painel Lovable.
> - [`src/routes/__root.tsx`](../../../src/routes/__root.tsx) — error boundary global.

## Camadas de defesa

```
┌──────────────────────────────────────────────────────────┐
│ 1. Captura global (error-capture.ts)                    │
│    window.error / unhandledrejection                     │
│    → armazena último erro por 5s                         │
├──────────────────────────────────────────────────────────┤
│ 2. Middleware Start (start.ts)                           │
│    try/catch em torno de next()                          │
│    - HTTPError → rethrow                                  │
│    - Outros → renderiza error page HTML 500              │
├──────────────────────────────────────────────────────────┤
│ 3. Entry SSR (server.ts)                                 │
│    - Tenta handler.fetch()                               │
│    - Detecta body "engolido" pelo h3 ({unhandled: true}) │
│    - Substitui por HTML 500                              │
│    - Loga o erro real (consumindo o capturado)            │
├──────────────────────────────────────────────────────────┤
│ 4. Error Boundary do root (routes/__root.tsx)            │
│    - Captura erros React no client                       │
│    - Mostra UI amigável com Try again / Go home          │
│    - Reporta via Lovable                                 │
└──────────────────────────────────────────────────────────┘
```

## 1. `error-capture.ts`

```ts
let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}
```

- Registra `error` e `unhandledrejection` no objeto global.
- Guarda apenas o último erro (com TTL de 5s).
- `consumeLastCapturedError()` lê e limpa.

**Por que existe?** Porque o h3 (usado pelo Nitro) engole throws em respostas 5xx com body `{"unhandled":true,"message":"HTTPError"}`. Sem essa captura, perderíamos a stack trace original.

## 2. `start.ts` — middleware

```ts
const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500, headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});
```

Comportamento:

- Erros com `statusCode` (HTTPError do h3) **passam adiante** — o h3 formata a resposta.
- Outros erros viram `500` com HTML estático.

## 3. `server.ts` — entry SSR

```ts
function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
```

Lógica:

- Se resposta < 500, deixa passar.
- Se não for JSON, deixa passar (provavelmente já é HTML).
- Se for JSON com `{"unhandled":true,"message":"HTTPError"}`, **substitui** por HTML 500 e loga o erro original.

A função é `async` porque precisa clonar a resposta para ler o body sem consumi-lo.

## 4. `error-page.ts`

Função pura que retorna uma string HTML estática. Usada em `server.ts` e `start.ts`. **Não** usa React — pode ser servida mesmo se o framework falhar.

Conteúdo:

- Mensagem amigável: "This page didn't load".
- Botão "Try again" (recarrega).
- Link "Go home" (vai para `/`).
- Estilos inline (não depende do Tailwind).

## 5. `lovable-error-reporting.ts`

Hook para o painel de observabilidade do editor Lovable. Se `window.__lovableEvents?.captureException` estiver disponível, envia o erro com:

- `source: "react_error_boundary"`
- `route: window.location.pathname`
- Contexto extra
- `mechanism: "react_error_boundary"`
- `severity: "error"`

> Em ambiente de produção sem Lovable, a função apenas retorna `undefined`. É seguro chamar sempre.

## 6. Error boundary do root

[`src/routes/__root.tsx`](../../../src/routes/__root.tsx#L37-L73) define `errorComponent`:

```tsx
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      ...
      <button onClick={() => { router.invalidate(); reset(); }}>Try again</button>
      <a href="/">Go home</a>
    </div>
  );
}
```

- Loga o erro.
- Reporta para Lovable.
- Mostra UI usando tokens Tailwind (diferente do `error-page.ts` que é estático).
- Botão "Try again" chama `router.invalidate()` (forçar refetch dos loaders) + `reset()` (limpar estado de erro).

## Fluxo de uma falha típica

```
React lança erro em componente
   │
   ▼
Error boundary do root captura
   │
   ├─► console.error
   ├─► reportLovableError (se aplicável)
   └─► Render <ErrorComponent>
            │
            └─► Botão "Try again" → router.invalidate() + reset()
```

Se o erro acontece **antes** do React montar (e.g., durante SSR), o caminho é:

```
Erro no servidor
   │
   ▼
errorMiddleware (start.ts)
   │ try/catch
   │ - HTTPError → rethrow
   │ - outro → 500 HTML
   ▼
server.ts
   │ detect "engolido" pelo h3
   │ - loga erro original (error-capture)
   │ - retorna 500 HTML
```

## Como customizar

| Necessidade | Onde mexer |
| --- | --- |
| Mudar a aparência da página de erro SSR | [`src/lib/error-page.ts`](../../../src/lib/error-page.ts) |
| Adicionar telemetria externa (Sentry, Datadog) | [`src/lib/error-capture.ts`](../../../src/lib/error-capture.ts) ou [`lovable-error-reporting.ts`](../../../src/lib/lovable-error-reporting.ts) |
| Tratar erros com `statusCode` específicos | [`src/start.ts`](../../../src/start.ts) (`errorMiddleware`) |
| Customizar a UI do error boundary do cliente | [`src/routes/__root.tsx`](../../../src/routes/__root.tsx) (`errorComponent`) |

## Próximos passos

- [08 — Build e Deploy](./08-build-deploy.md) para ambientes de produção.
- [10 — Contribuição](./10-contribuicao.md) para o checklist de PR.
