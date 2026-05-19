# 🔧 STACK TECNOLÓGICO — IMIGRA.AI

## 🎯 Objetivo: 100% GRATUITO

Todo o stack foi escolhido para ser **100% gratuito** (com free tiers), permitindo desenvolvimento e até produção sem custos.

---

## 📱 FRONTEND (Mobile)

### React Native
```
Versão: Latest
Custo: Gratuito (Open Source)
Uso: Desenvolvimento do app iOS + Android simultâneos
```

**Por que React Native?**
- Um código para iOS e Android
- Performance boa para apps nativos
- Comunidade muito grande
- Fácil encontrar recursos

### Expo
```
Versão: Latest
Custo: Gratuito (com opções paid)
Uso: Build, emulação, e deployment
```

**Dependências principais:**
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-native": "^0.71.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "@react-native-async-storage/async-storage": "^1.17.0",
    "axios": "^1.3.0",
    "@reduxjs/toolkit": "^1.9.0",
    "react-redux": "^8.1.0",
    "react-native-image-picker": "^5.4.0",
    "react-native-vector-icons": "^9.2.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "@testing-library/react-native": "^11.5.0",
    "prettier": "^2.8.0",
    "eslint": "^8.0.0"
  }
}
```

### Ferramentas Dev:
- **Prettier** - Formatação de código (gratuito)
- **ESLint** - Linting (gratuito)
- **Jest** - Testes unitários (gratuito)

---

## 🖥️ BACKEND (Server)

### Node.js + Express.js
```
Versão: Node 18+ LTS
Custo: Gratuito (Open Source)
Uso: API REST para o app
```

**Dependências principais:**
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "pg": "^8.9.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "joi": "^17.9.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "axios": "^1.3.0",
    "openai": "^3.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "supertest": "^6.3.0",
    "nodemon": "^2.0.0",
    "prettier": "^2.8.0",
    "eslint": "^8.0.0"
  }
}
```

### Bibliotecas-Chave:
- **bcryptjs** - Hash seguro de senhas (gratuito)
- **jsonwebtoken** - Autenticação JWT (gratuito)
- **joi** - Validação de dados (gratuito)
- **cors** - Configuração CORS (gratuito)

---

## 💾 BANCO DE DADOS

### PostgreSQL
```
Versão: 14+
Custo: Gratuito
Deployment: Railway FREE TIER (5GB + 5 USD/mês gratuitos)
```

**Vantagens:**
- Open Source
- Muito confiável
- Suporta JSON nativo
- Ótimo para produção

**Ferramentas:**
- **pgAdmin** - Interface web (gratuito)
- **DBeaver** - IDE SQL (gratuito)
- **psycopg2** - Driver Python (gratuito)

---

## 🧠 INTELIGÊNCIA ARTIFICIAL

### OpenAI API
```
Modelo: GPT-3.5-turbo
Custo: ~$0.002 por 1K tokens (GPT-3.5)
Free Trial: $5 de crédito gratuito
```

**Uso no IMIGRA.AI:**
- Chat com IA sobre documentação
- Tradução de competências
- Recomendações de cursos

**Estimativa de Custo (MVP):**
- 100 usuários × 10 mensagens/mês = 1.000 requisições
- ~10K tokens/mês = ~$0.02/mês (negligenciável)

### Alternativa: Claude API (Anthropic)
```
Modelo: Claude 3 Haiku
Custo: Free tier para uso acadêmico
Vantagem: Melhor para textos longos
```

---

## 🌐 DEPLOYMENT (GRATUITO)

### Backend: Railway
```
Custo: FREE TIER (5 USD/mês gratuitos)
Limite: 500 horas/mês, até 5 GB armazenamento
Deploy: Git push automático
```

**Alternativas:**
- **Render.com** - FREE TIER com limitações
- **Heroku** - Pago (ex-free tier retirado)

### Frontend: EAS (Expo)
```
Custo: FREE TIER para builds
Limite: 30 builds/mês
Deploy: App stores (iOS + Android)
```

### Banco de Dados: Railway
```
Custo: Incluído no FREE TIER
Tipo: PostgreSQL
Limite: 5 GB
```

### Domain: Gratuito
```
Opção 1: Railway fornece subdomain gratuito
Opção 2: No-ip.com para DNS dinâmico (gratuito)
```

---

## 📊 Monitoramento e Logging (Gratuito)

### Winston
```
Biblioteca: winston
Custo: Gratuito (Open Source)
Uso: Log de eventos e erros
```

```javascript
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Sentry (Opcional)
```
Custo: FREE TIER (5.000 eventos/mês)
Uso: Error tracking em produção
```

---

## 🔧 Ferramentas de Desenvolvimento

### Git & GitHub
```
Custo: Gratuito
Uso: Versionamento, CI/CD básico
```

### Docker
```
Custo: Gratuito (Open Source)
Uso: Containerização local para desenvolvimento
```

**Dockerfile básico:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### VS Code
```
Custo: Gratuito
Extensões úteis:
- REST Client
- Thunder Client (teste de API)
- Prettier
- ESLint
```

---

## 🧪 Testes

### Jest
```
Custo: Gratuito (Open Source)
Uso: Testes unitários e integração
```

**Exemplo:**
```javascript
describe('matchingService', () => {
  it('should calculate score correctly', () => {
    const score = calculateScore(userProfile, jobRequirements);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});
```

### Supertest
```
Custo: Gratuito (Open Source)
Uso: Testes de API HTTP
```

---

## 📋 CI/CD (Gratuito)

### GitHub Actions
```
Custo: Gratuito para repositórios públicos
Uso: Testes automáticos, builds
```

**Workflow exemplo:**
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
```

---

## 📦 RESUMO DE CUSTOS (MVP)

| Serviço | Custo Mensal | Limite |
|---|---|---|
| **React Native** | R$ 0 | Ilimitado |
| **Node.js** | R$ 0 | Ilimitado |
| **PostgreSQL (Railway)** | R$ 0 | 5 GB |
| **Railway Deploy** | R$ 0 | 5 USD/mês |
| **OpenAI API** | R$ 0-10 | Pay-as-you-go |
| **Expo Build** | R$ 0 | 30 builds/mês |
| **GitHub** | R$ 0 | Ilimitado |
| **Firebase (opcional)** | R$ 0 | 100K reads/dia |
| **Sentry (opcional)** | R$ 0 | 5K events/mês |
| **TOTAL** | **R$ 0-50** | **Muito bom!** |

---

## 🎯 Stack Completo (Resumo Visual)

```
FRONTEND (Mobile)
├─ React Native (JS/TypeScript)
├─ Expo (build & emulation)
├─ Redux (state management)
├─ Jest (tests)
└─ Prettier + ESLint

BACKEND (Server)
├─ Node.js + Express (API)
├─ PostgreSQL (database)
├─ JWT (authentication)
├─ Jest + Supertest (tests)
└─ Winston (logging)

IA & ML
├─ OpenAI API (GPT-3.5-turbo)
├─ Matching Algorithm (JS)
└─ NLP processing

DEPLOYMENT
├─ Railway (backend + db)
├─ EAS/Expo (mobile builds)
├─ GitHub (versionamento)
└─ GitHub Actions (CI/CD)

FERRAMENTAS
├─ VS Code (editor)
├─ Docker (containerization)
├─ Postman/Thunder (API testing)
└─ DBeaver (database GUI)
```

---

## 🚀 Como Começar

### 1. Instalação Local:
```bash
# Node.js (https://nodejs.org)
# PostgreSQL (https://www.postgresql.org/download)
# Git (https://git-scm.com)
# VS Code (https://code.visualstudio.com)

# Clonar repositório
git clone https://github.com/seu-usuario/imigra-ai.git
cd imigra-ai

# Backend
cd backend
npm install
npm run dev

# Frontend (em outro terminal)
cd frontend
npm install
npm start
```

### 2. Deploy (Gratuito):
```bash
# Criar conta Railway (railway.app)
# Conectar GitHub
# Fazer push para main
# Railway automaticamente faz deploy
```

---

**Versão:** 1.0  
**Status:** ✅ Stack Definido  
**Custo Total:** **GRATUITO (R$ 0-50/mês)**  
**Próximo:** Database Schema
