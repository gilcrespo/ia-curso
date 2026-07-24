# Resumo: Formação Interna Barracred - IA

## Capítulo 1: Cérebro (LLM)
O primeiro capítulo aborda o motor da Inteligência Artificial Generativa, explorando desde a história até o funcionamento técnico dos Large Language Models (LLMs).

**A Evolução da IA:**
- **Passado:** Desde a ideia mitológica de vida artificial, passando pela Máquina de Turing (1936-1950), a formalização do termo "IA" em Dartmouth (1956) e o primeiro chatbot (Eliza, em 1966).
- **Desenvolvimento:** Avanços em jogos (Deep Blue), consolidação do Machine Learning (anos 80-2000) e a era do Deep Learning (2012).
- **Presente e Futuro:** O boom das LLMs em 2022 (ChatGPT), seguido pela multimodalidade (2023), capacidades de raciocínio avançado (2024-2025) e a futura era de agentes autônomos (2026).

**Por Baixo do Capô (Como as LLMs funcionam):**
1. **Encode & Tokenização:** A IA processa textos quebrando-os em "tokens" (subpalavras). Em média, 1 palavra equivale a cerca de 1,3 tokens.
2. **Embedding:** Converte cada token em um vetor numérico. Palavras com significados semelhantes ficam matematicamente próximas, permitindo até "aritmética de significados" (ex: Rei - Homem + Mulher = Rainha).
3. **Attention:** Mecanismo onde cada token "olha" para os demais na frase para entender o contexto real e resolver ambiguidades.
4. **Transformer:** A arquitetura revolucionária (2017) que processa toda a frase em paralelo combinando embeddings e atenção.
5. **Decode:** A geração da resposta (autoregressiva), escolhendo a próxima palavra baseada em probabilidades, onde a "temperatura" define se a resposta será determinística (baixa) ou criativa (alta).

**Orquestração, Limitações e Custos:**
- **Harness:** O LLM é apenas o "cérebro". Para ser útil, ele é encapsulado em um *Harness* (que provê memória, ferramentas, contexto e acesso a arquivos).
- Modelos populares atuais incluem GPT (OpenAI), Claude (Anthropic), Gemini (Google) e alternativas Open Source (Llama, DeepSeek).
- As IAs possuem **janelas de contexto** (limite de tokens que conseguem "lembrar", variando de 200k a 2 milhões+) e seu uso tem custos atrelados à quantidade de tokens processados.

---

## Capítulo 2: Conhecimento
O segundo capítulo explora as principais plataformas onde a IA é aplicada e como transformá-la em uma ferramenta de ganho de produtividade.

**Assistentes Web:**
- **ChatGPT (OpenAI):** O mais conhecido, forte em texto, imagem e voz. Possui a funcionalidade de "Projetos" para organizar contextos.
- **Gemini (Google):** Focado na integração com o ecossistema Workspace, YouTube e Google Search.
- **Claude (Anthropic):** Ótimo para textos longos e análise profunda de documentos.

**Bases de Conhecimento e Fontes Confiáveis (NotebookLM):**
- Permite usar apenas os arquivos do usuário (PDFs, Docs, links) como base para as respostas.
- Gera resumos instantâneos, FAQs, guias de estudo e até transforma documentos extensos em **podcasts em áudio** com apresentadores virtuais.

**Aplicações no Dia a Dia:**
- **Estudantes e Pesquisadores:** Útil para sintetizar artigos científicos e encontrar citações precisas.
- **Profissionais e Gestores:** Acelera drasticamente a leitura e análise de relatórios de mercado, atas de reuniões e contratos longos.
