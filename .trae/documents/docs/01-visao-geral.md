# 01 — Visão Geral e Arquitetura

## Objetivo do projeto

O **Curso-IA-Gil** é uma aplicação web (SPA + SSR) que renderiza uma **apresentação interativa** sobre Inteligência Artificial, organizada em slides. O conteúdo foi desenhado para colaboradores da **Barracred** com perfis técnicos e leigos, abordando:

- Evolução histórica da IA e das LLMs.
- Como uma LLM funciona "por baixo do capô".
- Modelos populares e a camada de Harness.
- Conceitos de tokens, janelas de contexto e custos.
- Construção de contexto, habilidades (skills) e exercícios práticos.

A aplicação é uma **rota única** (`/`) com um sistema de slides em memória, navegável por teclado, mouse e barra de rodapé, com revelação progressiva de elementos internos em cada slide.

## Stack tecnológica

| Camada | Tecnologia | Versão |
| --- | --- | --- |
| Framework | React | 19.2.0 |
| Roteamento | TanStack Router | 1.170.16 |
| Meta-framework | TanStack Start | 1.168.26 |
| Data fetching | TanStack React Query | 5.101.1 |
| Build | Vite | 8.0.16 |
| Estilização | Tailwind CSS | 4.2.1 |
| UI Primitives | Radix UI + shadcn/ui | várias |
| Linguagem | TypeScript | 5.8.3 |
| Bundler server | Nitro | 3.0.260603-beta |
| Deploy target | Cloudflare Module | (preset padrão) |

## Arquitetura de alto nível

```
┌─────────────────────────────────────────────────────────────┐
│                     Navegador (Browser)                     │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  React 19 — Presentation (root render)             │    │
│  │  ├── StepContext.Provider (estado de etapas)       │    │
│  │  ├── SLIDES[] (definição dos slides)               │    │
│  │  └── Componentes auxiliares:                       │    │
│  │      • SlideShell, ChapterCover, Card,             │    │
│  │        Label, Underline, RevealIf                   │    │
│  └─────────────────────────────────────────────────────┘    │
└────────────────────────┬────────────────────────────────────┘
                         │ HTML/JSX (SSR + hidratação)
┌────────────────────────┴────────────────────────────────────┐
│                  Servidor (SSR via TanStack Start)          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  src/server.ts — entrypoint SSR                     │    │
│  │  ├── getServerEntry() — lazy import do runtime      │    │
│  │  ├── normalizeCatastrophicSsrResponse()            │    │
│  │  └── Trata erros 5xx lançados pelo h3              │    │
│  │                                                      │    │
│  │  src/start.ts — middlewares do Start                │    │
│  │  └── errorMiddleware (try/catch → 500 HTML)         │    │
│  │                                                      │    │
│  │  src/router.tsx — cria o router + QueryClient      │    │
│  └─────────────────────────────────────────────────────┘    │
└────────────────────────┬────────────────────────────────────┘
                         │ Nitro (build/deploy)
┌────────────────────────┴────────────────────────────────────┐
│                       Build & Deploy                         │
│  • Vite (cliente) → .output/public/                         │
│  • Vite SSR → .output/server/                               │
│  • Nitro → preset cloudflare-module                         │
│  • .wrangler/deploy/config.json gerado automaticamente     │
└─────────────────────────────────────────────────────────────┘
```

## Princípios arquiteturais

1. **Rota única, dados em memória.** A apresentação inteira é um array `SLIDES` declarado em `src/routes/index.tsx`. Não há banco de dados, fetch externo ou CMS; o estado é totalmente local.
2. **Renderização cliente-first.** Slides são funções React puras (`render: () => ReactNode`) que se beneficiam de SSR apenas para o primeiro frame.
3. **Sistema de etapas desacoplado.** O `StepContext` é um mecanismo genérico que permite a qualquer slide definir quantos elementos podem ser revelados, sem acoplar a lógica de navegação ao conteúdo.
4. **CSS utilitário com tokens locais.** Tailwind v4 + classes utilitárias nomeadas (`slide-content`, `slide-label`, `slide-body`, `accent-underline`, `slide-num`) compõem o "design system" da apresentação.
5. **SSR tolerante a falhas.** Middleware e normalizador garantem que exceções do React no servidor retornem uma página de erro HTML ao invés de um JSON genérico do h3.

## Diagrama lógico de componentes

```
Presentation (componente raiz)
├── StepContext.Provider
│   └── slide.render() → ReactNode
│       ├── SlideShell
│       │   ├── CHAPTER_IMAGES (logos circulares)
│       │   ├── Label
│       │   ├── Underline
│       │   ├── Card
│       │   └── RevealIf × n
│       └── ChapterCover (capas de capítulo)
├── Controles de navegação (botões ←/→ + indicador de etapas)
└── useLayoutEffect (cálculo de escala para "fit-to-screen")
```

## Quando usar cada peça

| Preciso de… | Onde olhar |
| --- | --- |
| Criar um novo slide | [`src/routes/index.tsx`](../../../src/routes/index.tsx) → array `SLIDES` |
| Adicionar etapas progressivas | [`StepContext` e `RevealIf`](./06-revelacao-progressiva.md) |
| Mudar cores/fontes | [`src/styles.css`](../../../src/styles.css) e classes utilitárias |
| Adicionar uma rota | [`src/routes/`](../../../src/routes/) (file-based) |
| Customizar SSR | [`src/server.ts`](../../../src/server.ts) + [`src/start.ts`](../../../src/start.ts) |
| Deploy | [`vite.config.ts`](../../../vite.config.ts) + [08 — Build e Deploy](./08-build-deploy.md) |

## Próximos passos da leitura

- [02 — Instalação](./02-instalacao.md) para rodar o projeto.
- [05 — Apresentação](./05-apresentacao.md) para mergulhar no sistema de slides.
