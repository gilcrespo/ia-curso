# 02 — Instalação e Execução

## Pré-requisitos

| Dependência | Versão mínima | Observações |
| --- | --- | --- |
| Node.js | 20.x LTS | Recomendado 20 ou superior (Vite 8 + Nitro 3). |
| npm | 10+ | Acompanha o Node. |
| Bun (opcional) | 1.x | Apenas para executar tarefas mais rápidas (`bun run dev`). Há um arquivo `bun.lock` no repo. |
| Git | 2.x | Para clonar o repositório. |
| Sistema operacional | Windows / macOS / Linux | Build e deploy foram validados em Windows PowerShell 5. |

> Se você usa o **Trae IDE**, os comandos abaixo podem ser executados no terminal integrado.

## Clonando o repositório

```powershell
git clone <url-do-repo> Curso-IA-Gil
cd Curso-IA-Gil
```

## Instalação de dependências

Recomendado: `npm install` (lockfile `package-lock.json` está versionado).

```powershell
npm install
```

Se preferir Bun:

```powershell
bun install
```

## Variáveis de ambiente

O projeto **não exige** nenhuma variável obrigatória para rodar localmente. O `vite.config.ts` delega toda a configuração de plugins para `@lovable.dev/vite-tanstack-config`, que já injeta automaticamente as variáveis `VITE_*` em tempo de build.

Caso precise adicionar segredos (ex.: chave de API para uma nova feature), crie um arquivo `.env` na raiz (ele é ignorado pelo `.gitignore`):

```env
VITE_API_KEY=exemplo
```

## Scripts disponíveis

Definidos em [package.json](../../../package.json):

| Script | Comando | O que faz |
| --- | --- | --- |
| `dev` | `vite dev --host` | Inicia o servidor de desenvolvimento com HMR na rede local. |
| `build` | `vite build` | Build de produção (cliente + SSR + Nitro) → `.output/`. |
| `build:dev` | `vite build --mode development` | Build sem otimizações de produção, útil para debug. |
| `preview` | `vite preview` | Serve o build local para verificação. |
| `lint` | `eslint .` | Roda ESLint com a config do projeto. |
| `format` | `prettier --write .` | Formata todos os arquivos com Prettier. |

### Comandos equivalentes com Bun

```powershell
bun run dev
bun run build
bun run preview
bun run lint
bun run format
```

## Rodando localmente

```powershell
npm run dev
```

A saída indicará a URL local (por padrão `http://localhost:3000` ou `http://localhost:5173`, dependendo da porta disponível). Abra-a no navegador.

Durante o desenvolvimento:

- **HMR** atualiza o componente editado em milissegundos.
- O título da aba mostra `1/35 · Inteligência Artificial — Barracred`, indicando o slide atual.
- Use **setas ← / →**, **Espaço** ou **PageDown** para navegar.

## Build de produção

```powershell
npm run build
```

Resultado em `.output/`:

```
.output/
├── public/          # Assets estáticos (JS, CSS, imagens)
└── server/          # Worker SSR (compatível com Cloudflare)
```

## Preview do build

```powershell
npm run preview
```

Útil para validar o resultado final antes de subir para produção.

## Deploy

O `vite.config.ts` já configura o preset Nitro `cloudflare-module`. Após o `npm run build`, o arquivo `.wrangler/deploy/config.json` é gerado automaticamente apontando para `.output/server/wrangler.json`.

Para deploy manual:

```powershell
npx nitro deploy --prebuilt
```

Consulte [08 — Build e Deploy](./08-build-deploy.md) para mais detalhes.

## Solução de problemas

| Sintoma | Causa provável | Solução |
| --- | --- | --- |
| Porta 3000 ocupada | Outro processo na máquina. | Defina `PORT=3001 npm run dev` ou encerre o processo. |
| `Cannot find module '@/...'` | Aliases não reconhecidos. | Rode `npm install` para garantir que `vite-tsconfig-paths` está instalado. |
| Erros de TypeScript após `git pull` | Cache local desatualizado. | `rm -rf node_modules .output` e `npm install`. |
| Página 500 genérica do h3 | Erro não tratado no SSR. | Veja [09 — Tratamento de Erros](./09-erros.md). |
| `bun install` falha | Lockfile misto (npm + bun). | Use `npm install` ou apague `package-lock.json` antes de usar Bun. |

## Próximos passos

- [03 — Estrutura de Pastas](./03-estrutura.md) para entender o código.
- [08 — Build e Deploy](./08-build-deploy.md) quando estiver pronto para subir.
