# Documentação Técnica — Curso IA GIL (Barracred)

Bem-vindo à documentação técnica do projeto **Curso-IA-Gil**. Este diretório reúne tudo o que é necessário para entender, instalar, desenvolver, fazer deploy e contribuir com a apresentação interativa sobre Inteligência Artificial para colaboradores da Barracred.

## Sumário

1. [Visão Geral e Arquitetura](./01-visao-geral.md) — O que é o projeto, objetivos, stack e arquitetura de alto nível.
2. [Guia de Instalação e Execução](./02-instalacao.md) — Pré-requisitos, instalação de dependências e comandos de desenvolvimento.
3. [Estrutura de Pastas e Convenções](./03-estrutura.md) — Organização de `src/`, arquivos gerados, aliases e convenções de código.
4. [Roteamento e Camada de Rotas](./04-roteamento.md) — TanStack Router, TanStack Start, root route e SSR.
5. [Camada de Apresentação (Slides)](./05-apresentacao.md) — Como os slides são definidos, renderizados e navegados.
6. [Sistema de Revelação Progressiva](./06-revelacao-progressiva.md) — `StepContext`, `RevealIf` e ciclo de vida do estado `step`.
7. [Estilos e Design System](./07-estilos.md) — Tailwind v4, classes utilitárias e tokens visuais.
8. [Configuração de Build e Deploy](./08-build-deploy.md) — Vite, Nitro, preset Cloudflare, env vars e assets.
9. [Tratamento de Erros e Observabilidade](./09-erros.md) — Middleware, error boundary e captura SSR.
10. [Guia de Contribuição](./10-contribuicao.md) — Padrões de PR, lint, formatação e checklist.

## Como navegar

- **Quero rodar o projeto agora?** Vá para [02 — Instalação](./02-instalacao.md).
- **Preciso entender a estrutura dos slides?** Comece por [05 — Apresentação](./05-apresentacao.md).
- **Vou adicionar um novo slide com etapas?** Leia [06 — Revelação Progressiva](./06-revelacao-progressiva.md).
- **Vou fazer deploy?** Vá para [08 — Build e Deploy](./08-build-deploy.md).

## Convenções desta documentação

- Caminhos são sempre absolutos a partir da raiz do repositório, mas usamos a forma relativa para clareza (ex.: `src/routes/index.tsx`).
- Comandos de terminal consideram PowerShell 5 (Windows) e podem exigir ajustes para bash/zsh.
- Toda referência a um arquivo é um link Markdown clicável.
