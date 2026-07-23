# 05 — Camada de Apresentação (Slides)

> Localização principal: [`src/routes/index.tsx`](../../../src/routes/index.tsx).

A apresentação é definida como um array `SLIDES` no topo do arquivo. Cada elemento é um objeto com `id`, `render` e, opcionalmente, `steps` (para slides com revelação progressiva).

## Estrutura do `SLIDES`

```ts
type Slide = { id: number; render: () => ReactNode; steps?: number };

const SLIDES: Slide[] = [
  { id: 1, render: () => <Capa /> },
  { id: 2, render: () => <Meme /> },
  // ...
];
```

### Propriedades

- `id`: número sequencial (1-based). Reflete a posição na URL `?slide=N`.
- `render`: função que retorna o JSX. **Executa a cada renderização** (sem memoização).
- `steps`: total de "fases" reveláveis progressivamente. Se omitido, o slide aparece inteiro de uma vez.

## Componentes auxiliares

### `SlideShell`

Wrapper padrão dos slides. Props:

- `chapter?: string` — exibe a barra superior com 5 ícones circulares (capítulos). Quando fornecido, o capítulo ativo é destacado (cor laranja + filtro de cor).
- `align?: "left" | "center"` — alinhamento vertical do conteúdo.
- `padded?: boolean` — aplica o padding lateral padrão (`110px`).

Layout: `position: absolute; inset: 0; padding-top: 180; padding-bottom: 120`.

```tsx
<SlideShell chapter="CÉREBRO">
  <Label>Como chegamos até aqui</Label>
  <div className="slide-title mb-14" style={{ maxWidth: 1500 }}>
    A <Underline>evolução</Underline> da IA.
  </div>
  ...
</SlideShell>
```

### `ChapterCover`

Capa de capítulo. Layout em duas colunas (1.1fr texto + 0.9fr imagem):

```tsx
<ChapterCover num="01" name="Cérebro (LLM)" image={cerebroImg} range="" />
```

### `Card`

Cartão numerado. Props:

- `num?: string` — etiqueta superior (ex.: `"Texto"`, `"01"`).
- `title: string` — título em fonte 40/700.
- `body?: string` — corpo, aceitando HTML via `dangerouslySetInnerHTML`.

```tsx
<Card num="01" title="Entrada" body="Recebe prompt e valida segurança." />
```

### `Label`

Etiqueta superior com a classe `slide-label`. Usada em todos os slides para nomear a seção (ex.: "Como chegamos até aqui").

### `Underline`

Span com `accent-underline` (sublinhado laranja). Usado para destacar palavras-chave no título.

## Mapeamento de capítulos

A constante `CHAPTER_IMAGES` mapeia o nome do capítulo (em CAIXA ALTA) para o ícone circular exibido no topo dos slides:

```ts
const CHAPTER_IMAGES: Record<string, string> = {
  "CÉREBRO": cerebroImg,
  "CONHECIMENTO": conhecimentoImg,
  "CONTEXTO": contextoImg,
  "HABILIDADES": habilidadesImg,
  "AÇÃO": acaoImg,
};
```

Os arquivos vêm de [`src/assets/`](../../../src/assets/) (PNGs). Use sempre a chave em maiúsculas (com acento) ao passar `chapter` para o `SlideShell`.

## Inventário atual de slides

| id | Capítulo | Descrição | Steps |
| --- | --- | --- | --- |
| 1 | — | Capa "Inteligência Artificial: do Cérebro à Ação" | — |
| 2 | — | Meme "O que queremos" | — |
| 3 | — | Índice: Os 5 pilares da nossa jornada | — |
| 4 | Cérebro | Capa do capítulo | — |
| 5 | Cérebro | Timeline 1/3: Antiguidade → Eliza | 4 |
| 6 | Cérebro | Timeline 2/3: Games → LLMs | 4 |
| 7 | Cérebro | Timeline 3/3: Multimodalidade → Agentes | 4 |
| 8 | Cérebro | "O que são LLMs?" | — |
| 9 | Cérebro | "Como a LLM funciona" (Encode → Decode) | 5 |
| 10 | Cérebro | Modelos populares | 4 |
| 11 | Cérebro | Harness (LLM no centro + 6 componentes) | 7 |
| 12 | Cérebro | "O que é um token?" | — |
| 13 | Cérebro | Limitações de contexto | — |
| 14 | Cérebro | Custos por token (gráfico de barras) | — |
| 15 | Cérebro | Custos (imagem) | — |
| 16 | Conhecimento | Capa | — |
| 17 | Conhecimento | Assistentes web (ChatGPT, Gemini, Claude) | — |
| 18 | Conhecimento | Projetos no ChatGPT | — |
| 19 | Conhecimento | PDFs e vídeos no NotebookLM | — |
| 20 | Contexto | Capa | — |
| 21 | Contexto | "O que é contexto?" | — |
| 22 | Contexto | Anatomia do prompt (R-T-C-F) | — |
| 23 | Contexto | Exercício falado | — |
| 24 | Contexto | Exercício 1/4 — Personificação | — |
| 25 | Contexto | Exercício 2/4 — Exemplo | — |
| 26 | Contexto | Exercício 3/4 — Etapas | — |
| 27 | Contexto | Exercício 4/4 — Iteração | — |
| 28 | Contexto | Prompts reutilizáveis (Markdown) | — |
| 29 | Habilidades | Capa | — |
| 30 | Habilidades | Habilidades customizadas | — |
| 31 | Habilidades | Exemplos de skills (9 cards) | — |
| 32 | Ação | Capa | — |
| 33 | Ação | Anatomia estrutural de um agente (Cérebro + Ferramentas + Loop ReAct) | — |
| 34 | Ação | Juntando tudo (exercício final) | — |
| 35 | — | Meme final | — |
| 36 | — | Agradecimento + próximos passos | — |

## Como adicionar um novo slide

1. Abra [`src/routes/index.tsx`](../../../src/routes/index.tsx).
2. Localize o array `SLIDES` e adicione o objeto no local desejado.
3. Use o `id` sequencial. Se o novo slide ficar entre dois existentes, **atualize** os `id` dos subsequentes e renumere a URL. Há um script Node que faz isso automaticamente:

   ```powershell
   node -e "const fs=require('fs');let c=fs.readFileSync('src/routes/index.tsx','utf8');let n=1;c=c.replace(/id:\s*\d+,/g,()=>'id: '+(n++)+',');fs.writeFileSync('src/routes/index.tsx',c);console.log('Total:',n-1);"
   ```

4. Se o slide tiver elementos que devem aparecer um a um, defina `steps` e use `RevealIf` (veja [06 — Revelação Progressiva](./06-revelacao-progressiva.md)).

## Componente `Presentation`

A função `Presentation` é o componente raiz da rota `/`. Responsabilidades:

- Mantém o `index` (slide atual) e o `step` (etapa de revelação).
- Sincroniza o estado com a URL via `?slide=N`.
- Lida com atalhos de teclado (`←/→`, `Space`, `PageUp/Down`, `Home`, `End`, `F`).
- Calcula a escala para "fit-to-screen" (1920×1080) com `useLayoutEffect`.
- Renderiza a barra de rodapé com botões de navegação e indicador de progresso.

### Atalhos de teclado

| Tecla | Ação |
| --- | --- |
| `→`, `Space`, `PageDown` | Avança etapa; troca de slide se for o caso. |
| `←`, `PageUp` | Volta etapa; troca de slide se for o caso. |
| `Home` | Primeiro slide, resetando `step`. |
| `End` | Último slide, resetando `step`. |
| `F` | Alterna fullscreen. |

### Sincronização com a URL

Toda mudança de slide atualiza `?slide=N` via `window.history.replaceState`. Isso permite:

- Deep-link para um slide específico.
- Recarregar a página mantendo o estado.
- Compartilhar URLs com a equipe.

### Barra de controles

Localizada fixa no rodapé (`bottom: 24`). Mostra:

- Botão `←` (voltar).
- Indicador `N / Total`.
- Botão `→` (avançar).
- Bolinhas laranjas indicando quantas etapas do slide atual já foram reveladas (apenas se `steps > 0`).

## Cálculo de escala (fit-to-screen)

```ts
const update = () => {
  if (!stageRef.current) return;
  const { clientWidth: w, clientHeight: h } = stageRef.current;
  setScale(Math.min(w / 1920, h / 1080));
};
```

A constante `1920×1080` é o tamanho "design" dos slides. A transformação `scale(${scale})` garante que o conteúdo cabe na viewport sem distorcer.

## Próximos passos

- [06 — Revelação Progressiva](./06-revelacao-progressiva.md) para entender `RevealIf` e o ciclo de `step`.
- [07 — Estilos](./07-estilos.md) para tokens visuais e classes utilitárias.
