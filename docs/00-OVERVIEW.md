# 📋 IMIGRA.AI — DOCUMENTAÇÃO COMPLETA

## 🎯 Objetivo do Projeto

**Desenvolver um aplicativo mobile (MVP) que conecta imigrantes com oportunidades de emprego compatíveis com suas habilidades reais, utilizando inteligência artificial.**

**Data:** Maio 2026  
**Status:** 🟡 Em Planejamento  
**Modelo:** Projeto Acadêmico + Open Source (100% Gratuito)

---

## 📁 ESTRUTURA DE DOCUMENTAÇÃO

```
docs/
├── 00-OVERVIEW.md (este arquivo)
├── 01-PROJECT.md (visão e objetivos)
├── 02-PERSONAS.md (usuários alvo)
├── 03-SPECIFICATIONS.md (funcionalidades)
├── 04-ARCHITECTURE.md (arquitetura técnica)
├── 05-ROADMAP.md (cronograma)
├── 06-STACK.md (tecnologias)
├── 07-DATABASE.md (schema SQL)
├── 08-API.md (endpoints REST)
├── 09-FRONTEND.md (telas e componentes)
├── 10-AI-INTEGRATION.md (IA: OpenAI/Claude)
├── 11-DEPLOYMENT.md (produção)
├── 12-TESTING.md (testes automatizados)
└── BENCHMARK-EVALUATION.md (métricas)
```

---

## 🚀 QUICK START

### Para ler a documentação:
1. Leia **01-PROJECT.md** para entender o problema e a solução
2. Leia **02-PERSONAS.md** para entender os usuários
3. Leia **03-SPECIFICATIONS.md** para ver as funcionalidades
4. Leia **04-ARCHITECTURE.md** para entender a arquitetura
5. Leia **06-STACK.md** para entender as tecnologias

### Para implementar:
1. Configure o banco de dados (07-DATABASE.md)
2. Configure o backend (08-API.md + 04-ARCHITECTURE.md)
3. Configure o frontend (09-FRONTEND.md)
4. Integre a IA (10-AI-INTEGRATION.md)
5. Teste (12-TESTING.md)
6. Deploy (11-DEPLOYMENT.md)

---

## 📊 RESUMO EXECUTIVO

| Aspecto | Descrição |
|---|---|
| **Problema** | 67,4% dos imigrantes no Brasil estão subempregados |
| **Solução** | App com IA para matching inteligente de vagas |
| **MVP Completo em** | 6 meses (4 pessoas, 20h/semana) |
| **Tecnologia** | React Native (mobile) + Node.js (backend) + PostgreSQL |
| **IA** | OpenAI API / Claude API (gratuito com limites) |
| **Público** | 1,5 milhão imigrantes no Brasil |

---

## ✅ FUNCIONALIDADES PRINCIPAIS (6 Features)

| # | Feature | Status |
|---|---|---|
| 1 | **Autenticação e Perfil** | 📋 Documentado |
| 2 | **Motor de Matching com IA** | 📋 Documentado |
| 3 | **Feed de Vagas** | 📋 Documentado |
| 4 | **Rede Social (Comunidades)** | 📋 Documentado |
| 5 | **Chat com IA** | 📋 Documentado |
| 6 | **Dashboard de Progresso** | 📋 Documentado |

---

## 🔧 STACK TECNOLÓGICO (GRATUITO)

### Frontend
- **React Native** (iOS + Android simultâneos)
- **Redux** para gerenciamento de estado
- **Expo** para dev/build

### Backend
- **Node.js** + **Express.js**
- **PostgreSQL** (banco de dados)
- **Redis** (cache, opcional)

### IA
- **OpenAI API** (gpt-3.5-turbo) - FREE TIER: $5/mês
- **Claude API** (Anthropic) - alternativa gratuita com limite

### Deployment
- **Backend:** Railway, Render, ou Heroku (FREE TIER)
- **Banco de dados:** Railway (FREE TIER)
- **Frontend:** Expo, EAS Build (FREE TIER)

### Ferramentas Dev
- **Git** (GitHub)
- **Docker** (local)
- **Jest** para testes

---

## 🎯 FASES DO PROJETO

```
SEMANAS 1-4:    Planejamento (docs) ✅ EM ANDAMENTO
SEMANAS 5-8:    Design + Setup técnico
SEMANAS 9-18:   Desenvolvimento (5 sprints)
SEMANAS 19-26:  Testes + Refinamento
```

---

## 📱 TELAS PRINCIPAIS

```
LOGIN
  └─ CADASTRO (4 etapas)
       └─ PERFIL
            ├─ HOME/DASHBOARD
            │   ├─ FEED DE VAGAS
            │   │   ├─ Detalhes da vaga
            │   │   ├─ Minhas aplicações
            │   │   └─ Favoritos
            │   ├─ COMUNIDADES
            │   │   ├─ Feed de comunidade
            │   │   ├─ Criar post
            │   │   └─ Membros
            │   ├─ CHAT COM IA
            │   │   └─ Histórico
            │   └─ PERFIL
            │       ├─ Editar info
            │       ├─ Meus certificados
            │       └─ Configurações
```

---

## 💾 BANCO DE DADOS

**Principais tabelas:**
- `usuarios` - Perfil dos imigrantes
- `vagas` - Oportunidades de emprego
- `aplicacoes` - Histórico de aplicações
- `comunidades` - Grupos de discussão
- `posts` - Posts nas comunidades
- `conversas_ia` - Chat com IA

**Detalhes em:** `07-DATABASE.md`

---

## 🔐 SEGURANÇA

- ✅ Senhas hasheadas com **bcrypt**
- ✅ Autenticação com **JWT**
- ✅ HTTPS obrigatório
- ✅ Validação de input (previne SQL injection)
- ✅ Rate limiting no chat IA

---

## 📊 MÉTRICAS DE SUCESSO

### MVP Completo quando:
✓ Todas as 6 funcionalidades funcionam  
✓ App roda em iOS + Android  
✓ Cobertura de testes > 70%  
✓ Tempo resposta API < 500ms  
✓ 0 crashes críticos

### Sucesso de Negócio (pós-MVP):
✓ 1.000+ usuários cadastrados  
✓ 500+ vagas indexadas  
✓ 100+ conexões comunitárias  
✓ NPS > 50  

---

## 🧠 COMO A IA FUNCIONA

### 1. Motor de Matching
```
Perfil do usuário (habilidades, experiência, idioma)
    ↓
IA analisa e "traduz" competências
    ↓
Busca em base de vagas
    ↓
Calcula score 0-100 para cada vaga
    ↓
Retorna vagas ordenadas por compatibilidade
```

### 2. Chat com IA
```
Usuário pergunta: "Como revalidar diploma de médico?"
    ↓
IA analisa contexto (é médico, sírio)
    ↓
IA responde com passos específicos
    ↓
Resposta salva no histórico
```

---

## 📚 PRÓXIMOS ARQUIVOS PARA LER

1. **01-PROJECT.md** - O problema detalhado
2. **02-PERSONAS.md** - Quem são nossos usuários
3. **03-SPECIFICATIONS.md** - O que será construído
4. **04-ARCHITECTURE.md** - Como será construído
5. **06-STACK.md** - Tecnologias específicas

---

## 👥 CONTRIBUINDO

Este é um projeto **100% Open Source** para estudo. Para contribuir:

1. Fork do repositório
2. Crie uma branch (`git checkout -b feature/minha-feature`)
3. Commit as mudanças (`git commit -m 'Add feature'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

---

## 📞 CONTATO E SUPORTE

- **Documentação:** `/docs` (este repositório)
- **Issues:** Use a seção de issues do GitHub
- **Discussões:** Use discussions para perguntas

---

**Versão:** 1.0  
**Última atualização:** 19 de Maio de 2026  
**Status:** 🟡 Documentação em Progresso  
**Próximo:** Implementação da Fase 1 (Backend)
