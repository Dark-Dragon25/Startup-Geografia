# 📋 GUIA PRÁTICO — IMIGRA.AI

## ✅ O Projeto Já Tem

- ✅ Chat de IA completo (backend + frontend)
- ✅ Traduções em 8 idiomas (PT, ES, EN, FR, HT, AR, UK, RU)
- ✅ Autenticação JWT
- ✅ Dashboard de vagas
- ✅ API REST completa
- ✅ Suporte a Supabase (gratuito)

---

## 🚀 Como Rodar (Agora é Fácil!)

### Terminal 1 — Backend

```bash
cd F:\.Trabalho\job-matching-platform\prototipo-mvp\backend

# Se não tiver rodado npm install ainda:
npm install

# Copiar arquivo de exemplo (se existir)
copy .env.example .env

# Editar .env e adicionar:
# JWT_SECRET=qualquer_coisa_aqui
# (Para agora, não precisa Supabase ou IA — tem fallback)

npm run dev
```

**Resultado:** Backend rodando em `http://localhost:3001`

### Terminal 2 — Frontend

```bash
cd F:\.Trabalho\job-matching-platform\prototipo-mvp\frontend

# Se não tiver rodado npm install ainda:
npm install

# Copiar arquivo de exemplo (se existir)
copy .env.example .env.local

npm run dev
```

**Resultado:** Frontend rodando em `http://localhost:3000`

---

## 🎨 Como Editar CSS

**2 arquivos principais:**

### 1. **Variáveis globais** (`globals.css`)
```
frontend/src/styles/globals.css
```
Aqui você mexe em cores globais, fontes e classes reutilizáveis.

### 2. **Tailwind Config** (`tailwind.config.js`)
```
frontend/tailwind.config.js
```
Muda a paleta de cores principal (primary, secondary, etc.)

**Exemplo:** Para mudar a cor do botão principal de azul para roxo:
1. Abra o arquivo `.tsx` do componente
2. Procure `bg-blue-600`
3. Troque por `bg-purple-600`
4. Pronto! Reload automático

---

## 🌐 Tradução — Como Funciona

### Arquivo estrutura:
```
frontend/public/locales/
├── pt-BR/common.json  ← Português (base)
├── es/common.json     ← Espanhol ✅
├── en/common.json     ← Inglês ✅
├── fr/common.json     ← Francês ✅
├── ht/common.json     ← Crioulo Haitiano ✅
├── ar/common.json     ← Árabe ✅
├── uk/common.json     ← Ucraniano ✅
└── ru/common.json     ← Russo ✅
```

### Como adicionar uma frase nova:

1. **Abra** `frontend/public/locales/pt-BR/common.json`
2. **Adicione** sua frase:
```json
{
  "novo_botao": "Clique aqui",
  ...
}
```
3. **Replique** nos outros 7 idiomas (ou deixe em branco)

### No código React:
```jsx
import { useTranslation } from 'next-i18next';

export default function MeuComponente() {
  const { t } = useTranslation('common');
  
  return <button>{t('novo_botao')}</button>;
}
```

A IA detecta o idioma do usuário automaticamente! 🌍

---

## 💰 Supabase — É Realmente Gratuito?

**Sim! Free tier cobre tudo para protótipo:**

| Recurso | Limite | Custo |
|---------|--------|-------|
| PostgreSQL | 500 MB | Gratuito |
| Storage | 1 GB | Gratuito |
| API Calls | 50.000/mês | Gratuito |
| Projetos | 2 ativos | Gratuito |
| **TOTAL** | - | **R$ 0** |

Só cobra se ultrapassar (não vai acontecer no protótipo).

### Para configurar:
1. Acesse **supabase.com**
2. Clique **"New Project"**
3. Copie a URL e chave
4. Cole no `.env` do backend:
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbG...
```

---

## 🤖 IA — Qual Usar?

### **Opção 1: OpenRouter (RECOMENDADO — Gratuito!)**

- **Site:** openrouter.ai
- **Modelos grátis:** `mistral-7b`, `llama-3.1-8b`, `meta-llama/llama-2-7b`
- **Qualidade:** Muito boa para chat de suporte
- **Setup:**
  1. Crie conta em openrouter.ai (gratuito)
  2. Pegue a API key
  3. Adicione no `.env`:
  ```env
  OPENROUTER_API_KEY=sk-or-...
  ```

### **Opção 2: OpenAI (Pago, mas barato)**

- **Modelo:** `gpt-4o-mini`
- **Custo:** ~R$ 0,05 por 100 mensagens
- **Setup:**
  ```env
  OPENAI_API_KEY=sk-...
  ```

### **Opção 3: Anthropic Claude (Pago)**

- **Modelo:** Claude Haiku
- **Custo:** Barato também
- **Setup:**
  ```env
  ANTHROPIC_API_KEY=sk-ant-...
  ```

### **Se nenhuma API for configurada:**

O sistema usa **respostas locais pré-escritas** para tópicos comuns:
- ✅ Revalidação de diplomas (CFM, CREA, OAB)
- ✅ Documentos necessários (RNM, visto)
- ✅ Dicas de currículo
- ✅ Direitos trabalhistas CLT
- ✅ Responde em qualquer idioma automaticamente

**Então funciona sem pagar nada!** 🎉

---

## 💬 Chat de IA — Como Funciona

### Fluxo:
```
Usuário escreve mensagem
        ↓
Backend recebe em /api/chat
        ↓
IA processa (OpenRouter / OpenAI / local)
        ↓
Responde no idioma do usuário
        ↓
Frontend exibe no chat
```

### O que a IA pode fazer:
- Orientar sobre revalidação de diplomas
- Explicar documentos necessários
- Dar dicas de currículo para Brasil
- Explicar direitos trabalhistas CLT
- **Detecta o idioma e responde no mesmo!**

### Como acessar:
1. Abra `http://localhost:3000`
2. Faça login (ou crie conta)
3. Vá ao Dashboard
4. Clique em **"🤖 Assistente IA"** (canto superior direito)
5. Chat é em `http://localhost:3000/chat`

---

## 📁 Estrutura de Pastas

```
job-matching-platform/
├── prototipo-mvp/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   │   └── chat.ts          ← API do chat
│   │   │   ├── services/
│   │   │   │   └── aiService.ts     ← Lógica da IA
│   │   │   └── index.ts
│   │   ├── .env.example
│   │   └── package.json
│   │
│   └── frontend/
│       ├── src/
│       │   ├── pages/
│       │   │   ├── chat.tsx         ← Tela de chat
│       │   │   └── dashboard.tsx    ← Dashboard
│       │   ├── components/
│       │   │   └── ChatWidget.tsx   ← Componente chat
│       │   └── styles/
│       │       └── globals.css      ← CSS global
│       ├── public/locales/
│       │   ├── pt-BR/common.json
│       │   ├── es/common.json
│       │   └── ... (6 outros idiomas)
│       ├── tailwind.config.js       ← Paleta de cores
│       └── package.json
│
└── docs/
    ├── 00-OVERVIEW.md
    ├── 01-PROJECT.md
    ├── 08-API.md
    └── ... (13 outros documentos)
```

---

## ✨ Próximos Passos

### 1. Rodar o projeto (agora!)
```bash
# Terminal 1
cd prototipo-mvp/backend
npm install  # se não tiver rodado
npm run dev

# Terminal 2
cd prototipo-mvp/frontend
npm install  # se não tiver rodado
npm run dev
```

### 2. Testar o chat
- Abra `http://localhost:3000`
- Vá para o chat (🤖 Assistente IA)
- Escreva uma pergunta (funciona em PT, EN, ES, FR, HT, AR, UK, RU)

### 3. (Opcional) Ativar IA real
- Crie conta em **openrouter.ai**
- Pegue a API key
- Adicione no `.env` do backend
- Restart do backend

### 4. Editar visual
- Abra `frontend/tailwind.config.js` ou `globals.css`
- Mude cores, fonts, classes
- Frontend recarrega automaticamente

---

## 🐛 Troubleshooting

### "Porta 3000/3001 já está em uso"
```powershell
# Achar o PID
netstat -ano | findstr :3000

# Matar o processo
taskkill /PID <numero> /F
```

### "npm install falhou"
```bash
npm cache clean --force
npm install
```

### "Chat não funciona"
1. Verifique se backend está rodando (`npm run dev`)
2. Verifique se frontend conecta ao backend
3. Verifique o console do browser (F12)
4. Se usar OpenRouter/OpenAI, verifique a API key no `.env`

### ".env não é reconhecido"
1. Crie arquivo `.env` na raiz do backend
2. Restart do `npm run dev`
3. Next.js usa `.env.local` (é automático)

---

## 📊 Resumo

| O que | Onde | Como |
|------|------|------|
| **Rodar** | Terminal | `npm run dev` (backend + frontend) |
| **CSS** | `globals.css` + `tailwind.config.js` | Edite e reload automático |
| **Tradução** | `public/locales/*.json` | Adicione chaves novas |
| **Chat** | `http://localhost:3000/chat` | Já funciona (com respostas locais) |
| **IA Real** | `.env` | Adicione `OPENROUTER_API_KEY` |
| **Banco** | supabase.com | Gratuito até 500 MB |

---

## 🎯 Hoje você tem

✅ Backend pronto  
✅ Frontend pronto  
✅ Chat de IA pronto  
✅ Traduções prontas  
✅ Autenticação pronta  
✅ Documentação completa  

**Agora é só rodar e customizar!**

---

**Criado:** 8 de Junho de 2026  
**Status:** Pronto para usar!  
**Pasta:** `F:\.Trabalho\job-matching-platform`

Qualquer dúvida, leia `/docs`! 📚
