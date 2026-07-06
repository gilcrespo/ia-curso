import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

import logoAsset from "@/assets/logo_barracred.png.asset.json";
import oqueQueremosAsset from "@/assets/oquequeremos.png.asset.json";
import cerebroImg from "@/assets/ch-cerebro.png";
import conhecimentoImg from "@/assets/ch-conhecimento.png";
import habilidadesImg from "@/assets/ch-habilidades.png";
import contextoImg from "@/assets/ch-contexto.png";
import acaoImg from "@/assets/ch-acao.png";

const CHAPTER_IMAGES: Record<string, string> = {
  "CÉREBRO": cerebroImg,
  "CONHECIMENTO": conhecimentoImg,
  "HABILIDADES": habilidadesImg,
  "CONTEXTO": contextoImg,
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
}: {
  chapter?: string;
  children: ReactNode;
  align?: "left" | "center";
  padded?: boolean;
}) {
  const chapterImg = chapter ? CHAPTER_IMAGES[chapter] : null;

  return (
    <div className="slide-content">
      {chapter && (
        <div
          className="slide-chapter-tag absolute flex items-center gap-4"
          style={{ top: 60, left: 90 }}
        >
          {chapterImg && (
            <img src={chapterImg} alt="" style={{ width: 80, height: 80, objectFit: "contain" }} />
          )}
        </div>
      )}
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          paddingLeft: padded ? 110 : 0,
          paddingRight: padded ? 110 : 0,
          paddingTop: 180,
          paddingBottom: 120,
          justifyContent: align === "center" ? "center" : "flex-start",
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

type Slide = { id: number; render: () => ReactNode };

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
            IA Generativa:<br />
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
  // 3 — Estrutura de um agente
  {
    id: 3,
    render: () => (
      <SlideShell>
        <Label>Mapa da apresentação</Label>
        <div className="slide-title mb-16" style={{ maxWidth: 1500 }}>
          A estrutura de um <Underline>agente de IA</Underline>.
        </div>
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: "repeat(5, 1fr)", marginTop: 40 }}
        >
          {[
            { n: "01", t: "Cérebro", i: cerebroImg },
            { n: "02", t: "Conhecimento", i: conhecimentoImg },
            { n: "03", t: "Habilidades", i: habilidadesImg },
            { n: "04", t: "Contexto", i: contextoImg },
            { n: "05", t: "Ação", i: acaoImg },
          ].map((c, i) => (
            <div key={c.n} className="flex flex-col items-center justify-center">
              <img src={c.i} alt={c.t} style={{ width: 240, height: 240, objectFit: "contain" }} />
              <div style={{ fontSize: 42, fontWeight: 700, marginTop: 12 }}>{c.t}</div>
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
  // 4 — Cover Cérebro
  { id: 4, render: () => <ChapterCover num="01" name="Cérebro" image={cerebroImg} range="" /> },
  // 5 — Evolução timeline
  {
    id: 5,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Como chegamos até aqui</Label>
        <div className="slide-title mb-14" style={{ maxWidth: 1500 }}>
          A <Underline>evolução</Underline> da IA.
        </div>
        <div className="relative" style={{ marginTop: 30 }}>
          <div style={{ height: 4, background: "#111", position: "absolute", top: 40, left: 0, right: 0 }} />
          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {[
              { y: "70s–80s", t: "IA baseada em regras" },
              { y: "90s–2000s", t: "IA estatística e Machine Learning" },
              { y: "2010s", t: "Era do aprendizado profundo" },
              { y: "2020 → hoje", t: "Era das LLMs e IA Generativa" },
            ].map((step, i) => (
              <div key={step.y} className="flex flex-col items-start" style={{ paddingTop: 20 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    background: '#ff6b00',
                    marginBottom: 30,
                  }}
                />
                <div className="slide-label" style={{ color: "#111" }}>{step.y}</div>
                <div style={{ fontSize: 30, fontWeight: 600, marginTop: 12, lineHeight: 1.2 }}>
                  {step.t}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideShell>
    ),
  },
  // 6 — LLMs
  {
    id: 6,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>O motor da IA generativa</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          O que são <Underline>LLMs</Underline>?
        </div>
        <div className="slide-statement mb-16" style={{ maxWidth: 1400, color: "#333" }}>
          Large Language Models são modelos treinados em enormes volumes de texto para prever a próxima palavra, permitindo conversar, escrever e raciocinar.
        </div>
        <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <Card num="Texto" title="LLMs" body="Chat, resumo, redação e análise." />
          <Card num="Visão" title="Multimodais" body="Interpretam imagens, áudio e vídeo." />
          <Card num="Ação" title="Modelos de raciocínio" body="Pensam por etapas antes de responder." />
        </div>
      </SlideShell>
    ),
  },
  // 7 — Modelos populares
  {
    id: 7,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Panorama atual</Label>
        <div className="slide-title mb-14" style={{ maxWidth: 1500 }}>
          Modelos mais <Underline>populares</Underline> hoje.
        </div>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { b: "OpenAI", m: "GPT-5.4 / GPT-4o" },
            { b: "Anthropic", m: "Claude Sonnet 4.6" },
            { b: "Google", m: "Gemini 3.1 PRO" },
            { b: "Open source", m: "Llama · DeepSeek v4" },
          ].map((x) => (
            <div key={x.b} style={{ borderLeft: "4px solid #ff6b00", paddingLeft: 24 }}>
              <div className="slide-label" style={{ color: "#111" }}>{x.b}</div>
              <div style={{ fontSize: 34, fontWeight: 700, marginTop: 14, lineHeight: 1.15 }}>{x.m}</div>
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
  // 8 — Tokens e limitações
  {
    id: 8,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>A unidade que o modelo "enxerga"</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          <Underline>Tokens</Underline> e limitações.
        </div>
        <div className="slide-statement mb-14" style={{ maxWidth: 1500, color: "#333" }}>
          Tudo que entra e sai do modelo é medido em tokens. Cada modelo tem uma "janela" máxima do que consegue lembrar de uma vez.
        </div>
        <div className="grid gap-10" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <div>
            <div className="slide-num text-accent">~5</div>
            <div className="slide-body" style={{ color: "#444", marginTop: 10 }}>
              caracteres equivale 1 token (português).
            </div>
          </div>
          <div>
            <div className="slide-num text-accent">200k</div>
            <div className="slide-body" style={{ color: "#444", marginTop: 10 }}>
              tokens de contexto em modelos usuais.
            </div>
          </div>
          <div>
            <div className="slide-num text-accent">1M+</div>
            <div className="slide-body" style={{ color: "#444", marginTop: 10 }}>
              tokens nos modelos mais recentes.
            </div>
          </div>
        </div>
      </SlideShell>
    ),
  },
  // 9 — Custos
  {
    id: 9,
    render: () => (
      <SlideShell chapter="CÉREBRO">
        <Label>Você paga pelo que usa</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          <Underline>Custos</Underline> por token.
        </div>
        <div className="grid gap-10 items-end" style={{ gridTemplateColumns: "repeat(4, 1fr)", height: 380 }}>
          {[
            { m: "Modelo econômico", h: 60, p: "US$ 0,15 / 1M" },
            { m: "Modelo para uso geral", h: 120, p: "US$ 1,50 / 1M" },
            { m: "Modelo para planejar", h: 220, p: "US$ 2,50 / 1M" },
            { m: "Modelo mais avançado", h: 340, p: "US$ 10 / 1M" },

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
  // 10 — Cover Conhecimento
  { id: 10, render: () => <ChapterCover num="02" name="Conhecimento" image={conhecimentoImg} range="" /> },
  // 11 — Projeto no ChatGPT
  {
    id: 11,
    render: () => (
      <SlideShell chapter="CONHECIMENTO">
        <Label>Memória de trabalho</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          <Underline>Projetos</Underline> no ChatGPT.
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          Um agrupador de instruções fixas, arquivos e histórico próprios.
        </div>
      </SlideShell>
    ),
  },
  // 12 — NotebookLM
  {
    id: 12,
    render: () => (
      <SlideShell chapter="CONHECIMENTO">
        <Label>Base de fontes confiáveis</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          PDFs e vídeos no <Underline>NotebookLM</Underline>.
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          Suba manuais, atas, resoluções do Bacen e vídeos do YouTube. A IA responde citando exatamente o trecho de origem.
        </div>
      </SlideShell>
    ),
  },
  // 13 — Markdown
  {
    id: 13,
    render: () => (
      <SlideShell chapter="CONHECIMENTO">
        <Label>O formato preferido das IAs</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          Arquivos <Underline>Markdown</Underline>.
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          Texto simples com estrutura clara com títulos, listas e tabelas. Leve, versionável e lido perfeitamente por qualquer modelo.
        </div>
      </SlideShell>
    ),
  },
  // 14 — Cover Habilidades
  { id: 14, render: () => <ChapterCover num="03" name="Habilidades" image={habilidadesImg} range="" /> },
  // 15 — Assistentes web
  {
    id: 15,
    render: () => (
      <SlideShell chapter="HABILIDADES">
        <Label>Onde conversamos com a IA</Label>
        <div className="slide-title mb-14" style={{ maxWidth: 1500 }}>
          Assistentes <Underline>web por chat</Underline>.
        </div>
        <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <Card num="OpenAI" title="ChatGPT" body="O mais conhecido. Forte em texto, imagem e voz." />
          <Card num="Anthropic" title="Claude" body="Ótimo para textos longos e análise de documentos." />
          <Card num="Google" title="Gemini" body="Integrado ao Workspace, YouTube e Google Search." />
        </div>
      </SlideShell>
    ),
  },
  // 16 — Assistentes instalados
  {
    id: 16,
    render: () => (
      <SlideShell chapter="HABILIDADES">
        <Label>IA dentro do seu computador</Label>
        <div className="slide-title mb-14" style={{ maxWidth: 1500 }}>
          Assistentes <Underline>instalados</Underline> na máquina.
        </div>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {["Codex", "Claude", "Trae", "Copilot"].map((n) => (
            <div key={n} style={{ border: "2px solid #111", padding: "40px 32px", minHeight: 200 }}>
              <div className="slide-label text-accent mb-4">Desktop</div>
              <div style={{ fontSize: 44, fontWeight: 700 }}>{n}</div>
            </div>
          ))}
        </div>
        <div className="slide-caption" style={{ marginTop: 30, maxWidth: 1400 }}>
          Rodam localmente, leem seus arquivos e podem executar tarefas no sistema.
        </div>
      </SlideShell>
    ),
  },
  // 17 — Habilidades padrões
  {
    id: 17,
    render: () => (
      <SlideShell chapter="HABILIDADES">
        <Label>O que a IA já sabe fazer</Label>
        <div className="slide-title mb-12" style={{ maxWidth: 1500 }}>
          Habilidades <Underline>padrões</Underline>.
        </div>
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            "Criar imagens",
            "Pensamento profundo",
            "Pesquisa na web",
            "Criar músicas",
            "Criar apresentações",
            "Criar vídeos",
            "Integrações",
            "Plugins diversos",
          ].map((h) => (
            <div
              key={h}
              style={{
                border: "2px solid #111",
                padding: "26px 24px",
                fontSize: 28,
                fontWeight: 600,
                minHeight: 110,
                display: "flex",
                alignItems: "center",
              }}
            >
              {h}
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
  // 18 — Cover Contexto
  { id: 18, render: () => <ChapterCover num="04" name="Contexto" image={contextoImg} range="" /> },
  // 19 — O que é contexto
  {
    id: 19,
    render: () => (
      <SlideShell chapter="CONTEXTO">
        <Label>O ingrediente que muda tudo</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          O que é <Underline>contexto</Underline>?
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}><br />
          São as definições que a IA recebe para entender quem você é, o que você quer e como deve responder. Sem contexto, ela <Underline>chuta o que faltou definir</Underline> ou deixa genérico.
        </div>
      </SlideShell>
    ),
  },
  // 20 — Anatomia
  {
    id: 20,
    render: () => (
      <SlideShell chapter="CONTEXTO">
        <Label>Como se monta um bom prompt</Label>
        <div className="slide-title mb-14" style={{ maxWidth: 1500 }}>
          A <Underline>anatomia</Underline> de um prompt.
        </div>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { n: "01", t: "Personificação", d: "Quem a IA deve parecer ser." },
            { n: "02", t: "Tarefa, Objetivo", d: "O que você quer alcançar." },
            { n: "03", t: "Contexto em si", d: "Os dados, arquivos ou o material." },
            { n: "04", t: "Regras, Formato", d: "Restrições e formato esperado." },
          ].map((x, i) => (
            <div key={x.n} style={{ borderTop: `6px solid ${i === 2 ? "#ff6b00" : "#111"}`, paddingTop: 20, marginTop: 80 }}>
              <div className="slide-label" style={{ color: "#111" }}>{x.n}</div>
              <div style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>{x.t}</div>
              <div className="slide-body" style={{ color: "#555", marginTop: 8 }}>{x.d}</div>
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
  // 21 — Exercício falado
  {
    id: 21,
    render: () => (
      <SlideShell chapter="CONTEXTO" align="center">
        <Label>Pausa para reflexão</Label>
        <div className="slide-hero" style={{ maxWidth: 1600 }}>
          Vamos fazer um exercício <Underline>falado</Underline>?
        </div>
      </SlideShell>
    ),
  },
  // 22 — Mão na massa: contexto
  {
    id: 22,
    render: () => (
      <SlideShell chapter="CONTEXTO">
        <Label>Exercício 1/4 · Mão na massa</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          O poder (e o limite) da <Underline>personificação</Underline>
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          <br />Explique como melhorar a qualidade de um software.<br /><br />
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#000" }}>
          <strong>Atue como um arquiteto de software com 20 anos de experiência, especialista em sistemas críticos e mentor de equipes de desenvolvimento.</strong><br />
          Explique como melhorar a qualidade de um software.
        </div>
      </SlideShell>
    ),
  },
  // 23 — Mão na massa: exemplo
  {
    id: 23,
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
  // 24 — Cadeia de pensamento
  {
    id: 24,
    render: () => (
      <SlideShell chapter="CONTEXTO">
        <Label>Exercício 3/4 · Mão na massa</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          Pensando em <Underline>etapas</Underline>.
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          A qualidade das respostas melhora quando conduzimos a conversa como um processo
        </div><br /><br />
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          Vamos resolver este problema em etapas. Após responder, aguarde minha confirmação para continuar o assunto.
          Primeiro: identifique os principais desafios da migração.
        </div><br /><br />
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          Agora proponha uma arquitetura.
        </div>
      </SlideShell>
    ),
  },
  // 25 — Iteração
  {
    id: 25,
    render: () => (
      <SlideShell chapter="CONTEXTO">
        <Label>Exercício 4/4 · Mão na massa</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          Construindo prompt por <Underline>iteração com IA</Underline>
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          Em vez de tentar escrever um prompt perfeito, experimente deixar a IA te ajudar
        </div><br /><br />
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          Quero criar .... <br />
          Antes de responder, faça todas as perguntas necessárias para entender o problema. Não faça suposições. Somente depois que eu responder às perguntas, elabore a solução.
        </div>
      </SlideShell>
    ),
  },
  // 26 — Cover Ação
  { id: 26, render: () => <ChapterCover num="05" name="Ação" image={acaoImg} range="" /> },
  // 27 — Skills
  {
    id: 27,
    render: () => (
      <SlideShell chapter="AÇÃO">
        <Label>Do prompt à execução</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          Habilidades <Underline>customizadas</Underline>.
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          Skills são procedimentos, instruções, comportamentos que a IA aprende uma vez e as executam sempre da mesma forma.
        </div>
      </SlideShell>
    ),
  },
  // 28 — Exemplos skills
  {
    id: 28,
    render: () => (
      <SlideShell chapter="AÇÃO">
        <Label>O que já é possível automatizar</Label>
        <div className="slide-title mb-14" style={{ maxWidth: 1500 }}>
          Exemplos de <Underline>skills</Underline>.
        </div>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[
            { n: "Administrativo", t: "Ata resumida a partir da gravação da reunião" },
            { n: "Crédito", t: "Sumário de proposta com pontos de atenção" },
            { n: "Atendimento", t: "Resposta padrão de e-mail com tom da marca" },
            { n: "Compliance", t: "Revisão de contrato contra política interna" },
            { n: "Humanizer", t: "Especialista em remover marcas de escrita por IA - <a href='https://www.skills.sh/mackswendhell/humanizer-pt-br/humanizer-pt-br'>Acessar link</a>" },
            { n: "Book-to-Skill", t: "Transforme livro técnico em skill - <a href='https://github.com/virgiliojr94/book-to-skill'>Acessar link</a>" },
          ].map((s) => (
            <div key={s.n} style={{ borderLeft: "4px solid #ff6b00", paddingLeft: 20 }}>
              <div className="slide-label" style={{ color: "#111" }}>{s.n}</div>
              <div
                style={{ fontSize: 28, fontWeight: 600, marginTop: 10, lineHeight: 1.25 }}
                dangerouslySetInnerHTML={{ __html: s.t }}
              />
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
  // 29 — Juntando tudo
  {
    id: 29,
    render: () => (
      <SlideShell chapter="AÇÃO">
        <Label>Exercício final · Mão na massa</Label>
        <div className="slide-title mb-10" style={{ maxWidth: 1500 }}>
          <Underline>Juntando tudo</Underline>.
        </div>
        <div className="slide-statement" style={{ maxWidth: 1500, color: "#333" }}>
          Escolha algo que você faz toda semana transforme uma <Underline>Skill</Underline>.<br />
          Pode ser, por exemplo:
          <ul className="list-disc list-inside pl-6">
            <li>Revisar um Pull Request.</li>
            <li>Escrever casos de teste.</li>
            <li>Criar User Stories.</li>
            <li>Gerar documentação.</li>
            <li>Escrever consultas SQL.</li>
            <li>Analisar logs.</li>
            <li>Investigar bugs.</li>
          </ul>
        </div>
      </SlideShell>
    ),
  },
  // 30 — Encerramento meme
  {
    id: 30,
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
    id: 31,
    render: () => (
      <div className="slide-content flex flex-col items-center justify-center text-center px-[200px]">
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
  const [index, setIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    const p = new URLSearchParams(window.location.search).get("slide");
    const n = p ? parseInt(p, 10) : 1;
    return Math.min(Math.max((isNaN(n) ? 1 : n) - 1, 0), SLIDES.length - 1);
  });

  const go = useCallback((next: number) => {
    setIndex((cur) => {
      const clamped = Math.min(Math.max(next, 0), SLIDES.length - 1);
      const url = new URL(window.location.href);
      url.searchParams.set("slide", String(clamped + 1));
      window.history.replaceState({}, "", url.toString());
      return clamped;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "Home") go(0);
      else if (e.key === "End") go(SLIDES.length - 1);
      else if (e.key === "f" || e.key === "F") {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  useEffect(() => {
    document.title = `${index + 1}/${SLIDES.length} · IA Generativa — Barracred`;
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
          {slide.render()}
        </div>
      </div>

      {/* Controls */}
      <div
        className="fixed flex items-center gap-3 px-4 py-2 rounded-full"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 24,
          background: "rgba(17,17,17,0.85)",
          color: "white",
          backdropFilter: "blur(6px)",
          fontFamily: "Poppins",
        }}
      >
        <button
          onClick={() => go(index - 1)}
          className="px-3 py-1 text-sm font-medium hover:opacity-70"
          aria-label="Anterior"
        >
          ←
        </button>
        <div className="text-sm tabular-nums" style={{ minWidth: 60, textAlign: "center" }}>
          {index + 1} / {SLIDES.length}
        </div>
        <button
          onClick={() => go(index + 1)}
          className="px-3 py-1 text-sm font-medium hover:opacity-70"
          aria-label="Próximo"
        >
          →
        </button>
        <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.2)" }} />
        <button
          onClick={() => {
            if (document.fullscreenElement) document.exitFullscreen();
            else document.documentElement.requestFullscreen();
          }}
          className="px-3 py-1 text-xs font-medium hover:opacity-70"
        >
          Tela cheia (F)
        </button>
      </div>
    </div>
  );
}
