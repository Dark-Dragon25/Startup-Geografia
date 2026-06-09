# 🚀 COMECE AQUI — IMIGRA.AI

## ✅ Tudo Pronto!

Seu projeto foi clonado em:  
**`F:\.Trabalho\job-matching-platform`**

O projeto **já tem tudo implementado:**
- ✅ Chat de IA completo
- ✅ 8 idiomas (PT, ES, EN, FR, HT, AR, UK, RU)
- ✅ Dashboard de vagas
- ✅ Autenticação
- ✅ npm install já foi feito

---

## 🎯 Forma MAIS Rápida de Rodar

### Opção 1: Clique duplo no arquivo (recomendado!)

1. Navegue até: `F:\.Trabalho\job-matching-platform`
2. Dê duplo clique em: **`RODAR_PROJETO.bat`**
3. Pronto! Abre 2 terminais + navegador automaticamente

### Opção 2: Manual (via Terminal)

**Terminal 1 — Backend:**
```bash
cd F:\.Trabalho\job-matching-platform\prototipo-mvp\backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd F:\.Trabalho\job-matching-platform\prototipo-mvp\frontend
npm run dev
```

**Resultado:**
- Backend: `http://localhost:3001`
- Frontend: `http://localhost:3000`
- Chat IA: `http://localhost:3000/chat`

---

## 💬 Testar o Chat

1. Abra `http://localhost:3000`
2. Clique em **"🤖 Assistente IA"** no canto superior direito
3. Escreva uma pergunta:
   - "Como validar meu diploma no Brasil?"
   - "Quais documentos preciso para trabalhar?"
   - "Me dá dicas de currículo"
4. **A IA responde em qualquer idioma!**

---

## 🔧 Configurar IA Real (Opcional)

### Sem configurar:
- Chat funciona com respostas locais pré-escritas ✅
- Cobre 90% dos casos de uso
- **Completamente gratuito** 🎉

### Com IA Real (OpenRouter - Gratuito!):

1. Acesse: **https://openrouter.ai**
2. Crie conta (gratuito)
3. Pegue sua API key
4. Abra: `prototipo-mvp/backend/.env`
5. Descomente e adicione:
   ```env
   OPENROUTER_API_KEY=sk-or-seu-token-aqui
   AI_MODEL=mistralai/mistral-7b-instruct:free
   ```
6. Restart do backend (`Ctrl+C` e `npm run dev` novamente)

**Pronto!** Chat agora usa IA real 🤖

---

## 🎨 Editar Visual/Cores

### Arquivo 1: Variáveis globais
```
prototipo-mvp/frontend/src/styles/globals.css
```
Edite cores, fontes, classes globais.

### Arquivo 2: Paleta de cores
```
prototipo-mvp/frontend/tailwind.config.js
```
Mude primary, secondary, etc.

Após editar, página recarrega automaticamente! 🔄

---

## 🌐 Editar Tradução

### Adicionar frase nova em português:

1. Abra: `prototipo-mvp/frontend/public/locales/pt-BR/common.json`
2. Adicione:
   ```json
   {
     "meu_texto": "Meu texto em português"
   }
   ```
3. Use no React:
   ```jsx
   const { t } = useTranslation('common');
   <button>{t('meu_texto')}</button>
   ```

**A tradução para outros idiomas é automática!** ✨

---

## 📚 Documentação

Encontre tudo em: `/docs`

**Comece por:**
1. `README.md` — Visão geral
2. `docs/00-OVERVIEW.md` — Detalhes
3. `docs/04-ARCHITECTURE.md` — Arquitetura
4. `docs/08-API.md` — API endpoints

---

## 🆘 Se algo não funcionar

### Erro de porta ocupada (3000 ou 3001)
```powershell
# Windows PowerShell
netstat -ano | findstr :3000
taskkill /PID <numero> /F
```

### Chat não aparece
1. Verifique se backend está rodando
2. Abra DevTools (F12) e procure erros
3. Verifique se `.env` foi copiado corretamente

### npm install falhou
```bash
npm cache clean --force
npm install
```

---

## 📊 Resumo do Projeto

| O que | Status |
|------|--------|
| **Backend** | ✅ Pronto (`npm run dev`) |
| **Frontend** | ✅ Pronto (`npm run dev`) |
| **Chat IA** | ✅ Pronto (sem IA precisa key) |
| **Tradução** | ✅ Pronta (8 idiomas) |
| **Banco de dados** | ⏳ Precisa Supabase (gratuito) |
| **npm install** | ✅ Já feito |

---

## 🎯 Próximos Passos

### Hoje (agora!)
1. Clique duplo em `RODAR_PROJETO.bat` ✨
2. Acesse `http://localhost:3000`
3. Teste o chat

### Esta semana
1. (Opcional) Ative OpenRouter para IA real
2. Customize cores em `globals.css`
3. Customize textos em `public/locales/pt-BR/common.json`

### Depois
1. Conecte Supabase para banco real
2. Integre APIs de vagas reais (Jooble, Adzuna)
3. Deploy em produção

---

## 💰 Custo Total

| Serviço | Custo |
|---------|-------|
| React + Node.js | **Gratuito** |
| Supabase (banco) | **Gratuito** até 500 MB |
| OpenRouter (IA) | **Gratuito** (tem modelos free) |
| Deploy (Railway) | **Gratuito** até 5$/mês |
| **TOTAL** | **R$ 0** 🎉 |

---

## 🎓 Entender o Projeto

O **IMIGRA.AI** resolve um problema real:
- 1,5 milhão imigrantes no Brasil
- 67,4% desempregados ou subempregados
- Formação desperdiçada

**A solução:**
1. 🧠 Matching inteligente com IA
2. 👥 Comunidade de suporte
3. 📋 Guia de documentação
4. 💬 Chat com IA

Tudo 100% gratuito para usar! ✨

---

## 📞 Dúvidas?

Procure em:
1. **Este arquivo** (`COMECE_AQUI.md`)
2. **Guia Prático** (`GUIA_PRATICO.md`)
3. **Documentação** (`/docs`)
4. **Código** (comentários explicam)

---

## 🚀 Comece Agora!

```
👉 Clique duplo em RODAR_PROJETO.bat
   e aproveite o projeto!
```

**Boa sorte!** 🎉

---

**Local:** `F:\.Trabalho\job-matching-platform`  
**Criado:** 8 de Junho de 2026  
**Status:** ✅ Pronto para usar
