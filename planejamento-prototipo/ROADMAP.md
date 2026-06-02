# Roteiro de Implementação — Protótipo IMIGRA.AI

## Visão Geral (4 Semanas)

```
Semana 1: Frontend base + detecção de idioma + onboarding (mock)
Semana 2: Backend + banco de dados + upload de arquivos + extração de CV por IA
Semana 3: Cron job de vagas + algoritmo de matching + dashboard
Semana 4: Polimento, testes com usuários reais e deploy
```

---

## Semana 1 — Frontend Base

### Objetivo
Ter o site funcionando com detecção de idioma e o fluxo de onboarding completo, mesmo que sem backend real (dados mockados).

### Tarefas

#### Setup do Projeto
- [ ] Criar projeto Next.js 14: `npx create-next-app@latest prototipo-web --typescript --tailwind --app`
- [ ] Instalar dependências: `react-i18next`, `next-i18next`, `framer-motion`, `react-dropzone`, `shadcn/ui`
- [ ] Estruturar pastas: `src/app`, `src/components`, `src/lib`, `public/locales`
- [ ] Configurar Tailwind com paleta de cores do IMIGRA.AI

#### Arquivos de Tradução (8 idiomas)
- [ ] `public/locales/pt/common.json`
- [ ] `public/locales/es/common.json`
- [ ] `public/locales/en/common.json`
- [ ] `public/locales/fr/common.json`
- [ ] `public/locales/ht/common.json`
- [ ] `public/locales/ar/common.json` (com suporte RTL)
- [ ] `public/locales/uk/common.json`
- [ ] `public/locales/ru/common.json`

#### Tela de Boas-Vindas
- [ ] Componente `WelcomeScreen.tsx` com:
  - Logo IMIGRA.AI
  - Mensagem de boas-vindas no idioma detectado (aparece instantaneamente)
  - Animação suave de entrada (framer-motion)
  - Botão "Vamos Começar" (ou tradução equivalente)
  - Link "Já tenho conta"
- [ ] Hook `useLanguageDetect.ts`: lê `navigator.language`, mapeia para idiomas suportados, fallback para EN

#### Onboarding Wizard (4 passos — dados mockados)
- [ ] Componente `OnboardingWizard.tsx` com barra de progresso
- [ ] `Step1PersonalData.tsx` — formulário com validação
- [ ] `Step2ContactDiscovery.tsx` — e-mail, senha, como descobriu
- [ ] `Step3ProfessionalProfile.tsx` — área, nível, cidade
- [ ] `Step4DocumentUpload.tsx` — drag-and-drop (sem backend ainda, só UI)
- [ ] Navegação entre passos (voltar/próximo) com validação por passo

### Entregável da Semana 1
Site rodando localmente com detecção de idioma e onboarding completo. Dados são perdidos ao fechar (sem banco).

---

## Semana 2 — Backend + Banco + IA no Upload

### Objetivo
Conectar o frontend ao backend real, salvar usuários no banco e processar CV/documentos com IA.

### Tarefas

#### Setup do Backend
- [ ] Inicializar projeto Node.js: `npm init`, instalar `express`, `jsonwebtoken`, `bcryptjs`, `cors`, `multer`, `node-cron`, `axios`, `pdf-parse`, `openai`
- [ ] Configurar Supabase: criar projeto em supabase.com, criar tabelas `usuarios`, `vagas`, `aplicacoes`
- [ ] Configurar Supabase Storage: criar bucket `curriculos` e bucket `documentos` (privados)
- [ ] Variáveis de ambiente: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `OPENAI_API_KEY`, `JWT_SECRET`

#### APIs de Autenticação
- [ ] `POST /api/auth/signup` — cria usuário, hash da senha, retorna JWT
- [ ] `POST /api/auth/login` — valida credenciais, retorna JWT
- [ ] Middleware de autenticação para rotas protegidas

#### Upload de Arquivos
- [ ] `POST /api/cv/upload`:
  1. Recebe PDF/DOCX via multipart
  2. Converte para texto (`pdf-parse` ou `mammoth`)
  3. Envia texto para OpenAI com prompt de extração
  4. Retorna JSON com dados extraídos
  5. Salva arquivo no Supabase Storage
  6. Atualiza `cv_url` e `skills` do usuário no banco
- [ ] `POST /api/docs/upload`:
  1. Recebe imagem/PDF
  2. Envia para OpenAI com visão (se imagem) ou converte para imagem (se PDF)
  3. Extrai informações do documento
  4. Salva no Storage, atualiza `doc_url` e `doc_status = 'pendente'` no banco

#### Conectar Frontend ao Backend
- [ ] Configurar Axios no Next.js com base URL do backend
- [ ] Step 2 do onboarding: chamar `POST /api/auth/signup` ao clicar em "Próximo"
- [ ] Step 4: chamar endpoints de upload ao selecionar arquivos
- [ ] Exibir dados extraídos pela IA para confirmação do usuário
- [ ] Armazenar JWT no localStorage e redirecionar após cadastro completo

### Entregável da Semana 2
Usuário consegue se cadastrar, fazer upload do CV, ver os dados extraídos pela IA e ter conta criada no banco de dados real.

---

## Semana 3 — Vagas + Matching + Dashboard

### Objetivo
Sistema buscando vagas automaticamente a cada 6 horas e exibindo recomendações personalizadas para o usuário.

### Tarefas

#### Cron Job de Vagas
- [ ] `services/vagasService.js`:
  - Função `buscarRemotive()` — chama `remotive.com/api/remote-jobs`
  - Função `buscarJooble(query, cidade)` — chama Jooble API
  - Função `buscarAdzuna(query, cidade)` — chama Adzuna API
  - Função `buscarTheMuse()` — chama The Muse API
  - Função `deduplicar(vagas)` — gera hash e filtra duplicatas
  - Função `filtrarComIA(vagas)` — batch de 10 vagas por requisição IA
- [ ] Registrar cron job: `cron.schedule('0 */6 * * *', buscarTodasVagas)`
- [ ] Criar queries de busca pré-definidas para áreas profissionais relevantes para imigrantes
- [ ] Popular banco com primeiras vagas (rodar cron job manualmente ao subir)

#### Algoritmo de Matching
- [ ] `services/matchingService.js`:
  - Função `calcularScore(usuario, vaga)` — retorna 0-100
  - Função `recomendarVagas(usuarioId, limit)` — busca vagas do banco, calcula score para todas, retorna top N
- [ ] `GET /api/vagas/recomendadas` — endpoint que chama `recomendarVagas`
- [ ] `GET /api/vagas` — listar todas as vagas com filtros (área, cidade, regime, nível)

#### Dashboard de Vagas
- [ ] Página `dashboard.tsx` (rota protegida — redireciona se não autenticado)
- [ ] Componente `JobCard.tsx`:
  - Título, empresa, localidade, regime
  - Badge de score com cor (verde/amarelo/laranja/cinza)
  - Botão "Ver Detalhes" → modal ou página de detalhe
  - Botão "Candidatar" → salva na tabela `aplicacoes`
- [ ] Filtros na lateral: área, cidade, regime de trabalho, score mínimo
- [ ] Loading state enquanto busca vagas
- [ ] Estado vazio com mensagem amigável se não houver vagas no perfil

### Entregável da Semana 3
Sistema completo: usuário se cadastra, faz upload de CV, e vê vagas reais recomendadas com score de compatibilidade personalizado.

---

## Semana 4 — Polimento + Deploy + Testes Reais

### Objetivo
Refinar a experiência, corrigir bugs encontrados nos testes e publicar o protótipo online.

### Tarefas

#### Testes com Usuários (5-10 pessoas)
- [ ] Recrutar 5-10 imigrantes reais ou estudantes de intercâmbio
- [ ] Sessões de teste com protocolo: observar sem interferir, anotar pontos de confusão
- [ ] Perguntas pós-teste: "O que foi mais difícil?", "As vagas parecem relevantes?", "Você usaria?"
- [ ] Ajustar UI/UX com base nos feedbacks (bugs críticos e UX blockers)

#### Polimento de UI
- [ ] Responsividade mobile: testar em iPhone e Android via browser
- [ ] Suporte RTL para árabe (configurar `dir="rtl"` no HTML quando idioma = AR)
- [ ] Estados de erro amigáveis (falha de rede, arquivo muito grande, formato inválido)
- [ ] Feedback visual após ações: toasts de sucesso/erro, spinners de loading
- [ ] Favicon, meta tags OG (para compartilhamento em redes sociais)

#### Deploy
- [ ] **Frontend → Vercel:**
  - Push do repositório para GitHub
  - Conectar repo na Vercel (vercel.com)
  - Configurar variáveis de ambiente no painel Vercel
  - Deploy automático a cada push na branch main
- [ ] **Backend → Railway:**
  - Criar projeto no railway.app
  - Conectar repo do backend
  - Configurar variáveis de ambiente
  - Domínio automático (ex: imigrai-api.railway.app)
- [ ] **Banco → Supabase:** já em produção desde a Semana 2

#### Verificação Final
- [ ] Testar em dispositivo com idioma configurado para ES → ver site em espanhol
- [ ] Completar onboarding de ponta a ponta em ambiente de produção
- [ ] Fazer upload de CV de teste e verificar extração pela IA
- [ ] Confirmar que vagas aparecem com scores variados
- [ ] Confirmar que cron job rodou e banco tem vagas

### Entregável da Semana 4
URL pública do protótipo, funcionando em qualquer dispositivo, com vagas reais e experiência multilíngue automática.

---

## Estrutura de Arquivos Final

```
/home/user/Startup-Geografia/
├── docs/                          (documentação Fase 1 — existente)
├── planejamento-prototipo/        (este planejamento)
├── prototipo-web/                 (código do protótipo — a criar)
│   ├── frontend/                  (Next.js 14)
│   │   ├── public/
│   │   │   └── locales/           (pt/, es/, en/, fr/, ht/, ar/, uk/, ru/)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── page.tsx       (boas-vindas)
│   │   │   │   ├── onboarding/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── dashboard/
│   │   │   │       └── page.tsx
│   │   │   ├── components/
│   │   │   │   ├── WelcomeScreen.tsx
│   │   │   │   ├── OnboardingWizard.tsx
│   │   │   │   ├── steps/
│   │   │   │   │   ├── Step1PersonalData.tsx
│   │   │   │   │   ├── Step2ContactDiscovery.tsx
│   │   │   │   │   ├── Step3ProfessionalProfile.tsx
│   │   │   │   │   └── Step4DocumentUpload.tsx
│   │   │   │   ├── JobCard.tsx
│   │   │   │   └── FileUpload.tsx
│   │   │   └── lib/
│   │   │       ├── i18n.ts
│   │   │       ├── api.ts
│   │   │       └── hooks/
│   │   │           └── useLanguageDetect.ts
│   │   ├── package.json
│   │   └── next.config.js
│   └── backend/                   (Node.js + Express)
│       ├── src/
│       │   ├── routes/
│       │   │   ├── auth.js
│       │   │   ├── vagas.js
│       │   │   ├── cv.js
│       │   │   └── docs.js
│       │   ├── services/
│       │   │   ├── aiService.js
│       │   │   ├── vagasService.js
│       │   │   └── matchingService.js
│       │   ├── middleware/
│       │   │   └── auth.js
│       │   ├── db/
│       │   │   └── supabase.js
│       │   └── cron/
│       │       └── vagasCron.js
│       ├── package.json
│       └── .env.example
└── README.md
```

---

## Métricas de Sucesso do Protótipo

| Métrica | Meta mínima |
|---------|------------|
| Tempo de detecção de idioma | < 100ms |
| Vagas no banco após 1 semana | 500+ vagas únicas |
| Tempo de extração do CV | < 5 segundos |
| Score de matching calculado | < 200ms |
| Taxa de conclusão do onboarding (testes) | > 70% |
| NPS dos usuários de teste | > 30 |
