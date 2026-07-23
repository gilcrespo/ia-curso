# 10 — Guia de Contribuição

> Bem-vindo! Este guia cobre padrões e convenções para quem vai contribuir com o projeto **Curso-IA-Gil**.

## Princípios

1. **Conteúdo em primeiro lugar.** A apresentação é sobre IA — mantenha o texto claro, didático e atualizado.
2. **Reutilize, não duplique.** Componentes como `SlideShell`, `Card`, `Underline` e `Label` já existem. Use-os.
3. **Mantenha a tipagem forte.** TypeScript estrito é nosso aliado.
4. **Não edite o gerado.** `routeTree.gen.ts`, `.output/`, `.wrangler/` são regenerados.

## Ambiente de desenvolvimento

1. Instale as dependências: `npm install`.
2. Rode `npm run dev` e abra no navegador.
3. Use as setas do teclado para navegar.

Recomendado:

- **Editor:** VS Code ou Trae IDE.
- **Extensões úteis:** ESLint, Prettier, Tailwind IntelliSense.
- **Extensão obrigatória:** nenhuma — o projeto está pronto.

## Workflow de branches

- `main` — produção. Protegida; só recebe PRs.
- `feat/<slug>` — features novas.
- `fix/<slug>` — correções.
- `docs/<slug>` — apenas documentação.

Slug em kebab-case, descritivo (ex.: `feat/timeline-evolucao-2026`).

## Antes de abrir um PR

Rode localmente:

```powershell
npm run lint
npm run format
npm run build
```

Checklist:

- [ ] `npm run lint` sem erros.
- [ ] `npm run build` termina com sucesso.
- [ ] Mudanças testadas no navegador (setas, fullscreen, refresh).
- [ ] Adicionou/atualizou a documentação, se aplicável.
- [ ] Não há comentários `console.log` esquecidos.
- [ ] Não há imports não usados.

## Padrões de código

### Estilo

- Indentação de 2 espaços (preservar o estilo atual).
- Aspas duplas para JSX/TSX, simples para imports literais curtos.
- Sem ponto-e-vírgula onde o Prettier removeria; confie no `npm run format`.

### Nomes

- Componentes em `PascalCase` (`SlideShell`, `ChapterCover`).
- Hooks com prefixo `use` (`useStep`).
- Tipos/interfaces em `PascalCase` (`Slide`).
- Constantes em `UPPER_SNAKE` quando imutáveis (`CHAPTER_IMAGES`).

### Imports

- Ordem preferida:
  1. Externos (`react`, `@tanstack/*`).
  2. Aliases (`@/lib/...`, `@/assets/...`).
  3. Relativos (`../routes`).
- Use `@/` em vez de `../../../`.

### Estado

- `useState` para local; `useRef` para mutáveis sem render.
- Contextos (`StepContext`) só quando o valor precisa ser lido por sub-árvores profundas.

## Padrões de slides

### Adicionando slide simples

```ts
{
  id: 36,
  render: () => (
    <SlideShell chapter="CÉREBRO">
      <Label>Nova seção</Label>
      <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
        Título do <Underline>slide</Underline>.
      </div>
      <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
        Conteúdo explicativo.
      </div>
    </SlideShell>
  ),
},
```

### Adicionando slide com etapas

```ts
{
  id: 37,
  steps: 3,
  render: () => (
    <SlideShell>
      <Label>Etapas</Label>
      <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
        Como <Underline>fazer</Underline>.
      </div>
      <ol>
        {["Primeiro", "Segundo", "Terceiro"].map((t, i) => (
          <RevealIf key={t} stepIndex={i + 1}>
            <li style={{ fontSize: 40, fontWeight: 600, marginTop: 16 }}>{t}</li>
          </RevealIf>
        ))}
      </ol>
    </SlideShell>
  ),
},
```

Não esqueça de renumerar os `id` subsequentes ou rodar o script:

```powershell
node -e "const fs=require('fs');let c=fs.readFileSync('src/routes/index.tsx','utf8');let n=1;c=c.replace(/id:\s*\d+,/g,()=>'id: '+(n++)+',');fs.writeFileSync('src/routes/index.tsx',c);console.log('Total:',n-1);"
```

## Padrões de documentação

- Atualize [05 — Apresentação](./05-apresentacao.md) ao adicionar/remover slides.
- Atualize [03 — Estrutura](./03-estrutura.md) ao criar novas pastas.
- Atualize [09 — Erros](./09-erros.md) ao mudar o middleware.

Esta documentação é autoritativa. Se encontrar divergência, **corrija primeiro o código e depois o doc**.

## Padrões de commit

Use Conventional Commits (recomendado):

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `refactor: ...`
- `chore: ...`

Exemplos:

- `feat(slides): adiciona etapa 12 ao harness`
- `fix(ssr): recupera stack original do h3`
- `docs: adiciona guia de build`

## Padrões de PR

- Título curto, imperativo.
- Descrição contendo:
  - **Motivação** (por quê?).
  - **Mudanças** (o que?).
  - **Como testar** (passos manuais).
- Adicione screenshots/GIFs se a mudança for visual.
- Se introduzir um conceito novo (ex.: novo componente), adicione uma entrada em [05 — Apresentação](./05-apresentacao.md) ou [07 — Estilos](./07-estilos.md).

## Anti-padrões

- ❌ Comentar código morto (`// removed`).
- ❌ `any` implícito.
- ❌ Adicionar variáveis de ambiente que não sejam usadas.
- ❌ Duplicar plugins no `vite.config.ts`.
- ❌ Editar `routeTree.gen.ts` à mão.
- ❌ Usar `<style>` em componentes (use `styles.css`).
- ❌ Criar `src/pages/` (convenção Next.js).
- ❌ Importar `server-only` do Next.js (proibido pelo lint).

## Recursos

- [TanStack Start Docs](https://tanstack.com/start)
- [TanStack Router Docs](https://tanstack.com/router)
- [Tailwind v4 Docs](https://tailwindcss.com/docs)
- [Cloudflare Workers / Nitro](https://nitro.unjs.io/)

## Próximos passos

- Volte para o [README](./README.md) para navegar pela documentação.
- Em caso de dúvida sobre uma decisão, abra uma issue antes do PR.
