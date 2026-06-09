# 🤖 IA Assistente — Planejamento Completo
## IMIGRA.AI · Como a IA Trabalha por Você

**Objetivo:** IA como ponte real entre imigrante e empregador  
**Formato:** Widget flutuante (não página separada)  
**Modelo:** OpenRouter (gratuito) com fallback local

---

## 🎯 VISÃO GERAL: O que a IA faz de verdade

```
IMIGRANTE ←──── IA ASSISTENTE ────→ EMPREGADOR
   (Maria)          (Lira)            (Clínica ABC)
      ↑                                    ↑
   Português                           Português
   Espanhol              IA traduz,    Formal
   Haitiano         redige, envia      Profissional
   Árabe...         emails por ela
```

A IA não é só um chatbot — ela **age**:
- Redige emails profissionais em nome do imigrante
- Envia candidaturas para empregadores
- Notifica o imigrante quando há resposta
- Traduz comunicações em tempo real
- Guia cada passo do processo

---

## 💬 WIDGET FLUTUANTE — Conceito Visual

### Comportamento do Widget

```
ESTADO 1: Repouso (Idle)
┌────────────────────────────────────────────┐
│ [Página do dashboard normal...]            │
│                                            │
│                             ┌─────────┐   │
│                             │  🤖 Lira│   │
│                             │ Posso   │   │
│                             │ ajudar? │   │
│                             └────┬────┘   │
│                                  │        │
│                             ( ● )  ←── Bolinha pulse
│                                           │
└────────────────────────────────────────────┘

ESTADO 2: Animação de Atenção (a cada 45s se inativo)
- Bolinha pulsa suavemente
- Mensagem muda: "Achei uma vaga nova para você! 🎉"
- Shake gentil da bolinha
- Nunca invasivo, nunca bloqueia conteúdo

ESTADO 3: Aberto (Side Panel)
┌─────────────────────┬──────────────────────┐
│                     │ 🤖 LIRA — Assistente │
│ [Conteúdo normal]   │ ──────────────────── │
│                     │ Olá Maria! Como posso│
│                     │ ajudar hoje?         │
│                     │                      │
│                     │ [Candidatar vaga?]   │
│                     │ [Preparar currículo] │
│                     │ [Falar com patrão]   │
│                     │ [Traduzir mensagem]  │
│                     │                      │
│                     │ Maria: Quero me      │
│                     │ candidatar ao        │
│                     │ Hospital ABC         │
│                     │                      │
│                     │ Lira: Ótimo! Vou     │
│                     │ preparar sua carta   │
│                     │ e enviar o email     │
│                     │ para eles. ✓         │
│                     │ ──────────────────── │
│                     │ [Digite aqui...]     │
└─────────────────────┴──────────────────────┘
```

### Posicionamento
- **Mobile:** Canto inferior direito, bolinha 56px
- **Desktop:** Lateral direita, 40% da largura quando aberta
- **Z-index:** 1000 (acima de tudo, nunca escondida)
- **Animação:** Spring physics, slide da direita

---

## 🧠 ARQUITETURA DA IA — Como ela pensa

### Fluxo de Decisão

```
Usuário faz pergunta
        │
        ▼
┌───────────────────┐
│  Contexto do User │  ← perfil, vagas salvas, histórico
│  (Sempre enviado) │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  OpenRouter API   │  ← Modelo gratuito (mistral-7b)
│  (Principal)      │
└─────────┬─────────┘
          │ falha?
          ▼
┌───────────────────┐
│  Respostas Locais │  ← JSON pré-escritas por tema
│  (Fallback)       │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  Ação a executar? │  ← Verifica intent
│  (Tool Calling)   │
└─────────┬─────────┘
          │
     ┌────┴────┐
     │         │
     ▼         ▼
 Responde   Executa Ação
 ao user    (email, candidatura...)
```

### Tools (Ações que a IA pode executar)

```javascript
const TOOLS = [
  {
    name: "send_application_email",
    description: "Envia email de candidatura para empregador",
    parameters: {
      jobId: "string",         // ID da vaga
      employerEmail: "string", // Email do empregador
      coverLetter: "string",   // Carta gerada pela IA
      language: "string"       // Idioma do imigrante
    }
  },
  {
    name: "notify_user",
    description: "Notifica o imigrante por email",
    parameters: {
      userId: "string",
      subject: "string",
      message: "string",
      type: "job_match|employer_reply|interview|document"
    }
  },
  {
    name: "update_user_profile",
    description: "Atualiza dado do perfil com base na conversa",
    parameters: {
      field: "string",
      value: "string"
    }
  },
  {
    name: "search_jobs",
    description: "Busca vagas compatíveis",
    parameters: {
      profession: "string",
      location: "string",
      language: "string"
    }
  },
  {
    name: "schedule_followup",
    description: "Agenda follow-up automático com empregador",
    parameters: {
      jobId: "string",
      daysFromNow: "number",
      message: "string"
    }
  },
  {
    name: "translate_message",
    description: "Traduz mensagem entre imigrante e empregador",
    parameters: {
      text: "string",
      fromLang: "string",
      toLang: "string"
    }
  }
]
```

---

## 📧 SISTEMA DE EMAILS — Fluxo Completo

### Gatilhos de Email

```
GATILHO 1: Imigrante se candidata
═══════════════════════════════════════════════

  [Maria clica "Candidatar"] no app
          │
          ▼
  IA gera carta de apresentação:
  - Destaca habilidades relevantes
  - No idioma do empregador (PT-BR)
  - Tom profissional e acolhedor
  - Menciona match de 95%
          │
          ▼
  Email enviado para Clínica ABC:
  ┌──────────────────────────────────────┐
  │ Para: clinica.abc@email.com          │
  │ De: imigra.ai@vagas.com             │
  │ Assunto: Candidatura — Médica        │
  │          Maria Santos (95% match)    │
  │                                      │
  │ Olá, prezada equipe da Clínica ABC, │
  │                                      │
  │ Estou entrando em contato para       │
  │ apresentar a candidatura de Maria   │
  │ Santos, médica com 8 anos de        │
  │ experiência...                       │
  │                                      │
  │ [Ver Perfil Completo]               │
  │ [Agendar Entrevista]                │
  │ [Responder por Email]               │
  └──────────────────────────────────────┘
          │
          ▼
  Notificação para Maria:
  "✓ Sua candidatura foi enviada para
   Clínica ABC! Te aviso quando
   tiver resposta 😊"


GATILHO 2: Empregador responde
═══════════════════════════════════════════════

  Empregador clica "Responder" no email
          │
          ▼
  Webhook recebe a resposta
          │
          ▼
  IA analisa o tom:
  - Positivo? → Interesse, próximos passos
  - Negativo? → Agradecer e buscar outra vaga
  - Neutro?   → Pedir mais informações
          │
          ▼
  IA traduz para o idioma de Maria
          │
          ▼
  Notificação push + email para Maria:
  ┌──────────────────────────────────────┐
  │ Para: maria@email.com               │
  │ De: lira@imigra.ai                  │
  │ Assunto: 🎉 A Clínica ABC respondeu!│
  │                                      │
  │ Oi Maria! Tenho uma boa notícia! 🎉  │
  │                                      │
  │ A Clínica ABC respondeu sua          │
  │ candidatura:                         │
  │                                      │
  │ "Ficamos interessados no perfil da   │
  │  Dra. Santos. Poderia vir em uma     │
  │  entrevista na próxima semana?"      │
  │                                      │
  │ O que você quer responder?          │
  │                                      │
  │ [✓ Confirmar entrevista]            │
  │ [📅 Sugerir outro horário]          │
  │ [❓ Pedir mais informações]         │
  └──────────────────────────────────────┘
          │
          ▼
  Maria clica → IA redige a resposta
  e envia para o empregador


GATILHO 3: Follow-up automático
═══════════════════════════════════════════════

  Maria candidatou há 5 dias sem resposta
          │
          ▼
  IA detecta inatividade (cron job)
          │
          ▼
  Envia follow-up profissional:
  "Olá, gostaríamos de reafirmar
   o interesse da Dra. Santos na
   vaga. [Link perfil]"
          │
          ▼
  Informa Maria:
  "Enviei um follow-up para a
   Clínica ABC em seu nome 📨"


GATILHO 4: Match de vaga nova
═══════════════════════════════════════════════

  Nova vaga cadastrada que combina 90%+
          │
          ▼
  IA notifica Maria:
  ┌──────────────────────────────────────┐
  │ Para: maria@email.com               │
  │ Assunto: 🎯 Nova vaga perfeita!     │
  │                                      │
  │ Maria! Encontrei uma vaga nova      │
  │ que combina 94% com seu perfil:     │
  │                                      │
  │ Médica — Hospital São Lucas         │
  │ R$ 6.000 - R$ 8.000                 │
  │                                      │
  │ Quer que eu envie sua candidatura?  │
  │                                      │
  │ [✓ Sim, candidatar agora!]          │
  │ [👀 Ver a vaga primeiro]            │
  └──────────────────────────────────────┘
```

---

## 🔧 IMPLEMENTAÇÃO TÉCNICA

### Estrutura de Arquivos

```
backend/src/
├── services/
│   ├── aiService.ts           ← Lógica principal da IA
│   ├── emailService.ts        ← Envio de emails
│   ├── toolsService.ts        ← Tools da IA (ações)
│   ├── notificationService.ts ← Notificações
│   └── translationService.ts  ← Tradução
│
├── routes/
│   ├── chat.ts                ← Endpoint do widget
│   ├── webhooks.ts            ← Recebe respostas de email
│   └── notifications.ts      ← Push notifications
│
└── jobs/
    ├── followUpJob.ts         ← Cron: follow-up emails
    ├── matchingJob.ts         ← Cron: novas vagas
    └── reminderJob.ts         ← Cron: lembretes

frontend/src/components/
├── AIWidget/
│   ├── AIWidget.tsx           ← Componente principal
│   ├── ChatBubble.tsx         ← Bolinha flutuante
│   ├── SidePanel.tsx          ← Painel lateral
│   ├── MessageList.tsx        ← Lista de mensagens
│   ├── QuickActions.tsx       ← Ações rápidas
│   └── TypingIndicator.tsx    ← "Digitando..."
│
└── Notifications/
    └── NotificationBanner.tsx ← "Empregador respondeu!"
```

---

### aiService.ts — Serviço Principal

```typescript
import OpenAI from 'openai';
import { tools } from './toolsService';
import { localResponses } from './localResponses';

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

interface UserContext {
  name: string;
  profession: string;
  language: string;
  savedJobs: string[];
  appliedJobs: string[];
  profileCompleteness: number;
}

export async function chat(
  message: string,
  context: UserContext,
  history: any[]
) {
  const systemPrompt = `
    Você é Lira, assistente da IMIGRA.AI.
    
    SEU PAPEL:
    Você é a ponte entre ${context.name} e empregadores brasileiros.
    Você age por ela: envia emails, traduz mensagens, candidata vagas.
    
    SOBRE ${context.name.toUpperCase()}:
    - Profissão: ${context.profession}
    - Idioma preferido: ${context.language}
    - Perfil completo: ${context.profileCompleteness}%
    - Vagas salvas: ${context.savedJobs.length}
    - Já se candidatou em: ${context.appliedJobs.length} vagas
    
    COMO RESPONDER:
    - Sempre em ${context.language}
    - Tom acolhedor, encorajador e profissional
    - Seja proativa: sugira próximas ações
    - Use o nome dela ao responder
    - Quando puder agir (enviar email, etc), faça e informe
    
    VOCÊ PODE:
    ✓ Enviar emails de candidatura em nome dela
    ✓ Responder empregadores
    ✓ Traduzir mensagens
    ✓ Agendar follow-ups
    ✓ Buscar vagas compatíveis
    ✓ Orientar sobre documentação
    ✓ Preparar para entrevistas
  `;

  try {
    const response = await client.chat.completions.create({
      model: process.env.AI_MODEL || 'mistralai/mistral-7b-instruct:free',
      messages: [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: message }
      ],
      tools: tools,
      tool_choice: 'auto',
      max_tokens: 800,
    });

    const choice = response.choices[0];

    // IA quer executar uma ação (tool call)
    if (choice.message.tool_calls) {
      const result = await executeTools(choice.message.tool_calls, context);
      return {
        message: result.summary,
        action: result.action,
        actionResult: result.result
      };
    }

    return {
      message: choice.message.content,
      action: null
    };

  } catch (error) {
    // Fallback para respostas locais
    return {
      message: getLocalResponse(message, context),
      action: null,
      isLocal: true
    };
  }
}

function getLocalResponse(message: string, context: UserContext): string {
  const lower = message.toLowerCase();
  
  if (lower.includes('candidat') || lower.includes('aplicar')) {
    return `Claro, ${context.name}! Para se candidatar, basta me dizer qual vaga você quer e eu preparo tudo: a carta de apresentação e o email para o empregador. Qual vaga te interessa?`;
  }
  
  if (lower.includes('diploma') || lower.includes('validar')) {
    return `A revalidação do seu diploma de ${context.profession} no Brasil é feita pelo Conselho Federal. O processo envolve análise do currículo, prova de equivalência e entrevista. Quer que eu te envie um guia passo a passo por email?`;
  }
  
  if (lower.includes('currículo') || lower.includes('cv')) {
    return `Posso ajudar a preparar seu currículo para o mercado brasileiro! O formato aqui é diferente — sem foto, sem estado civil, focado em resultados. Quer que eu crie um modelo personalizado para ${context.profession}?`;
  }
  
  return `Olá ${context.name}! Estou aqui para ajudar. Posso te ajudar a candidatar vagas, preparar emails para empregadores, tirar dúvidas sobre documentação ou traduzir mensagens. O que você precisa?`;
}
```

---

### emailService.ts — Sistema de Emails

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       // imigra.ai@gmail.com
    pass: process.env.EMAIL_APP_PASSWORD // Senha de app do Gmail
  }
});

// Email para empregador (candidatura)
export async function sendApplicationEmail({
  employerEmail,
  employerName,
  jobTitle,
  applicantName,
  applicantProfession,
  coverLetter,
  profileUrl,
  matchPercentage
}: ApplicationEmail) {
  await transporter.sendMail({
    from: `"IMIGRA.AI Vagas" <${process.env.EMAIL_USER}>`,
    to: employerEmail,
    subject: `Candidatura — ${applicantProfession}: ${applicantName} (${matchPercentage}% compatível)`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: 'Arial', sans-serif; color: #212529; max-width: 600px; margin: 0 auto;">
        
        <div style="background: linear-gradient(135deg, #E3F2FD, #FFF9C4); padding: 32px; border-radius: 12px;">
          <h1 style="color: #1E88E5; margin: 0;">Nova Candidatura</h1>
          <p style="color: #6C757D;">IMIGRA.AI · Matching Inteligente</p>
        </div>
        
        <div style="padding: 32px;">
          
          <p>Olá, prezada equipe da <strong>${employerName}</strong>,</p>
          
          <p>
            A plataforma <strong>IMIGRA.AI</strong> identificou que o perfil de 
            <strong>${applicantName}</strong> tem <strong style="color: #4CAF50;">${matchPercentage}% de compatibilidade</strong> 
            com a vaga de <strong>${jobTitle}</strong>.
          </p>
          
          <div style="background: #F8F9FA; border-left: 4px solid #1E88E5; padding: 20px; border-radius: 8px; margin: 24px 0;">
            <p style="margin: 0; font-style: italic;">${coverLetter}</p>
          </div>
          
          <div style="margin: 24px 0;">
            <p><strong>Sobre ${applicantName}:</strong></p>
            <ul style="color: #6C757D;">
              <li>Profissão: ${applicantProfession}</li>
              <li>Experiência documentada no perfil</li>
              <li>Disponível para entrevista</li>
            </ul>
          </div>
          
          <div style="display: flex; gap: 12px; margin-top: 32px;">
            <a href="${profileUrl}" 
               style="background: #1E88E5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">
              Ver Perfil Completo
            </a>
            <a href="mailto:${process.env.EMAIL_USER}?subject=Entrevista: ${applicantName}"
               style="background: white; color: #1E88E5; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; border: 2px solid #1E88E5;">
              Agendar Entrevista
            </a>
          </div>
          
          <p style="color: #BDBDBD; font-size: 12px; margin-top: 32px;">
            Para responder ao candidato, simplesmente responda este email.<br>
            Nossa IA traduzirá e entregará sua mensagem automaticamente.
          </p>
        </div>
        
      </body>
      </html>
    `
  });
}

// Notificação para o imigrante
export async function notifyUser({
  userEmail,
  userName,
  subject,
  message,
  ctaButtons,
  type
}: UserNotification) {
  const emojis = {
    job_match: '🎯',
    employer_reply: '💬',
    interview: '📅',
    follow_up: '📨',
    document: '📋'
  };

  await transporter.sendMail({
    from: `"Lira — IMIGRA.AI" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: `${emojis[type] || '🤖'} ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: 'Arial', sans-serif; color: #212529; max-width: 600px; margin: 0 auto;">
        
        <div style="background: linear-gradient(135deg, #1E88E5, #1565C0); padding: 24px; border-radius: 12px; text-align: center;">
          <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 14px;">🤖 Lira, sua assistente</p>
          <h1 style="color: white; margin: 8px 0;">${subject}</h1>
        </div>
        
        <div style="padding: 32px;">
          <p>Oi, <strong>${userName}</strong>! 👋</p>
          <div style="background: #F8F9FA; padding: 20px; border-radius: 8px; margin: 16px 0;">
            ${message}
          </div>
          
          ${ctaButtons.map(btn => `
            <a href="${btn.url}"
               style="display: block; text-align: center; background: ${btn.primary ? '#1E88E5' : 'white'}; 
                      color: ${btn.primary ? 'white' : '#1E88E5'}; 
                      border: 2px solid #1E88E5;
                      padding: 14px; border-radius: 8px; text-decoration: none; 
                      margin: 8px 0; font-weight: bold;">
              ${btn.label}
            </a>
          `).join('')}
          
          <p style="color: #BDBDBD; font-size: 12px; margin-top: 32px; text-align: center;">
            Estou sempre aqui para ajudar você 🤖<br>
            IMIGRA.AI · Sua ponte para o emprego que você merece
          </p>
        </div>
        
      </body>
      </html>
    `
  });
}
```

---

### AIWidget.tsx — Componente Frontend

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IDLE_MESSAGES = [
  "Posso ajudar? 👋",
  "Achei vagas novas para você! 🎯",
  "Quer preparar uma candidatura? 📨",
  "Alguma dúvida sobre documentação? 📋",
];

export default function AIWidget({ user }: { user: UserProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [idleMessage, setIdleMessage] = useState(IDLE_MESSAGES[0]);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Rotacionar mensagem idle a cada 45 segundos
  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => {
      const random = IDLE_MESSAGES[Math.floor(Math.random() * IDLE_MESSAGES.length)];
      setIdleMessage(random);
      setHasUnread(true);
    }, 45000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input, userId: user.id })
    });

    const data = await response.json();
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);

    // Se a IA executou uma ação, mostrar resultado
    if (data.action) {
      setMessages(prev => [...prev, {
        role: 'action',
        content: `✓ ${data.actionResult}`,
        isAction: true
      }]);
    }
  };

  return (
    <>
      {/* Bolinha Flutuante */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        
        {/* Mensagem idle (balão de fala) */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-white border border-blue-100 shadow-lg rounded-2xl px-4 py-2 text-sm text-gray-700 max-w-[200px] cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              {idleMessage}
              {/* Rabinho do balão */}
              <div className="absolute -bottom-2 right-6 w-0 h-0 
                border-l-8 border-l-transparent 
                border-t-8 border-t-white 
                border-r-8 border-r-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bolinha */}
        <motion.button
          onClick={() => { setIsOpen(!isOpen); setHasUnread(false); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={!isOpen && hasUnread ? {
            scale: [1, 1.15, 1],
            transition: { repeat: Infinity, duration: 2 }
          } : {}}
          className="relative w-14 h-14 rounded-full 
                     bg-gradient-to-br from-blue-500 to-blue-700
                     shadow-lg shadow-blue-300 
                     flex items-center justify-center
                     text-white text-2xl
                     cursor-pointer"
        >
          {isOpen ? '✕' : '🤖'}
          
          {/* Bolinha de notificação */}
          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 
                             rounded-full border-2 border-white" />
          )}
        </motion.button>
      </div>

      {/* Painel Lateral */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 
                       bg-white shadow-2xl z-40 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <p className="text-white font-bold">Lira</p>
                <p className="text-blue-200 text-xs">Assistente IMIGRA.AI · Online</p>
              </div>
            </div>

            {/* Quick Actions */}
            {messages.length === 0 && (
              <div className="p-4 border-b border-gray-100">
                <p className="text-sm text-gray-500 mb-3">O que posso fazer por você:</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: '📨', label: 'Candidatar a vaga' },
                    { icon: '📝', label: 'Preparar currículo' },
                    { icon: '💬', label: 'Falar com patrão' },
                    { icon: '📋', label: 'Documentação' },
                  ].map(action => (
                    <button
                      key={action.label}
                      onClick={() => setInput(action.label)}
                      className="flex items-center gap-2 p-3 rounded-lg border border-blue-100 
                                 bg-blue-50 hover:bg-blue-100 text-sm text-blue-700 
                                 transition-colors text-left"
                    >
                      <span>{action.icon}</span>
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-8">
                  <p className="text-4xl mb-3">👋</p>
                  <p className="font-semibold text-gray-600">Olá, {user.name}!</p>
                  <p className="text-sm">Como posso ajudar você hoje?</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.isAction ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 
                                    px-4 py-2 rounded-lg text-sm max-w-[80%]">
                      {msg.content}
                    </div>
                  ) : (
                    <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}>
                      {msg.content}
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-1 px-4 py-3 bg-gray-100 rounded-2xl w-fit"
                >
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [-3, 0, -3] }}
                      transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                    />
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 
                             rounded-xl text-sm focus:outline-none focus:border-blue-400 
                             focus:bg-blue-50"
                />
                <button
                  onClick={sendMessage}
                  className="w-11 h-11 bg-blue-600 hover:bg-blue-700 
                             text-white rounded-xl flex items-center justify-center 
                             transition-colors"
                >
                  →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay escuro quando painel aberto (mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black z-30 sm:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## 🔄 FLUXO COMPLETO: Imigrante → Empregador → Contratação

```
SEMANA 1: Maria entra no sistema
═══════════════════════════════════════════════════
  1. Maria se cadastra (3 passos, 2 min)
  2. IA cria perfil automático
  3. IA envia email de boas-vindas:
     "Seu perfil está pronto! Encontrei 12 vagas."

SEMANA 1: Lira age proativamente  
═══════════════════════════════════════════════════
  4. Lira detecta Maria não candidatou em nada
  5. Widget aparece: "Quer que eu candidate 
      para as 3 melhores vagas para você? 🎯"
  6. Maria: "Sim!"
  7. Lira manda 3 emails para empregadores
  8. Maria recebe: "✓ Candidatura enviada para
      Clínica ABC, Hospital XYZ, Lab 123"

SEMANA 2: Respostas chegam
═══════════════════════════════════════════════════
  9. Clínica ABC responde (em português)
  10. Lira notifica Maria no app + email
  11. Maria responde via chat (no idioma dela)
  12. Lira traduz e envia para Clínica ABC
  13. Vaivém de emails mediados por Lira

SEMANA 2-3: Entrevista
═══════════════════════════════════════════════════
  14. Entrevista marcada
  15. Lira prepara Maria: "Aqui estão perguntas
       comuns para Médicos no Brasil..."
  16. Lira manda lembrete 1 dia antes
  17. Lira manda lembrete 2h antes

SEMANA 3-4: Oferta
═══════════════════════════════════════════════════
  18. Clínica ABC faz oferta
  19. Lira notifica Maria com toda informação
  20. Lira analisa: "A oferta está dentro
       da média para Médicos em SP? Sim ✓"
  21. Maria aceita → Lira comunica para clínica
  22. Email de confirmação automático
```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### Semana 1 — Widget
- [ ] Criar `AIWidget.tsx` com bolinha flutuante
- [ ] Criar `SidePanel.tsx` com chat
- [ ] Criar `QuickActions.tsx` com ações rápidas
- [ ] Integrar widget no `_app.tsx` (global)
- [ ] Testar em mobile e desktop

### Semana 2 — Backend IA
- [ ] Atualizar `aiService.ts` com tools
- [ ] Criar `toolsService.ts` com 6 tools
- [ ] Criar `emailService.ts` com templates
- [ ] Configurar variáveis de ambiente:
  - `OPENROUTER_API_KEY`
  - `EMAIL_USER` (Gmail)
  - `EMAIL_APP_PASSWORD`

### Semana 3 — Emails
- [ ] Template email candidatura (para empregador)
- [ ] Template email notificação (para imigrante)
- [ ] Template email follow-up automático
- [ ] Configurar webhook para receber respostas
- [ ] Testar fluxo completo end-to-end

### Semana 4 — Automações
- [ ] Cron: follow-up depois de 5 dias sem resposta
- [ ] Cron: notificar vagas novas compatíveis
- [ ] Cron: lembrete de entrevista
- [ ] Cron: completar perfil (se < 70%)

---

## 💰 CUSTO DA IA

| Serviço | Uso | Custo |
|---------|-----|-------|
| OpenRouter (mistral-7b) | Chat da IA | **Gratuito** |
| Gmail SMTP | Envio de emails | **Gratuito** até 500/dia |
| Nodemailer | Biblioteca email | **Gratuito** |
| node-cron | Agendamentos | **Gratuito** |
| **TOTAL** | | **R$ 0** |

> Se escalar: OpenAI gpt-4o-mini ~R$ 0,05/100 mensagens

---

## 🚀 PRÓXIMO PASSO IMEDIATO

1. Adicionar ao `.env` do backend:
```env
OPENROUTER_API_KEY=sk-or-...
EMAIL_USER=imigra.ai@gmail.com
EMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
AI_MODEL=mistralai/mistral-7b-instruct:free
SITE_URL=http://localhost:3000
```

2. Instalar dependências:
```bash
cd prototipo-mvp/backend
npm install nodemailer node-cron
npm install --save-dev @types/nodemailer
```

3. Criar o arquivo `AIWidget.tsx` e adicionar em `_app.tsx`:
```typescript
// pages/_app.tsx
import AIWidget from '@/components/AIWidget/AIWidget';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <AIWidget user={pageProps.user} />  {/* ← Widget em todas as páginas */}
    </>
  );
}
```

---

**Criado:** 8 de Junho de 2026  
**Projeto:** IMIGRA.AI  
**Componente:** Lira — Assistente de IA Flutuante  
🤖 **Pronto para implementar!**
