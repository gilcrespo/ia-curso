---
name: consumo
description: Gera informações de consumo de modelos de IA seguindo o padrão definido.
---

# 15. Tabela de Preços de Modelos (Referência)

As informações abaixo são baseadas na documentação oficial do Trae ([docs.trae.ai/ide/models](https://docs.trae.ai/ide/models)) e devem ser usadas para estimativa de custos no `historico_prompts.md`.

| Modelo | Entrada (/1M) | Saída (/1M) |
|---|---|---|
| Gemini-3.1-Pro-Preview | \$2.000 (<=200k) / \$4.000 (>200k) | \$12.000 (<=200k) / \$18.000 (>200k) |
| Gemini-3-Flash-Preview | \$0.500 | \$3.000 |
| Gemini-2.5-Pro | \$1.250 (<=200k) / \$2.500 (>200k) | \$10.000 (<=200k) / \$15.000 (>200k) |
| Gemini-2.5-Flash | \$0.300 | \$2.500 |
| GPT-5.4 | \$2.500 (<=272k) / \$5.000 (>272k) | \$15.000 (<=272k) / \$22.500 (>272k) |
| GPT-5.3-Codex | \$1.750 | \$14.000 |
| GPT-5.2-Codex | \$1.750 | \$14.000 |
| GPT-5.2 | \$1.750 | \$14.000 |
| GPT-5.1 | \$1.250 | \$10.000 |
| GPT-5-medium | \$1.250 | \$10.000 |
| GPT-5-high | \$1.250 | \$10.000 |
| Kimi-K2-0905 | \$0.600 | \$2.500 |
| DeepSeek-V3.1 | \$0.550 | \$2.190 |
| MiniMax-M2.7 | \$0.300 | \$1.200 |

*Nota: Valores sujeitos a alteração pela plataforma Trae.*

---

# REGISTRO DE PROMPTS (LOGGING TASK)
- Após resolver qualquer solicitação do usuário, você DEVE registrar de forma assíncrona o prompt executado em um arquivo chamado `historico_prompts.md` na raiz do projeto.
- Se o arquivo não existir, crie-o. Se já existir, faça um append (adicione ao final).
- O registro deve seguir estritamente a estrutura abaixo:

## [DATA_ATUAL]
- **Modelo Utilizado:** [Identificar o modelo ativo no chat, ex: GPT-5, Claude 3.5 Sonnet, Kimi-K2, etc.]
- **Prompt:**
  ```text
  [Inserir o texto literal do prompt enviado pelo usuário]
  ```
- **Estimativa de Custos:** [Mesmo se o modelo for de uso gratuito/embutido no Trae, estime o custo com base em tokens aproximados].
- **Resumo da Ação:** [1 frase curta resumindo o que foi feito no código].