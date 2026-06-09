# 🚀 SETUP — IMIGRA.AI

## ✅ Projeto Clonado com Sucesso!

Seu projeto está em: **`F:\.Trabalho\job-matching-platform`**

---

## 📁 Estrutura

```
job-matching-platform/
├── README.md                    ← Visão geral do projeto
├── SETUP-COMPLETO.md            ← Documentação de setup
├── docs/                        ← Documentação completa (16 arquivos)
├── prototipo-mvp/               ← Código do projeto
│   ├── backend/                 ← API REST (Express.js)
│   ├── frontend/                ← App web (Next.js + React)
│   └── SETUP.md
└── planejamento-prototipo/      ← Documentação de planejamento
```

---

## 🛠️ Setup Local

### 1️⃣ Backend (Node.js + Express)

```bash
cd F:\.Trabalho\job-matching-platform\prototipo-mvp\backend

# Instalar dependências
npm install

# Criar arquivo .env (copia o exemplo)
# Editar com suas credenciais:
# - SUPABASE_URL
# - SUPABASE_KEY
# - OPENAI_API_KEY

# Rodar dev server
npm run dev
```

**Porta:** `http://localhost:5000`

### 2️⃣ Frontend (Next.js + React)

```bash
cd F:\.Trabalho\job-matching-platform\prototipo-mvp\frontend

# Instalar dependências
npm install

# Rodar dev server
npm run dev
```

**Porta:** `http://localhost:3000`

---

## 📋 O que você vai rodar

### Backend:
- ✅ API REST com 40+ endpoints
- ✅ Integração com Supabase (PostgreSQL)
- ✅ Matching com IA (OpenAI)
- ✅ Autenticação JWT

### Frontend:
- ✅ App web em Next.js
- ✅ Dashboard de vagas
- ✅ Chat com IA
- ✅ Perfil de usuário
- ✅ Comunidades

---

## 🔑 Variáveis de Ambiente

Você vai precisar de:

1. **Supabase** (gratuito)
   - URL do banco de dados
   - Chave da API

2. **OpenAI** (opcional, tem free tier)
   - API Key

### Criar arquivo `.env.local` no backend:

```env
# Backend (.env)
PORT=5000
NODE_ENV=development

# Supabase
SUPABASE_URL=sua_url_aqui
SUPABASE_KEY=sua_chave_aqui

# OpenAI
OPENAI_API_KEY=sua_chave_aqui

# JWT
JWT_SECRET=sua_chave_secreta_aqui
```

---

## 🚀 Rodar Tudo (Opção Fácil)

### Terminal 1 - Backend:
```bash
cd F:\.Trabalho\job-matching-platform\prototipo-mvp\backend
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd F:\.Trabalho\job-matching-platform\prototipo-mvp\frontend
npm run dev
```

Depois acesse:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

---

## 📚 Documentação

Leia nesta ordem:

1. **README.md** - Visão geral
2. **docs/00-OVERVIEW.md** - Overview completo
3. **docs/01-PROJECT.md** - Problema + Solução
4. **docs/04-ARCHITECTURE.md** - Arquitetura técnica
5. **docs/07-DATABASE.md** - Schema SQL
6. **docs/08-API.md** - Endpoints da API

---

## ✨ Stack Tecnológico

| Componente | Tecnologia | Custo |
|---|---|---|
| Frontend | Next.js + React | Gratuito |
| Backend | Node.js + Express | Gratuito |
| Banco | PostgreSQL + Supabase | Gratuito |
| IA | OpenAI API | ~R$ 50/mês |
| Deploy | Railway | Gratuito |

**Total:** R$ 0-50/mês 💰

---

## 🔧 Troubleshooting

### "npm install falhou"
```bash
# Limpar cache
npm cache clean --force

# Tentar novamente
npm install
```

### "Porta 3000/5000 já está em uso"
```bash
# Matar o processo
# No Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### ".env não reconhecido"
- Certifique-se de criar o arquivo `.env` na raiz do backend
- Reinicie o dev server depois

---

## 📞 Próximos Passos

1. ✅ Clone o projeto → **FEITO!**
2. ⏳ Instale dependências → **EM ANDAMENTO**
3. ⏳ Configure `.env`
4. ⏳ Rode backend + frontend
5. ⏳ Acesse http://localhost:3000

---

## 🎯 O Projeto

**IMIGRA.AI** ajuda imigrantes a encontrar oportunidades de emprego com:

- 🧠 Matching inteligente com IA
- 👥 Comunidade de suporte
- 📋 Guia de documentação
- 💬 Chat com IA

**Status:** Em planejamento (Fase 1 concluída ✅)

---

**Criado:** 8 de Junho de 2026

Qualquer dúvida, leia a documentação em `/docs`!
