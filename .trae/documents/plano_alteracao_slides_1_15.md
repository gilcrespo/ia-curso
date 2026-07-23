# Plano de Desenvolvimento: Atualização dos Slides 1 a 15 (Foco em LLM)

## 1. Resumo do Objetivo
Modificar os slides iniciais (com foco nas definições de 1 a 9) da apresentação em React (`src/routes/index.tsx`) para aprofundar o entendimento sobre LLMs (Large Language Models). O objetivo é garantir clareza total para públicos técnicos e leigos, explicando a importância das LLMs e os processos que ocorrem ao enviar um prompt.

## 2. Análise do Estado Atual
- Os slides estão definidos no arquivo `src/routes/index.tsx` dentro da constante `SLIDES`, que é um array de objetos `{ id, render }`.
- O Capítulo 1 atualmente chama-se "Cérebro" e trata da evolução da IA de forma resumida (anos 70 até hoje), cita modelos atuais, tokens de forma básica e exibia uma visualização de iframe (Slide 9).
- A alteração demandará adicionar novos slides no array, remover o slide 9 e reordenar os IDs.

## 3. Mudanças Propostas (`src/routes/index.tsx`)

### Slide 1 e 2
- **Ação:** Manter sem alterações.

### Slide 3 (Mapa da Apresentação)
- **Ação:** Atualizar os rótulos do mapa.
- **Como:** Modificar o array interno do `SlideShell` para:
  - Cérebro (LLM)
  - Conhecimento (Dados)
  - Contexto
  - Habilidades
  - Ações

### Slide 4 (Capa do Capítulo 1)
- **Ação:** Renomear a capa do capítulo.
- **Como:** Alterar de "Cérebro" para "Cérebro (LLM)".

### Slide 5 (Evolução da IA)
- **Ação:** Expandir a linha do tempo, dividindo em múltiplos slides para não poluir visualmente.
- **Como:** Criar 2 a 3 slides sequenciais usando o componente `SlideShell` com um layout de grid/timeline atualizado contendo os seguintes marcos:
  - *Slide 5.1:* Antiguidade grega (Mito de Talos) até 1977-1997 (IA nos games).
  - *Slide 5.2:* Anos 80-2000 (ML Estatístico) até 2023 (Multimodalidade).
  - *Slide 5.3:* 2024 (Vídeo/Tempo real) até 2026 (Era dos agentes autônomos).

### Slide 6 (Por baixo do capô da LLM)
- **Ação:** Aprofundar o processo de funcionamento da LLM com didática.
- **Como:** Criar uma representação visual (usando grid ou ícones) que explique a jornada do texto:
  1. Encode / Tokenização
  2. Embedding
  3. Transformer
  4. Attention
  *Nota: A linguagem deve ser acessível, fazendo analogias para o público leigo, mas mantendo a precisão para o público técnico.*

### Slide 7 (Modelos Populares)
- **Ação:** Atualizar a lista de modelos (marcas).
- **Como:** Atualizar o grid existente para:
  - **OpenAI:** GPT-5.6 / Sol / Lua / Terra
  - **Anthropic:** Claude Fable 5 / Mythos 5 / Opus 8
  - **Google:** Gemini Nano Banano (e versões PRO/Ultra)

### Slide 7.1 (Novo: Harness)
- **Ação:** Inserir um novo slide logo após o Slide 7.
- **Como:** Explicar visualmente como funciona o "Harness" (infraestrutura/orquestração) por trás dessas plataformas (como as APIs e servidores lidam com a carga, segurança e roteamento do prompt).

### Slide 8 (Tokens e Limitações)
- **Ação:** Aprofundar o tema, dividindo em dois slides (8.1 e 8.2).
- **Como:** 
  - *Slide 8.1:* O que é um token? (Exemplos práticos de fragmentação de palavras).
  - *Slide 8.2:* Limitações, janela de contexto e como a LLM processa o custo computacional.

### Slide 9 (Visualização do Token - Antigo)
- **Ação:** Excluir.
- **Como:** Remover o objeto de `id: 9` (que contém a imagem `tokenVisualImg` e o link do Transformer Explainer) do array `SLIDES`.

## 4. Requisitos Gerais de Qualidade e Narrativa
- **Didática:** O Capítulo "Cérebro (LLM)" deve responder claramente: *O que é uma LLM? Por que ela é importante? O que acontece exatamente quando escrevo um prompt e aperto Enter?*
- **Acessibilidade Visual:** Usar os componentes existentes (`Card`, `Underline`, `SlideShell`) para garantir que os novos textos não fiquem espremidos.
- **Reindexação:** Ao adicionar/remover slides, será necessário atualizar a numeração sequencial (propriedade `id`) no array `SLIDES`.

## 5. Passos de Validação
- Verificar se a navegação do teclado continua funcionando com o novo tamanho do array `SLIDES`.
- Garantir que as imagens importadas (ex: logos, assets) continuam renderizando corretamente.
- Iniciar o servidor local (Vite/Bun) para pré-visualizar os novos slides no navegador.
