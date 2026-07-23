# 03 — Estrutura de Pastas e Convenções

## Visão geral da árvore

```
Curso-IA-Gil/
├── .lovable/                # Config interna do editor Lovable
├── .output/                 # Build de produção (gerado por Vite/Nitro)
├── .trae/                   # Documentação técnica (gerada pela equipe)
│   └── documents/
│       ├── plano_alteracao_slides_1_15.md
│       └── docs/            # Este conjunto de docs
├── .wrangler/               # Config gerada para deploy Cloudflare
├── public/                  # Assets servidos na raiz (/favicon.ico, .md)
├── src/                     # Código-fonte
│   ├── assets/              # Imagens e manifestos JSON de assets
│   ├── components/
│   │   └── ui/              # Componentes shadcn/ui (Radix wrappers)
│   ├── hooks/               # Hooks React compartilhados
│   ├── lib/                 # Utilitários e helpers de erro
│   ├── routes/              # Rotas (file-based)
│   ├── routeTree.gen.ts     # Árvore gerada pelo plugin do TanStack
│   ├── router.tsx           # Factory do router
│   ├── server.ts            # Entry point SSR
│   ├── start.ts             # Configuração TanStack Start
│   └── styles.css           # Estilos globais + tokens
├── components.json          # Config do shadcn/ui
├── eslint.config.js         # ESLint flat config
├── package.json             # Dependências e scripts
├── tsconfig.json            # Aliases e opções TS
└── vite.config.ts           # Config de build (delega ao plugin Lovable)
```

## Pastas e arquivos-chave

### `src/`

| Caminho | Responsabilidade |
| --- | --- |
| [`src/routes/`](../../../src/routes/) | Rotas file-based do TanStack. Inclui `index.tsx` (apresentação) e `__root.tsx` (shell). |
| [`src/routes/index.tsx`](../../../src/routes/index.tsx) | Componente `Presentation` + array `SLIDES` + componentes auxiliares. |
| [`src/router.tsx`](../../../src/router.tsx) | Cria o `router` injetando `QueryClient` no contexto. |
| [`src/server.ts`](../../../src/server.ts) | Entry SSR. Encapsula exceções e devolve HTML 500 amigável. |
| [`src/start.ts`](../../../src/start.ts) | `createStart` + middleware de erro. |
| [`src/styles.css`](../../../src/styles.css) | Tailwind v4 + tokens utilitários (`slide-content`, `slide-label`, etc). |
| [`src/assets/`](../../../src/assets/) | Imagens e manifestos JSON consumidos via `import x from "@/assets/...asset.json"`. |
| [`src/components/ui/`](../../../src/components/ui/) | Componentes shadcn/ui prontos (accordion, dialog, etc). Disponíveis para futuras features, **não** usados pela apresentação atual. |
| [`src/hooks/use-mobile.tsx`](../../../src/hooks/use-mobile.tsx) | Hook `useIsMobile()` baseado em `matchMedia`. |
| [`src/lib/utils.ts`](../../../src/lib/utils.ts) | `cn()` (combina `clsx` + `twMerge`). |
| [`src/lib/error-capture.ts`](../../../src/lib/error-capture.ts) | Captura global de erros SSR. |
| [`src/lib/error-page.ts`](../../../src/lib/error-page.ts) | HTML estático de fallback para erros 5xx. |
| [`src/lib/lovable-error-reporting.ts`](../../../src/lib/lovable-error-reporting.ts) | Reporter de erros para o painel Lovable. |

### `public/`

Arquivos servidos como-está na raiz do site:

- `favicon.ico`
- `logo.svg`
- `consumo.md`, `pr.md`, `userstory.md`, `html-to-image.md` — exemplos referenciados em slides.
- `oquequeremos.png` — meme de abertura/encerramento.

### Raiz

| Arquivo | Função |
| --- | --- |
| [`package.json`](../../../package.json) | Manifesto npm/Bun. Contém `name: "tanstack_start_ts"`. |
| [`tsconfig.json`](../../../tsconfig.json) | Strict TypeScript + alias `@/*` → `./src/*`. |
| [`vite.config.ts`](../../../vite.config.ts) | Importa `@lovable.dev/vite-tanstack-config`; define `tanstackStart.server.entry = "server"`. |
| [`eslint.config.js`](../../../eslint.config.js) | Flat config ESLint + Prettier. |
| `components.json` | Config do shadcn (path aliases, estilo). |

## Convenções de código

### Aliases TypeScript

- `@/*` resolve para `./src/*`. **Sempre** prefira `@/lib/utils` em vez de `../../lib/utils`.
- Caminhos de assets: `import img from "@/assets/ch-cerebro.png"` (Webpack-style; Vite resolve em tempo de build).

### Estilo

- **TypeScript estrito** (`strict: true`).
- Sem `any` implícito. Prefira `type` unions a enums.
- JSX em `.tsx`, helpers em `.ts`.
- Estilização via classes utilitárias Tailwind + classes nomeadas em [`src/styles.css`](../../../src/styles.css).

### Componentes auxiliares da apresentação

| Componente | Localização | Função |
| --- | --- | --- |
| `SlideShell` | [`src/routes/index.tsx`](../../../src/routes/index.tsx) | Wrapper padrão dos slides. Suporta `chapter`, `align`, `padded`. |
| `ChapterCover` | [`src/routes/index.tsx`](../../../src/routes/index.tsx) | Capa de capítulo (1.1fr texto + 0.9fr imagem). |
| `Card` | [`src/routes/index.tsx`](../../../src/routes/index.tsx) | Cartão numerado com título e corpo. |
| `Label` | [`src/routes/index.tsx`](../../../src/routes/index.tsx) | Etiqueta superior ("Como chegamos até aqui"). |
| `Underline` | [`src/routes/index.tsx`](../../../src/routes/index.tsx) | Span com `accent-underline` (laranja). |
| `RevealIf` | [`src/routes/index.tsx`](../../../src/routes/index.tsx) | Renderiza `children` somente se o `step` for ≥ `stepIndex`. |

### Convenções de slides

Cada slide é `{ id: number; render: () => ReactNode; steps?: number }`:

- `id` é o número de slide na apresentação (1-based na URL `?slide=N`).
- `render` retorna o JSX do slide.
- `steps` (opcional) define quantos elementos podem ser revelados progressivamente. Se ausente, o slide é "tudo-ou-nada".

### Comportamento esperado ao tocar arquivos

| Arquivo | Efeito |
| --- | --- |
| `src/routes/index.tsx` | HMR atualiza o slide atual preservando o estado `step`. |
| `src/styles.css` | Tailwind recompila, classes ficam disponíveis em todo o app. |
| `src/assets/*` | Adiciona imagens que devem ser importadas via `@/assets/...`. |
| `public/*` | Servido imediatamente, sem precisar rebuildar. |
| `vite.config.ts` | Reinicia o servidor de dev. |
| `package.json` | Requer `npm install` antes de aplicar mudanças. |

## Arquivos gerados (não editar)

- `.output/**` — saída de `npm run build`.
- `.wrangler/**` — config gerada para deploy.
- `src/routeTree.gen.ts` — gerada pelo plugin TanStack Router ao rodar o build/dev.
- `bun.lock` / `package-lock.json` — lockfiles (decida usar um ou outro e mantenha a consistência).

## Próximos passos

- [04 — Roteamento](./04-roteamento.md) para entender TanStack Router/Start.
- [05 — Apresentação](./05-apresentacao.md) para o sistema de slides.
