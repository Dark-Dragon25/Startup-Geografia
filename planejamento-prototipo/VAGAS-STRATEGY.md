# Estratégia de Captação de Vagas — Sistema 100% Autônomo

## Princípio Central

O sistema **nunca depende de intervenção manual** para ter vagas. Um cron job roda automaticamente a cada 6 horas, busca vagas em múltiplas fontes, deduplica, filtra com IA e armazena no banco.

```
┌─────────────────────────────────────────────────────────────┐
│                   CRON JOB (a cada 6h)                      │
│                                                             │
│  ┌───────────┐  ┌───────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Jooble   │  │  Adzuna   │  │ Remotive │  │ The Muse │  │
│  │   API     │  │   API     │  │   API    │  │   API    │  │
│  └─────┬─────┘  └─────┬─────┘  └────┬─────┘  └────┬─────┘  │
│        │              │              │              │         │
│        └──────────────┴──────────────┴──────────────┘         │
│                              │                               │
│                    ┌─────────▼──────────┐                    │
│                    │   Deduplicação     │                    │
│                    │ (título+empresa+   │                    │
│                    │  localidade)       │                    │
│                    └─────────┬──────────┘                    │
│                              │                               │
│                    ┌─────────▼──────────┐                    │
│                    │  Filtro por IA     │                    │
│                    │  (relevância para  │                    │
│                    │   imigrantes)      │                    │
│                    └─────────┬──────────┘                    │
│                              │                               │
│                    ┌─────────▼──────────┐                    │
│                    │   Banco de Dados   │                    │
│                    │   PostgreSQL       │                    │
│                    └────────────────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Fonte 1 — Jooble API

- **O que é:** Maior agregador de vagas do mundo (~140 países, incluindo Brasil)
- **Custo:** Gratuito para publishers (requer cadastro em jooble.org/api)
- **Limite:** Não especificado publicamente, estimado 500-1000 req/dia
- **Cobertura BR:** Excelente — agrega Catho, Vagas.com.br, Emprego.com.br

### Como usar
```javascript
const response = await axios.post('https://br.jooble.org/api/{API_KEY}', {
  keywords: "engenheiro",
  location: "São Paulo",
  page: 1
});
// Retorna: title, company, location, salary, snippet, link
```

### Queries planejadas (rotação automática)
- "engenheiro civil São Paulo"
- "médico Rio de Janeiro"
- "professor educação"
- "desenvolvedor remoto"
- "administrador empresa"
- "designer gráfico"
- "enfermeiro hospital"
- "arquiteto projeto"

---

## Fonte 2 — Adzuna API

- **O que é:** Agregador global com forte presença no Brasil
- **Custo:** Free tier — 250 req/dia (plano gratuito após cadastro em developer.adzuna.com)
- **Endpoint BR:** `https://api.adzuna.com/v1/api/jobs/br/search/1`
- **Campos retornados:** title, description, company.display_name, location, salary_min, salary_max, redirect_url

### Como usar
```javascript
const response = await axios.get(
  'https://api.adzuna.com/v1/api/jobs/br/search/1', {
  params: {
    app_id: process.env.ADZUNA_APP_ID,
    app_key: process.env.ADZUNA_API_KEY,
    results_per_page: 50,
    what: "engenheiro",
    where: "São Paulo"
  }
});
```

---

## Fonte 3 — Remotive API

- **O que é:** Agregador de vagas remotas globais
- **Custo:** 100% gratuito, sem chave de API necessária
- **Endpoint:** `https://remotive.com/api/remote-jobs`
- **Relevância:** Vagas remotas são ideais para imigrantes (sem barreira geográfica)

### Como usar
```javascript
const response = await axios.get('https://remotive.com/api/remote-jobs', {
  params: {
    category: 'software-dev', // ou 'design', 'marketing', etc.
    limit: 100
  }
});
```

### Categorias disponíveis
- software-dev, devops-sysadmin
- design, marketing
- business, finance
- customer-support, writing

---

## Fonte 4 — The Muse API

- **O que é:** Plataforma de vagas com foco em cultura de empresa
- **Custo:** Free, sem autenticação para leitura
- **Endpoint:** `https://www.themuse.com/api/public/jobs`
- **Nota:** Vagas principalmente em inglês, úteis para imigrantes com fluência

### Como usar
```javascript
const response = await axios.get('https://www.themuse.com/api/public/jobs', {
  params: {
    page: 0,
    descended: true
  }
});
```

---

## Fonte 5 — Portais Governamentais Brasileiros (Scraping Legítimo)

Portais públicos federais cujos dados são de domínio público por lei:

### SINE Digital (sine.mte.gov.br)
- Sistema Nacional de Emprego — vagas formais com carteira assinada
- Possui API REST não documentada publicamente, mas acessível
- Endpoint descoberto: `https://empregabrasil.mte.gov.br/76/pesquisar-vagas/`

### Emprega Brasil
- Portal do Ministério do Trabalho
- RSS feed disponível: `https://empregabrasil.mte.gov.br/feed/`
- Pode ser parseado com biblioteca `rss-parser`

```javascript
const Parser = require('rss-parser');
const parser = new Parser();
const feed = await parser.parseURL('https://empregabrasil.mte.gov.br/feed/');
// Retorna vagas governamentais e formais
```

---

## Algoritmo de Deduplicação

Antes de inserir no banco, verifica se a vaga já existe:

```javascript
function gerarHashVaga(vaga) {
  const chave = `${vaga.titulo.toLowerCase()}_${vaga.empresa?.toLowerCase()}_${vaga.localidade?.toLowerCase()}`;
  return crypto.createHash('md5').update(chave).digest('hex');
}

// Só insere se o hash não existir no banco
const existe = await db.query('SELECT id FROM vagas WHERE hash = $1', [hash]);
if (!existe.rows.length) {
  await db.query('INSERT INTO vagas (...) VALUES (...)', [...]);
}
```

---

## Filtro de IA — Relevância para Imigrantes

Após deduplicação, cada vaga nova passa por um prompt de IA:

```
Analise a vaga abaixo e responda em JSON:
{
  "amigavel_imigrante": true/false,
  "motivo": "...",
  "area": "saude|engenharia|educacao|tecnologia|administracao|design|outro",
  "nivel": "junior|pleno|senior|nao_especificado"
}

Uma vaga é "amigável para imigrante" se:
- NÃO exige registro profissional brasileiro como pré-requisito absoluto
- NÃO menciona "somente brasileiros natos"
- Aceita candidatos com diplomas estrangeiros (ou não menciona restrições)

Vaga: {titulo} | {empresa} | {descricao}
```

**Custo estimado:** GPT-4o-mini custa ~$0.15/1M tokens. Para 500 vagas/dia × ~200 tokens = 100K tokens = ~$0.015/dia = ~$0.45/mês.

---

## Volume Esperado de Vagas

| Fonte | Vagas Novas/Dia (estimativa) | Após Filtro IA |
|-------|------------------------------|----------------|
| Jooble | 200-500 | 80-150 |
| Adzuna | 100-200 | 40-80 |
| Remotive | 20-50 | 15-40 |
| The Muse | 10-30 | 5-15 |
| Portais Gov | 50-100 | 40-80 |
| **Total** | **380-880/dia** | **180-365/dia** |

Após 1 semana: banco com **1.200 a 2.500 vagas únicas** — volume mais que suficiente para matching.

---

## Evolução Futura

### Fase 2 — Crowdsourcing
- Usuários cadastrados submetem vagas que encontraram
- Sistema de moderação por admin
- Pontos de reputação para usuários que submitam vagas verificadas

### Fase 3 — Parcerias Diretas
- Contato com empresas com programas de diversidade e inclusão:
  - Magazine Luiza (programa Diversidade)
  - iFood (contrata refugiados)
  - Cacau Show (programa de imigrantes)
  - Missão Paz (ONG SP com vagas exclusivas)
- Vagas "certificadas" com badge especial

### Fase 4 — API Própria para Empresas
- Empresas parceiras publicam vagas diretamente no IMIGRA.AI
- Modelo SaaS: cobrar por destaque/vaga publicada
