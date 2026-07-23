# 08 — Configuração de Build e Deploy

> Arquivos relevantes:
> - [`vite.config.ts`](../../../vite.config.ts)
> - [`package.json`](../../../package.json)
> - [`.gitignore`](../../../.gitignore)

## Visão geral do pipeline

```
src/  ─►  Vite (cliente)   ─► .output/public/  (assets estáticos)
src/  ─►  Vite SSR         ─► .output/server/  (worker Nitro)
                              │
                              ▼
                            Nitro ─► preset cloudflare-module
                              │
                              ▼
                        .output/server/wrangler.json
                              │
                              ▼
                   .wrangler/deploy/config.json
                              │
                              ▼
                        npx nitro deploy --prebuilt
```

## Configuração Vite

[`vite.config.ts`](../../../vite.config.ts) delega quase tudo para `@lovable.dev/vite-tanstack-config`. **Não** adicione manualmente:

- `tanstackStart`
- `viteReact`
- `tailwindcss`
- `tsConfigPaths`
- `nitro` (preset Cloudflare como target padrão)
- `componentTagger` (apenas dev)
- Injeção de `VITE_*` env
- Alias `@`
- Dedupe de React/TanStack
- Plugins de log de erro
- Sandbox detection (port/host/strictPort)

O que o projeto **acrescenta**:

```ts
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
```

Isso redireciona o entry do TanStack Start para `src/server.ts` (nosso wrapper SSR com captura de erros).

## Scripts

Definidos em [package.json](../../../package.json):

| Script | Comando | Uso |
| --- | --- | --- |
| `dev` | `vite dev --host` | Dev server com HMR. |
| `build` | `vite build` | Build produção. |
| `build:dev` | `vite build --mode development` | Build sem minify, útil para debug. |
| `preview` | `vite preview` | Serve build local. |
| `lint` | `eslint .` | Checagem estática. |
| `format` | `prettier --write .` | Formatação. |

## Comportamento do `npm run build`

1. **Cliente** — Vite compila JS, CSS e gera hashes em `.output/public/assets/`. Há aviso de plugins pesados (vite-tsconfig-paths, tanstack-start-core). A maioria é apenas na primeira execução.
2. **SSR** — Vite SSR empacota a aplicação em formato Node para execução server-side.
3. **Nitro** — Empacota tudo num worker Cloudflare (compatibilidade `2026-07-14`). Gera `.output/server/wrangler.json` e `.wrangler/deploy/config.json`.
4. **Aviso `inlineDynamicImports` ignorado** — esperado porque `codeSplitting` está ativo.

Saída típica:

```
.output/public/assets/*.js  (chunks do cliente)
.output/public/assets/*.css
.output/server/index.mjs   (entry Nitro)
.output/server/wrangler.json
.wrangler/deploy/config.json  → aponta para ../output/server/wrangler.json
```

## Deploy

Após o build, o deploy pode ser feito com:

```powershell
npx nitro deploy --prebuilt
```

Alternativas comuns:

```powershell
# Cloudflare via Wrangler diretamente
npx wrangler deploy

# Qualquer plataforma que aceite workers
npx nitro deploy --prebuilt --preset cloudflare-module
```

> Os presets suportados dependem da versão do Nitro. Hoje o projeto fixa `cloudflare-module` como padrão.

## Variáveis de ambiente

`vite.config.ts` injeta automaticamente qualquer `VITE_*` em tempo de build via `import.meta.env`. O projeto **não exige** nenhuma variável para o build atual.

Para criar variáveis locais:

```env
# .env (não commitado)
VITE_API_KEY=...
```

Para o deploy em Cloudflare, defina as variáveis equivalentes no painel do Worker ou via `wrangler secret put`.

## Assets

### Estáticos (public/)

Arquivos em [`public/`](../../../public/) são copiados para `.output/public/` na raiz. Acessíveis via `/favicon.ico`, `/logo.svg`, `/pr.md`, etc.

### Importados (src/assets/)

Imagens em [`src/assets/`](../../../src/assets/) são importadas como módulos:

```ts
import cerebroImg from "@/assets/ch-cerebro.png";
```

Vite resolve, otimiza e gera hashes. Use isso sempre que a imagem for usada em um componente React (você ganha tree-shaking e cache-busting).

### `*.asset.json`

Alguns assets têm um arquivo `.asset.json` irmão (ex.: `ch-cerebro.png.asset.json`). Esses manifests são gerados pelo pipeline e devem ser importados quando o asset for usado em CSS ou contextos onde o `import` direto não é possível:

```ts
import assetManifest from "@/assets/ch-cerebro.png.asset.json";
<img src={assetManifest.url} />
```

## Ignorados pelo git

[`.gitignore`](../../../.gitignore) ignora:

- `node_modules/`
- `.output/`
- `.vinxi/`
- `.wrangler/`
- `dist/`
- `.env*`
- Logs e caches diversos

Não commite esses diretórios. Eles são regenerados em cada `build`/`dev`.

## Boas práticas de build

1. **Sempre rode `npm run build` antes do deploy.** Confirme que o build termina sem erro.
2. **Não edite `routeTree.gen.ts`.** É gerado pelo plugin TanStack Router.
3. **Não duplique plugins** no `vite.config.ts`. O comentário no topo do arquivo alerta explicitamente.
4. **Cache limpo** se o build der erro estranho:

   ```powershell
   rm -rf node_modules .output .wrangler
   npm install
   npm run build
   ```

## Próximos passos

- [09 — Erros](./09-erros.md) para entender o middleware SSR.
- [10 — Contribuição](./10-contribuicao.md) para o fluxo de PR.
