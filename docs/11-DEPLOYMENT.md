# 🚀 DEPLOYMENT — IMIGRA.AI

## 🎯 Objetivo

Documentar como fazer deploy do IMIGRA.AI (backend, frontend, database) em ambiente de produção 100% gratuito.

---

## 📋 CHECKLIST PRÉ-DEPLOYMENT

- [ ] Todas as variáveis de ambiente configuradas
- [ ] Banco de dados migrado
- [ ] Testes passando (cobertura > 70%)
- [ ] Build de produção validado
- [ ] Secrets não commitados (.env em .gitignore)
- [ ] SSL/HTTPS configurado
- [ ] Rate limiting ativo
- [ ] Logs configurados

---

## 🗄️ BANCO DE DADOS (PostgreSQL + Railway)

### 1. Criar Conta Railway

```bash
# Acessar https://railway.app
# Fazer login com GitHub
# Criar novo projeto
```

### 2. Adicionar PostgreSQL

```bash
# No dashboard Railway:
# + New → Add from template → PostgreSQL
```

### 3. Conectar Banco de Dados

```bash
# Railway fornece URL de conexão:
postgresql://user:password@host:port/database
```

### 4. Executar Migrações

```bash
# Adicionar arquivo .env com DATABASE_URL
DATABASE_URL=postgresql://user:password@host:5432/imigra_ai

# Executar migrations
npm run migrate

# Seed dados de teste
npm run seed
```

### 5. Backup

```bash
# Backup automático (Railway faz diariamente)

# Backup manual
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

---

## 🖥️ BACKEND (Node.js + Express)

### 1. Preparar Código

```bash
# Remover console.logs de debug
# Configurar logger (Winston)
# Verificar variáveis de ambiente

# .env.example
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://...
JWT_SECRET=super_secret_key_aqui
OPENAI_API_KEY=sk-...
```

### 2. Deploy em Railway

```bash
# Instalação da CLI
npm install -g @railway/cli

# Login
railway login

# Dentro do projeto backend/
railway init

# Conectar variáveis de ambiente
railway variables

# Deploy automático
git push origin main
# Railway detecta package.json e faz deploy

# Ou deploy manual
railway deploy
```

### 3. Verificar Deploy

```bash
# Ver logs
railway logs

# Ver status
railway status

# Testar endpoint
curl https://seu-api.railway.app/api/health

# Deve retornar:
# {"status": "ok", "timestamp": "2024-05-19T16:00:00Z"}
```

### 4. Configurar Variáveis de Ambiente

```bash
# No dashboard Railway > Variables
NODE_ENV=production
PORT=3000
DATABASE_URL=[URL do PostgreSQL]
JWT_SECRET=seu_secret_aleatorio
JWT_EXPIRE=7d
OPENAI_API_KEY=sk-...
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

### 5. Health Check

```javascript
// backend/src/routes/health.js
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});
```

---

## 📱 FRONTEND (React Native + Expo)

### 1. Preparar Build

```bash
# Remover console.logs
# Configurar API URL de produção
# Otimizar imagens

# .env.production
API_URL=https://seu-api.railway.app
ENVIRONMENT=production
```

### 2. Gerar APK (Android)

```bash
# Usando EAS Build
eas build --platform android

# Ou localmente
cd android && ./gradlew bundleRelease

# Arquivo: android/app/build/outputs/...
```

### 3. Gerar IPA (iOS)

```bash
# Usando EAS Build
eas build --platform ios

# Agendar na App Store Connect
```

### 4. Submeter para App Stores

```bash
# Android: Google Play Console
# - Upload do APK
# - Screenshots
# - Descrição
# - Rating
# - Publicar

# iOS: App Store Connect
# - Upload do IPA
# - Screenshots
# - Descrição
# - Avaliação de conteúdo
# - Aguardar aprovação (24-48h)
```

---

## 🌐 CONFIGURAÇÃO DO DOMÍNIO (Gratuito)

### Opção 1: Subdomain Railway

```
Seu API: api.seu-projeto.railway.app (já configurado)
```

### Opção 2: Domínio Personalizado Gratuito

```bash
# Usar no-ip.com (gratuito)
# 1. Criar conta
# 2. Adicionar hostname: seu-api.no-ip.org
# 3. Configurar railway para apontar

# Ou: Railway pode configurar domain personalizado
# Railway > Settings > Domains > Add custom domain
```

---

## 🔐 SSL/HTTPS

```bash
# Railway fornece HTTPS automático
https://seu-api.railway.app

# Certificado: Let's Encrypt (automático)
# Renovação: Automática a cada 3 meses

# Testar SSL
curl -I https://seu-api.railway.app
# Verificar Status: 200
# Verificar Header: Strict-Transport-Security
```

---

## 📊 MONITORAMENTO

### Logs

```bash
# Ver logs em tempo real
railway logs --follow

# Exportar logs
railway logs > app.log

# Analisar erros
grep "ERROR" app.log | wc -l
```

### Saúde da App

```javascript
// Adicionar endpoint de status
app.get('/api/status', async (req, res) => {
  const dbHealth = await checkDatabaseConnection();
  const aiHealth = await checkOpenAIConnection();
  
  res.json({
    status: dbHealth && aiHealth ? 'ok' : 'degraded',
    database: dbHealth ? 'ok' : 'error',
    ia: aiHealth ? 'ok' : 'error',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
```

### Alertas

```bash
# Configurar alertas Railway
# Settings > Notifications
# Email quando: deploy falha, erro crítico, etc.
```

---

## 🔄 CONTINUOUS DEPLOYMENT

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
      - run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install -g @railway/cli
      - run: railway deploy
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## 📱 DEPLOY FRONTEND (Expo)

### Build Automático

```bash
# Usando EAS
eas build --platform all --auto-submit

# Configuração: eas.json
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "buildType": "ipa"
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccount": "@credentials.json"
      },
      "ios": {
        "appleId": "seu-email@apple.com"
      }
    }
  }
}
```

---

## 🧪 TESTE DE PRODUÇÃO

### Checklist Pós-Deploy

```bash
# 1. Health check
curl https://seu-api.railway.app/api/health

# 2. Login
curl -X POST https://seu-api.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

# 3. Buscar vagas
curl https://seu-api.railway.app/api/vagas?page=1

# 4. Chat com IA
curl -X POST https://seu-api.railway.app/api/chat/message \
  -H "Authorization: Bearer {token}" \
  -d '{"mensagem":"Como revalidar diploma?"}'

# 5. Verificar performance
curl -w "@curl-format.txt" https://seu-api.railway.app/api/health

# curl-format.txt:
# time_connect: %{time_connect}
# time_total: %{time_total}
```

---

## 🚨 TROUBLESHOOTING

### Erro: DATABASE_URL não encontrada

```bash
# Solução: Adicionar variável em Railway
railway variables
DATABASE_URL=postgresql://...
```

### Erro: CORS na requisição

```bash
# Solução: Configurar CORS no backend
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
```

### Erro: Timeout na IA

```bash
# Solução: Aumentar timeout e adicionar retry
const response = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [...],
  timeout: 30000 // 30 segundos
}, { timeout: 30000 });

// Com retry
async function comRetry(fn, tentativas = 3) {
  for (let i = 0; i < tentativas; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === tentativas - 1) throw error;
      await delay(1000 * (i + 1));
    }
  }
}
```

---

## 📈 ESCALABILIDADE FUTURA

### Quando crescer:

```
1. Separar banco de dados (já em Railway)
2. Cache com Redis (Railway oferece)
3. CDN para imagens (Cloudflare free)
4. Load balancer (Railway gerencia)
5. Message queue (RabbitMQ) para jobs pesados
```

---

## 💰 CUSTO TOTAL (Produção Gratuita)

| Serviço | Custo | Limite |
|---|---|---|
| Railway (API + DB) | R$ 0 | 5 USD/mês |
| OpenAI API | R$ 0-50 | Pay-as-you-go |
| Expo Build | R$ 0 | 30 builds/mês |
| Domain (no-ip) | R$ 0 | Ilimitado |
| **TOTAL** | **R$ 0-50** | **Ótimo!** |

---

**Versão:** 1.0  
**Status:** ✅ Deployment Documentado  
**Próximo:** Testes
