# 06 — Sistema de Revelação Progressiva

> Localização: [`src/routes/index.tsx`](../../../src/routes/index.tsx) (seções "Slides" e "Presentation").

O **sistema de revelação progressiva** permite que um slide mostre seus elementos internos um a um, em resposta a cliques do usuário. É a base da interatividade dos slides 5–11 (timelines, fluxos do Harness, etc.).

## Conceito

Cada slide pode declarar opcionalmente um número `steps`. Quando `steps > 0`, o slide começa **vazio** (nenhum elemento visível além de título/label) e revela elementos internos a cada "avanço" do usuário. Quando todos os elementos são revelados, o próximo avanço troca de slide.

```
Slide 5.1 (steps = 4)
─────────────────────
Clique 1: revela 1º elemento
Clique 2: revela 2º elemento
Clique 3: revela 3º elemento
Clique 4: revela 4º elemento
Clique 5: vai para o slide 5.2
```

## API

### Declaração no slide

```ts
{
  id: 5,
  steps: 4,
  render: () => (
    <SlideShell chapter="CÉREBRO">
      ...
      {dados.map((item, i) => (
        <RevealIf key={item.id} stepIndex={i + 1}>
          <ElementoVisualmenteOcultoQuandoStepMenor={i + 1} />
        </RevealIf>
      ))}
    </SlideShell>
  ),
}
```

O `RevealIf` recebe:

- `stepIndex`: número da "camada" que este elemento representa (1-based).
- `children`: o JSX a ser renderizado quando o `step` atual for ≥ `stepIndex`.

### Implementação

```ts
const StepContext = createContext<number>(0);

function useStep(): number {
  return useContext(StepContext);
}

function RevealIf({ stepIndex, children }: { stepIndex: number; children: ReactNode }) {
  const current = useStep();
  if (current < stepIndex) return null;
  return <>{children}</>;
}
```

O `RevealIf` lê o `step` global do slide através do contexto React. Quando o `step` ainda não atingiu o `stepIndex` do elemento, ele retorna `null` (não renderiza nada). Quando atinge ou ultrapassa, renderiza o `children`.

## Estado `step`

Vive no componente `Presentation`:

```ts
const [step, setStep] = useState(0);
```

Comportamentos:

- Inicia em `0` (nada revelado).
- É **resetado para 0** toda vez que `index` muda (ao trocar de slide).
- Avança com `advance()` e regride com `back()`.
- O valor é propagado via `<StepContext.Provider value={step}>` para os slides renderizados.

## Provider no shell

```tsx
const slide = SLIDES[index];
return (
  ...
  <StepContext.Provider value={step}>
    {slide.render()}
  </StepContext.Provider>
  ...
);
```

Como `RevealIf` consome o contexto, qualquer elemento dentro do slide renderizado consegue ler o `step` atual, mesmo aninhado em componentes como `Card`, `SlideShell`, etc.

## Funções de navegação

### `advance()`

```ts
const advance = useCallback(() => {
  const current = SLIDES[index];
  const max = current?.steps ?? 0;
  if (max > 0 && step < max) {
    setStep(step + 1);
    return;
  }
  const clamped = Math.min(index + 1, SLIDES.length - 1);
  setIndex(clamped);
  setStep(0);
  const url = new URL(window.location.href);
  url.searchParams.set("slide", String(clamped + 1));
  window.history.replaceState({}, "", url.toString());
}, [index, step]);
```

Lógica:

1. Se o slide atual tem `steps` e o `step` ainda não atingiu o máximo, **incrementa `step`**.
2. Caso contrário (todas as etapas reveladas OU slide sem etapas), **avança para o próximo slide** e reseta `step` para 0.

### `back()`

Mesma lógica espelhada:

1. Se `steps > 0` e `step > 0`, **decrementa `step`**.
2. Senão, **volta um slide** e reseta `step` para 0.

### `go(next)` (mantido para compatibilidade)

Pula direto para um slide absoluto (sem etapas intermediárias), resetando `step`.

## Atalhos de teclado

| Tecla | Comportamento |
| --- | --- |
| `→` / `Space` / `PageDown` | `advance()` |
| `←` / `PageUp` | `back()` |
| `Home` | `go(0)` |
| `End` | `go(SLIDES.length - 1)` |
| `F` | toggle fullscreen |

Os handlers de teclado ficam em um único `useEffect` que depende de `advance` e `back` (recriado quando eles mudam).

## Indicador visual

A barra inferior do shell mostra bolinhas laranjas (`#ff6b00`) que se acendem conforme o usuário avança:

```tsx
{Array.from({ length: max }).map((_, i) => (
  <span
    key={i}
    style={{
      width: 10, height: 10, borderRadius: 999,
      background: i < step ? "#ff6b00" : "rgba(255,255,255,0.3)",
      transition: "background 0.2s ease",
    }}
  />
))}
```

Aparece apenas se `max > 0`.

## Como adicionar etapas a um slide existente

1. Adicione a propriedade `steps` ao slide:

   ```ts
   { id: 10, steps: 4, render: () => (...) }
   ```

2. Envolva cada elemento "revelável" com `RevealIf`:

   ```tsx
   {items.map((item, i) => (
     <RevealIf key={item.id} stepIndex={i + 1}>
       <Card num={item.num} title={item.title} body={item.body} />
     </RevealIf>
   ))}
   ```

3. Garanta que os títulos, labels e "chrome" do slide **não** estejam dentro de `RevealIf` — eles devem aparecer imediatamente ao entrar no slide.

## Boas práticas

- Use `stepIndex` **contíguo** a partir de `1`. Buracos (`1, 2, 4`) funcionam, mas tornam a UX confusa.
- O número de `RevealIf` deve corresponder a `steps`. Se revelar 6 elementos, defina `steps: 6`.
- Não aninhe `RevealIf` com lógicas complexas. Para padrões avançados, encapsule em um sub-componente que use `useStep()`.
- Lembre-se de testar a navegação reversa (`back()`): todos os elementos devem sumir na ordem inversa.

## Limitações conhecidas

- O sistema é **síncrono**: avançar exige um clique por etapa. Não há "auto-play".
- Cada `RevealIf` renderiza condicionalmente (`null`), não usa CSS `display: none`. Isso significa que o React descarta a subtree por completo — bom para performance, mas pode perder estado de filhos.
- O `step` é local ao componente `Presentation`. Não persiste em `localStorage` (um F5 reseta para 0).

## Próximos passos

- [05 — Apresentação](./05-apresentacao.md) para o contexto do `SLIDES` array.
- [07 — Estilos](./07-estilos.md) se quiser animar a entrada dos elementos.
