# Planejamento do Protótipo Web — IMIGRA.AI

## Visão Geral

Este protótipo é uma versão web funcional para validação do projeto IMIGRA.AI. Ele complementa a documentação completa da Fase 1 (em `/docs/`) com um plano concreto de implementação focado em três experiências principais:

1. **Boas-vindas automática no idioma do usuário** — sem clique, sem escolha
2. **Onboarding guiado em 4 passos** — cadastro completo com upload de currículo e comprovantes
3. **Dashboard de vagas recomendadas por IA** — matching automático com score de compatibilidade

---

## Por que um Protótipo Web?

O projeto original planeja um app mobile em React Native. O protótipo web serve para:
- Validar o conceito com usuários reais antes de investir no app
- Testar o fluxo de onboarding e a qualidade do matching
- Demonstrar o produto para investidores e parceiros rapidamente
- Coletar dados reais para melhorar o algoritmo de recomendação

---

## Documentos nesta Pasta

| Arquivo | Conteúdo |
|---------|---------|
| `README.md` | Este arquivo — visão geral do protótipo |
| `TECH-STACK.md` | Stack tecnológico escolhido e justificativas |
| `ONBOARDING-FLOW.md` | Fluxo detalhado dos 4 passos de cadastro |
| `VAGAS-STRATEGY.md` | Estratégia autônoma de captação de vagas |
| `AI-INTEGRATION.md` | Como a IA é usada no protótipo |
| `ROADMAP.md` | Roteiro de implementação semana a semana |

---

## Decisões Arquiteturais

| Decisão | Escolha | Motivo |
|---------|---------|--------|
| Plataforma | Site Web (Next.js 14) | Mais rápido de validar, sem necessidade de instalar app |
| Detecção de idioma | `navigator.language` + next-i18next | Padrão de mercado, gratuito, funciona em todos os browsers |
| Banco de dados | PostgreSQL via Supabase (free tier) | Fácil de configurar, storage integrado para uploads |
| Upload de arquivos | Supabase Storage (1GB grátis) | Sem setup extra, URLs privadas seguras |
| Vagas | Sistema 100% autônomo via APIs + cron job | Sem intervenção manual necessária |
| Verificação de docs | IA extrai dados + admin confirma | Equilíbrio entre automação e confiabilidade |

---

## Idiomas Suportados

| Código | Idioma | Comunidade no Brasil |
|--------|--------|---------------------|
| pt-BR | Português (Brasil) | Nativo — interface padrão |
| es | Espanhol | Venezuelanos, colombianos, argentinos |
| en | Inglês | Padrão global e fallback |
| fr | Francês | Africanos francófonos |
| ht | Crioulo Haitiano | Segunda maior comunidade imigrante |
| ar | Árabe | Sírios, libaneses |
| uk | Ucraniano | Refugiados ucranianos |
| ru | Russo | Comunidade russa e ex-soviética |

---

## Status

- [x] Planejamento concluído
- [ ] Setup do ambiente de desenvolvimento
- [ ] Implementação das telas (Semana 1)
- [ ] Backend + banco de dados (Semana 2)
- [ ] Integração de vagas + matching (Semana 3)
- [ ] Polimento e deploy (Semana 4)
