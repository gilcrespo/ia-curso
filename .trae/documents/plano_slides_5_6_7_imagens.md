# Plano: Auto-scroll no SlideShell + Revelação de Imagens por Clique (Slides 5, 6, 7)

## 1. Resumo do Objetivo

Implementar duas melhorias complementares na apresentação (`src/routes/index.tsx`):

1. **Auto-scroll vertical no `SlideShell`**: quando um slide tiver conteúdo que ultrapasse a altura visível (1920×1080), o container interno deve rolar automaticamente até o final sempre que um novo elemento for revelado (mudança de `step`).
2. **Revelação de imagens por clique** nos slides 5, 6 e 7 (linha do tempo "A evolução da IA"): o slide inteiro passa a ser clicável; ao clicar, as imagens correspondentes daquela era aparecem em uma galeria abaixo da timeline. Um novo clique oculta as imagens (toggle).

As imagens de apoio já foram movidas da pasta `imagem/` (fora do `public/`, inacessível pelo Vite) para `public/imagem/`, onde podem ser servidas diretamente pela URL `/imagem/...`.

## 2. Estado Atual (verificado)

### Já implementado
- `SlideShell` ([src/routes/index.tsx](file:///c:/Dev/Emanuel/Estudos/Curso-IA-Gil/src/routes/index.tsx#L28-L99)) já possui:
  - `useRef` no container interno scrollable.
  - `useEffect` dependente de `currentStep` que faz `el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })`.
  - `overflowY: "auto"` e `overflowX: "hidden"` no container interno.
  - Nova prop opcional `onClick?: () => void`.
  - `onClick` e `cursor: "pointer"` aplicados ao `div.slide-content` quando a prop é fornecida.
- 9 imagens copiadas para `public/imagem/`:
  - `imagem_1slide1.png`, `imagem_2slide1.jpg`, `imagem_3slide1.png`, `imagem_4slide1.jpg` (slide 5)
  - `imagem_1_1slide2.png`, `imagem_1_2slide2.png`, `imagem_2slide2.png.png`, `imagem_3slide2.png.png` (slide 6)
  - `imagem_full_slide3.png.png` (slide 7)

### Pendente
- Criar componentes `Slide5`, `Slide6`, `Slide7` com `useState` para controlar a visibilidade da galeria.
- Substituir o `render` inline dos slides 5, 6 e 7 no array `SLIDES` para apontar para os novos componentes.
- Mapear cada imagem ao seu respectivo marco histórico.
- (Opcional) Garantir reset do estado `showImages` ao navegar para outro slide.

## 3. Mudanças Propostas em `src/routes/index.tsx`

### 3.1. Novos componentes (inserir antes do array `SLIDES`)

#### `Slide5` — Evolução da IA · Parte 1
- `useState<boolean>` para `showImages`.
- `<SlideShell chapter="CÉREBRO" onClick={() => setShowImages(v => !v)}>`.
- Mantém a timeline atual com 4 entradas (Antiguidade / 1936–1950 / 1956 / 1966) e seus `RevealIf` correspondentes.
- Galeria (4 colunas, `gridTemplateColumns: "repeat(4, 1fr)"`):
  1. `/imagem/imagem_1slide1.png` — O mito de Talos
  2. `/imagem/imagem_2slide1.jpg` — A era de Turing
  3. `/imagem/imagem_3slide1.png` — IA no campo acadêmico (Dartmouth)
  4. `/imagem/imagem_4slide1.jpg` — Eliza
- Cada item: `border: "2px solid #111"`, `borderRadius: 8`, `objectFit: "cover"`, altura ~200px.

#### `Slide6` — Evolução da IA · Parte 2
- Mesma estrutura do `Slide5`, com as 4 entradas da timeline (1977–1997 / Anos 80–2000 / 2012→hoje / 2022).
- Galeria em grid 2×2 (`gridTemplateColumns: "repeat(2, 1fr)"`, `maxWidth: 900`):
  1. `/imagem/imagem_1_1slide2.png` — Pac-Man
  2. `/imagem/imagem_1_2slide2.png` — Deep Blue vs Kasparov
  3. `/imagem/imagem_2slide2.png.png` — Árvore de Decisão
  4. `/imagem/imagem_3slide2.png.png` — AlexNet
- A entrada "2022 — Lançamento das LLMs" não tem imagem associada e fica sem miniatura.

#### `Slide7` — Evolução da IA · Parte 3
- `useState<boolean>` para `showImages`.
- `<SlideShell chapter="CÉREBRO" onClick={() => setShowImages(v => !v)}>`.
- Mantém a timeline com 4 entradas (2023 / 2024 / 2024–2025 / 2026).
- Galeria: 1 imagem em largura total, `border: "2px solid #111"`, `borderRadius: 8`.
  - `/imagem/imagem_full_slide3.png.png` — Evolução da IA 2023–2026.

### 3.2. Atualizar o array `SLIDES`

Trocar o conteúdo de `render` dos slides 5, 6 e 7 de uma função inline que devolve JSX para uma função que devolve o componente:

```tsx
// Antes
{
  id: 5,
  steps: 4,
  render: () => (
    <SlideShell chapter="CÉREBRO">
      ...timeline...
    </SlideShell>
  ),
}

// Depois
{
  id: 5,
  steps: 4,
  render: () => <Slide5 />,
},
```

Repetir para `id: 6` (`<Slide6 />`) e `id: 7` (`<Slide7 />`).

### 3.3. Reset do estado ao trocar de slide (recomendado)

Como o `Presentation` re-renderiza `{slide.render()}` dentro de `<StepContext.Provider>`, sem um `key` o React reutilizaria a instância e o `showImages` persistiria entre navegações. Para resetar:

```tsx
<StepContext.Provider value={step}>
  <div key={index} style={{ display: "contents" }}>
    {slide.render()}
  </div>
</StepContext.Provider>
```

O `key={index}` força o unmount/remount a cada troca de slide, zerando o estado local.

## 4. Layout Visual da Galeria

- Container: `marginTop: 50`, `display: "grid"`, `gap: 20`.
- Slide 5: 4 colunas, altura 200px, `objectFit: "cover"`.
- Slide 6: 2 colunas, `maxWidth: 900` (centralizado), altura 220px.
- Slide 7: 1 coluna, largura total, altura automática.
- Moldura padrão: `border: "2px solid #111"`, `borderRadius: 8`, `background: "#fff"`, `overflow: "hidden"`.
- O auto-scroll do `SlideShell` cuida do overflow vertical automaticamente.

## 5. UX

- O cursor muda para `pointer` ao passar sobre os slides 5, 6 e 7 (definido dentro do `SlideShell` quando `onClick` é fornecido).
- Clique em qualquer área do slide (incluindo o cabeçalho do capítulo) alterna a galeria.
- Clique novamente para ocultar.
- A navegação por teclado (`→`, `Espaço`, `PageDown`) e os botões inferiores continuam funcionando normalmente, pois o handler está apenas no `slide-content` e não interfere nos atalhos globais.

## 6. Passos de Validação

1. `bun run dev` (ou `npm run dev`) para subir o Vite.
2. Navegar até o slide 5 com `→`.
3. Avançar os 4 `steps` da timeline.
4. Clicar em qualquer área do slide — as 4 imagens devem aparecer abaixo da timeline.
5. Clicar novamente — as imagens devem sumir.
6. Repetir para os slides 6 (galeria 2×2) e 7 (imagem única).
7. Verificar que a navegação por seta para o slide 8 e o retorno zera o estado de `showImages`.
8. Conferir visualmente que o auto-scroll do `SlideShell` leva até o final quando a galeria é expandida em telas menores.

## 7. Itens Fora de Escopo

- Não criar `.asset.json` para as novas imagens (as imagens ficam em `public/imagem/` e são referenciadas por URL direta `/imagem/...`).
- Não mover/excluir a pasta original `imagem/` — ela permanece como cópia de origem.
- Não alterar os slides 1–4 e 8+.
