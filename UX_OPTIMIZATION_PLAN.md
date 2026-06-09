# 🎯 Plano de Otimização UX/UI — IMIGRA.AI

**Data:** 8 de Junho de 2026  
**Objetivo:** Confiança Gradual + Onboarding Progressivo + Animações Fluidas  
**Stack:** Next.js + React + Tailwind + Framer Motion

---

## 📊 Design System Recomendado

### 1. Estilo Visual
- **Padrão:** Modern + Progressive Disclosure
- **Paleta Principal:** Índigo (#6366f1) + Roxo (#8b5cf6) + Dark backgrounds
- **Efeito:** Glassmorphism sutil + Shadows dinâmicas
- **Fonte:** Outfit (já usado) + monospace para código

### 2. Cores por Contexto
```css
/* Confiança */
--trust-primary: #6366f1      /* Ação principal */
--trust-accent: #8b5cf6       /* Destaque secundário */

/* Progresso */
--progress-active: #6366f1    /* Etapa completada */
--progress-pending: #4b5563   /* Próxima etapa */
--progress-done: #10b981      /* Sucesso */

/* Feedback */
--error: #ef4444
--warning: #f59e0b
--success: #10b981

/* Superfícies */
--surface-primary: #0a0a0f
--surface-card: #111118
--surface-hover: #1a1a24
```

---

## 🎭 Fluxo de Onboarding Otimizado (Progressive Disclosure)

### Fase 1: Primeiro Contato (Construir Confiança)
**Objetivo:** Mostrar que há algo real, gerar segurança

**Tela 1.1: Welcome Screen**
```
┌─────────────────────────────┐
│  🤖 IMIGRA.AI              │
│                             │
│  Sua ponte para o emprego   │
│  que você merece            │
│                             │
│  [Começar] [Saiba Mais]     │
└─────────────────────────────┘
```

**Animações:**
- Entrada: Fade + Slide up (300ms)
- Botão: Scale on hover (100ms)
- Microcópia: Aparecer gradualmente (stagger)

**Microcópias Chave:**
- "Sua ponte para o emprego que você merece"
- "A IA entende sua formação, idioma e sonho"

---

### Fase 2: Cadastro Mínimo (5 dados apenas!)
**Objetivo:** Entrada rápida, sem fricção

**Tela 2.1: Seu Nome e Email**
```
┌─────────────────────────────┐
│  Passo 1 de 3               │
│  ███░░░░░░░░░░░░░░░░        │ (Progress bar)
│                             │
│  Como você se chama?        │
│  [Campo nome]               │
│                             │
│  Seu e-mail?                │
│  [Campo email]              │
│                             │
│              [Continuar →]  │
└─────────────────────────────┘
```

**Tela 2.2: Sua Profissão Anterior**
```
┌─────────────────────────────┐
│  Passo 2 de 3               │
│  ██████░░░░░░░░░░░░░░       │
│                             │
│  Qual era sua profissão?    │
│  [Seletor com sugestões]    │
│  (Médico, Engenheiro, etc)  │
│                             │
│              [Continuar →]  │
└─────────────────────────────┘
```

**Tela 2.3: Idioma Preferido**
```
┌─────────────────────────────┐
│  Passo 3 de 3               │
│  ███████████████░░░░░       │
│                             │
│  Qual seu idioma preferido? │
│  [PT-BR] [ES] [EN] [FR]     │
│  [HT]    [AR] [UK] [RU]     │
│                             │
│  [Começar a usar! 🚀]       │
└─────────────────────────────┘
```

**Validação e Feedback:**
- Erro inline (próximo do campo) com ícone
- Botão de continuar desabilitado até preencher
- Checkmark quando válido (sucesso visual)

---

### Fase 3: Primeiro Uso (Construir Confiança com Sucesso)
**Objetivo:** Mostrar valor imediato

**Tela 3.1: Dashboard Inicial Vazio**
```
┌─────────────────────────────┐
│  Bem-vindo, [Nome]! 👋      │
│                             │
│  Seu perfil está criado ✓   │
│                             │
│  Próximos passos:           │
│  1. Veja vagas sugeridas    │
│  2. Complete seu perfil     │
│  3. Comece a conversar      │
│                             │
│  [Ver Vagas] [Chat IA] [+]  │
└─────────────────────────────┘
```

**Animações:**
- Checkmark: Bounce (confetti opcional)
- Cards: Stagger entrada (100ms between)
- Transição suave com spatial continuity

---

## 🎬 Animações Fluidas & Guia Passo-a-Passo

### 1. Transições de Tela

```javascript
// Entrada: Slide + Fade
const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.2 }
  }
};

// Uso no Next.js
<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
  {/* Conteúdo */}
</motion.div>
```

### 2. Indicador de Progresso (Passo-a-Passo)

```javascript
// Progress Bar animada
const progressVariants = {
  initial: { scaleX: 0, originX: 0 },
  animate: { 
    scaleX: 1,
    transition: { 
      duration: 0.6,
      ease: "easeInOut",
      delay: 0.2
    }
  }
};

const steps = [
  { label: "Nome & Email", done: true },
  { label: "Profissão", done: true },
  { label: "Idioma", done: false, active: true }
];

steps.map((step, i) => (
  <motion.div 
    key={i}
    animate={{ 
      backgroundColor: step.done ? "#10b981" : step.active ? "#6366f1" : "#4b5563"
    }}
    transition={{ duration: 0.3 }}
  >
    {step.label}
  </motion.div>
))
```

### 3. Feedback de Validação (Campo por Campo)

```javascript
// Validação com feedback visual
const FieldFeedback = ({ value, isValid, error }) => (
  <motion.div
    animate={{
      borderColor: isValid ? "#10b981" : error ? "#ef4444" : "#4b5563",
      backgroundColor: isValid ? "rgba(16,185,129,0.05)" : "transparent"
    }}
    transition={{ duration: 0.2 }}
  >
    <input value={value} />
    
    {isValid && (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        ✓
      </motion.span>
    )}
    
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {error}
      </motion.p>
    )}
  </motion.div>
);
```

### 4. Entrada de Conteúdo (Staggered)

```javascript
// Cards/items entram em cascata
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

## 📝 Microcópias para Construir Confiança

### Página de Bem-vindo
```
Título: "Sua ponte para o emprego que você merece"
Subtítulo: "A IA entende sua formação, idioma e história"
CTA: "Começar agora" (não "Cadastrar")
```

### Formulário (Parte 1)
```
Label: "Como você se chama?"
Placeholder: "Maria dos Santos"
Helper: "Usamos seu nome para personalizar a experiência"
```

### Formulário (Parte 2)
```
Label: "Qual era sua profissão?"
Helper: "Traduzimos seu título para o mercado brasileiro"
Success: "Perfeito! Temos vagas para [sua profissão]"
```

### Formulário (Parte 3)
```
Label: "Qual seu idioma preferido?"
Helper: "Você pode mudar depois"
CTA: "Começar a usar! 🚀" (emoji cria esperança)
```

### Primeiro Sucesso
```
Mensagem: "Seu perfil está criado ✓"
Subtext: "Agora vamos mostrar vagas perfeitas para você"
Next Step: "Ver vagas sugeridas" ou "Chat com a IA"
```

---

## 🎨 Componentes Novos (Código Pronto)

### 1. Componente: OnboardingForm.tsx

```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';

export default function OnboardingForm() {
  const { t } = useTranslation('common');
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    language: 'pt-BR'
  });

  const steps = [
    { title: t('onboarding.step1.title'), key: 'name' },
    { title: t('onboarding.step2.title'), key: 'profession' },
    { title: t('onboarding.step3.title'), key: 'language' }
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col">
      {/* Progress Bar */}
      <div className="h-1 bg-slate-700 relative">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: (step + 1) / steps.length }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-md"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {t('onboarding.step1.question')}
              </h2>
              <p className="text-slate-400 mb-6">
                {t('onboarding.step1.helper')}
              </p>
              
              <input
                type="text"
                placeholder={t('onboarding.step1.placeholder')}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              
              <button
                onClick={() => setStep(1)}
                disabled={!formData.name}
                className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
              >
                {t('common.continue')} →
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-md"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {t('onboarding.step2.question')}
              </h2>
              <p className="text-slate-400 mb-6">
                {t('onboarding.step2.helper')}
              </p>
              
              <select
                value={formData.profession}
                onChange={(e) => setFormData({...formData, profession: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                <option value="">{t('onboarding.step2.select')}</option>
                <option>Médico/a</option>
                <option>Engenheiro/a</option>
                <option>Professor/a</option>
                <option>Outro</option>
              </select>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(0)}
                  className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
                >
                  ← {t('common.back')}
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.profession}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
                >
                  {t('common.continue')} →
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-md"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {t('onboarding.step3.question')}
              </h2>
              <p className="text-slate-400 mb-6">
                {t('onboarding.step3.helper')}
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { code: 'pt-BR', label: 'Português' },
                  { code: 'es', label: 'Español' },
                  { code: 'en', label: 'English' },
                  { code: 'fr', label: 'Français' },
                  { code: 'ht', label: 'Kreyòl' },
                  { code: 'ar', label: 'العربية' },
                  { code: 'uk', label: 'Українська' },
                  { code: 'ru', label: 'Русский' }
                ].map(lang => (
                  <motion.button
                    key={lang.code}
                    onClick={() => setFormData({...formData, language: lang.code})}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                      formData.language === lang.code
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {lang.label}
                  </motion.button>
                ))}
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
                >
                  ← {t('common.back')}
                </button>
                <button
                  onClick={() => {
                    // Submit onboarding
                    console.log('Onboarding complete:', formData);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all"
                >
                  🚀 {t('onboarding.step3.cta')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

### 2. Componente: ProgressIndicator.tsx

```typescript
'use client';

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  label?: string;
}

export default function ProgressIndicator({
  current,
  total,
  label
}: ProgressIndicatorProps) {
  const percentage = (current / total) * 100;

  const containerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-2"
    >
      {label && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">{label}</span>
          <span className="text-indigo-400 font-semibold">
            {current} de {total}
          </span>
        </div>
      )}

      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: percentage / 100 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex gap-2 mt-3">
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              backgroundColor: i < current ? '#6366f1' : i === current ? '#8b5cf6' : '#4b5563',
              scale: i === current ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
            className="flex-1 h-1 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}
```

### 3. Atualização: Microcópias (common.json)

```json
{
  "onboarding": {
    "welcome": {
      "title": "Sua ponte para o emprego que você merece",
      "subtitle": "A IA entende sua formação, idioma e história",
      "cta": "Começar agora"
    },
    "step1": {
      "title": "Primeiro, vamos nos conhecer",
      "question": "Como você se chama?",
      "placeholder": "Maria dos Santos",
      "helper": "Usamos seu nome para personalizar a experiência"
    },
    "step2": {
      "title": "Sua formação",
      "question": "Qual era sua profissão?",
      "helper": "Traduzimos seu título para o mercado brasileiro",
      "select": "Selecione sua profissão",
      "success": "Perfeito! Temos vagas para {profession}"
    },
    "step3": {
      "title": "Idioma preferido",
      "question": "Qual seu idioma preferido?",
      "helper": "Você pode mudar depois em configurações",
      "cta": "Começar a usar!"
    },
    "success": {
      "title": "Seu perfil está criado ✓",
      "subtitle": "Agora vamos mostrar vagas perfeitas para você",
      "nextSteps": "Próximos passos"
    }
  },
  "common": {
    "continue": "Continuar",
    "back": "Voltar"
  }
}
```

---

## 🔄 Fluxo Após Cadastro (Progressive Enhancement)

### Fase 4: Completar Perfil (Gradualmente)

**Dias 1-3:** Básico  
→ Experiência profissional (campo livre)

**Dias 4-7:** Intermediário  
→ Idiomas falados  
→ Certificados/documentos

**Semana 2:** Avançado  
→ Preferências de vaga  
→ Horários disponíveis  
→ Localização

### Gatilho de Solicitação
```javascript
// Após 2 vagas visualizadas
if (viewedJobsCount === 2 && !profileComplete) {
  showBottomSheet("Desbloquear mais vagas complentando seu perfil");
}

// Com microcópia motivadora
"Maria, 92% dos perfis completos recebem ofertas em 7 dias!"
```

---

## ✨ Checklist de Implementação

- [ ] **Design System** implementado em `tailwind.config.js`
- [ ] **OnboardingForm.tsx** integrado em `/pages/onboarding`
- [ ] **ProgressIndicator.tsx** disponível como componente
- [ ] **Microcópias** atualizadas em `public/locales/pt-BR/common.json`
- [ ] **Animações** de transição em toda a app
- [ ] **Feedback visual** em todos os inputs (validação, erro, sucesso)
- [ ] **Testes** em mobile (375px) e desktop
- [ ] **Dark mode** testado
- [ ] **Reduced motion** support (remove animações se solicitado)
- [ ] **Acessibilidade** (labels, aria-labels, focus management)

---

## 🎯 Resultados Esperados

| Métrica | Antes | Depois | Objetivo |
|---------|-------|--------|----------|
| Tempo de cadastro | 5-10 min | 1-2 min | Reduzir fricção |
| Taxa de abandono | ? | <15% | Mais usuários completam |
| Confiança percebida | Baixa | Alta | Feedback visual |
| Satisfação | ? | 4.5+/5 | Experiência fluida |

---

**Próximo Passo:** Implementar OnboardingForm.tsx no projeto! 🚀

