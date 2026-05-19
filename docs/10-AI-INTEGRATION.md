# 🤖 INTEGRAÇÃO COM INTELIGÊNCIA ARTIFICIAL — IMIGRA.AI

## 🎯 Objetivo

Documentar como a IA é integrada no IMIGRA.AI, desde o matching de vagas até o chat.

---

## 🧠 TIPOS DE IA UTILIZADOS

### 1. **Matching Inteligente (Algoritmo + IA)**

**O que faz:**
- Analisa habilidades do usuário
- Busca vagas compatíveis
- Calcula score de 0-100

**Como funciona:**

```
ENTRADA: Perfil do usuário
  {
    profissao: "Engenheiro de Software",
    habilidades: ["Python", "Java", "UML"],
    anos_experiencia: 5,
    pais_origem: "Venezuela",
    idiomas: { es: "avançado", pt: "intermediário" }
  }

    ↓

IA ANALISA:
  - Traduz "Ingeniero de Software" para contexto BR
  - Identifica equivalência: Desenvolvedor Pleno/Senior
  - Expande habilidades: Python → Full-stack Python

    ↓

BUSCA EM BASE DE VAGAS:
  - Filtra vagas de desenvolvimento
  - Ordena por compatibilidade

    ↓

CALCULA SCORE:
  - 30% skills (habilidades técnicas)
  - 25% experiência (anos)
  - 20% localização
  - 15% idioma
  - 10% salário

    ↓

SAÍDA: Lista de vagas com scores
```

**Código de Implementação:**

```javascript
// backend/src/services/matchingService.js

async function calcularScore(usuario, vaga) {
  let score = 0;

  // 1. Skills (30%)
  const skillsMatches = usuario.habilidades
    .filter(skill => vaga.skills_requeridas.includes(skill))
    .length;
  const skillsScore = (skillsMatches / vaga.skills_requeridas.length) * 30;
  score += skillsScore;

  // 2. Experiência (25%)
  if (usuario.anos_experiencia >= vaga.anos_experiencia_minima) {
    score += 25;
  } else {
    score += (usuario.anos_experiencia / vaga.anos_experiencia_minima) * 25;
  }

  // 3. Localização (20%)
  if (usuario.cidades_preferidas.includes(vaga.localizacao)) {
    score += 20;
  }

  // 4. Idioma (15%)
  if (vaga.idioma_requerido) {
    const nivelUsuario = usuario.idiomas[vaga.idioma_requerido];
    if (nivelUsuario === 'avançado' || nivelUsuario === 'intermediário') {
      score += 15;
    }
  } else {
    score += 15;
  }

  // 5. Salário (10%)
  if (usuario.salario_esperado <= vaga.salario_maximo) {
    score += 10;
  }

  return Math.min(100, Math.round(score));
}
```

---

### 2. **Tradução de Competências (IA + NLP)**

**O que faz:**
- Converte experiência estrangeira para padrão brasileiro
- Identifica habilidades mesmo com nomes diferentes

**Exemplos:**

```
Input: "Ingeniero de Sistemas" (ES)
       Skills: ["Análisis de sistemas", "Gestión de proyectos"]

       ↓ IA Mapeia ↓

Output: "Desenvolvedor/Analista de Sistemas" (PT-BR)
        Skills: ["Análise de sistemas", "Gestão de projetos"]
```

**Implementação:**

```javascript
// backend/src/services/iaService.js

async function traduzirCompetencias(usuario) {
  const prompt = `
    Você é um especialista em RH e mercado de trabalho.
    
    Usuário estrangeiro:
    - País origem: ${usuario.pais_origem}
    - Profissão anterior: ${usuario.profissao}
    - Habilidades: ${usuario.habilidades.join(', ')}
    - Experiência: ${usuario.anos_experiencia} anos
    
    Tarefa:
    1. Traduza a profissão para equivalente brasileiro
    2. Classifique o nível (Junior/Pleno/Senior)
    3. Expanda as habilidades com termos brasileiros
    
    Responda em JSON:
    {
      "profissao_br": "...",
      "nivel": "...",
      "habilidades_expandidas": [...]
    }
  `;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 300
  });

  return JSON.parse(response.choices[0].message.content);
}
```

---

### 3. **Chat com IA para Documentação**

**O que faz:**
- Responde dúvidas sobre documentação
- Guia processos de revalidação
- Recomenda cursos e recursos

**Exemplos de Perguntas:**

```
Q: "Sou médico, como revalidar diploma no Brasil?"
A: "Para revalidar seu diploma de medicina:

1. CREMESP (São Paulo) ou CREMESP equivalente
   - Inscreva-se no site oficial
   - Envie documentação: diploma + histórico

2. Documentos necessários:
   - Diploma original traduzido
   - Histórico acadêmico
   - Comprovante de RG/Passport
   - Comprovante de residência

3. Prazos: 2-3 meses de análise

4. Custo: aproximadamente R$ 500-800

5. Próximos passos:
   - Entra em comunidade de médicos estrangeiros
   - Procura mentoria de quem já passou
   - Estuda português médico"
```

**Implementação:**

```javascript
// backend/src/controllers/chatController.js

async function enviarMensagem(req, res) {
  const { usuario_id, mensagem, topico } = req.body;

  try {
    const usuario = await getUsuario(usuario_id);
    
    const prompt = `
      Você é um especialista em imigração e mercado de trabalho no Brasil.
      
      Usuário:
      - Profissão: ${usuario.profissao}
      - País: ${usuario.pais_origem}
      - Experiência: ${usuario.anos_experiencia} anos
      - Português: ${usuario.idiomas.pt || 'básico'}
      
      Pergunta: ${mensagem}
      Tópico: ${topico}
      
      Responda com informações práticas e específicas para a situação dele.
      Use linguagem clara e passo-a-passo.
    `;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000
    });

    const respostaIA = response.choices[0].message.content;

    // Salvar no banco
    await salvarConversa({
      usuario_id,
      mensagem_usuario: mensagem,
      resposta_ia: respostaIA,
      topico,
      tokens_usados: response.usage.total_tokens
    });

    res.json({
      mensagem_usuario: mensagem,
      resposta_ia: respostaIA,
      topico
    });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
```

---

## 🔌 CONFIGURAÇÃO DO OPENAI API

### Setup

```bash
# Instalar SDK
npm install openai

# Configurar variáveis de ambiente
# .env
OPENAI_API_KEY=sk-...
```

### Inicialização

```javascript
// backend/src/config/openai.js
import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

export const openai = new OpenAIApi(configuration);
```

### Usar em Serviço

```javascript
// backend/src/services/iaService.js
import { openai } from '../config/openai.js';

export async function perguntarIA(prompt) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Você é um assistente especializado em imigração e mercado de trabalho no Brasil."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 1000,
    top_p: 0.95,
    frequency_penalty: 0.5
  });

  return response.choices[0].message.content;
}
```

---

## 💰 ESTIMATIVA DE CUSTO (OpenAI)

**Preço GPT-3.5-turbo:**
- Input: $0.0005 / 1K tokens
- Output: $0.0015 / 1K tokens

**Estimativa mensal (100 usuários):**
```
100 usuários × 10 chats/mês = 1.000 requisições

Por requisição:
- Input: ~150 tokens × $0.0005 = $0.075
- Output: ~300 tokens × $0.0015 = $0.45
- Total: $0.525 por requisição

Total mensal: 1.000 × $0.525 = $525

Mas com free trial ($5): GRATUITO por 3 meses
```

---

## 🎨 ALTERNATIVA: Claude API (Anthropic)

**Vantagem:** Melhor para textos longos, free tier generoso

```javascript
// backend/src/config/claude.js
import Anthropic from '@anthropic-ai/sdk';

export const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function perguntarClaude(prompt) {
  const message = await client.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return message.content[0].text;
}
```

---

## 🔒 SEGURANÇA E LIMITES

### Rate Limiting

```javascript
// backend/src/middleware/rateLimit.js
import rateLimit from 'express-rate-limit';

export const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 10, // 10 requisições por minuto
  message: 'Limite de requisições atingido. Tente novamente mais tarde.'
});
```

### Monitoramento de Tokens

```javascript
// Rastrear gastos
async function monitorarTokens(usuario_id, tokens_usados) {
  const usuario = await getUsuario(usuario_id);
  
  usuario.tokens_mensais += tokens_usados;
  
  if (usuario.tokens_mensais > 100000) { // Limite seguro
    logger.warn(`Usuário ${usuario_id} atingiu limite de tokens`);
  }
  
  await saveUsuario(usuario);
}
```

---

## 📊 MÉTRICAS DE IA

### Rastrear Qualidade

```javascript
// Após cada resposta, pedir feedback

async function pedirFeedback(conversa_id) {
  return {
    util: [1, 2, 3, 4, 5], // Escala de 1-5
    relevancia: [1, 2, 3, 4, 5],
    clareza: [1, 2, 3, 4, 5],
    comentario: "" // Texto livre
  };
}
```

### Dashboard de Métricas

```javascript
// Estatísticas de IA
{
  total_conversas: 1500,
  tokens_gastos: 450000,
  custo_mensal: 225,
  taxa_satisfacao: 4.2, // 1-5
  topicos_mais_procurados: {
    documentacao: 45%,
    revalidacao: 30%,
    visto: 15%,
    cursos: 10%
  }
}
```

---

## 🔮 MELHORIAS FUTURAS

### 1. **Fine-tuning do Modelo**
- Treinar modelo com dados reais de imigrantes
- Melhorar respostas específicas para cada profissão

### 2. **Análise de Sentimento**
- Detectar frustração do usuário
- Oferecer suporte emocional

### 3. **Recomendação de Cursos**
- IA sugere cursos baseado em skills faltantes
- Integração com Coursera, Udemy, etc.

### 4. **Análise de CV**
- Analisar CV do usuário
- Sugerir melhorias em português

---

**Versão:** 1.0  
**Status:** ✅ IA Documentada  
**Custo:** ~$500/mês (ou gratuito com free tier)  
**Próximo:** Deployment
