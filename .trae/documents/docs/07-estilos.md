# 07 — Estilos e Design System

> Localização: [`src/styles.css`](../../../src/styles.css).

O projeto combina **Tailwind CSS v4** com um pequeno conjunto de **classes utilitárias nomeadas** que formam o "design system" da apresentação. A ideia é manter a consistência visual em todos os slides sem repetir regras inline.

## Tailwind v4

[`src/styles.css`](../../../src/styles.css#L1-L3) importa o Tailwind com escopo limitado:

```css
@import "tailwindcss" source(none);
@source "../src";
@import "tw-animate-css";
```

- `source(none)` desabilita a varredura automática de arquivos.
- `@source "../src"` instrui o Tailwind a escanear `src/` em busca de classes.
- `tw-animate-css` adiciona animações utilitárias (`animate-in`, `fade-in`, etc).

## Tokens semânticos

O bloco `@theme inline` mapeia variáveis CSS (`--color-primary`, `--color-accent`, ...) para utilitários Tailwind (`bg-primary`, `text-accent`, ...). Os valores reais ficam em `:root` e `.dark` usando **oklch** (recomendação do projeto):

| Token | Valor (light) | Função |
| --- | --- | --- |
| `--background` | `oklch(1 0 0)` | Fundo geral. |
| `--foreground` | `oklch(0.129 0.042 264.695)` | Texto padrão. |
| `--card` / `--card-foreground` | branco / cinza-azulado | Cartões. |
| `--primary` | `oklch(0.208 0.042 265.755)` | Botões/links principais. |
| `--accent` | `oklch(0.968 0.007 247.896)` | Destaques. |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Ações destrutivas. |
| `--border`, `--input`, `--ring` | cinzas neutros | Controles. |
| `--chart-1..5` | paleta para gráficos | Recharts. |
| `--sidebar-*` | tons para sidebar | Reservado. |

Para adicionar um novo token semântico, edite `:root` e `.dark`, e mapeie em `@theme inline` (instruções no comentário do arquivo).

## Tokens do "Demo Day" (tema dos slides)

Logo após os tokens semânticos, há um segundo `:root` com variáveis da apresentação:

```css
:root {
  --slide-bg: #ffffff;
  --slide-ink: #111111;
  --slide-accent: #ff6b00;
  --slide-mute: #9b9b9b;
}
```

| Token | Valor | Uso |
| --- | --- | --- |
| `--slide-bg` | `#ffffff` | Fundo do slide. |
| `--slide-ink` | `#111111` | Texto principal. |
| `--slide-accent` | `#ff6b00` | Laranja Barracred. |
| `--slide-mute` | `#9b9b9b` | Labels e textos secundários. |

Para mudar a paleta da apresentação, edite apenas essas quatro variáveis.

## Tipografia

A fonte padrão é **Poppins**, importada via Google Fonts em [`src/routes/__root.tsx`](../../../src/routes/__root.tsx#L95):

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" />
```

Pesos usados: 400, 500, 600, 700, 800.

`body` em [`src/styles.css`](../../../src/styles.css#L140-L145) força Poppins como fonte principal.

## Classes utilitárias dos slides

Definidas em [`src/styles.css`](../../../src/styles.css#L165-L172):

| Classe | font-size | line-height | letter-spacing | Caso de uso |
| --- | --- | --- | --- | --- |
| `.slide-hero` | 150px | 0.95 | -0.05em | Títulos enormes (capa, hero). |
| `.slide-title` | 110px | 1.0 | -0.045em | Títulos de slide. |
| `.slide-statement` | 48px | 1.25 | -0.015em | Frases de impacto. |
| `.slide-body` | 32px | 1.35 | — | Corpo de texto. |
| `.slide-caption` | 24px | 1.3 | — | Legendas. |
| `.slide-label` | 18px | — | 0.35em (uppercase) | Etiquetas. |
| `.slide-chapter-tag` | 16px | — | 0.3em (uppercase) | Tags de capítulo. |
| `.slide-num` | 200px | 0.9 | -0.06em | Números gigantes (estatísticas). |

> Todos os valores foram pensados para o canvas `1920×1080`. A escala é feita em runtime pelo shell (`scale(${scale})`).

## Classes auxiliares

| Classe | Definição | Função |
| --- | --- | --- |
| `.slide-content` | 1920×1080, `position: relative`, fundo `--slide-bg` | Container base do slide. |
| `.slide-wrapper` | Posicionamento absoluto + `transform-origin: center` | Aplicado pelo shell, centraliza o slide. |
| `.accent-underline` | `::after` com 8px de altura em `--slide-accent` | Sublinhado laranja. |
| `.text-accent` | `color: var(--slide-accent)` | Atalhos para texto laranja. |
| `.slide-content a` | Cor laranja + underline 4px offset | Links dentro de slides. |

## Hierarquia visual típica

```
.slide-label       → "Como chegamos até aqui"
.slide-title       → "A *evolução* da IA."
.slide-statement   → resumo/descrição
.slide-body        → corpo detalhado (cards, listas, números)
```

A combinação dessas classes, mais Tailwind utilities (`grid`, `gap-6`, `mb-14`, etc), cobre 100% dos slides atuais.

## Como adicionar um novo estilo

1. **Se for um token** (cor, raio, sombra): adicione em `:root` + `@theme inline` para virar utilitário.
2. **Se for uma classe de slide**: adicione em [`src/styles.css`](../../../src/styles.css) na seção "Demo Day theme tokens". Mantenha o sufixo `slide-*` para organização.
3. **Se for utilitário pontual**: use classes Tailwind inline (`className="grid gap-6 ..."`).

## Dicas

- Não use `<style>` ou CSS modules — mantenha a base única em `styles.css`.
- Use `<Underline>` (componente) em vez de aplicar `.accent-underline` manualmente.
- Use `<Label>` em vez de `.slide-label` manual.
- Para fontes/tamanhos novos, prefira **estender** os tokens em vez de usar valores inline `style={{ fontSize: 64 }}`. Isso facilita temas futuros.

## Próximos passos

- [08 — Build e Deploy](./08-build-deploy.md) para temas de produção.
- [10 — Contribuição](./10-contribuicao.md) se você pretende alterar o design system.
