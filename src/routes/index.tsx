﻿import { createFileRoute } from "@tanstack/react-router";
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

import logoAsset from "@/assets/logo_barracred.png.asset.json";
import oqueQueremosAsset from "@/assets/oquequeremos.png.asset.json";
import cerebroImg from "@/assets/ch-cerebro.png";
import conhecimentoImg from "@/assets/ch-conhecimento.png";
import habilidadesImg from "@/assets/ch-habilidades.png";
import contextoImg from "@/assets/ch-contexto.png";
import acaoImg from "@/assets/ch-acao.png";
import custosImg from "@/assets/custos.png";
import tokenVisualImg from "@/assets/token-visual.png";
import projImg from "@/assets/proj.png";

const CHAPTER_IMAGES: Record<string, string> = {
  "CÉREBRO": cerebroImg,
  "CONHECIMENTO": conhecimentoImg,
  "CONTEXTO": contextoImg,
  "HABILIDADES": habilidadesImg,
  "AÇÃO": acaoImg,
};

export const Route = createFileRoute("/")({
  component: Presentation,
});

/* ---------- Layout primitives ---------- */

function SlideShell({
  chapter,
  children,
  align = "left",
  padded = true,
  hideScrollbar = false,
  onClick,
}: {
  chapter?: string;
  children: ReactNode;
  align?: "left" | "center";
  padded?: boolean;
  hideScrollbar?: boolean;
  onClick?: () => void;
}) {
  // Ref do container interno para detectar overflow e auto-scroll
  const scrollRef = useRef<HTMLDivElement>(null);
  // Dispara o auto-scroll sempre que o step muda (novo elemento aparece)
  const currentStep = useStep();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Quando o conteúdo passa da altura visível, rola automaticamente
    // até o final para mostrar o que acabou de aparecer.
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [currentStep]);

  return (
    <div
      className="slide-content"
      onClick={onClick}
      style={onClick ? { cursor: "pointer" } : undefined}
    >
      {chapter && (
<<<<<<< HEAD
        <div className="slide-chapter-header">
          <div
            className="slide-chapter-tag absolute flex items-center gap-4"
            style={{ top: 50, left: 90 }}
          >
            {Object.entries(CHAPTER_IMAGES).map(([name, img]) => (
              <img
                key={name}
                src={img}
                alt={name}
                style={{
                  width: name === chapter ? 120 : 80,
                  height: name === chapter ? 120 : 80,
                  objectFit: "contain",
                  filter: name === chapter ? "none" : "grayscale(100%)",
                  border: name === chapter ? "4px solid #f97316" : "2px solid transparent",
                  borderRadius: "50%",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
=======
        <div
          className="slide-chapter-tag absolute flex items-center gap-4"
          style={{
            top: 0,
            left: 0,
            right: 0,
            padding: "50px 90px 30px 90px",
            background: "linear-gradient(to bottom, #ffffff 60%, rgba(255,255,255,0))",
            zIndex: 10,
          }}
        >
          {Object.entries(CHAPTER_IMAGES).map(([name, img]) => (
            <img
              key={name}
              src={img}
              alt={name}
              style={{
                width: name === chapter ? 120 : 80,
                height: name === chapter ? 120 : 80,
                objectFit: "contain",
                filter: name === chapter ? "none" : "grayscale(100%)",
                border: name === chapter ? "4px solid #f97316" : "2px solid transparent",
                borderRadius: "50%",
                transition: "all 0.3s ease",
              }}
            />
          ))}
>>>>>>> 508bb57924fd72908c33e0bc9614cd3c8318fdee
        </div>
      )}
      <div
        ref={scrollRef}
        className={`absolute inset-0 flex flex-col${hideScrollbar ? " slide-scroll-hidden" : ""}`}
        style={{
          paddingLeft: padded ? 110 : 0,
          paddingRight: padded ? 110 : 0,
          paddingTop: 205,
          paddingBottom: 120,
          justifyContent: align === "center" ? "center" : "flex-start",
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: hideScrollbar ? "none" : undefined,
          msOverflowStyle: hideScrollbar ? "none" : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <div className="slide-label mb-8">{children}</div>;
}

function Underline({ children }: { children: ReactNode }) {
  return <span className="accent-underline">{children}</span>;
}

function CopyPromptButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copyText = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const temp = document.createElement("textarea");
        temp.value = text;
        temp.style.position = "fixed";
        temp.style.opacity = "0";
        document.body.appendChild(temp);
        temp.focus();
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={copyText}
      className={`audience-copy-button${copied ? " audience-copy-button-copied" : ""}`}
    >
      {copied ? "Copiado" : "Copiar"}
    </button>
  );
}

function Card({ title, body, num }: { title: string; body?: string; num?: string }) {
  return (
    <div
      className="flex flex-col"
      style={{
        border: "2px solid #111",
        padding: "36px 40px",
        minHeight: 240,
      }}
    >
      {num && <div className="slide-label text-accent mb-4">{num}</div>}
      <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>
        {title}
      </div>
      {body && (
        <div
          className="slide-body"
          style={{ color: "#444" }}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}
    </div>
  );
}

/* ---------- Chapter divider ---------- */

function ChapterCover({
  num,
  name,
  image,
  range,
}: {
  num: string;
  name: string;
  image: string;
  range: string;
}) {
  return (
    <div className="slide-content">
      <div className="slide-chapter-tag absolute" style={{ top: 60, left: 110 }}>
        {range}
      </div>
      <div
        className="absolute inset-0 grid"
        style={{ gridTemplateColumns: "1.1fr 0.9fr", alignItems: "center" }}
      >
        <div style={{ paddingLeft: 110 }}>
          <div className="slide-label mb-8">Capítulo {num}</div>
          <div className="slide-hero">
            <Underline>{name}</Underline>
          </div>
        </div>
        <div className="flex items-center justify-center" style={{ paddingRight: 110 }}>
          <img src={image} alt={name} style={{ width: 620, height: 620, objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Slides ---------- */

type Slide = { id: number; render: () => ReactNode; steps?: number };

/**
 * Contexto que expõe, dentro de cada slide, quantos elementos "passo"
 * já foram revelados pelo usuário. Quando `step` é 0, nada foi
 * revelado. Conforme o usuário clica/pressiona seta, o valor cresce até
 * `SLIDE.steps - 1`. Quando o número total é atingido, o próximo clique
 * avança para o slide seguinte.
 */
const StepContext = createContext<number>(0);
function useStep(): number {
  return useContext(StepContext);
}
function RevealIf({ stepIndex, children }: { stepIndex: number; children: ReactNode }) {
  const current = useStep();
  if (current < stepIndex) return null;
  return <>{children}</>;
}
function StepRevealContent({ stepIndex, children }: { stepIndex: number; children: ReactNode }) {
  const current = useStep();
  if (current < stepIndex) return null;
  return <div className="contents">{children}</div>;
}

function Slide5() {
  return (
    <SlideShell chapter="CÉREBRO">
      <Label>Como chegamos até aqui</Label>
      <div className="slide-title mb-14" style={{ maxWidth: 1500 }}>
        A <Underline>evolução</Underline> da IA.
      </div>
      <div className="relative" style={{ marginTop: 30 }}>
        <div style={{ height: 4, background: "#111", position: "absolute", top: 40, left: 0, right: 0 }} />
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { y: "Antiguidade", t: "O mito de Talos", d: "Origem do desejo de criar vida artificial.", img: "/imagem/imagem_1slide1.png" },
            { y: "1936–1950", t: "A era de Turing", d: "Máquina de Turing e o teste de Turing.", img: "/imagem/imagem_2slide1.jpg" },
            { y: "1956", t: "IA no campo acadêmico", d: "Dartmouth formaliza o termo IA.", img: "/imagem/imagem_3slide1.png" },
            { y: "1966", t: "Eliza", d: "Primeiro chatbot da história (psicóloga).", img: "/imagem/imagem_4slide1.jpg" },
          ].map((step, i) => (
            <RevealIf key={step.y} stepIndex={i + 1}>
              <div className="flex flex-col items-start" style={{ paddingTop: 20 }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: '#ff6b00', marginBottom: 30 }} />
                <div className="slide-label" style={{ color: "#111" }}>{step.y}</div>
                <div style={{ fontSize: 30, fontWeight: 600, marginTop: 12, lineHeight: 1.2 }}>{step.t}</div>
                <div className="slide-body" style={{ color: "#444", marginTop: 8 }}>{step.d}</div>
                {step.img && (
                  <img src={step.img} alt={step.t} style={{ width: "100%", height: 200, objectFit: "cover", border: "2px solid #111", borderRadius: 8, background: "#fff", marginTop: 20 }} />
                )}
              </div>
            </RevealIf>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function Slide6() {
  return (
    <SlideShell chapter="CÉREBRO">
      <Label>Como chegamos até aqui</Label>
      <div className="slide-title mb-14" style={{ maxWidth: 1500 }}>
        A <Underline>evolução</Underline> da IA.
      </div>
      <div className="relative" style={{ marginTop: 30 }}>
        <div style={{ height: 4, background: "#111", position: "absolute", top: 40, left: 0, right: 0 }} />
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { y: "1977–1997", t: "IA nos games", d: "Pac-Man e Deep Blue vencendo Kasparov.", imgs: ["/imagem/imagem_1_1slide2.png", "/imagem/imagem_1_2slide2.png"] },
            { y: "Anos 80–2000", t: "Consolidação do ML", d: "SVMs, árvores de decisão e redes neurais.", imgs: ["/imagem/imagem_2slide2.png.png"] },
            { y: "2012 → hoje", t: "Era do deep learning", d: "AlexNet marca o início do boom das redes.", imgs: ["/imagem/imagem_3slide2.png.png"] },
            { y: "2022", t: "Lançamento das LLMs", d: "ChatGPT, Midjourney e os transformers.", imgs: [] },
          ].map((step, i) => (
            <RevealIf key={step.y} stepIndex={i + 1}>
              <div className="flex flex-col items-start" style={{ paddingTop: 20 }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: '#ff6b00', marginBottom: 30 }} />
                <div className="slide-label" style={{ color: "#111" }}>{step.y}</div>
                <div style={{ fontSize: 30, fontWeight: 600, marginTop: 12, lineHeight: 1.2 }}>{step.t}</div>
                <div className="slide-body" style={{ color: "#444", marginTop: 8 }}>{step.d}</div>
                {step.imgs.length > 0 && (
                  <div className="flex flex-col gap-4 mt-5 w-full">
                    {step.imgs.map((src, idx) => (
                      <img key={idx} src={src} alt={step.t} style={{ width: "100%", height: 160, objectFit: "cover", border: "2px solid #111", borderRadius: 8, background: "#fff" }} />
                    ))}
                  </div>
                )}
              </div>
            </RevealIf>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function Slide7() {
  return (
    <SlideShell chapter="CÉREBRO">
      <Label>Como chegamos até aqui</Label>
      <div className="slide-title mb-14" style={{ maxWidth: 1500 }}>
        A <Underline>evolução</Underline> da IA.
      </div>
      <div className="relative" style={{ marginTop: 30 }}>
        <div style={{ height: 4, background: "#111", position: "absolute", top: 40, left: 0, right: 0 }} />
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { y: "2023", t: "Multimodalidade", d: "Interpretação de imagem, áudio e texto juntos." },
            { y: "2024", t: "Vídeo e tempo real", d: "Geração de vídeo realista baseada em física." },
            { y: "2024–2025", t: "Raciocínio avançado", d: "Modelos aprendem a pensar e se autocorrigir." },
            { y: "2026", t: "Agentes autônomos", d: "IAs passam a executar tarefas complexas sozinhas." },
          ].map((step, i) => (
            <RevealIf key={step.y} stepIndex={i + 1}>
              <div className="flex flex-col items-start" style={{ paddingTop: 20 }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: '#ff6b00', marginBottom: 30 }} />
                <div className="slide-label" style={{ color: "#111" }}>{step.y}</div>
                <div style={{ fontSize: 30, fontWeight: 600, marginTop: 12, lineHeight: 1.2 }}>{step.t}</div>
                <div className="slide-body" style={{ color: "#444", marginTop: 8 }}>{step.d}</div>
              </div>
            </RevealIf>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 50, display: "grid", gap: 20, gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          { src: "/imagem/imagem_1slide3.png", alt: "2023 — Multimodalidade", step: 1 },
          { src: "/imagem/imagem_2slide3.png", alt: "2024 — Vídeo e tempo real", step: 2 },
          { src: "/imagem/imagem_3slide3.png", alt: "2024–2025 — Raciocínio avançado", step: 3 },
          { src: "/imagem/imagem_4slide3.png", alt: "2026 — Agentes autônomos", step: 4 },
        ].map((img) => (
          <RevealIf key={img.src} stepIndex={img.step}>
            <div style={{ border: "2px solid #111", borderRadius: 8, overflow: "hidden", background: "#fff" }}>
              <img src={img.src} alt={img.alt} style={{ width: "100%", height: 360, objectFit: "cover", display: "block" }} />
            </div>
          </RevealIf>
        ))}
      </div>
    </SlideShell>
  );
}

const SLIDES: Slide[] = [
  // 1 — Cover
  {
    id: 1,
    render: () => (
      <div className="slide-content">
        <div className="absolute" style={{ top: 90, left: 110 }}>
          <img src={logoAsset.url} alt="Barracred" style={{ height: 110 }} />
        </div>
        <div
          className="absolute flex flex-col"
          style={{ left: 110, right: 110, top: 340 }}
        >
          <div className="slide-label mb-10">Formação Interna · Barracred</div>
          <div className="slide-hero" style={{ maxWidth: 1600 }}>
            Inteligência Artificial:<br />
            do <Underline>Cérebro</Underline> à <Underline>Ação</Underline>.
          </div>
          <div className="slide-statement mt-14" style={{ maxWidth: 1400, color: "#333" }}>
            Ferramentas mudam. Os conceitos permanecem. É essa base que te prepara para evoluir
          </div>
        </div>
      </div>
    ),
  },
  // 2 — O que queremos meme
  {
    id: 2,
    render: () => (
      <div className="slide-content flex items-center justify-center">
        <img
          src={oqueQueremosAsset.url}
          alt="O que queremos"
          style={{ maxWidth: "82%", maxHeight: "88%", objectFit: "contain" }}
        />
      </div>
    ),
  },
  // 3 — Mapa da apresentação (índice da jornada)
  {
    id: 3,
    render: () => (
      <SlideShell>
        <Label>Como vamos navegar</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          Os <Underline>5 pilares</Underline> da nossa jornada.
        </div>
        <div className="slide-statement mb-12" style={{ maxWidth: 1400, color: "#333" }}>
          Cada capítulo destrincha um pilar — do motor da IA até a execução de tarefas reais.
        </div>
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: "repeat(5, 1fr)", marginTop: 20 }}
        >
          {[
            { n: "01", t: "Cérebro (LLM)", i: cerebroImg },
            { n: "02", t: "Conhecimento", i: conhecimentoImg },
            { n: "03", t: "Contexto", i: contextoImg },
            { n: "04", t: "Habilidades", i: habilidadesImg },
            { n: "05", t: "Ação", i: acaoImg },
          ].map((c) => (
            <div key={c.n} className="flex flex-col items-center justify-center text-center">
              <img src={c.i} alt={c.t} style={{ width: 220, height: 220, objectFit: "contain" }} />
              <div className="slide-label" style={{ color: "#111", marginTop: 10 }}>{c.n}</div>
              <div style={{ fontSize: 32, fontWeight: 700, marginTop: 8, lineHeight: 1.1 }}>{c.t}</div>
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
  // 3.5 — Provocação inicial: O que é IA?
  {
    id: 7.5,
    steps: 3,
    render: () => (
      <SlideShell>
        <Label>Provocação inicial</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          Afinal, o que é <Underline>IA</Underline>?
        </div>
        <div className="slide-statement mb-14" style={{ maxWidth: 1400, color: "#333" }}>
          Antes de falarmos de tokens e redes neurais, precisamos alinhar o que entendemos por Inteligência Artificial.
        </div>
        <div className="grid gap-8 mb-12" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          <RevealIf stepIndex={1}>
            <Card
              num="Na ficção"
              title="Robôs e superinteligências"
              body="Robôs conscientes, máquinas com sentimentos e vontades próprias, superinteligências que dominam o mundo."
            />
          </RevealIf>
          <RevealIf stepIndex={2}>
            <Card
              num="Na realidade"
              title="Matemática e estatística"
              body="Matemática, estatística e muita capacidade computacional para encontrar padrões em montanhas de dados."
            />
          </RevealIf>
        </div>
        <RevealIf stepIndex={3}>
          <div
            className="slide-statement"
            style={{
              maxWidth: 1500,
              padding: "24px 32px",
              border: "4px solid #ff6b00",
              background: "#fff5ec",
              color: "#111",
              fontSize: 32,
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            A IA moderna não "pensa" como nós. Ela <strong>calcula probabilidades</strong> de forma extremamente sofisticada.
          </div>
        </RevealIf>
      </SlideShell>
    ),
  },
  // 3.6 — Evolução timeline (Parte 1)
  {
    id: 5,
    steps: 4,
    render: () => <Slide5 />,
  },
  // 3.7 — Evolução timeline (Parte 2)
  {
    id: 6,
    steps: 4,
    render: () => <Slide6 />,
  },
  // 3.8 — Evolução timeline (Parte 3)
  {
    id: 7,
    steps: 4,
    render: () => <Slide7 />,
  },
  // 4 — Cover Cérebro
  { id: 4, render: () => <ChapterCover num="01" name="Cérebro (LLM)" image={cerebroImg} range="" /> },
  // 5.1 — Como prever o futuro?
  {
    id: 8.1,
    steps: 4,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Conceito Central</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          Como prever o <Underline>futuro</Underline>?
        </div>
        <div className="slide-statement mb-14" style={{ maxWidth: 1400, color: "#333" }}>
          A mágica de um LLM se resume a prever a próxima palavra. Mas como ele sabe qual escolher?
        </div>
        <RevealIf stepIndex={1}>
          <div
            className="slide-statement mb-10"
            style={{
              maxWidth: 1500,
              padding: "20px 28px",
              border: "4px solid #ff6b00",
              background: "#fff5ec",
              color: "#111",
              fontSize: 30,
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            O modelo usa <strong>Contexto</strong> (o que já foi dito) + <strong>Probabilidade</strong> (o que aprendeu) para escolher o próximo pedaço de texto.
          </div>
        </RevealIf>
        <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <RevealIf stepIndex={2}>
            <Card num="1. Tokenização" title="Pedaços numéricos" body="Ele não lê palavras, lê tokens (pedaços numéricos)." />
          </RevealIf>
          <RevealIf stepIndex={3}>
            <Card num="2. Embeddings" title="Coordenadas espaciais" body="Converte tokens em coordenadas espaciais para entender o significado." />
          </RevealIf>
          <RevealIf stepIndex={4}>
            <Card num="3. Atenção" title="Foco no contexto" body="Olha para o contexto inteiro para saber qual palavra anterior importa mais agora." />
          </RevealIf>
        </div>
      </SlideShell>
    ),
  },
  // 5.2 — O que é um Language Model?
  {
    id: 8.2,
    steps: 4,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Capítulo 02 · Language Model</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          O que é um <Underline>Language Model</Underline>?
        </div>
        <div className="slide-statement mb-14" style={{ maxWidth: 1400, color: "#333" }}>
          Um modelo de linguagem aprende os padrões da língua para prever qual palavra vem a seguir.
        </div>
        <RevealIf stepIndex={1}>
          <div
            className="slide-statement mb-10"
            style={{
              maxWidth: 1500,
              padding: "20px 28px",
              border: "4px solid #ff6b00",
              background: "#fff5ec",
              color: "#111",
              fontSize: 30,
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            Um LM é um modelo estatístico treinado para prever o <strong>próximo token</strong> em uma sequência.
          </div>
        </RevealIf>
        <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <RevealIf stepIndex={2}>
            <div style={{ border: "2px solid #111", padding: "28px 32px" }}>
              <div className="slide-label" style={{ color: "#ff6b00" }}>O objetivo central</div>
              <div style={{ fontSize: 30, fontWeight: 600, marginTop: 16, lineHeight: 1.3 }}>
                Entrada: <span style={{ fontFamily: "monospace" }}>"Hoje o dia está</span>{" "}
                <span style={{ display: "inline-block", padding: "4px 14px", background: "#ff6b00", color: "white", fontFamily: "monospace" }}>?</span>
                <span style={{ fontFamily: "monospace" }}>"</span>
              </div>
              <div className="slide-body mt-6" style={{ color: "#444" }}>
                O modelo calcula probabilidades para cada palavra possível a seguir.
              </div>
            </div>
          </RevealIf>
          <RevealIf stepIndex={3}>
            <div style={{ border: "2px solid #111", padding: "28px 32px" }}>
              <div className="slide-label" style={{ color: "#111", marginBottom: 16 }}>Probabilidades</div>
              <div className="space-y-3">
                {[
                  { w: "ensolarado", p: 34 },
                  { w: "nublado", p: 28 },
                  { w: "quente", p: 18 },
                  { w: "frio", p: 12 },
                  { w: "outras…", p: 8 },
                ].map((r, i) => (
                  <div key={r.w}>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontWeight: i === 0 ? 700 : 400, color: i === 0 ? "#ff6b00" : "#111" }}>{r.w}</span>
                      <span style={{ fontFamily: "monospace", color: "#444" }}>{r.p}%</span>
                    </div>
                    <div style={{ height: 12, background: "#fafafa", border: "1px solid #ddd", borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ width: `${r.p * 2.5}%`, height: "100%", background: i === 0 ? "#ff6b00" : i === 1 ? "#fb923c" : i === 2 ? "#fdba74" : "#fed7aa" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="slide-statement mt-6" style={{ color: "#111" }}>
                → O modelo escolhe <strong>"ensolarado"</strong>: maior probabilidade.
              </div>
            </div>
          </RevealIf>
        </div>
        <RevealIf stepIndex={4}>
          <ul className="slide-statement list-disc list-inside mt-10 pl-6" style={{ maxWidth: 1500, color: "#333" }}>
            <li>Um LM aprende padrões estatísticos da linguagem.</li>
            <li>Objetivo único: prever o próximo token.</li>
            <li>A escolha é sempre baseada em probabilidades.</li>
          </ul>
        </RevealIf>
      </SlideShell>
    ),
  },
  // 5.3 — O que muda em um Large Language Model?
  {
    id: 8.3,
    steps: 3,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Capítulo 03 · LLM</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          O que muda em um <Underline>Large Language Model</Underline>?
        </div>
        <div className="slide-statement mb-14" style={{ maxWidth: 1400, color: "#333" }}>
          "Large" não é apenas tamanho — é uma mudança qualitativa na capacidade do modelo.
        </div>
        <RevealIf stepIndex={1}>
          <div
            className="slide-statement mb-10"
            style={{
              maxWidth: 1500,
              padding: "20px 28px",
              border: "4px solid #ff6b00",
              background: "#fff5ec",
              color: "#111",
              fontSize: 30,
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            Escala transforma o modelo: novos comportamentos <strong>emergem</strong> quando parâmetros e dados ultrapassam certos limites.
          </div>
        </RevealIf>
        <RevealIf stepIndex={2}>
          <div style={{ border: "2px solid #111", overflow: "hidden" }}>
            <div className="grid" style={{ gridTemplateColumns: "1.2fr 1fr 1.4fr" }}>
              <div style={{ background: "#111", color: "white", padding: "16px 20px", fontWeight: 700 }}>Aspecto</div>
              <div style={{ background: "#ff6b00", color: "white", padding: "16px 20px", fontWeight: 700 }}>Language Model</div>
              <div style={{ background: "#111", color: "white", padding: "16px 20px", fontWeight: 700 }}>Large Language Model</div>
              {[
                ["Parâmetros", "Milhões", "Bilhões (ou trilhões)"],
                ["Dados de treino", "Poucos", "Enormes volumes de texto"],
                ["Contexto", "Curto", "128k+ tokens"],
                ["Escopo", "Tarefa específica", "Generalista, multi-tarefa"],
                ["Capacidades", "Respostas simples", "Raciocínio, código, criação"],
                ["Emergência", "Ausente", "Capacidades emergentes"],
              ].map((r, i) => (
                <div key={i} className="contents">
                  <div style={{ padding: "14px 20px", fontWeight: 600, background: i % 2 ? "#fafafa" : "white", borderTop: "1px solid #ddd" }}>{r[0]}</div>
                  <div style={{ padding: "14px 20px", color: "#444", background: i % 2 ? "#fafafa" : "white", borderTop: "1px solid #ddd" }}>{r[1]}</div>
                  <div style={{ padding: "14px 20px", color: "#ff6b00", fontWeight: 600, background: i % 2 ? "#fafafa" : "white", borderTop: "1px solid #ddd" }}>{r[2]}</div>
                </div>
              ))}
            </div>
          </div>
        </RevealIf>
        <RevealIf stepIndex={3}>
          <div className="grid gap-8 mt-10" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { n: "175B", l: "GPT-3", d: "175 bilhões de parâmetros" },
              { n: "1.7T", l: "GPT-4 (est.)", d: "Trilhões, mistura de especialistas" },
              { n: "128k+", l: "Contexto", d: "Tokens processados de uma vez" },
            ].map((s) => (
              <div key={s.l} style={{ border: "4px solid #ff6b00", background: "#fff5ec", padding: "32px 36px" }}>
                <div style={{ fontSize: 64, fontWeight: 800, color: "#ff6b00", lineHeight: 1 }}>{s.n}</div>
                <div className="slide-label mt-3" style={{ color: "#111" }}>{s.l}</div>
                <div className="slide-body mt-2" style={{ color: "#444" }}>{s.d}</div>
              </div>
            ))}
          </div>
        </RevealIf>
      </SlideShell>
    ),
  },
  // 6.2.1 — Encode & Tokenização
  {
    id: 9,
    steps: 4,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Por baixo do capô · 1/5</Label>
        <div className="slide-title mb-8" style={{ maxWidth: 1500 }}>
          <Underline>Encode</Underline> & <Underline>Tokenização</Underline>.
        </div>
        <div className="slide-statement mb-10" style={{ maxWidth: 1500, color: "#333" }}>
          A IA não lê palavras como nós. Ela lê <strong>fragmentos numéricos</strong> chamados <strong>tokens</strong>.
          Tokenizar é a primeira etapa: quebrar o texto e converter cada pedaço em um número.
        </div>

        <StepRevealContent stepIndex={1}>
          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <Card num="Caracteres" title="1 caractere = 1 token" body="Vocabulário mínimo, mas sequência enorme e sem semântica clara." />
            <Card num="Palavras" title="1 palavra = 1 token" body="Intuitivo, mas vocabulário imenso e muitos casos OOV (palavras desconhecidas)." />
            <Card num="Subpalavras ✓" title="Morfemas / BPE" body="Vocabulário controlado, cobre palavras novas, reaproveita raízes. É o que os LLMs usam." />
          </div>
        </StepRevealContent>

        <StepRevealContent stepIndex={2}>
          <div
            className="rounded-2xl mt-10"
            style={{ border: "2px solid #111", padding: "28px 32px", background: "#fafafa" }}
          >
            <div className="slide-label" style={{ color: "#111", marginBottom: 16 }}>Exemplos práticos</div>
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>“ChatGPT”</div>
                <div className="flex flex-wrap gap-2">
                  {["Chat", "G", "PT"].map((t) => (
                    <span key={t} style={{ background: "#111", color: "white", padding: "6px 12px", fontFamily: "monospace", fontSize: 18, borderRadius: 4 }}>{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>“incrível”</div>
                <div className="flex flex-wrap gap-2">
                  {["in", "crível"].map((t) => (
                    <span key={t} style={{ background: "#111", color: "white", padding: "6px 12px", fontFamily: "monospace", fontSize: 18, borderRadius: 4 }}>{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>“Computador”</div>
                <div className="flex flex-wrap gap-2">
                  {["Com", "puta", "dor"].map((t) => (
                    <span key={t} style={{ background: "#111", color: "white", padding: "6px 12px", fontFamily: "monospace", fontSize: 18, borderRadius: 4 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="slide-statement mt-6" style={{ color: "#444" }}>
              O modelo <strong>conta tokens, não palavras</strong>. Em média: <strong>1 palavra ≈ 1,3 tokens</strong>.
            </div>
          </div>
        </StepRevealContent>

        <StepRevealContent stepIndex={3}>
          <div
            className="mt-10"
            style={{
              padding: "20px 28px",
              border: "2px solid #ff6b00",
              background: "#fff5ec",
              color: "#333",
              maxWidth: 1500,
            }}
          >
            <strong>O que é OOV?</strong> Palavras fora do vocabulário. Em sistemas antigos viravam <code style={{ background: "white", padding: "0 6px", border: "1px solid #ddd" }}>&lt;UNK&gt;</code> e perdiam o significado.
            Com subpalavras, palavras novas são <strong>decompostas em pedaços conhecidos</strong>.
          </div>
        </StepRevealContent>

        <StepRevealContent stepIndex={4}>
          <div
            className="mt-8 slide-statement"
            style={{ maxWidth: 1500, color: "#333" }}
          >
            Resumo: tokenizar <strong>prepara</strong> o texto para o modelo. O vocabulário é fixo e é construído antes do treinamento (com algoritmos como BPE).
          </div>
        </StepRevealContent>
      </SlideShell>
    ),
  },
  // 6.2.1.1 — BPE (Byte Pair Encoding)
  {
    id: 9.1,
    steps: 3,
    render: () => {
      const stages = [
        {
          title: "Passo 1",
          sub: "Início: cada letra é um token. O modelo enxerga tudo separado.",
          lines: [
            ["c", "a", "s", "a"],
            ["c", "a", "s", "a", "c", "o"],
            ["c", "a", "s", "a", "m", "e", "n", "t", "o"],
            ["c", "a", "s", "e", "b", "r", "e"],
          ],
        },
        {
          title: "Passo 2",
          sub: "Fundir 'c' e 'a'. Par mais frequente vira um novo token.",
          lines: [
            ["ca", "s", "a"],
            ["ca", "s", "a", "c", "o"],
            ["ca", "s", "a", "m", "e", "n", "t", "o"],
            ["ca", "s", "e", "b", "r", "e"],
          ],
        },
        {
          title: "Passo 3",
          sub: "Fundir 'ca' e 's'. Continuamos fundindo pares frequentes.",
          lines: [
            ["cas", "a"],
            ["cas", "a", "c", "o"],
            ["cas", "a", "m", "e", "n", "t", "o"],
            ["cas", "e", "b", "r", "e"],
          ],
        },
        {
          title: "Passo 4",
          sub: "Fundir 'cas' e 'a'. Palavras e radicais comuns já emergem.",
          lines: [
            ["casa"],
            ["casa", "c", "o"],
            ["casa", "m", "e", "n", "t", "o"],
            ["cas", "e", "b", "r", "e"],
          ],
        },
      ];
      const tokenStyle = (len: number) => {
        if (len >= 4) return { background: "#ff6b00", color: "white", borderColor: "#ff6b00", fontWeight: 700 };
        if (len === 3) return { background: "#fb923c", color: "white", borderColor: "#fb923c", fontWeight: 700 };
        if (len === 2) return { background: "#fed7aa", color: "#7c2d12", borderColor: "#fed7aa", fontWeight: 600 };
        return { background: "#fafafa", color: "#111", borderColor: "#ddd", fontWeight: 400 };
      };
      return (
        <SlideShell chapter="CÉREBRO">
          <Label>Capítulo 06 · BPE</Label>
          <div className="slide-title mb-8" style={{ maxWidth: 1500 }}>
            <Underline>Byte Pair Encoding</Underline>
          </div>
          <div className="slide-statement mb-10" style={{ maxWidth: 1400, color: "#333" }}>
            BPE constrói o vocabulário de subpalavras começando por caracteres e fundindo os pares mais frequentes em todo o corpus.
          </div>
          <RevealIf stepIndex={1}>
            <div
              className="mb-8"
              style={{
                maxWidth: 1500,
                padding: "20px 28px",
                border: "4px solid #ff6b00",
                background: "#fff5ec",
                color: "#111",
                fontSize: 26,
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              BPE acontece na <strong>preparação dos dados</strong>, antes do treinamento. O vocabulário resultante fica <strong>fixo</strong>.
            </div>
          </RevealIf>
          <RevealIf stepIndex={2}>
            <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {stages.map((s, i) => (
                <div key={i} style={{ border: "2px solid #111", padding: "20px 24px" }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 999,
                          background: "#111",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: 18,
                        }}
                      >
                        {i + 1}
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: "#111" }}>{s.title}</div>
                    </div>
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: 16,
                        color: "#ff6b00",
                        fontWeight: 700,
                        border: "1px solid #ff6b00",
                        padding: "2px 10px",
                      }}
                    >
                      {s.lines.reduce((acc, line) => acc + line.length, 0)} tokens
                    </div>
                  </div>
                  <div className="space-y-2 mb-3" style={{ fontFamily: "monospace", fontSize: 16 }}>
                    {s.lines.map((line, lineIdx) => (
                      <div key={lineIdx} className="flex flex-wrap gap-1">
                        {line.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              padding: "2px 8px",
                              border: "1px solid",
                              borderRadius: 4,
                              ...tokenStyle(t.length),
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 16, color: "#444", lineHeight: 1.4 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </RevealIf>
          <RevealIf stepIndex={3}>
            <div
              style={{
                maxWidth: 1500,
                padding: "20px 28px",
                border: "2px solid #111",
                background: "white",
                color: "#111",
                fontSize: 22,
                fontWeight: 500,
                lineHeight: 1.5,
                marginTop: 32,
              }}
            >
              <div className="slide-label mb-3" style={{ color: "#ff6b00" }}>Por que BPE é poderoso?</div>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>Palavras comuns viram <strong>tokens únicos</strong>: "de" → [de].</li>
                <li>Palavras raras são <strong>decompostas</strong>: "incompreensível" → [in, compreen, sível].</li>
                <li>Palavras novas <strong>nunca são desconhecidas</strong>: "ChatGPT" → [Chat, G, PT].</li>
                <li>Vocabulário controlado (ex.: 50.000 tokens).</li>
              </ul>
            </div>
          </RevealIf>
        </SlideShell>
      );
    },
  },
  // 6.2.2 — Embedding
  {
    id: 10,
    steps: 4,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Por baixo do capô · 2/5</Label>
        <div className="slide-title mb-8" style={{ maxWidth: 1500 }}>
          <Underline>Embedding</Underline>.
        </div>
        <div className="slide-statement mb-10" style={{ maxWidth: 1500, color: "#333" }}>
          Computadores entendem números. Embeddings convertem cada token em um <strong>vetor de números</strong> que captura <strong>significado</strong> em um espaço de centenas de dimensões.
        </div>

        <StepRevealContent stepIndex={1}>
          <div
            className="rounded-2xl"
            style={{ background: "#111", color: "white", padding: "28px 32px", maxWidth: 1500 }}
          >
            <div className="slide-label" style={{ color: "#ff6b00", marginBottom: 16 }}>A ideia</div>
            <div className="grid gap-3" style={{ fontFamily: "monospace", fontSize: 18 }}>
              <div className="flex justify-between border-b border-gray-700 pb-2"><span>“rei”</span><span>[ 0.82, -0.31, 0.54, … ]</span></div>
              <div className="flex justify-between border-b border-gray-700 pb-2"><span>“rainha”</span><span>[ 0.79, -0.28, 0.51, … ]</span></div>
              <div className="flex justify-between border-b border-gray-700 pb-2"><span>“homem”</span><span>[ 0.81,  0.42, 0.11, … ]</span></div>
              <div className="flex justify-between border-b border-gray-700 pb-2"><span>“mulher”</span><span>[ 0.77,  0.45, 0.08, … ]</span></div>
              <div className="flex justify-between"><span>“cachorro”</span><span>[-0.38,  0.89, -0.19, … ]</span></div>
            </div>
            <div className="mt-4 slide-statement" style={{ color: "#ddd" }}>
              Palavras com significados parecidos ficam <strong>próximas no espaço</strong> vetorial.
            </div>
          </div>
        </StepRevealContent>

        <StepRevealContent stepIndex={2}>
          <div className="mt-10">
            <div className="slide-label" style={{ color: "#111", marginBottom: 12 }}>Espaço vetorial (2D simplificado)</div>
            <div
              className="relative"
              style={{
                width: "100%",
                aspectRatio: "16 / 7",
                background: "#fafafa",
                border: "2px solid #111",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {/* Eixos */}
              <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2, background: "#ddd" }} />
              <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 2, background: "#ddd" }} />
              <div style={{ position: "absolute", top: 8, left: 8, fontSize: 14, fontWeight: 700, color: "#ff6b00" }}>REALEZA</div>
              <div style={{ position: "absolute", bottom: 8, left: 8, fontSize: 14, fontWeight: 700, color: "#444" }}>PESSOAS</div>
              <div style={{ position: "absolute", top: 8, right: 8, fontSize: 14, fontWeight: 700, color: "#444" }}>FEM.</div>
              <div style={{ position: "absolute", bottom: 8, right: 8, fontSize: 14, fontWeight: 700, color: "#444" }}>MASC.</div>

              {/* Pontos */}
              {[
                { name: "Rei", x: 22, y: 30, big: true },
                { name: "Rainha", x: 78, y: 30, big: true },
                { name: "Homem", x: 22, y: 70 },
                { name: "Mulher", x: 78, y: 70 },
                { name: "Cão", x: 35, y: 85, muted: true },
                { name: "Gato", x: 45, y: 88, muted: true },
              ].map((p) => (
                <div
                  key={p.name}
                  className="absolute flex items-center gap-2"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%,-50%)" }}
                >
                  <span
                    style={{
                      width: p.big ? 22 : 14,
                      height: p.big ? 22 : 14,
                      borderRadius: 999,
                      background: p.muted ? "#94a3b8" : "#ff6b00",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      background: "white",
                      padding: "2px 8px",
                      fontWeight: 600,
                      fontSize: 16,
                      border: `2px solid ${p.muted ? "#94a3b8" : "#ff6b00"}`,
                      borderRadius: 6,
                    }}
                  >
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </StepRevealContent>

        <StepRevealContent stepIndex={3}>
          <div
            className="mt-10"
            style={{ padding: "20px 28px", border: "2px solid #111", background: "#fafafa", maxWidth: 1500 }}
          >
            <div className="slide-label" style={{ color: "#111", marginBottom: 8 }}>Aritmética de significados</div>
            <div style={{ fontFamily: "monospace", fontSize: 26, fontWeight: 700, color: "#ff6b00" }}>
              Rei − Homem + Mulher ≈ Rainha
            </div>
            <div className="slide-statement mt-3" style={{ color: "#444" }}>
              Outros exemplos: <span style={{ fontFamily: "monospace" }}>Paris − França + Itália ≈ Roma</span> · <span style={{ fontFamily: "monospace" }}>Nadar − Água + Ar ≈ Voar</span>
            </div>
          </div>
        </StepRevealContent>

        <StepRevealContent stepIndex={4}>
          <div className="mt-8 slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
            Resumo: embedding transforma tokens em <strong>coordenadas com significado</strong>. Palavras próximas → vetores próximos. Esse espaço é aprendido durante o pré-treinamento.
          </div>
        </StepRevealContent>
      </SlideShell>
    ),
  },
  // 6.2.3 — Attention
  {
    id: 11,
    steps: 5,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Por baixo do capô · 3/5</Label>
        <div className="slide-title mb-8" style={{ maxWidth: 1500 }}>
          <Underline>Attention</Underline> (auto-atenção).
        </div>
        <div className="slide-statement mb-8" style={{ maxWidth: 1500, color: "#333" }}>
          Para entender a palavra atual, o modelo <strong>olha para todas as outras</strong> da frase e decide quais importam mais. Isso é <strong>Self-Attention</strong>.
        </div>

        <StepRevealContent stepIndex={1}>
          <div
            className="rounded-2xl"
            style={{ border: "2px solid #111", padding: "24px 28px", background: "#fff5ec", maxWidth: 1500 }}
          >
            <div className="slide-label" style={{ color: "#ff6b00", marginBottom: 10 }}>Exemplo · ambiguidade de pronomes</div>
            <div style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.4 }}>
              “O <strong>banco</strong> não aprovou o <strong>empréstimo</strong> porque <u style={{ textDecorationColor: "#ff6b00", textDecorationThickness: 4 }}>ele</u> estava sem dinheiro.”
            </div>
            <div className="mt-3 slide-statement" style={{ color: "#333" }}>
              Quem estava sem dinheiro — o banco ou o cliente?
            </div>
          </div>
        </StepRevealContent>

        <StepRevealContent stepIndex={2}>
          <div className="mt-8">
            <div className="slide-label" style={{ color: "#111", marginBottom: 12 }}>Atenção da palavra “ele” para as outras</div>
            <div className="space-y-2" style={{ maxWidth: 1500 }}>
              {[
                { w: "O", a: 5 },
                { w: "banco", a: 92, highlight: true },
                { w: "não", a: 8 },
                { w: "aprovou", a: 4 },
                { w: "o", a: 25 },
                { w: "empréstimo", a: 6 },
                { w: "porque", a: 10 },
                { w: "ele", a: 100, self: true },
                { w: "estava", a: 10 },
                { w: "sem", a: 38 },
                { w: "dinheiro", a: 45 },
              ].map((w) => (
                <div key={w.w} className="flex items-center gap-3">
                  <div
                    style={{
                      width: 140,
                      textAlign: "right",
                      fontFamily: "monospace",
                      fontSize: 18,
                      fontWeight: w.highlight || w.self ? 700 : 400,
                      color: w.self ? "#ff6b00" : w.highlight ? "#111" : "#333",
                    }}
                  >
                    {w.w}
                  </div>
                  <div style={{ flex: 1, height: 20, background: "#fafafa", border: "1px solid #ddd", borderRadius: 999, overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${w.a}%`,
                        height: "100%",
                        background: w.self ? "#94a3b8" : w.highlight ? "#ff6b00" : w.a > 30 ? "#fb923c" : "#fed7aa",
                      }}
                    />
                  </div>
                  <div style={{ width: 60, textAlign: "right", fontFamily: "monospace", fontSize: 16, color: "#444" }}>{w.a}%</div>
                </div>
              ))}
            </div>
            <div className="mt-4 slide-statement" style={{ color: "#333" }}>
              → <strong>“ele”</strong> presta muita atenção em <strong>“banco”</strong> — o modelo infere a referência.
            </div>
          </div>
        </StepRevealContent>

        <StepRevealContent stepIndex={3}>
          <div className="grid gap-6 mt-10" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div style={{ borderLeft: "4px solid #ff6b00", paddingLeft: 20 }}>
              <div className="slide-label" style={{ color: "#111" }}>Query (Q)</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>A pergunta</div>
              <div className="slide-body" style={{ color: "#444", marginTop: 8 }}>
                “Estou procurando substantivos que justifiquem falta de dinheiro.”
              </div>
            </div>
            <div style={{ borderLeft: "4px solid #111", paddingLeft: 20 }}>
              <div className="slide-label" style={{ color: "#111" }}>Key (K)</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>A resposta</div>
              <div className="slide-body" style={{ color: "#444", marginTop: 8 }}>
                “Eu sou ‘banco’, uma instituição financeira.”
              </div>
            </div>
            <div style={{ borderLeft: "4px solid #94a3b8", paddingLeft: 20 }}>
              <div className="slide-label" style={{ color: "#111" }}>Value (V)</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>A informação</div>
              <div className="slide-body" style={{ color: "#444", marginTop: 8 }}>
                “Entidade que guarda dinheiro e concede empréstimos.”
              </div>
            </div>
          </div>
        </StepRevealContent>

        <StepRevealContent stepIndex={4}>
          <div
            className="mt-8"
            style={{ fontFamily: "monospace", fontSize: 22, padding: "16px 24px", background: "#111", color: "white", display: "inline-block", borderRadius: 8 }}
          >
            Query × Key = score de atenção &nbsp;·&nbsp; Score × Value = representação enriquecida
          </div>
        </StepRevealContent>

        <StepRevealContent stepIndex={5}>
          <div className="mt-8 slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
            Resumo: atenção permite que <strong>cada token colete contexto dos outros</strong>, focando mais no que é relevante para ele.
          </div>
        </StepRevealContent>
      </SlideShell>
    ),
  },
  // 6.2.4 — Transformer
  {
    id: 12,
    steps: 4,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Por baixo do capô · 4/5</Label>
        <div className="slide-title mb-8" style={{ maxWidth: 1500 }}>
          <Underline>Transformer</Underline>.
        </div>
        <div className="slide-statement mb-10" style={{ maxWidth: 1500, color: "#333" }}>
          O Transformer é a arquitetura que <strong>junta tudo</strong>: embeddings, atenção e processamento em paralelo. Foi apresentado em <strong>“Attention Is All You Need”</strong> (2017).
        </div>

        <StepRevealContent stepIndex={1}>
          <div
            className="rounded-2xl"
            style={{ border: "2px solid #111", padding: "24px 28px", background: "#fafafa", maxWidth: 1500 }}
          >
            <div className="slide-label" style={{ color: "#111", marginBottom: 16 }}>As camadas do Transformer</div>
            <div className="grid gap-3">
              {[
                { n: "1", t: "Embeddings", d: "Tokens viram vetores." },
                { n: "2", t: "Positional Encoding", d: "Adiciona a posição de cada token na frase." },
                { n: "3", t: "Self-Attention", d: "Cada token olha para os outros e coleta contexto." },
                { n: "4", t: "Feed Forward", d: "O token “pensa” sozinho, usando memória não-linear." },
                { n: "5", t: "Repete N camadas", d: "Refinando a representação a cada rodada." },
                { n: "6", t: "Saída", d: "Probabilidades do próximo token." },
              ].map((l, i) => (
                <div key={l.n} className="flex items-center gap-4">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 999,
                      background: "#ff6b00",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {l.n}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      background: "white",
                      border: "2px solid #111",
                      padding: "12px 20px",
                      marginLeft: i * 8,
                    }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 700 }}>{l.t}</div>
                    <div className="slide-body" style={{ color: "#444" }}>{l.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </StepRevealContent>

        <StepRevealContent stepIndex={2}>
          <div
            className="mt-10 grid gap-6"
            style={{ gridTemplateColumns: "1fr 1fr", maxWidth: 1500 }}
          >
            <div style={{ border: "2px solid #111", padding: "24px 28px", background: "#fff5ec" }}>
              <div className="slide-label" style={{ color: "#ff6b00" }}>Self-Attention</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>Mistura informações entre palavras</div>
              <div className="slide-body" style={{ color: "#444", marginTop: 8 }}>
                Como uma grande reunião onde todos conversam: cada um ouve os outros e ajusta o que sabe.
              </div>
            </div>
            <div style={{ border: "2px solid #111", padding: "24px 28px", background: "#fafafa" }}>
              <div className="slide-label" style={{ color: "#111" }}>Feed Forward</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>O “cérebro individual” de cada token</div>
              <div className="slide-body" style={{ color: "#444", marginTop: 8 }}>
                Atua isoladamente em cada token, guardando a maior parte do <strong>conhecimento factual</strong> (fatos, gramática, raciocínio).
              </div>
            </div>
          </div>
        </StepRevealContent>

        <StepRevealContent stepIndex={3}>
          <div
            className="mt-10"
            style={{ padding: "20px 28px", border: "2px solid #111", background: "#fafafa", maxWidth: 1500 }}
          >
            <div className="slide-label" style={{ color: "#111", marginBottom: 8 }}>Por que o Transformer mudou tudo?</div>
            <ul className="slide-statement list-disc list-inside" style={{ color: "#333" }}>
              <li>Processa toda a sequência <strong>em paralelo</strong> (não palavra por palavra).</li>
              <li>Captura relações entre palavras <strong>distantes</strong> via atenção.</li>
              <li>Escala bem: aumentar camadas e parâmetros traz <strong>capacidades emergentes</strong>.</li>
            </ul>
          </div>
        </StepRevealContent>

        <StepRevealContent stepIndex={4}>
          <div className="mt-8 slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
            Resumo: o Transformer é a <strong>fábrica</strong> que processa embeddings com atenção repetidas vezes, produzindo uma representação rica da frase.
          </div>
        </StepRevealContent>
      </SlideShell>
    ),
  },
  // 6.2.5 — Decode
  {
    id: 13,
    steps: 4,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Por baixo do capô · 5/5</Label>
        <div className="slide-title mb-8" style={{ maxWidth: 1500 }}>
          <Underline>Decode</Underline>.
        </div>
        <div className="slide-statement mb-10" style={{ maxWidth: 1500, color: "#333" }}>
          Depois de processar tudo, o modelo devolve uma <strong>lista de probabilidades</strong> para o próximo token. O Decode escolhe um token e <strong>repete o ciclo</strong> até formar a resposta.
        </div>

        <StepRevealContent stepIndex={1}>
          <div
            className="rounded-2xl"
            style={{ border: "2px solid #111", padding: "24px 28px", background: "#fafafa", maxWidth: 1500 }}
          >
            <div className="slide-label" style={{ color: "#111", marginBottom: 16 }}>Exemplo: “Quem escreveu Dom Casmurro?”</div>
            <div className="space-y-3" style={{ fontFamily: "monospace", fontSize: 20 }}>
              {[
                { w: "Machado", p: 42, top: true },
                { w: "José", p: 18 },
                { w: "Alencar", p: 12 },
                { w: "Aluísio", p: 8 },
                { w: "Graciliano", p: 5 },
              ].map((r) => (
                <div key={r.w} className="flex items-center gap-4">
                  <div style={{ width: 180, fontWeight: r.top ? 700 : 400, color: r.top ? "#ff6b00" : "#111" }}>{r.w}</div>
                  <div style={{ flex: 1, height: 22, background: "white", border: "1px solid #ddd", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ width: `${r.p * 2}%`, height: "100%", background: r.top ? "#ff6b00" : "#fb923c" }} />
                  </div>
                  <div style={{ width: 70, textAlign: "right", color: "#444" }}>{r.p}%</div>
                </div>
              ))}
            </div>
            <div className="mt-4 slide-statement" style={{ color: "#333" }}>
              → O decoder escolhe <strong>“Machado”</strong> e adiciona à resposta.
            </div>
          </div>
        </StepRevealContent>

        <StepRevealContent stepIndex={2}>
          <div className="mt-10">
            <div className="slide-label" style={{ color: "#111", marginBottom: 12 }}>Geração autoregressiva</div>
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: "repeat(5, 1fr)", maxWidth: 1500 }}
            >
              {[
                "O",
                "O gato",
                "O gato subiu",
                "O gato subiu na",
                "O gato subiu na árvore.",
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: i === 4 ? "#fff5ec" : "#fafafa",
                    border: i === 4 ? "2px solid #ff6b00" : "2px solid #111",
                    padding: "16px 14px",
                    fontFamily: "monospace",
                    fontSize: 16,
                    minHeight: 90,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "#666" }}>Iter. {i + 1}</div>
                  <div style={{ fontWeight: 600 }}>{s}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 slide-statement" style={{ color: "#333" }}>
              A cada passo, o token escolhido vira <strong>entrada</strong> para gerar o próximo. Isso é <strong>geração autoregressiva</strong>.
            </div>
          </div>
        </StepRevealContent>

        <StepRevealContent stepIndex={3}>
          <div className="mt-10 grid gap-6" style={{ gridTemplateColumns: "1fr 1fr", maxWidth: 1500 }}>
            <div style={{ border: "2px solid #111", padding: "24px 28px" }}>
              <div className="slide-label" style={{ color: "#111" }}>Temperatura baixa</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>Determinístico</div>
              <div className="slide-body" style={{ color: "#444", marginTop: 8 }}>
                Sempre escolhe o token mais provável. Respostas mais <strong>previsíveis e conservadoras</strong>.
              </div>
            </div>
            <div style={{ border: "2px solid #ff6b00", padding: "24px 28px", background: "#fff5ec" }}>
              <div className="slide-label" style={{ color: "#ff6b00" }}>Temperatura alta</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>Criativo</div>
              <div className="slide-body" style={{ color: "#444", marginTop: 8 }}>
                Achata as probabilidades e dá mais chance a tokens raros. Respostas mais <strong>variadas e criativas</strong>.
              </div>
            </div>
          </div>
        </StepRevealContent>

        <StepRevealContent stepIndex={4}>
          <div className="mt-8 slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
            Resumo: o decode <strong>transforma números em texto</strong>, escolhendo um token por vez a partir das probabilidades — e repete até completar a resposta.
          </div>
        </StepRevealContent>
      </SlideShell>
    ),
  },
  // 6 — O que significa GPT?
  {
    id: 8.4,
    steps: 3,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Capítulo 05 · GPT</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          O que significa <Underline>GPT</Underline>?
        </div>
        <div className="slide-statement mb-14" style={{ maxWidth: 1400, color: "#333" }}>
          Cada letra de GPT revela uma escolha de design fundamental.
        </div>
        <RevealIf stepIndex={1}>
          <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { L: "G", n: "Generative", d: "O modelo GERA texto original, não apenas classifica.", ex: '"Era uma vez um desenvolvedor que descobriu os LLMs e…"' },
              { L: "P", n: "Pre-trained", d: "Aprende com bilhões de textos ANTES de qualquer conversa com o usuário.", ex: "Wikipedia · livros · código · artigos · web" },
              { L: "T", n: "Transformer", d: "Arquitetura de rede neural baseada em atenção. Criada em 2017.", ex: '"Attention Is All You Need" — Vaswani et al.' },
            ].map((l) => (
              <div key={l.L} style={{ border: "2px solid #111", padding: "28px 32px" }}>
                <div className="flex items-baseline gap-4">
                  <div style={{ fontSize: 84, fontWeight: 800, color: "#ff6b00", lineHeight: 1 }}>{l.L}</div>
                  <div>
                    <div className="slide-label" style={{ color: "#9B9B9B" }}>Letra</div>
                    <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>{l.n}</div>
                  </div>
                </div>
                <div className="slide-body mt-6" style={{ color: "#444" }}>{l.d}</div>
                <div className="mt-4" style={{ background: "#fafafa", border: "1px solid #ddd", padding: "12px 16px", fontStyle: "italic", fontSize: 18, color: "#333" }}>
                  {l.ex}
                </div>
              </div>
            ))}
          </div>
        </RevealIf>
        <RevealIf stepIndex={2}>
          <div className="grid gap-8 mt-10" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            <div style={{ borderLeft: "4px solid #ff6b00", paddingLeft: 20 }}>
              <div className="slide-label" style={{ color: "#ff6b00" }}>Fase 1 — Pré-treinamento</div>
              <div style={{ fontSize: 26, fontWeight: 700, marginTop: 8 }}>O modelo aprende</div>
              <div className="slide-body mt-3" style={{ color: "#444" }}>
                Wikipedia · livros · código · artigos · web → aprende <strong>padrões da linguagem</strong> → resulta em um <strong>modelo base</strong> com conhecimento geral.
              </div>
            </div>
            <div style={{ borderLeft: "4px solid #111", paddingLeft: 20 }}>
              <div className="slide-label" style={{ color: "#111" }}>Fase 2 — Uso (conversa)</div>
              <div style={{ fontSize: 26, fontWeight: 700, marginTop: 8 }}>O modelo aplica</div>
              <div className="slide-body mt-3" style={{ color: "#444" }}>
                Usuário faz uma pergunta → o modelo usa o conhecimento já pré-aprendido → devolve uma resposta. <strong>Não</strong> aprende mais nesta fase.
              </div>
            </div>
          </div>
        </RevealIf>
        <RevealIf stepIndex={3}>
          <ul className="slide-statement list-disc list-inside mt-10 pl-6" style={{ maxWidth: 1500, color: "#333" }}>
            <li><strong>G</strong> → Gera texto original.</li>
            <li><strong>P</strong> → Aprende antes de conversar.</li>
            <li><strong>T</strong> → Usa a arquitetura Transformer.</li>
          </ul>
        </RevealIf>
      </SlideShell>
    ),
  },
  // 7 — Modelos populares
  {
    id: 14,
    steps: 4,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Panorama atual</Label>
        <div className="slide-title mb-14" style={{ maxWidth: 1500 }}>
          Modelos mais <Underline>populares</Underline> hoje.
        </div>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { b: "OpenAI", r: "GPT 5.6 | Sol | Terra | Luna", c: "GPT 5.5" },
            { b: "Anthropic", r: "Fable 5", c: "Sonnet 5 | Haiku 4.5" },
            { b: "Google", r: "Gemini 3.6 Flash | Lite | Cyber", c: "Gemini 3.1 Pro | 3.6 Flash | 3.5 Flash Lite" },
            { b: "Open source", m: "Llama<br />DeepSeek v4" },
          ].map((x, i) => (
            <RevealIf key={x.b} stepIndex={i + 1}>
              <div style={{ borderLeft: "4px solid #ff6b00", paddingLeft: 24 }}>
                <div className="slide-label" style={{ color: "#111" }}>{x.b}</div>
                {x.r ? (
                  <>
                    <div className="slide-label mt-5" style={{ color: "#9B9B9B" }}>Mais Recentes</div>
                    <div style={{ fontSize: 26, fontWeight: 700, marginTop: 6, lineHeight: 1.2, color: "#111" }}>{x.r}</div>
                    {x.c && (
                      <>
                        <div className="slide-label mt-5" style={{ color: "#9B9B9B" }}>Acesso via Chat</div>
                        <div style={{ fontSize: 22, fontWeight: 600, marginTop: 6, lineHeight: 1.25, color: "#444" }}>{x.c}</div>
                      </>
                    )}
                  </>
                ) : (
                  <div style={{ fontSize: 34, fontWeight: 700, marginTop: 14, lineHeight: 1.15 }} dangerouslySetInnerHTML={{ __html: x.m }} />
                )}
              </div>
            </RevealIf>
          ))}
        </div>
      </SlideShell>
    ),
  },
  // 6.1 — Modalidades de Interação
  {
    id: 8,
    steps: 4,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>O motor da IA generativa</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          Modalidades de <Underline>Interação</Underline>
        </div>
        <RevealIf stepIndex={1}>
          <div className="slide-statement mb-16" style={{ maxWidth: 1400, color: "#333" }}>
            Os modelos de linguagem expandiram a interface homem-máquina, integrando texto, análise de mídias e resolução de problemas complexos.
          </div>
        </RevealIf>
        <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <RevealIf stepIndex={2}>
            <Card num="Texto" title="LLMs" body="Chat, resumo, redação e análise." />
          </RevealIf>
          <RevealIf stepIndex={3}>
            <Card num="Visão" title="Multimodais" body="Interpretam imagens, áudio e vídeo." />
          </RevealIf>
          <RevealIf stepIndex={4}>
            <Card num="Ação" title="Modelos de raciocínio" body="Pensam por etapas antes de responder." />
          </RevealIf>
        </div>
      </SlideShell>
    ),
  },
  // 7.1 — Harness (orquestração ao redor do LLM)
  {
    id: 15,
    steps: 7,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Por trás das plataformas</Label>
        <div className="slide-title mb-8" style={{ maxWidth: 1500 }}>
          Orquestração: o conceito de <Underline>Harness</Underline>.
        </div>
        <div className="slide-statement mb-10" style={{ maxWidth: 1400, color: "#333" }}>
          O Harness funciona como o Sistema Operacional que envolve o modelo. Ele fornece o contexto de negócios, a estrutura e as limitações.
        </div>
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "auto auto auto",
            gridTemplateAreas: `
              "fs . guides"
              "state llm sensors"
              "memory . tools"
            `,
            gap: 24,
            alignItems: "stretch",
          }}
        >
          <RevealIf stepIndex={2}>
            <div style={{ gridArea: "fs" }}>
              <Card num="01" title="File System" body="Acesso seguro à árvore de diretórios." />
            </div>
          </RevealIf>
          <RevealIf stepIndex={3}>
            <div style={{ gridArea: "guides" }}>
              <Card num="02" title="Guias (Guides)" body="Instruções operacionais e Skills injetadas." />
            </div>
          </RevealIf>
          <RevealIf stepIndex={4}>
            <div style={{ gridArea: "state" }}>
              <Card num="03" title="Estado (State)" body="Rastreamento em tempo real da tarefa atual." />
            </div>
          </RevealIf>
          <RevealIf stepIndex={1}>
            <div
              style={{
                gridArea: "llm",
                border: "4px solid #ff6b00",
                background: "#fff5ec",
                borderRadius: "50%",
                padding: "48px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 240,
                minWidth: 240,
                aspectRatio: "1 / 1",
                alignSelf: "center",
                justifySelf: "center",
              }}
            >
              <div className="slide-label" style={{ color: "#ff6b00" }}>Núcleo</div>
              <div style={{ fontSize: 36, fontWeight: 800, marginTop: 8, lineHeight: 1.1, textAlign: "center" }}>
                LLM (Claude) /<br />CPU
              </div>
              <div className="slide-body" style={{ color: "#444", marginTop: 10, textAlign: "center", fontSize: 16 }}>
                A inteligência bruta.
              </div>
            </div>
          </RevealIf>
          <RevealIf stepIndex={5}>
            <div style={{ gridArea: "sensors" }}>
              <Card num="04" title="Sensores (Sensors)" body="Percepção e leitura do ambiente de desenvolvimento." />
            </div>
          </RevealIf>
          <RevealIf stepIndex={6}>
            <div style={{ gridArea: "memory" }}>
              <Card num="05" title="Memória (Memory)" body="Retenção de contexto a curto e longo prazo." />
            </div>
          </RevealIf>
          <RevealIf stepIndex={7}>
            <div style={{ gridArea: "tools" }}>
              <Card num="06" title="Ferramentas (Tools)" body="Capacidades de execução via MCP e APIs." />
            </div>
          </RevealIf>
        </div>
        <RevealIf stepIndex={7}>
          <div
            className="slide-statement mt-10"
            style={{
              maxWidth: 1500,
              padding: "20px 28px",
              border: "2px solid #111",
              background: "#fafafa",
              color: "#333",
            }}
          >
            <strong>Nota arquitetural:</strong> o mesmo LLM, envolto em um Harness diferente, produzirá resultados comportamentais completamente distintos.
          </div>
        </RevealIf>
      </SlideShell>
    ),
  },
  // 7.0 — Vamos testa-los? (transição)
  {
    id: 20,
    render: () => (
      <SlideShell chapter="CÉREBRO" align="center">
        <Label>Hora de testar</Label>
        <div className="slide-hero" style={{ maxWidth: 1600 }}>
          Vamos <Underline>testa-los</Underline>?
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          <br />Dinâmica · comparação de modelos
        </div>
      </SlideShell>
    ),
  },
  // 8.2 — Limitações de Contexto
  {
    id: 17,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Janela de Contexto</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          <Underline>Limitações</Underline> de memória.
        </div>
        <div className="slide-statement mb-14" style={{ maxWidth: 1500, color: "#333" }}>
          Cada modelo tem um limite de quantos tokens consegue "lembrar" de uma única vez.
        </div>
        <div className="grid gap-10" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          <div>
            <div className="slide-num text-accent">200k</div>
            <div style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>Modelos Usuais</div>
            <div className="slide-body" style={{ color: "#444", marginTop: 10 }}>
              Equivale a um livro de 400 páginas (ex: GPT-4o, Claude 3.5 Sonnet).
            </div>
          </div>
          <div>
            <div className="slide-num text-accent">1M a 2M+</div>
            <div style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>Modelos Avançados</div>
            <div className="slide-body" style={{ color: "#444", marginTop: 10 }}>
              Equivale a milhares de PDFs, vídeos ou bases de código inteiras (ex: Gemini 1.5 Pro).
            </div>
          </div>
        </div>
      </SlideShell>
    ),
  },
  // 10 — Custos
  {
    id: 18,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Você paga pelo que usa</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          <Underline>Custos</Underline> por token.
        </div>
        <div className="grid gap-10 items-end" style={{ gridTemplateColumns: "repeat(4, 1fr)", height: 380 }}>
          {[
            { m: "Modelo econômico", h: 40, p: "US$ 0,30 + US$ 2,5 / 1M" },
            { m: "Modelo para uso geral", h: 60, p: "US$ 0,50 + US$ 3 / 1M" },
            { m: "Modelo para planejar", h: 140, p: "US$ 3 + US$ 15 / 1M" },
            { m: "Modelo mais avançado", h: 340, p: "US$ 10 + US$ 50 / 1M" },

          ].map((b, i) => (
            <div key={b.m} className="flex flex-col items-start h-full justify-end">
              <div
                style={{
                  width: "100%",
                  height: b.h,
                  background: i === 3 ? "#ff6b00" : "#111",
                }}
              />
              <div className="slide-label" style={{ color: "#111", marginTop: 20 }}>{b.m}</div>
              <div style={{ fontSize: 26, fontWeight: 600, marginTop: 8 }}>{b.p}</div>
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
  // 13 — Topologia de Camadas
  {
    id: 21,
    steps: 5,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Estrutura conceitual da IA</Label>
        <div className="slide-title mb-8" style={{ maxWidth: 1500 }}>
          Topologia de <Underline>camadas</Underline>.
        </div>
        <div className="flex flex-col gap-4" style={{ maxWidth: 1500 }}>
          {[5, 4, 3, 2, 1].map((n, i) => (
            <RevealIf key={n} stepIndex={5 - i}>
              <img
                src={`/imagem/Camada ${n}.png`}
                alt={`Camada ${n}`}
                style={{ width: "100%", height: "auto", display: "block", borderRadius: 4 }}
              />
            </RevealIf>
          ))}
        </div>
      </SlideShell>
    ),
  },
  // 12 — Cover Conhecimento
  { id: 20, render: () => <ChapterCover num="02" name="Conhecimento" image={conhecimentoImg} range="" /> },
  // 13 — Assistentes web
  {
    id: 21,
    render: () => (
      <SlideShell chapter="CONHECIMENTO">
        <Label>Onde conversamos com a IA</Label>
        <div className="slide-title mb-14" style={{ maxWidth: 1500 }}>
          <Underline>Assistentes web</Underline> por chat.
        </div>
        <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <Card num="OpenAI" title="ChatGPT" body="O mais conhecido. Forte em texto, imagem e voz." />
          <Card num="Google" title="Gemini" body="Integrado ao Workspace, YouTube e Google Search." />
          <Card num="Anthropic" title="Claude" body="Ótimo para textos longos e análise de documentos." />
        </div>
      </SlideShell>
    ),
  },
  
  // 14 — Projeto no ChatGPT
  {
    id: 22,
    render: () => (
      <SlideShell chapter="CONHECIMENTO">
        <Label>Memória de trabalho</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          Vantagem dos <Underline>projetos</Underline>
        </div>
        <div className="flex items-center justify-center flex-1" style={{ marginTop: 20 }}>
          <img
            src={projImg}
            alt="Projetos no ChatGPT"
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 12 }}
          />
        </div>
      </SlideShell>
    ),
  },
  // 15 — NotebookLM
  {
    id: 23,
    render: () => (
      <SlideShell chapter="CONHECIMENTO">
        <Label>Base de fontes confiáveis</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          Por que usar?
        </div>
        <div className="grid gap-8 mt-10" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <Card
            title="Respostas específicas"
            body="Respostas extraídas <strong>exclusivamente dos seus arquivos</strong> (PDFs, Google Docs, Links, Youtube)."
          />
          <Card
            title="Resumos Instantâneos"
            body="Criação automática de <strong>guias de estudo</strong>, FAQs, <strong>cronogramas e briefing</strong> de documentos extensos."
          />
          <Card
            title="Resumo em áudio"
            body="Transforma seus textos em um <strong>podcast interativo</strong> gravado por dois apresentadores virtuais."
          />
        </div>
      </SlideShell>
    ),
  },
  // 16 — Aplicações no Dia a Dia
  {
    id: 16,
    render: () => (
      <SlideShell chapter="CONHECIMENTO">
        <Label>Na Prática</Label>
        <div className="slide-title mb-20" style={{ maxWidth: 1500 }}>
          <Underline>Aplicações</Underline> no Dia a Dia.
        </div>
        <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          <Card
            title="Estudantes e Pesquisadores"
            body="Sintetize dezenas de artigos científicos, crie resumos para provas e encontre citações exatas em segundos."
          />
          <Card
            title="Profissionais e Gestores"
            body="Analise relatórios de mercado, atas de reunião e contratos sem perder tempo lendo centenas de páginas."
          />
        </div>
      </SlideShell>
    ),
  },
  // 17 — Encerramento Dia 1 & Spoiler Dia 2
  {
    id: 17,
    render: () => (
      <SlideShell>
        <div className="slide-hero mb-10" style={{ fontSize: 100, lineHeight: 1 }}>
          Resumo e <Underline>Spoiler</Underline>
        </div>

        <div className="grid grid-cols-2 gap-32 w-full">
          {/* Dia 1 */}
          <div className="flex flex-col gap-10 p-10 bg-slate-100">
            <div className="slide-label text-accent" style={{ fontSize: 24, letterSpacing: "0.2em" }}>O que aprendemos hoje</div>
            <div className="flex flex-col gap-6">
              {[
                { p: "Emanuel", t: "LLMs, modelos e Tokens" },
                { p: "Tayna", t: "Evolução da IA" },
                { p: "Gil", t: "Enriquecendo contexto" },
              ].map(item => (
                <div key={item.p} className="flex flex-col">
                  <span style={{ fontSize: 45, fontWeight: 800, color: "#111" }}>{item.t}</span>
                  <span style={{ fontSize: 30, color: "#9B9B9B", marginTop: -5 }}>{item.p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dia 2 */}
          <div className="flex flex-col gap-10 bg-orange-200 p-10">
            <div className="slide-label text-accent" style={{ fontSize: 24, letterSpacing: "0.2em" }}> Spoiler para próximo encontro</div>
            <div className="flex flex-col gap-6">
              {[
                { p: "Gil", t: "Prompt Engineering" },
                { p: "Israel", t: "Criação de Skills" },
              ].map(item => (
                <div key={item.p} className="flex flex-col">
                  <span style={{ fontSize: 45, fontWeight: 800, color: "#111" }}>{item.t}</span>
                  <span style={{ fontSize: 30, color: "darkorange", marginTop: -5 }}>{item.p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12" style={{ fontSize: 32, color: "#111", fontWeight: 600 }}>
          Dúvidas? Nos vemos semana que vem (dia 30).
        </div>
      </SlideShell>
    ),
  },
  // 16 — Cover Contexto
  { id: 24, render: () => <ChapterCover num="03" name="Contexto" image={contextoImg} range="" /> },
  // 17 — O que é contexto
  {
    id: 25,
    render: () => (
      <SlideShell chapter="CONTEXTO">
        <Label>O ingrediente que muda tudo</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          O que é <Underline>contexto</Underline>?
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}><br />
          São as definições que a IA recebe para entender quem você é, o que você quer e como deve responder. Sem contexto, ela <strong>chuta o que faltou definir</strong> ou deixa genérico.
        </div>
      </SlideShell>
    ),
  },
  // 18 — Anatomia
  {
    id: 26,
    render: () => (
      <SlideShell chapter="CONTEXTO">
        <Label>Como se monta um bom prompt</Label>
        <div className="slide-title mb-14" style={{ maxWidth: 1500 }}>
          A <Underline>anatomia</Underline> de um prompt.
        </div>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { n: "01", t: "Personificação (Role)", d: "Quem a IA deve parecer ser.", letter: "R" },
            { n: "02", t: "Tarefa, Objetivo", d: "O que você quer alcançar.", letter: "T" },
            { n: "03", t: "Contexto adicional", d: "Especificações, arquivos, material, restrições, exemplos, público-alvo", letter: "C" },
            { n: "04", t: "Formato", d: "Formato esperado.", letter: "F" },
          ].map((x, i) => (
            <div key={x.n}> <br />
              <div style={{ fontSize: 84, fontWeight: 700, marginTop: 10, borderBottom: `6px solid #111`, paddingTop: 20, color: x.letter == "C" ? "#ff6b00" : "#111" }}>{x.letter}</div>
              <div style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>{x.t}</div>
              <div className="slide-body" style={{ color: "#555", marginTop: 8 }}>{x.d}</div>
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
  // 19 — Exercício falado
  {
    id: 27,
    render: () => (
      <SlideShell chapter="CONTEXTO" align="center">
        <Label>Pausa para reflexão</Label>
        <div className="slide-hero" style={{ maxWidth: 1600 }}>
          Vamos fazer um exercício <Underline>falado</Underline>?
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          <br />Qual é o prompt para uma nova campanha de marketing?<br /><br />
        </div>
      </SlideShell>
    ),
  },
  // 20 — Mão na massa: contexto
  {
    id: 28,
    render: () => (
      <SlideShell chapter="CONTEXTO">
        <Label>Exercício 1/4 · Mão na massa</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          O poder da <Underline>personificação</Underline>
        </div>
        <br /><br />
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#000" }}>
          <strong>Atue como um arquiteto de software com 20 anos de experiência, especialista em sistemas críticos e mentor de equipes de desenvolvimento.</strong><br />
          Explique como melhorar a qualidade de um software.
        </div>
      </SlideShell>
    ),
  },
  // 21 — Mão na massa: exemplo
  {
    id: 29,
    render: () => (
      <SlideShell chapter="CONTEXTO">
        <Label>Exercício 2/4 · Mão na massa</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          Instruir através de <Underline>exemplo</Underline>
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          Um bom exemplo vale mais do que dez linhas explicando.
        </div><br />
        <ul className="slide-statement list-disc list-inside pl-6" style={{ maxWidth: 1500, color: "#333" }}>
          <li>User story de implementação autenticação via Google</li>
          <li>Pull request de bugfix de timeout na integração com o serviço de pagamentos</li>
          <li>Histórico de consumo de tokens</li>
        </ul>
      </SlideShell>
    ),
  },
  // 22 — Cadeia de pensamento
  {
    id: 30,
    render: () => (
      <SlideShell chapter="CONTEXTO">
        <Label>Exercício 3/4 · Mão na massa</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          Pensando em <Underline>etapas</Underline>.
        </div><br /><br />
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          <strong>Vamos resolver este problema em etapas. Após responder, aguarde minha confirmação para continuar o assunto.</strong>
          <br /><br />
          Primeiro: identifique os principais desafios da migração.
        </div><br /><br />
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          Agora proponha uma arquitetura.
        </div>
      </SlideShell>
    ),
  },
  // 23 — Iteração
  {
    id: 31,
    render: () => (
      <SlideShell chapter="CONTEXTO">
        <Label>Exercício 4/4 · Mão na massa</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          Construindo prompt por <Underline>iteração com IA</Underline>
        </div>
        <br /><br />
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          <br />Quero criar .... <br />
          <strong>Antes de responder, faça todas as perguntas necessárias para entender o problema. Não faça suposições. Somente depois que eu responder às perguntas, elabore a solução.</strong>
        </div>
      </SlideShell>
    ),
  },
  // 15 — Markdown
  {
    id: 32,
    render: () => (
      <SlideShell chapter="CONTEXTO">
        <Label>O formato preferido das IAs</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          Prompts <Underline>reutilizáveis</Underline>.
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          Através de arquivo de instruções na forma de texto simples é possível especificar, descrever experiências, processos e conhecimentos reutilizáveis.
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333", marginTop: 80 }}>
          Tá, mas como faço isso no ChatGPT/Gemini?
        </div>
      </SlideShell>
    ),
  },
  // 24 — Cover Habilidades
  { id: 33, render: () => <ChapterCover num="04" name="Habilidades" image={habilidadesImg} range="" /> },

  // 25 — Skills
  {
    id: 34,
    render: () => (
      <SlideShell chapter="HABILIDADES" hideScrollbar>
        <Label>Do contexto ao reaproveitamento</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          Skill é <Underline>execução reutilizável</Underline>.
        </div>
        <div className="slide-statement" style={{ maxWidth: 1450, color: "#333" }}>
          O pedido pode ser curto porque a skill ja carrega contexto, criterio e formato.
        </div>
        <div className="skill-demo">
          <div className="skill-demo-stage">
            <div className="skill-demo-doc">
              <div className="skill-demo-doc-header">skill.md</div>
              <div className="skill-demo-doc-line">
                <span># papel</span>
                <span>cobranca amigavel B2B</span>
              </div>
              <div className="skill-demo-doc-line">
                <span># objetivo</span>
                <span>cobrar sem soar agressivo</span>
              </div>
              <div className="skill-demo-doc-line">
                <span># criterios</span>
                <span>educado, claro, com prazo</span>
              </div>
              <div className="skill-demo-doc-line">
                <span># formato</span>
                <span>assunto + corpo + CTA</span>
              </div>
            </div>
            <div className="skill-demo-chat">
              <div className="skill-demo-chat-header">
                <span>ChatGPT</span>
                <span className="skill-demo-chat-pill">skill ativa</span>
              </div>
              <div className="skill-demo-user">
                Gere um e-mail curto cobrando a fatura em atraso.
              </div>
              <div className="skill-demo-assistant">
                <div className="skill-demo-assistant-title">Resposta guiada pela skill</div>
                <div className="skill-demo-assistant-line"><strong>Assunto:</strong> Regularizacao da fatura pendente</div>
                <div className="skill-demo-assistant-line"><strong>Tom:</strong> cordial, objetivo e sem confronto</div>
                <div className="skill-demo-assistant-line"><strong>CTA:</strong> solicitar confirmacao do pagamento ate amanha</div>
              </div>
            </div>
          </div>
          <div className="skill-demo-copy">
            <div className="skill-demo-point">
              <div className="slide-label" style={{ color: "#111" }}>Prompt curto</div>
              <div className="skill-demo-point-text">Quem usa nao precisa reexplicar tudo.</div>
            </div>
            <div className="skill-demo-point">
              <div className="slide-label" style={{ color: "#111" }}>Contexto salvo</div>
              <div className="skill-demo-point-text">A skill leva junto papel, regra e formato.</div>
            </div>
            <div className="skill-demo-point">
              <div className="slide-label" style={{ color: "#111" }}>Resposta consistente</div>
              <div className="skill-demo-point-text">A saida segue um padrao reutilizavel.</div>
            </div>
          </div>
        </div>
      </SlideShell>
    ),
  },
  // 26 — Da conversa ao método
  {
    id: 35,
    render: () => (
      <SlideShell chapter="HABILIDADES">
        <Label>Da cabeça ao texto</Label>
        <div className="slide-title mb-8" style={{ maxWidth: 1500, fontSize: 76, lineHeight: 0.98 }}>
          Transformando experiência em <Underline>skill</Underline>.
        </div>
        <div className="slide-statement" style={{ maxWidth: 1250, color: "#333", fontSize: 38, lineHeight: 1.12 }}>
          Uma skill é um pedaço do seu jeito de pensar, escrito em texto para a IA repetir com padrão.
        </div>
        <div className="skill-metaphor">
          <div className="skill-brain-panel">
            <div className="slide-label" style={{ color: "#111" }}>No humano</div>
            <div className="brain-shell">
              <div className="brain-orbit brain-orbit-1" />
              <div className="brain-orbit brain-orbit-2" />
              <div className="brain-orbit brain-orbit-3" />
              <div className="brain-chip brain-chip-1">Tom</div>
              <div className="brain-chip brain-chip-2">Critérios</div>
              <div className="brain-chip brain-chip-3">Passos</div>
              <div className="brain-chip brain-chip-4">Exemplos</div>
              <div className="brain-core">
                experiência<br />humana
              </div>
            </div>
            <div className="slide-caption" style={{ maxWidth: 360, marginTop: 14, fontSize: 20 }}>
              Uma forma de pensar e executar que hoje ainda está espalhada na sua cabeça.
            </div>
          </div>
          <div className="skill-transfer">
            <div className="skill-transfer-line" />
            <div className="slide-label" style={{ color: "#111" }}>Extrair e organizar</div>
            <div className="skill-transfer-copy">
              transformar jeito de pensar em instrução reutilizável
            </div>
          </div>
          <div className="skill-box-panel">
            <div className="slide-label" style={{ color: "#111" }}>Na caixinha</div>
            <div className="skill-file-card">
              <div className="skill-file-header">skill.md</div>
              <div className="skill-file-line">
                <span># papel</span>
                <span>especialista...</span>
              </div>
              <div className="skill-file-line">
                <span># objetivo</span>
                <span>o que fazer</span>
              </div>
              <div className="skill-file-line">
                <span># passos</span>
                <span>como executar</span>
              </div>
              <div className="skill-file-line">
                <span># critérios</span>
                <span>o que validar</span>
              </div>
              <div className="skill-file-line">
                <span># formato</span>
                <span>como responder</span>
              </div>
            </div>
            <div className="slide-caption" style={{ maxWidth: 360, marginTop: 14, fontSize: 20 }}>
              A IA não improvisa do zero. Ela reutiliza o padrão salvo em texto.
            </div>
          </div>
        </div>
      </SlideShell>
    ),
  },
  // 27 — Exemplos por público
  {
    id: 29,
    render: () => (
      <SlideShell chapter="HABILIDADES" hideScrollbar>
        <Label>Mesma lógica, mundos diferentes</Label>
        <div className="slide-title mb-6" style={{ maxWidth: 1550, fontSize: 78, lineHeight: 0.96 }}>
          Uma lógica. <Underline>Quatro mundos</Underline>.
        </div>
        <div className="audience-grid">
          {[
            {
              n: "Desenvolvimento",
              t: "Prompt curto para gerar HTML pronto.",
              d: "Entrega uma pagina HTML com paleta, estilo visual, estrutura de secao e CTA ja definidos pela skill.",
              p: "Crie uma landing page HTML para simulacao de credito da Barracred com hero, beneficios e CTA.",
              href: "/skills/skill-dev-backlog-tecnico.md",
              download: "skill-dev-html-barracred.md",
              toolHref: "https://gemini.google.com/",
              toolLabel: "Abrir Gemini",
            },
            {
              n: "Marketing",
              t: "Prompt de imagem com orientacao visual.",
              d: "Gera prompt pronto para imagem com estilo, composição, negativa e objetivo de campanha.",
              p: "Crie a imagem principal de uma landing page de curso de IA para iniciantes, moderna e confiavel.",
              href: "/skills/skill-marketing-prompt-imagem.md",
              download: "skill-marketing-prompt-imagem.md",
            },
            {
              n: "Vídeo",
              t: "Roteiro curto com cortes e CTA.",
              d: "Converte uma ideia em roteiro de video, beats, cenas, legenda e chamada final.",
              p: "Transforme em reels de 45s: IA nao substitui criatividade, acelera execucao.",
              href: "/skills/skill-video-roteiro-curto.md",
              download: "skill-video-roteiro-curto.md",
              toolHref: "https://app.runwayml.com/video-tools/teams/israelribeiro313/ai-tools/agent",
              toolLabel: "Abrir Runway",
            },
            {
              n: "Operação",
              t: "E-mail pronto com tom e objetivo.",
              d: "Transforma um pedido curto em e-mail profissional com assunto, corpo, fechamento e chamada final.",
              p: "Escreva um e-mail cobrando retorno de proposta enviada ha 5 dias, com tom cordial e objetivo.",
              href: "/skills/skill-operacao-resumo-atendimento.md",
              download: "skill-operacao-email-profissional.md",
            },
          ].map((world) => (
            <div key={world.n} className="audience-card audience-card-static">
              <div className="slide-label" style={{ color: "#111" }}>{world.n}</div>
              <div className="skill-step-title" style={{ marginTop: 14 }}>{world.t}</div>
              <div className="skill-step-body" style={{ marginTop: 14 }}>{world.d}</div>
              <div className="audience-example">
                <div className="audience-example-head">
                  <span className="audience-example-label">Pedido de teste</span>
                  <CopyPromptButton text={world.p} />
                </div>
                <span>{world.p}</span>
              </div>
              <div className="audience-actions">
                <a className="audience-link" href={world.href} target="_blank" rel="noreferrer">
                  Abrir skill
                </a>
                <a className="audience-link audience-link-secondary" href={world.href} download={world.download}>
                  Baixar .md
                </a>
                {world.toolHref && world.toolLabel ? (
                  <a className="audience-link audience-link-secondary" href={world.toolHref} target="_blank" rel="noreferrer">
                    {world.toolLabel}
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
  // 27 — Cover Ação
  { id: 36, render: () => <ChapterCover num="05" name="Ação" image={acaoImg} range="" /> },

<<<<<<< HEAD
  // 27.1 — Anatomia Estrutural de um Agente
  {
    id: 37,
    render: () => (
      <SlideShell chapter="AÇÃO">
        <Label>Arquitetura do exemplo</Label>
        <div className="slide-title mb-6" style={{ maxWidth: 1500, fontSize: 84, lineHeight: 1.05 }}>
          Arquitetura do Exemplo: Contexto → <Underline>Skill</Underline> → Apps → Teste.
        </div>
        <div className="grid items-stretch" style={{ gridTemplateColumns: "1fr 1fr", gap: 18, maxWidth: 1500 }}>
          <div style={{ border: "2px solid #111", background: "#fff" }}>
            <div style={{ padding: "14px 18px", borderBottom: "2px solid #111", background: "#fafafa" }}>
              <div className="slide-label" style={{ color: "#111" }}>[ CONTEXTO ]</div>
              <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>docs/</div>
              <div style={{ color: "#444", marginTop: 8, fontSize: 22, lineHeight: 1.2 }}>
                O contexto do priorizador: arquitetura, domínio e estado vivo.
              </div>
            </div>
            <pre
              style={{
                padding: "16px 18px",
                fontSize: 20,
                lineHeight: 1.25,
                color: "#111",
                whiteSpace: "pre-wrap",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
              }}
            >
              {"docs/\n├─ context/\n│  ├─ index.md\n│  ├─ architecture-overview.md\n│  ├─ domain-map.md\n│  └─ feature-map.md\n├─ domains/\n│  └─ ticket-prioritization/index.md\n├─ live/\n│  ├─ handoff.md\n│  └─ known-risks.md\n└─ specs/\n   └─ active-epic.md"}
            </pre>
          </div>
          <div style={{ border: "2px solid #111", background: "#fff" }}>
            <div style={{ padding: "14px 18px", borderBottom: "2px solid #111", background: "#fafafa" }}>
              <div className="slide-label" style={{ color: "#111" }}>[ SKILLS / COMMANDS ]</div>
              <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>.trae/</div>
              <div style={{ color: "#444", marginTop: 8, fontSize: 22, lineHeight: 1.2 }}>
                As instruções de execução: o que fazer e como fazer.
              </div>
            </div>
            <pre
              style={{
                padding: "16px 18px",
                fontSize: 20,
                lineHeight: 1.25,
                color: "#111",
                whiteSpace: "pre-wrap",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
              }}
            >
              {".trae/\n├─ skills/\n│  ├─ demo-context-first/SKILL.md\n│  ├─ demo-testing/SKILL.md\n│  └─ demo-web-api/SKILL.md\n└─ commands/\n   ├─ planejar-demo.md\n   ├─ criar-web-demo.md\n   ├─ criar-api-demo.md\n   └─ adicionar-teste-demo.md"}
            </pre>
            <div style={{ padding: "12px 18px", borderTop: "2px solid #111", background: "#fff" }}>
              <div className="slide-label" style={{ color: "#111" }}>O QUE CADA SKILL FAZ</div>
              <div style={{ marginTop: 10, fontSize: 22, lineHeight: 1.25, color: "#333" }}>
                <div style={{ marginBottom: 8 }}>
                  <strong>demo-context-first</strong>: obriga ler o contexto (docs/context + domínio) antes de criar ou alterar código.
                </div>
                <div style={{ marginBottom: 8 }}>
                  <strong>demo-testing</strong>: garante teste unitário simples e legível cobrindo prioridades (crítica, alta, média e baixa).
                </div>
                <div>
                  <strong>demo-web-api</strong>: orienta separar interface e regra (frontend coleta e mostra; backend aplica a lógica).
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1500, border: "2px solid #111", background: "#fff", marginTop: 14 }}>
          <div style={{ padding: "12px 18px", borderBottom: "2px solid #111", background: "#fafafa" }}>
            <div className="slide-label" style={{ color: "#111" }}>[ TESTES ]</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>tests/</div>
            <div style={{ color: "#444", marginTop: 8, fontSize: 22, lineHeight: 1.2 }}>
              A prova: valida automaticamente a regra de priorização.
            </div>
          </div>
          <pre
            style={{
              padding: "14px 18px",
              fontSize: 20,
              lineHeight: 1.25,
              color: "#111",
              whiteSpace: "pre-wrap",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
            }}
          >
            {"tests/\n└─ unit/\n   └─ prioritization.test.js"}
          </pre>
        </div>
        <div
          className="slide-statement mt-10"
          style={{
            maxWidth: 1500,
            padding: "16px 22px",
            border: "2px solid #111",
            background: "#fafafa",
            color: "#333",
            fontSize: 30,
          }}
        >
          <strong>Arquitetura em execução:</strong> Quando a IA ganha contexto, skill e ferramenta, ela sai do discurso e entra em execução.
        </div>
      </SlideShell>
    ),
  },

=======
>>>>>>> 508bb57924fd72908c33e0bc9614cd3c8318fdee
  // 29 — Exercício final
  {
    id: 38,
    render: () => (
      <SlideShell chapter="AÇÃO">
        <Label>Exercício final · Mão na massa</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          O que merece virar <Underline>método</Underline>?
        </div>
        <div className="slide-caption" style={{ maxWidth: 1200, fontSize: 28, color: "#666", marginTop: -8, marginBottom: 18 }}>
          Metodo e um jeito claro, repetivel e reutilizavel de fazer algo.
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          Se repete toda semana, custa mais do que parece.
        </div>
        <div className="action-grid">
          {[
            {
              n: "01",
              t: "Observe",
              d: "Escolha algo que você vive reexplicando para a IA.",
            },
            {
              n: "02",
              t: "Estruture",
              d: "Defina contexto, passos, restrições e formato esperado.",
            },
            {
              n: "03",
              t: "Reutilize",
              d: "Teste, refine e salve como skill para o próximo caso.",
            },
          ].map((item, i) => (
            <div key={item.n} className="action-card" style={{ animationDelay: `${i * 0.45}s` }}>
              <div className="slide-label" style={{ color: "#111" }}>{item.n}</div>
              <div className="skill-step-title" style={{ marginTop: 14 }}>{item.t}</div>
              <div className="skill-step-body" style={{ marginTop: 18 }}>{item.d}</div>
              <div className="action-card-bar" style={{ animationDelay: `${0.2 + i * 0.45}s` }} />
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
  // 30 — Encerramento meme
  {
    id: 39,
    render: () => (
      <div className="slide-content flex items-center justify-center">
        <img
          src={oqueQueremosAsset.url}
          alt="O que queremos"
          style={{ maxWidth: "82%", maxHeight: "88%", objectFit: "contain" }}
        />
      </div>
    ),
  },
  // 31 — Agradecimento
  {
    id: 40,
    render: () => (
      <div className="slide-content flex flex-col items-center justify-center text-center px-50">
        <div className="slide-statement mb-12" style={{ maxWidth: 1400, fontSize: 42, color: "#444" }}>
          <strong>Ontem:</strong><br /> você apenas conversava com a IA. ("oi chat")
        </div>
        <div className="slide-title mb-12" style={{ maxWidth: 1100, fontSize: 60, lineHeight: 1.1 }}>
          Hoje:<br /> você extrai melhor informação, e<br /> cria habilidades reutilizáveis para futuros agentes.
        </div><br /><br />
        <div className="slide-statement" style={{ maxWidth: 1200, color: "#444", fontSize: 42 }}>
          <strong>No próximo módulo:</strong><br />
          🔄 Fluxos que executam sequência de tarefas<br />
          ⚙️ Pequenas automações dinâmicas<br />
          📅 Agendamento de ações diárias<br />
        </div>
      </div>
    ),
  },

];

/* ---------- Presentation shell ---------- */

function Presentation() {
  const [index, setIndex] = useState(0);
  const [jumpValue, setJumpValue] = useState("1");

  // `step` controla quantos elementos de um slide já foram revelados.
  // É resetado toda vez que o slide atual muda.
  const [step, setStep] = useState(0);

  const go = useCallback((next: number) => {
    setIndex((cur) => {
      const clamped = Math.min(Math.max(next, 0), SLIDES.length - 1);
      const url = new URL(window.location.href);
      url.searchParams.set("slide", String(clamped + 1));
      window.history.replaceState({}, "", url.toString());
      return clamped;
    });
    setStep(0);
  }, []);

  const commitJump = useCallback(() => {
    const parsed = parseInt(jumpValue, 10);
    const normalized = isNaN(parsed) ? index + 1 : Math.min(Math.max(parsed, 1), SLIDES.length);
    setJumpValue(String(normalized));
    go(normalized - 1);
  }, [go, index, jumpValue]);

  const advance = useCallback(() => {
    const current = SLIDES[index];
    const max = current?.steps ?? 0;
    if (max > 0 && step < max) {
      // Revela a próxima etapa sem trocar de slide.
      setStep(step + 1);
      return;
    }
    // Todas as etapas já foram reveladas (ou slide sem etapas): avança.
    const clamped = Math.min(index + 1, SLIDES.length - 1);
    setIndex(clamped);
    setStep(0);
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(clamped + 1));
    window.history.replaceState({}, "", url.toString());
  }, [index, step]);

  const back = useCallback(() => {
    const current = SLIDES[index];
    const max = current?.steps ?? 0;
    if (max > 0 && step > 0) {
      // Esconde a última etapa revelada.
      setStep(step - 1);
      return;
    }
    // Volta para o slide anterior.
    const clamped = Math.max(index - 1, 0);
    setIndex(clamped);
    setStep(0);
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(clamped + 1));
    window.history.replaceState({}, "", url.toString());
  }, [index, step]);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("slide");
    const n = p ? parseInt(p, 10) : 1;
    const next = Math.min(Math.max((isNaN(n) ? 1 : n) - 1, 0), SLIDES.length - 1);
    setIndex(next);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        advance();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        back();
      } else if (e.key === "Home") {
        setIndex(0);
        setStep(0);
        const url = new URL(window.location.href);
        url.searchParams.set("slide", "1");
        window.history.replaceState({}, "", url.toString());
      } else if (e.key === "End") {
        const last = SLIDES.length - 1;
        setIndex(last);
        setStep(0);
        const url = new URL(window.location.href);
        url.searchParams.set("slide", String(last + 1));
        window.history.replaceState({}, "", url.toString());
      } else if (e.key === "f" || e.key === "F") {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, back]);

  useEffect(() => {
    document.title = `${index + 1}/${SLIDES.length} · Inteligência Artificial — Barracred`;
  }, [index]);

  useEffect(() => {
    setJumpValue(String(index + 1));
  }, [index]);

  // Fit scale
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useLayoutEffect(() => {
    const update = () => {
      if (!stageRef.current) return;
      const { clientWidth: w, clientHeight: h } = stageRef.current;
      setScale(Math.min(w / 1920, h / 1080));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const slide = SLIDES[index];

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: "#f5f5f5" }}>
      <div ref={stageRef} className="relative flex-1 overflow-hidden">
        <div className="slide-wrapper" style={{ transform: `scale(${scale})` }}>
          <StepContext.Provider value={step}>
            <div key={index} style={{ display: "contents" }}>
              {slide.render()}
            </div>
          </StepContext.Provider>
        </div>
      </div>

      {/* Controls */}
      <div
        className="fixed flex items-center gap-3 px-4 py-2 rounded-full"
        style={{
          left: 24,
          bottom: 24,
          background: "rgba(17,17,17,0.85)",
          color: "white",
          backdropFilter: "blur(6px)",
          fontFamily: "Poppins",
        }}
      >
        <button
          onClick={back}
          className="px-3 py-1 text-sm font-medium hover:opacity-70"
          aria-label="Anterior"
        >
          ←
        </button>
        <div
          className="text-sm tabular-nums flex items-center justify-center gap-2"
          style={{ minWidth: 104, textAlign: "center" }}
        >
          <input
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value.replace(/\D/g, "").slice(0, 3))}
            onBlur={commitJump}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commitJump();
              } else if (e.key === "Escape") {
                setJumpValue(String(index + 1));
                (e.target as HTMLInputElement).blur();
              }
            }}
            inputMode="numeric"
            aria-label="Ir para slide"
            className="bg-transparent border-none outline-none text-center"
            style={{ width: 32, color: "white" }}
          />
          <span>/ {SLIDES.length}</span>
        </div>
        <button
          onClick={advance}
          className="px-3 py-1 text-sm font-medium hover:opacity-70"
          aria-label="Próximo"
        >
          →
        </button>
        {(() => {
          const max = SLIDES[index]?.steps ?? 0;
          if (max === 0) return null;
          return (
            <div
              className="flex items-center gap-1 ml-2 pl-3"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.3)" }}
              aria-label="Progresso das etapas"
            >
              {Array.from({ length: max }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: i < step ? "#ff6b00" : "rgba(255,255,255,0.3)",
                    transition: "background 0.2s ease",
                  }}
                />
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
