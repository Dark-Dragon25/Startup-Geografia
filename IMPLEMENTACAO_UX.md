# 🔨 Guia de Implementação — UX/UI IMIGRA.AI

**Status:** Pronto para começar  
**Tempo Estimado:** 8-12 horas  
**Dificuldade:** Média

---

## 📋 Tarefas em Ordem de Prioridade

### SEMANA 1: Onboarding & Design System

#### ✅ Tarefa 1: Atualizar Design System
**Arquivo:** `frontend/tailwind.config.js`

```javascript
// Adicionar ao theme.extend
colors: {
  indigo: {
    50: '#f0f4ff',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
  },
  purple: {
    500: '#8b5cf6',
    600: '#7c3aed',
  },
  slate: {
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  }
},
animation: {
  'fade-in': 'fadeIn 0.3s ease-out',
  'slide-up': 'slideUp 0.3s ease-out',
  'scale-in': 'scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
}
```

**Tempo:** 30 min

---

#### ✅ Tarefa 2: Criar OnboardingForm Component
**Local:** `frontend/src/components/OnboardingForm.tsx`

1. Copie o código completo de `UX_OPTIMIZATION_PLAN.md`
2. Teste com `npm run dev`
3. Verifique animações em `http://localhost:3000/onboarding`

**Tempo:** 1 hora

---

#### ✅ Tarefa 3: Criar ProgressIndicator Component
**Local:** `frontend/src/components/ProgressIndicator.tsx`

1. Copie o código completo de `UX_OPTIMIZATION_PLAN.md`
2. Use em múltiplos componentes

**Tempo:** 30 min

---

#### ✅ Tarefa 4: Atualizar Microcópias
**Arquivo:** `frontend/public/locales/pt-BR/common.json`

```bash
# Backup primeiro
cp frontend/public/locales/pt-BR/common.json common.json.backup

# Adicionar seção "onboarding" com microcópias de UX_OPTIMIZATION_PLAN.md
```

1. Adicione a seção `onboarding` completa
2. Replique para outros idiomas (`es`, `en`, `fr`, etc)

**Tempo:** 45 min

---

#### ✅ Tarefa 5: Criar Página de Onboarding
**Local:** `frontend/src/pages/onboarding.tsx`

```typescript
import OnboardingForm from '@/components/OnboardingForm';

export default function OnboardingPage() {
  return <OnboardingForm />;
}
```

1. Integre com `next-i18next` para multilíngue
2. Redirecione para `/dashboard` após completar
3. Use `useRouter` para navegação

**Tempo:** 1 hora

---

### SEMANA 2: Animações & Feedback Visual

#### ✅ Tarefa 6: Adicionar Animações Globais
**Arquivo:** `frontend/src/styles/globals.css`

```css
/* Keyframes customizadas */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes scaleIn {
  from { 
    opacity: 0; 
    transform: scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: scale(1); 
  }
}

/* Reduzir animações se preferência do usuário */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Tempo:** 30 min

---

#### ✅ Tarefa 7: Criar Componente de Validação em Tempo Real
**Local:** `frontend/src/components/FormField.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  error?: string;
  isValid?: boolean;
  helper?: string;
  children: ReactNode;
}

export default function FormField({
  label,
  value,
  error,
  isValid,
  helper,
  children
}: FormFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <label className="block text-sm font-medium text-white mb-2">
        {label}
      </label>

      <motion.div
        animate={{
          borderColor: isValid 
            ? '#10b981' 
            : error 
            ? '#ef4444' 
            : '#4b5563',
          backgroundColor: isValid 
            ? 'rgba(16,185,129,0.05)' 
            : 'transparent'
        }}
        transition={{ duration: 0.2 }}
        className="border border-slate-700 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500"
      >
        {children}
      </motion.div>

      {isValid && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="mt-2 text-green-500 text-sm flex items-center gap-1"
        >
          ✓ Campo válido
        </motion.div>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-red-500 text-sm"
        >
          {error}
        </motion.p>
      )}

      {helper && !error && (
        <p className="mt-2 text-slate-400 text-sm">
          {helper}
        </p>
      )}
    </motion.div>
  );
}
```

**Tempo:** 1 hora

---

#### ✅ Tarefa 8: Adicionar Toast de Sucesso
**Local:** `frontend/src/components/SuccessToast.tsx`

```typescript
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SuccessToastProps {
  message: string;
  duration?: number;
  onDismiss?: () => void;
}

export default function SuccessToast({
  message,
  duration = 4000,
  onDismiss
}: SuccessToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 10, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3"
        >
          <span className="text-xl">✓</span>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Tempo:** 45 min

---

### SEMANA 3: Integração & Testes

#### ✅ Tarefa 9: Integrar Auth com Onboarding
**Local:** `frontend/src/pages/auth/[...nextauth].ts` (se usar NextAuth)

```typescript
// Adicionar callback para redirecionar para onboarding após registro
callbacks: {
  async redirect({ user, account, profile, baseUrl }) {
    // Se primeiro login, ir para onboarding
    if (user.isNewUser) {
      return `${baseUrl}/onboarding`;
    }
    return baseUrl;
  }
}
```

**Tempo:** 1 hora

---

#### ✅ Tarefa 10: Testes em Diferentes Telas
**Executar:**

```bash
# Verificar mobile (375px)
Chrome DevTools → Toggle Device Toolbar → iPhone SE (375px)

# Verificar tablet (768px)
iPad (768px)

# Verificar landscape
Rotate device

# Verificar dark mode
System Preferences → Dark mode

# Verificar reduced motion
System Preferences → Accessibility → Reduce motion
```

**Checklist:**
- [ ] Onboarding funciona em mobile
- [ ] Animações não quebram no landscape
- [ ] Cores têm contraste ≥ 4.5:1
- [ ] Animações desabilitam com `prefers-reduced-motion`
- [ ] Dark mode funciona corretamente

**Tempo:** 2 horas

---

#### ✅ Tarefa 11: Otimizar Performance
**Arquivo:** `frontend/src/pages/onboarding.tsx`

```typescript
import dynamic from 'next/dynamic';

// Lazy load o componente pesado
const OnboardingForm = dynamic(() => import('@/components/OnboardingForm'), {
  loading: () => <SkeletonLoader />,
  ssr: false
});
```

**Verificar com Chrome DevTools:**
- Lighthouse score ≥ 80
- Time to Interactive (TTI) < 2s
- Largest Contentful Paint (LCP) < 1.5s

**Tempo:** 1 hora

---

## 🎬 Resumo de Arquivos Criados

| Arquivo | Descrição |
|---------|-----------|
| `OnboardingForm.tsx` | Componente principal do onboarding (3 passos) |
| `ProgressIndicator.tsx` | Indicador visual de progresso |
| `FormField.tsx` | Campo com validação em tempo real |
| `SuccessToast.tsx` | Toast de confirmação |
| `pages/onboarding.tsx` | Página de onboarding |
| `tailwind.config.js` | Atualizado com design system |
| `globals.css` | Animações customizadas |
| `common.json` | Microcópias traduzidas |

---

## 📊 Timing Total

| Semana | Tarefa | Tempo | Status |
|--------|--------|-------|--------|
| 1 | Design System | 30 min | ⏳ TODO |
| 1 | OnboardingForm | 1h | ⏳ TODO |
| 1 | ProgressIndicator | 30 min | ⏳ TODO |
| 1 | Microcópias | 45 min | ⏳ TODO |
| 1 | Página Onboarding | 1h | ⏳ TODO |
| **Semana 1** | **Total** | **3h 45min** | - |
| 2 | Animações Globais | 30 min | ⏳ TODO |
| 2 | FormField | 1h | ⏳ TODO |
| 2 | SuccessToast | 45 min | ⏳ TODO |
| **Semana 2** | **Total** | **2h 15min** | - |
| 3 | Integração Auth | 1h | ⏳ TODO |
| 3 | Testes | 2h | ⏳ TODO |
| 3 | Performance | 1h | ⏳ TODO |
| **Semana 3** | **Total** | **4h** | - |
| **TOTAL** | **11 Tarefas** | **10h** | - |

---

## 🚀 Como Rodar Agora

### Opção 1: Começar Imediatamente
```bash
# Terminal 1 - Backend
cd prototipo-mvp/backend && npm run dev

# Terminal 2 - Frontend
cd prototipo-mvp/frontend && npm run dev

# Acesse: http://localhost:3000/onboarding
```

### Opção 2: Com Seu Próprio Passo
1. Leia `UX_OPTIMIZATION_PLAN.md` completo
2. Decida qual tarefa fazer primeiro
3. Siga o guia de implementação

---

## 💡 Dicas de Implementação

### Para Framer Motion
- Use `motion.div` para elementos animados
- Imports: `import { motion, AnimatePresence } from 'framer-motion'`
- Sempre use `mode="wait"` com `AnimatePresence` para evitar overlap

### Para Tailwind
- Use classes como `from-indigo-500 to-purple-500` para gradientes
- Dark mode é automático com Tailwind (já está no projeto)
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)

### Para next-i18next
- Use `const { t } = useTranslation('common')`
- Chamar `t('key.nested.path')`
- Não esqueça de adicionar keys em todos os 8 idiomas

### Para Performance
- Lazy load componentes pesados com `dynamic()`
- Use `memo` para componentes que não precisam re-render
- Verifique com Lighthouse regularly

---

## ✅ Checklist Pré-Entrega

- [ ] Todas as 11 tarefas completadas
- [ ] Testes em mobile, tablet, desktop
- [ ] Dark mode funciona
- [ ] Reduced motion funciona
- [ ] Lighthouse score ≥ 80
- [ ] Microcópias em português estão boas
- [ ] Animações não têm jitter
- [ ] Nenhum console error/warning
- [ ] Acessibilidade (focus states, aria-labels)
- [ ] Redirecionamento após onboarding funciona

---

## 📞 Dúvidas?

Consulte:
1. **UX_OPTIMIZATION_PLAN.md** — Design system e componentes
2. **Este arquivo** — Implementação step-by-step
3. **docs/** — Documentação técnica do projeto
4. **Framer Motion Docs** — https://www.framer.com/motion/

---

**Bom trabalho! 🎉**

Quando terminar, você terá:
✅ Onboarding progressivo e confiável  
✅ Animações fluidas e profissionais  
✅ Feedback visual em cada passo  
✅ Experiência mobile-first  
✅ Suporte para 8 idiomas  

Tudo isso construindo confiança do usuário do **primeiro clique** até a primeira vaga visualizada! 🚀
