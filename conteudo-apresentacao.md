# Conteúdo da Apresentação — Inteligência Artificial: do Cérebro à Ação

> Formação Interna · Barracred
> Documento de referência com o conteúdo de cada slide (page) da apresentação.

---

## Slide 1 — Capa

- **Logo:** Barracred
- **Selo:** Formação Interna · Barracred
- **Título:** Inteligência Artificial: do *Cérebro* à *Ação*.
- **Frase de impacto:** "Ferramentas mudam. Os conceitos permanecem. É essa base que te prepara para evoluir."

---

## Slide 2 — O que queremos (meme)

- Meme de abertura com o asset `oquequeremos.png`.

---

## Slide 3 — Mapa da apresentação

- **Título:** A estrutura de um *agente de IA*.
- Cinco capítulos na ordem:
  1. **Cérebro**
  2. **Conhecimento**
  3. **Contexto**
  4. **Habilidades**
  5. **Ação**

---

## Capítulo 01 — Cérebro

### Slide 4 — Capa do capítulo

- Capítulo 01 — *Cérebro*.

### Slide 5 — A evolução da IA

- **Linha do tempo:**
  - **anos 70–80** — IA baseada em regras.
  - **anos 90–2000** — IA estatística e Machine Learning.
  - **2010 → hoje** — Era do aprendizado profundo (Deep Learning).
  - **2020 → hoje** — Era das LLMs e IA Generativa.

### Slide 6 — O que são LLMs?

- **Definição:** Large Language Models são modelos treinados em enormes volumes de texto para prever a próxima palavra, permitindo conversar, escrever e raciocinar.
- **Tipos:**
  - **Texto** — LLMs: chat, resumo, redação e análise.
  - **Visão** — Multimodais: interpretam imagens, áudio e vídeo.
  - **Ação** — Modelos de raciocínio: pensam por etapas antes de responder.

### Slide 7 — Modelos mais populares hoje

- **OpenAI** — GPT-5.4 / GPT-4o
- **Anthropic** — Claude Sonnet 4.6
- **Google** — Gemini 3.1 PRO
- **Open source** — Llama · DeepSeek v4

### Slide 8 — Tokens e limitações

- **Definição:** Tudo que entra e sai do modelo é medido em tokens. Cada modelo tem uma "janela" máxima do que consegue lembrar de uma vez.
- **Números-chave:**
  - **~5** caracteres equivalem a 1 token (em português).
  - **200k** tokens de contexto em modelos usuais.
  - **1M+** tokens nos modelos mais recentes.

### Slide 9 — Como prever o próximo token

- Visualização interativa em: [Transformer Explainer (Polo Club)](https://poloclub.github.io/transformer-explainer/).

### Slide 10 — Custos por token

- Você paga pelo que usa. Comparativo de preços:
  - **Modelo econômico** — US$ 0,30 + US$ 2,5 / 1M
  - **Modelo para uso geral** — US$ 0,50 + US$ 3 / 1M
  - **Modelo para planejar** — US$ 3 + US$ 15 / 1M
  - **Modelo mais avançado** — US$ 10 + US$ 50 / 1M

### Slide 11 — Custos (imagem)

- Imagem ilustrativa de custos (`custos.png`).

---

## Capítulo 02 — Conhecimento

### Slide 12 — Capa do capítulo

- Capítulo 02 — *Conhecimento*.

### Slide 13 — Assistentes web por chat

- Onde conversamos com a IA:
  - **OpenAI — ChatGPT** — O mais conhecido. Forte em texto, imagem e voz.
  - **Google — Gemini** — Integrado ao Workspace, YouTube e Google Search.
  - **Anthropic — Claude** — Ótimo para textos longos e análise de documentos.

### Slide 14 — Projetos no ChatGPT

- **Memória de trabalho:** um agrupador de instruções fixas, arquivos e histórico próprios.

### Slide 15 — PDFs e vídeos no NotebookLM

- **Base de fontes confiáveis:** suba manuais, atas, resoluções do Bacen e vídeos do YouTube. A IA responde citando exatamente o trecho de origem.

---

## Capítulo 03 — Contexto

### Slide 16 — Capa do capítulo

- Capítulo 03 — *Contexto*.

### Slide 17 — O que é contexto?

- São as definições que a IA recebe para entender quem você é, o que você quer e como deve responder.
- **Sem contexto, ela chuta o que faltou definir ou deixa genérico.**

### Slide 18 — A anatomia de um prompt

- Como se monta um bom prompt — mnemônico **R-T-C-F**:
  1. **R** — Personificação (Role): quem a IA deve parecer ser.
  2. **T** — Tarefa, Objetivo: o que você quer alcançar.
  3. **C** — Contexto adicional: especificações, arquivos, material, restrições, exemplos, público-alvo.
  4. **F** — Formato: formato esperado.

### Slide 19 — Vamos fazer um exercício falado?

- Pausa para reflexão.
- Pergunta disparadora: "Qual é o prompt para uma nova campanha de marketing?"

### Slide 20 — Exercício 1/4 · O poder da personificação

> "Atue como um arquiteto de software com 20 anos de experiência, especialista em sistemas críticos e mentor de equipes de desenvolvimento."
>
> Explique como melhorar a qualidade de um software.

### Slide 21 — Exercício 2/4 · Instruir através de exemplo

- Princípio: um bom exemplo vale mais do que dez linhas explicando.
- Exemplos práticos:
  - User story de implementação de autenticação via Google.
  - Pull request de bugfix de timeout na integração com o serviço de pagamentos.
  - Histórico de consumo de tokens.

### Slide 22 — Exercício 3/4 · Pensando em etapas (Chain of Thought)

> "Vamos resolver este problema em etapas. Após responder, aguarde minha confirmação para continuar o assunto."
>
> Primeiro: identifique os principais desafios da migração.
>
> Agora proponha uma arquitetura.

### Slide 23 — Exercício 4/4 · Construindo prompt por iteração com IA

> "Quero criar ...."
>
> "Antes de responder, faça todas as perguntas necessárias para entender o problema. Não faça suposições. Somente depois que eu responder às perguntas, elabore a solução."

### Slide 24 — Prompts reutilizáveis (Markdown)

- O formato preferido das IAs.
- Através de arquivo de instruções na forma de texto simples é possível especificar, descrever experiências, processos e conhecimentos reutilizáveis.
- "Tá, mas como faço isso no ChatGPT/Gemini?" — gancho para o próximo bloco.

---

## Capítulo 04 — Habilidades

### Slide 25 — Capa do capítulo

- Capítulo 04 — *Habilidades*.

### Slide 26 — Habilidades customizadas (Skills)

- Do prompt à execução.
- **Definição:** Skills são procedimentos, instruções, comportamentos que a IA aprende uma vez e os executa sempre da mesma forma.

### Slide 27 — Exemplos de skills

- **Administrativo** — Ata resumida a partir da gravação da reunião.
- **Crédito** — Sumário de proposta com pontos de atenção.
- **Atendimento** — Resposta padrão de e-mail com tom da marca.
- **Compliance** — Revisão de contrato contra política interna.
- **Humanizer** — Especialista em remover marcas de escrita por IA. [Acessar](https://www.skills.sh/mackswendhell/humanizer-pt-br/humanizer-pt-br)
- **Book-to-Skill** — Transforme livro técnico em skill. [Acessar](https://github.com/virgiliojr94/book-to-skill)
- **html-to-png** — Transforme HTML em imagem PNG. [Acessar](file:///c:/Dev/Emanuel/Estudos/Curso-IA-Gil/public/html-to-image.md)
- **Video-to-Skill** — Transforme vídeo do YouTube em skill. [Acessar](https://gemini.google.com/)
- **Histórico de prompts** — Prompts usados, modelos e custos estimados. [Acessar](file:///c:/Dev/Emanuel/Estudos/Curso-IA-Gil/public/consumo.md)

---

## Capítulo 05 — Ação

### Slide 28 — Capa do capítulo

- Capítulo 05 — *Ação*.

### Slide 29 — Juntando tudo (exercício final)

- Escolha algo que você faz toda semana e transforme em uma *Skill*.
- Sugestões:
  - Gerar Pull Request mais detalhada. [Exemplo](file:///c:/Dev/Emanuel/Estudos/Curso-IA-Gil/public/pr.md)
  - Criar User Stories. [Exemplo](file:///c:/Dev/Emanuel/Estudos/Curso-IA-Gil/public/userstory.md)
  - Escrever casos de teste.
  - Escrever teste unitário.
  - Gerar documentação do projeto, caso não tenha.
  - Escrever consultas SQL.
  - Analisar logs.

### Slide 30 — Encerramento (meme)

- Meme final com o asset `oquequeremos.png`.

### Slide 31 — Agradecimento e próximos passos

- **Ontem:** você apenas conversava com a IA. ("oi chat")
- **Hoje:** você extrai melhor informação, e cria habilidades reutilizáveis para futuros agentes.
- **No próximo módulo:**
  - Fluxos que executam sequência de tarefas.
  - Pequenas automações dinâmicas.
  - Agendamento de ações diárias.

---

## Resumo da estrutura

| # | Slide | Capítulo |
|---|-------|----------|
| 1 | Capa | — |
| 2 | Meme "O que queremos" | — |
| 3 | Mapa da apresentação | — |
| 4 | Capa Cérebro | 01 · Cérebro |
| 5 | Evolução da IA | 01 · Cérebro |
| 6 | O que são LLMs | 01 · Cérebro |
| 7 | Modelos mais populares | 01 · Cérebro |
| 8 | Tokens e limitações | 01 · Cérebro |
| 9 | Visualização de tokens | 01 · Cérebro |
| 10 | Custos por token | 01 · Cérebro |
| 11 | Custos (imagem) | 01 · Cérebro |
| 12 | Capa Conhecimento | 02 · Conhecimento |
| 13 | Assistentes web | 02 · Conhecimento |
| 14 | Projetos no ChatGPT | 02 · Conhecimento |
| 15 | NotebookLM | 02 · Conhecimento |
| 16 | Capa Contexto | 03 · Contexto |
| 17 | O que é contexto | 03 · Contexto |
| 18 | Anatomia de um prompt | 03 · Contexto |
| 19 | Exercício falado | 03 · Contexto |
| 20 | Exercício 1/4 — Personificação | 03 · Contexto |
| 21 | Exercício 2/4 — Exemplo | 03 · Contexto |
| 22 | Exercício 3/4 — Chain of Thought | 03 · Contexto |
| 23 | Exercício 4/4 — Iteração com IA | 03 · Contexto |
| 24 | Prompts reutilizáveis | 03 · Contexto |
| 25 | Capa Habilidades | 04 · Habilidades |
| 26 | Skills customizadas | 04 · Habilidades |
| 27 | Exemplos de skills | 04 · Habilidades |
| 28 | Capa Ação | 05 · Ação |
| 29 | Juntando tudo | 05 · Ação |
| 30 | Meme final | 05 · Ação |
| 31 | Agradecimento | — |
