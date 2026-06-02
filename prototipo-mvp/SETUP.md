# Setup do Protótipo MVP

## ✅ Checklist de Configuração

### Pré-requisitos
- [ ] Node.js 18+ instalado (`node --version`)
- [ ] npm ou yarn instalado
- [ ] Git instalado

### Frontend Setup

```bash
cd frontend

# 1. Instalar dependências
npm install

# 2. Criar arquivo de ambiente
cp .env.example .env.local

# 3. (Opcional) Configurar API URL em .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# 4. Rodar em desenvolvimento
npm run dev
```

✅ Frontend rodando em: http://localhost:3000

### Backend Setup

```bash
cd backend

# 1. Instalar dependências
npm install

# 2. Criar arquivo de ambiente
cp .env.example .env

# 3. Configurar variáveis em .env (obrigatório)
PORT=3001
JWT_SECRET=seu_secret_super_seguro_aqui_pode_ser_qualquer_string

# 4. (Opcional) Supabase
SUPABASE_URL=sua_url
SUPABASE_SERVICE_KEY=sua_chave

# 5. Rodar em desenvolvimento
npm run dev
```

✅ Backend rodando em: http://localhost:3001

---

## 🧪 Testes Rápidos

### Teste 1: Detecção de Idioma
1. Abra http://localhost:3000
2. Veja se a mensagem aparece em português (padrão)
3. Mude idioma do navegador para espanhol
4. Recarregue — deve aparecer em espanhol

### Teste 2: Fluxo de Onboarding
1. Clique "Vamos Começar"
2. Preencha Passo 1 (nome, data, país, idiomas)
3. Passe para Passo 2, 3, 4
4. Envie o formulário

**Esperado**: Redirect para dashboard (mesmo sem backend real)

### Teste 3: Dashboard de Vagas
1. Na tela do dashboard, veja mock data de 3 vagas
2. Clique em "Candidatar"
3. Veja resposta de sucesso

### Teste 4: API Backend
```bash
# Terminal com backend rodando
curl http://localhost:3001/health

# Esperado:
# {"status":"ok","timestamp":"2025-06-02T..."}
```

---

## 🛠 Estrutura Criada

### Frontend
```
frontend/
├── public/locales/          # 8 idiomas (PT, ES, EN, FR, HT, AR, UK, RU)
├── src/
│   ├── app/                 # Páginas: /, /onboarding, /dashboard, /login
│   ├── components/          # 10+ componentes React
│   ├── services/            # Serviço de API
│   ├── lib/                 # Helpers, i18n
│   └── styles/              # CSS Tailwind
├── tailwind.config.js
├── tsconfig.json
└── package.json (30+ dependências)
```

### Backend
```
backend/
├── src/
│   ├── routes/              # auth, jobs, cv
│   ├── services/            # matching, vagas, ai
│   ├── middleware/          # autenticação JWT
│   ├── config/              # Supabase
│   └── index.ts             # Servidor Express
├── tsconfig.json
└── package.json (15+ dependências)
```

### Documentação
```
planejamento-prototipo/
├── README.md                # Visão geral
├── TECH-STACK.md           # Stack técnico
├── ONBOARDING-FLOW.md      # Fluxo detalhado
├── VAGAS-STRATEGY.md       # APIs de vagas
├── AI-INTEGRATION.md       # Integração com IA
└── ROADMAP.md              # Roadmap 4 semanas
```

---

## 🎯 Funcionalidades Prontas

- ✅ Detecção automática de idioma
- ✅ Onboarding em 4 passos com validação
- ✅ Upload de arquivos (UI)
- ✅ Sistema de autenticação JWT
- ✅ Dashboard com vagas mock
- ✅ Algoritmo de matching por keywords
- ✅ Cron job estruturado para vagas
- ✅ Responsividade mobile
- ✅ 8 idiomas suportados
- ✅ API REST completa

---

## 🚀 Próximos Passos Recomendados

### Curto Prazo (Esta semana)
1. [ ] Rodar o projeto localmente
2. [ ] Testar fluxo de onboarding
3. [ ] Customizar cores/styling conforme desejar
4. [ ] Traduzir strings para todos os 8 idiomas

### Médio Prazo (Próximas 2 semanas)
1. [ ] Integrar Supabase (banco de dados real)
2. [ ] Conectar IA para extração de CV (OpenAI)
3. [ ] Buscar vagas reais em APIs (Remotive, Jooble)
4. [ ] Testes com usuários reais

### Longo Prazo (Mês 2)
1. [ ] Deploy em Vercel (frontend) + Railway (backend)
2. [ ] Email notifications para novas vagas
3. [ ] Comunidades de imigrantes
4. [ ] Chat com IA para dúvidas

---

## 💰 Custos Estimados

| Serviço | Plano | Custo |
|---------|-------|-------|
| Vercel | Free | R$ 0 |
| Railway | Free | R$ 0 (+ $5 crédito/mês) |
| Supabase | Free | R$ 0 (500MB db + 1GB storage) |
| OpenAI | Pay-as-you-go | ~$0.01/CV (começar com free tier) |
| Domínio | Opcional | ~R$ 50-100/ano |
| **Total** | | **R$ 0-50/mês** |

---

## 🆘 Troubleshooting

### Porta 3000/3001 já em uso
```bash
# Matar processo usando a porta
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### Módulos não encontrados
```bash
cd frontend && npm install
cd ../backend && npm install
```

### CORS Error
Verifique se `NEXT_PUBLIC_API_URL` em `.env.local` aponta para o backend correto.

### JWT Inválido
Certifique-se de que `JWT_SECRET` no backend é igual em todas as requisições.

---

## 📚 Recursos Adicionais

- **Documentação técnica**: Ver `../planejamento-prototipo/`
- **Especificações**: Ver `../docs/` (fase 1)
- **Traduções**: `frontend/public/locales/`
- **Componentes**: `frontend/src/components/`

---

**Última atualização**: 2025-06-02  
**Pronto para produção?**: Quase — faltam IA real e banco de dados
