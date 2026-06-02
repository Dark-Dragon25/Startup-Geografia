# Stack Tecnológico do Protótipo

## Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                   USUÁRIO                           │
│          (qualquer dispositivo com browser)         │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│              FRONTEND (Vercel)                      │
│           Next.js 14 + react-i18next                │
│   - Detecção de idioma via navigator.language       │
│   - Onboarding wizard (4 passos)                    │
│   - Dashboard de vagas com score de match           │
└────────────────────┬────────────────────────────────┘
                     │ API REST
┌────────────────────▼────────────────────────────────┐
│              BACKEND (Railway)                      │
│             Node.js + Express.js                    │
│   - Autenticação JWT                                │
│   - Extração de CV via IA                           │
│   - Algoritmo de matching                           │
│   - Cron job de busca de vagas (a cada 6h)          │
└──────────┬──────────────────────┬───────────────────┘
           │                      │
┌──────────▼──────┐    ┌──────────▼──────────────────┐
│   Supabase DB   │    │   APIs Externas de Vagas     │
│  (PostgreSQL)   │    │  Jooble + Adzuna + Remotive  │
│  + Storage      │    │  + The Muse + SINE Gov       │
└─────────────────┘    └─────────────────────────────┘
           │
┌──────────▼──────────────────────────────────────────┐
│               IA (OpenAI / Claude)                  │
│   - Extração de dados do currículo (PDF → JSON)     │
│   - Análise de documentos de formação               │
│   - Filtro de vagas relevantes para imigrantes      │
└─────────────────────────────────────────────────────┘
```

---

## Frontend

### Next.js 14 (App Router)
- **Por quê:** SSR nativo, roteamento simples, suporte oficial a i18n, deploy gratuito na Vercel
- **Alternativa descartada:** React puro (sem SSR, pior SEO) / React Native Web (mais complexo)

### react-i18next + next-i18next
- **Por quê:** Biblioteca mais madura para internacionalização em React, detecta idioma automaticamente via `navigator.language`, suporte a RTL (árabe)
- **Como funciona:**
  ```javascript
  // Detecta idioma na primeira visita
  const detectedLang = navigator.language.split('-')[0]; // "pt", "es", "en"...
  i18n.changeLanguage(detectedLang);
  // Mensagem aparece imediatamente no idioma correto
  ```

### Tailwind CSS
- **Por quê:** Estilização rápida, responsividade integrada, sem CSS customizado extenso

### Bibliotecas de UI
- **shadcn/ui** — Componentes acessíveis (formulários, modais, cards)
- **react-dropzone** — Upload de arquivos com drag-and-drop
- **framer-motion** — Animação suave da tela de boas-vindas

---

## Backend

### Node.js 18+ + Express.js
- **Por quê:** Consistente com o projeto IMIGRA.AI original, equipe já familiarizada
- **Estrutura de rotas:**
  ```
  POST /api/auth/signup       — cadastro de usuário
  POST /api/auth/login        — login
  GET  /api/vagas             — listar vagas (com filtros)
  GET  /api/vagas/recomendadas — vagas com score de match
  POST /api/cv/upload         — upload + extração de CV
  POST /api/docs/upload       — upload de comprovantes
  ```

### node-cron
- **Por quê:** Cron jobs dentro do Node.js sem infraestrutura extra
- **Uso:** Busca de vagas nas APIs externas a cada 6 horas

### JWT (jsonwebtoken) + bcryptjs
- Autenticação stateless, padrão seguro

---

## Banco de Dados

### Supabase (PostgreSQL)
- **Free tier:** 500MB banco + 1GB storage + 50MB transferência/mês
- **Vantagem:** Painel visual, REST API automática, storage para arquivos integrado

### Tabelas principais para o protótipo

```sql
-- Usuários cadastrados
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL,
  nome TEXT,
  data_nascimento DATE,
  pais_origem TEXT,
  idiomas TEXT[],              -- ['pt', 'es', 'en']
  como_descobriu TEXT,
  area_profissional TEXT,
  nivel_experiencia TEXT,      -- 'junior' | 'pleno' | 'senior'
  cidade_preferida TEXT,
  skills TEXT[],               -- extraídas do CV pela IA
  cv_url TEXT,                 -- URL do arquivo no Supabase Storage
  doc_url TEXT,                -- URL do comprovante de formação
  doc_status TEXT DEFAULT 'pendente',  -- 'pendente' | 'aprovado' | 'reprovado'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vagas captadas automaticamente
CREATE TABLE vagas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  empresa TEXT,
  localidade TEXT,
  regime TEXT,                 -- 'CLT' | 'PJ' | 'remoto'
  salario_min NUMERIC,
  salario_max NUMERIC,
  descricao TEXT,
  skills_exigidas TEXT[],
  nivel TEXT,
  fonte TEXT,                  -- 'jooble' | 'adzuna' | 'remotive' | 'the_muse' | 'sine'
  url_original TEXT,
  amigavel_imigrante BOOLEAN DEFAULT FALSE,
  area TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Candidaturas
CREATE TABLE aplicacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  vaga_id UUID REFERENCES vagas(id),
  score_compatibilidade NUMERIC,   -- 0.00 a 100.00
  status TEXT DEFAULT 'enviada',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Integração com IA

### Extração de CV (OpenAI GPT-4o-mini ou Claude Haiku)
- **Custo estimado:** ~$0.01 por CV (GPT-4o-mini: $0.15/1M tokens input)
- **Prompt usado para extração:**
  ```
  Extraia os dados do currículo abaixo em formato JSON com os campos:
  nome, email, telefone, formacao (array), experiencias (array), skills (array), idiomas (array)
  ```

### Filtro de Vagas (Claude Haiku ou GPT-3.5-turbo)
- Roda no cron job a cada 6h
- Analisa cada vaga nova e adiciona flag `amigavel_imigrante`

---

## Deploy

| Serviço | Uso | Custo |
|---------|-----|-------|
| **Vercel** | Frontend Next.js | Gratuito (100GB bandwidth/mês) |
| **Railway** | Backend Node.js | Gratuito ($5 crédito/mês) |
| **Supabase** | PostgreSQL + Storage | Gratuito (free tier) |
| **OpenAI** | Extração de CV | ~$5 crédito inicial gratuito |

**Custo total do protótipo: R$ 0 / mês** (dentro dos free tiers)
