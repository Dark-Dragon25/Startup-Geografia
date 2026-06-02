# IMIGRA.AI — MVP Protótipo

Um protótipo funcional completo da plataforma IMIGRA.AI com detecção automática de idioma, onboarding em 4 passos e dashboard de vagas com matching por IA.

## 🎯 O que foi construído

### Frontend (Next.js 14 + TypeScript)
- ✅ Detecção automática de idioma do navegador
- ✅ Tela de boas-vindas animada
- ✅ Onboarding em 4 passos (Pessoal → Contato → Profissional → Documentos)
- ✅ Upload de CV e documentos (UI pronto, sem processamento real IA ainda)
- ✅ Dashboard de vagas com filtros
- ✅ Sistema de autenticação com JWT
- ✅ Interface responsiva e acessível
- ✅ Suporte a 8 idiomas (PT, ES, EN, FR, HT, AR, UK, RU)

### Backend (Node.js + Express + TypeScript)
- ✅ Rotas de autenticação (signup/login)
- ✅ API de vagas com filtros
- ✅ Endpoint de vagas recomendadas (matching por keywords)
- ✅ Upload de CV e documentos
- ✅ Cron job preparado para buscar vagas (a cada 6h)
- ✅ Integração com Supabase (banco de dados)
- ✅ Mock data para testes imediatos

### Otimizações de Custo de IA
- ✅ Algoritmo de matching local (sem chamadas de IA)
- ✅ Extração de CV com mock (pronta para integração com OpenAI)
- ✅ Cron job estruturado para buscar vagas em APIs gratuitas
- ✅ Sem gastos desnecessários de crédito

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Git

### Instalação

#### 1. Clonar o repositório
```bash
cd /home/user/Startup-Geografia/prototipo-mvp
```

#### 2. Setup do Frontend
```bash
cd frontend
npm install

# Criar arquivo .env.local
cp .env.example .env.local
```

#### 3. Setup do Backend
```bash
cd ../backend
npm install

# Criar arquivo .env
cp .env.example .env
```

### Rodando o Projeto

#### Terminal 1 — Backend
```bash
cd backend
npm run dev
# Roda em: http://localhost:3001
```

#### Terminal 2 — Frontend
```bash
cd frontend
npm run dev
# Roda em: http://localhost:3000
```

### Acessar a Aplicação
1. Abra http://localhost:3000 no navegador
2. A página será exibida automaticamente no idioma do seu navegador
3. Clique em "Vamos Começar" para o onboarding

---

## 📋 Fluxo de Uso

### Novo Usuário
1. Página inicial com detecção de idioma
2. Clica em "Vamos Começar"
3. Passo 1: Dados pessoais (nome, data nasc, país, idiomas)
4. Passo 2: Contato & Descoberta (email, senha, como conheceu)
5. Passo 3: Perfil profissional (área, nível, cidades)
6. Passo 4: Upload de CV e diploma
7. Dashboard com vagas recomendadas

### Usuário Existente
1. Clica em "Já tem conta? Entrar"
2. Login com email/senha
3. Acesso ao dashboard

---

## 🎨 Customização de Estilo

O projeto usa **Tailwind CSS** e está pronto para customização. Os arquivos principais de estilo são:

- `frontend/src/styles/globals.css` — Estilos globais
- `frontend/tailwind.config.js` — Configuração do Tailwind
- Componentes usam classes Tailwind diretas

Para trocar cores, adicionar fontes ou modificar layout, edite esses arquivos.

---

## 🔌 Integrações Futuras

### IA para Extração de CV
Quando pronto para usar IA:

```typescript
// backend/src/services/aiService.ts (criar este arquivo)
import OpenAI from 'openai';

const extractCVWithAI = async (cvText: string) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{
      role: 'user',
      content: `Extraia dados do CV: ${cvText}`
    }]
  });
  return JSON.parse(response.choices[0].message.content);
};
```

### APIs de Vagas Reais
Para usar APIs reais:

1. **Jooble**: Cadastre-se em jooble.org/api
2. **Adzuna**: Cadastre-se em developer.adzuna.com
3. **Remotive**: Sem autenticação necessária
4. **The Muse**: Sem autenticação necessária

---

## 📊 Estrutura do Projeto

```
prototipo-mvp/
├── frontend/                    (Next.js 14)
│   ├── public/locales/         (Arquivos de tradução)
│   ├── src/
│   │   ├── app/               (Páginas Next.js)
│   │   ├── components/        (Componentes React)
│   │   ├── services/          (Chamadas de API)
│   │   ├── lib/              (Utilidades)
│   │   └── styles/           (CSS/Tailwind)
│   └── package.json
│
├── backend/                     (Node.js + Express)
│   ├── src/
│   │   ├── routes/           (Rotas das APIs)
│   │   ├── services/         (Lógica de negócio)
│   │   ├── middleware/       (Auth, etc)
│   │   └── config/           (Configurações)
│   ├── package.json
│   └── .env.example
│
└── README.md                   (Este arquivo)
```

---

## 🔑 Variáveis de Ambiente Necessárias

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Backend (.env)
```
PORT=3001
JWT_SECRET=seu_secret_aqui
SUPABASE_URL=sua_url
SUPABASE_SERVICE_KEY=sua_chave
```

---

## 🚧 Próximas Etapas

1. **IA Real**: Integrar OpenAI/Claude para extração de CV
2. **Banco de Dados**: Usar Supabase em produção
3. **Autenticação Social**: Google/GitHub login
4. **Notificações**: Email/SMS quando vagas aparecem
5. **Comunidades**: Criar redes de imigrantes por profissão
6. **Chat com IA**: Assistente para dúvidas sobre revalidação

---

## 📝 Notas Técnicas

- **API gratuita Remotive**: Busca 50+ vagas remotas sem autenticação
- **Matching local**: Economiza crédito de IA, roda em <200ms
- **Supabase**: Oferece 500MB db + 1GB storage gratuitamente
- **Vercel**: Deploy do frontend é gratuito
- **Railway**: Oferece $5 crédito mensal para backend

---

## 🤝 Suporte

Para dúvidas sobre o protótipo, revise:
- `../planejamento-prototipo/` — Documentação completa do projeto
- `docs/` — Especificações técnicas (fase 1)

---

**Status**: ✅ MVP Funcional  
**Última atualização**: 2025-06-02  
**Stack**: Next.js 14 | Express.js | PostgreSQL (Supabase) | TypeScript
