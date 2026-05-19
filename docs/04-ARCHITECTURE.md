# 🏗️ ARQUITETURA TÉCNICA — IMIGRA.AI

## 🎯 Visão Geral

O IMIGRA.AI é um aplicativo mobile que funciona em arquitetura **Client-Server**:
- **Frontend:** App mobile (React Native)
- **Backend:** API REST com lógica de negócio (Node.js + Express)
- **Banco de dados:** PostgreSQL
- **Serviços externos:** OpenAI/Claude (IA), Indeed/SINE (vagas)

---

## 📊 DIAGRAMA ARQUITETÔNICO

```
┌─────────────────────────────────────────────────────────────┐
│                  DISPOSITIVOS DOS USUÁRIOS                  │
│  ┌──────────────┐              ┌──────────────┐            │
│  │  iOS App    │              │  Android App │            │
│  │ (React Native)              │ (React Native)            │
│  └──────────────┘              └──────────────┘            │
│         │                             │                     │
│         └──────────────┬──────────────┘                     │
│                        │ (HTTPS)                            │
└────────────────────────┼──────────────────────────────────┘
                         │
                         ↓
        ┌────────────────────────────────┐
        │    SERVIDOR (Backend)          │
        ├────────────────────────────────┤
        │                                │
        │  ┌──────────────────────────┐ │
        │  │   API Gateway            │ │
        │  │   (Node.js/Express)      │ │
        │  └──────────────────────────┘ │
        │           │                    │
        │  ┌────────┴─────────┐         │
        │  │                  │         │
        │  ↓                  ↓         │
        │ ┌──────────────┐  ┌────────┐ │
        │ │ Auth Service │  │ Vagas  │ │
        │ │              │  │Service │ │
        │ └──────────────┘  └────────┘ │
        │  │                            │
        │  ↓                            │
        │ ┌─────────────────────────┐  │
        │ │   Matching Engine       │  │
        │ │   (Algoritmo + IA)      │  │
        │ └─────────────────────────┘  │
        │                               │
        │  ┌─────────────────────────┐ │
        │  │   Comunidades Service   │ │
        │  │   (Posts, chat, etc)    │ │
        │  └─────────────────────────┘ │
        │                               │
        └────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ↓           ↓           ↓
    ┌────────┐ ┌─────────┐ ┌─────────┐
    │  Base  │ │ Redis   │ │ Arquivos│
    │   de   │ │ (Cache) │ │ (S3)    │
    │ Dados  │ └─────────┘ └─────────┘
    └────────┘
        │
        ↓
    ┌─────────────┐
    │ PostgreSQL  │
    └─────────────┘

┌─────────────────────────────────────────────────────────────┐
│               SERVIÇOS EXTERNOS (APIs)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐ │
│  │  Indeed  │  │  SINE    │  │ OpenAI / │  │ Google Maps│ │
│  │   API    │  │   API    │  │  Claude  │  │ (opcional) │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 📱 CAMADA MOBILE (Frontend)

### Tecnologia: **React Native**

**Vantagens:**
- ✓ Um código para iOS e Android
- ✓ Performance boa
- ✓ Comunidade grande
- ✓ Fácil de manter e escalar

### Estrutura de Pastas:

```
imigra-ai-app/
├── src/
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.js
│   │   │   └── SignupScreen.js
│   │   ├── profile/
│   │   │   └── ProfileScreen.js
│   │   ├── vagas/
│   │   │   ├── VagasScreen.js
│   │   │   ├── VagaDetailScreen.js
│   │   │   └── FiltersScreen.js
│   │   ├── comunidades/
│   │   │   ├── ComunidadesScreen.js
│   │   │   ├── ComunidadeFeedScreen.js
│   │   │   └── CreatePostScreen.js
│   │   ├── chat/
│   │   │   └── ChatScreen.js
│   │   ├── dashboard/
│   │   │   └── DashboardScreen.js
│   │   └── settings/
│   │       └── SettingsScreen.js
│   ├── components/
│   │   ├── VagaCard.js
│   │   ├── PostCard.js
│   │   ├── ChatMessage.js
│   │   ├── MatchScore.js
│   │   └── (outros componentes)
│   ├── services/
│   │   ├── api.js (chamadas HTTP)
│   │   ├── auth.js (login/logout)
│   │   └── storage.js (armazenamento local)
│   ├── redux/
│   │   ├── slices/
│   │   ├── hooks.js
│   │   └── store.js
│   ├── styles/
│   │   ├── colors.js
│   │   ├── typography.js
│   │   └── spacing.js
│   ├── utils/
│   │   ├── validators.js
│   │   └── formatters.js
│   └── App.js
├── app.json
├── package.json
└── README.md
```

### Bibliotecas Principais:

```json
{
  "dependencies": {
    "react-native": "latest",
    "@react-navigation/native": "navegação",
    "@react-native-async-storage/async-storage": "armazenamento",
    "axios": "chamadas HTTP",
    "@reduxjs/toolkit": "gerenciamento de estado",
    "react-redux": "integração Redux"
  },
  "devDependencies": {
    "jest": "testes",
    "prettier": "formatação",
    "@testing-library/react-native": "testes unitários"
  }
}
```

### Fluxo de Dados:

```
Usuário clica em [Procurar Vagas]
         ↓
Redux dispatch action: fetchVagas()
         ↓
API call: GET /api/vagas?userId=123
         ↓
Backend processa + matching com IA
         ↓
Resposta com lista de vagas + scores
         ↓
Redux Store armazena dados
         ↓
VagasScreen renderiza com FlatList
         ↓
Usuário vê vagas ordenadas por compatibilidade
```

---

## 🖥️ CAMADA BACKEND (API)

### Tecnologia: **Node.js + Express.js**

**Vantagens:**
- ✓ JavaScript full-stack (frontend + backend mesmo idioma)
- ✓ Performance em I/O
- ✓ Comunidade grande
- ✓ Fácil de escalar

### Estrutura de Pastas:

```
imigra-ai-api/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── vagasController.js
│   │   ├── matchingController.js
│   │   ├── comunidadesController.js
│   │   ├── postsController.js
│   │   ├── chatController.js
│   │   └── usersController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── vagas.js
│   │   ├── comunidades.js
│   │   ├── posts.js
│   │   ├── chat.js
│   │   ├── users.js
│   │   └── index.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Vaga.js
│   │   ├── Aplicacao.js
│   │   ├── Comunidade.js
│   │   ├── Post.js
│   │   └── ConversaIA.js
│   ├── services/
│   │   ├── matchingService.js (algoritmo)
│   │   ├── iaService.js (OpenAI/Claude)
│   │   ├── vagasService.js (Indeed/SINE)
│   │   ├── authService.js
│   │   └── emailService.js
│   ├── middleware/
│   │   ├── auth.js (validar JWT)
│   │   ├── errorHandler.js
│   │   ├── validator.js
│   │   └── cors.js
│   ├── utils/
│   │   ├── logger.js
│   │   ├── errorHandler.js
│   │   └── constants.js
│   ├── database/
│   │   ├── db.js (conexão)
│   │   └── migrations/
│   ├── config/
│   │   ├── env.js
│   │   └── constants.js
│   └── server.js
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── package.json
└── README.md
```

### Endpoints da API:

**Autenticação:**
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/refresh-token
POST   /api/auth/logout
```

**Usuários:**
```
GET    /api/users/:id
PUT    /api/users/:id
GET    /api/users/:id/habilidades
```

**Vagas:**
```
GET    /api/vagas
GET    /api/vagas/:id
GET    /api/vagas/recomendadas
GET    /api/vagas/favoritas
POST   /api/vagas/:id/aplicar
POST   /api/vagas/:id/salvar
DELETE /api/vagas/:id/salvar
```

**Matching:**
```
POST   /api/matching/calcular
POST   /api/matching/recomendacoes
```

**Comunidades:**
```
GET    /api/comunidades
GET    /api/comunidades/:id
GET    /api/comunidades/:id/posts
POST   /api/comunidades/:id/entrar
```

**Posts:**
```
POST   /api/comunidades/:id/posts
POST   /api/posts/:id/curtir
POST   /api/posts/:id/comentar
GET    /api/posts/:id/comentarios
```

**Chat IA:**
```
POST   /api/chat/message
GET    /api/chat/historico
```

---

## 🔐 SEGURANÇA

### Autenticação:
- **JWT (JSON Web Token)** para manter usuário logado
- **Refresh tokens** com expiração curta (15 min)
- **Access tokens** com expiração longa (7 dias)
- **Senha** armazenada com bcrypt (salt 12)

```javascript
// Exemplo middleware
function verificarJWT(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) return res.status(401).json({ erro: 'Não autorizado' });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ erro: 'Token inválido' });
    }
}
```

### Validação de Input:
```javascript
const schema = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().min(8).required()
});

const { error, value } = schema.validate(req.body);
if (error) return res.status(400).json({ erro: error.details[0].message });
```

---

## ⚡ PERFORMANCE

| Métrica | Alvo |
|---|---|
| Tempo resposta API | < 500ms |
| Tempo de loading tela | < 2s |
| FPS no app | 60 FPS |
| Cobertura DB Cache | > 80% |

---

## 🔄 FLUXO DE REQUISIÇÃO COMPLETO

```
1. Usuário clica "Procurar Vagas"
        ↓
2. Frontend envia GET /api/vagas?userId=123
        ↓
3. Middleware valida JWT
        ↓
4. Controller vagasController.getVagasParaUsuario()
        ↓
5. Backend busca vagas na DB
        ↓
6. Para cada vaga, chama matchingService.calcularScore()
        ↓
7. IA analisa compatibilidade
        ↓
8. Scores calculados + ordenação
        ↓
9. Backend retorna JSON: [{ id, titulo, score }, ...]
        ↓
10. Frontend recebe + renderiza em FlatList
        ↓
11. Usuário vê vagas na tela
```

---

## 📦 DEPLOYMENT

### Frontend:
- Build: `npm run build`
- Android: Google Play Store (EAS Build)
- iOS: Apple App Store (EAS Build)

### Backend:
- Servidor: Node.js em Railway/Render (FREE TIER)
- Banco de dados: PostgreSQL em Railway (FREE TIER)
- Variáveis de ambiente: `.env`

---

**Versão:** 1.0  
**Status:** ✅ Arquitetura Definida  
**Próximo:** Implementação Backend
