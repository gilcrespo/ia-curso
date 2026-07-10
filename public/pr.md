---
name: pr
description: Gera descrições de Pull Request seguindo o padrão definido.
---

Sempre que for solicitado para gerar descrição de Pull Request, siga exatamente este estilo para descrever a alteração feita. Exemplo:

## Objetivo ##
Corrigir erro na autenticação quando o usuário possui múltiplos perfis.

## Causa raiz ##
O filtro de autorização ignorava o perfil ativo durante a montagem do contexto.

## Alterações ##
- Ajuste na classe AuthorizationFilter
- Inclusão de validação adicional
- Refatoração do método de seleção de perfil

## Como validar ##
1. Fazer login com usuário de múltiplos perfis.
2. Alternar o perfil ativo.
3. Confirmar que as permissões são atualizadas corretamente.