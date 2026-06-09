# 🎨 PROMPT PARA IA DESIGNER — IMIGRA.AI Mockup/Protótipo

**Objetivo:** Criar visualização completa do site IMIGRA.AI antes de codificar

---

## 📝 Prompt para Copiar e Colar

```
Tu és um designer de UX/UI especializado em aplicações web modernas.
Teu objetivo é criar um protótipo/mockup VISUAL completo do IMIGRA.AI.

### CONTEXTO DO PROJETO:
- Nome: IMIGRA.AI
- Propósito: Conectar imigrantes com oportunidades de emprego usando IA
- Público: Imigrantes (1,5M no Brasil)
- Problema resolvido: 67,4% dos imigrantes estão desempregados ou subempregados
- Stack: Next.js + React + Tailwind + Framer Motion

### DESIGN SYSTEM:
**Cores:**
- Primária: #6366f1 (Índigo) — Confiança, ação
- Secundária: #8b5cf6 (Roxo) — Destaque, energia
- Sucesso: #10b981 (Verde) — Validação
- Erro: #ef4444 (Vermelho) — Problemas
- Background: #0a0a0f (Preto) + #111118 (Cards)
- Texto: #f1f1f3 (Branco) + #9ca3af (Muted)

**Tipografia:**
- Fonte: Outfit
- Títulos: 700 (bold), 32px/24px
- Corpo: 400 (regular), 16px
- Helpers: 400, 14px, cinza-400

**Espaçamento:** 8dp grid (8, 16, 24, 32px)

**Efeitos:**
- Glassmorphism sutil
- Shadows dinâmicas
- Animações Framer Motion (150-300ms)
- Transições suaves (slide + fade)

### PÁGINAS PARA VISUALIZAR:

#### 1. LANDING PAGE (/)
**Objetivo:** Convencer imigrante a se cadastrar

**Seções:**
- [Hero] Grande headline + subtítulo + CTA
  - Headline: "Sua ponte para o emprego que você merece"
  - Subtítulo: "A IA entende sua formação, idioma e história"
  - Botões: "Começar agora" (primário) + "Saiba mais" (secundário)
  - Background: Gradiente escuro com padrão sutil
  - Imagem herói: Robô amigável ou ilustração de imigrantes

- [Problema] "Por que IMIGRA.AI?"
  - 3 Cards mostrando o problema:
    - "67,4% desempregados" + ícone
    - "Formação desperdiçada" + ícone
    - "Sem guia de revalidação" + ícone

- [Solução] "Como funciona"
  - 5 passos (com ícones + títulos + descrições):
    1. Cadastro rápido (30 segundos)
    2. IA analisa seu perfil
    3. Matching com vagas
    4. Guia documentação
    5. Comece a trabalhar

- [Features] "Funcionalidades principais"
  - 4 Cards grandes:
    - 🧠 Matching inteligente
    - 👥 Comunidade de imigrantes
    - 📋 Guia de documentação
    - 💬 Chat com IA

- [Segmentos] "Vagas para:"
  - Cards mostrando setores (restaurante, salão, academia, construção)
  - Com imagens e números ("47 vagas para Médicos")

- [CTA Final] "Comece agora"
  - Grande botão + formulário mínimo (email)

- [Footer] Links + idiomas

**Animações:**
- Hero: Fade in + slide up (300ms)
- Cards: Stagger entrada (100ms between)
- Hover: Scale 1.05 + shadow
- Scroll: Parallax sutil nas imagens

---

#### 2. ONBOARDING (4 PÁGINAS)

##### 2.1 WELCOME (/onboarding/welcome)
```
┌─────────────────────────────┐
│    🤖 IMIGRA.AI            │
│                             │
│  Sua ponte para o emprego   │
│  que você merece            │
│                             │
│  A IA entende sua formação, │
│  idioma e história          │
│                             │
│  [Começar agora] [Saiba+]   │
└─────────────────────────────┘
```

**Estilo:**
- Centrado, minimalista
- Ícone animado 🤖
- Texto aparece em cascata
- Botões com hover effect

---

##### 2.2 PASSO 1: DADOS ESSENCIAIS (/onboarding/step1)
```
┌──────────────────────────────┐
│ Passo 1 de 3                 │
│ ███░░░░░░░░░░░░░░░░ 33%      │
│                              │
│ Como você se chama?          │
│ [Maria dos Santos        ✓]  │
│ Helper: Usamos seu nome...   │
│                              │
│ Seu e-mail?                  │
│ [maria@example.com       ]   │
│                              │
│              [Continuar →]   │
└──────────────────────────────┘
```

**Componentes:**
- Progress bar animada
- 2 Campos de input com labels
- Validação real-time (checkmark verde)
- Helper text contextual
- Botão desabilitado → habilitado

---

##### 2.3 PASSO 2: PROFISSÃO (/onboarding/step2)
```
┌──────────────────────────────┐
│ Passo 2 de 3                 │
│ ██████░░░░░░░░░░░░░░ 66%     │
│                              │
│ Qual era sua profissão?      │
│ Helper: Traduzimos seu...    │
│                              │
│ [Selecione...          ▼]    │
│ • Médico/a                   │
│ • Engenheiro/a               │
│ • Professor/a                │
│ • Contador/a                 │
│ • Outro                      │
│                              │
│ [← Voltar]  [Continuar →]    │
└──────────────────────────────┘
```

**Feedback ao selecionar:**
- Se "Médico": "Ótimo! Temos 47 vagas para Médicos no Brasil"
- Cor muda para verde
- Números reais = construir confiança

---

##### 2.4 PASSO 3: IDIOMA (/onboarding/step3)
```
┌──────────────────────────────┐
│ Passo 3 de 3                 │
│ ███████████████░░░░░ 100%    │
│                              │
│ Qual seu idioma preferido?   │
│ Helper: Você pode mudar...   │
│                              │
│ [PT-BR] [ES] [EN] [FR]       │
│ [HT]    [AR] [UK] [RU]       │
│                              │
│ [← Voltar] [🚀 Começar!]     │
└──────────────────────────────┘
```

**Interação:**
- Cada botão é clicável
- Selected state: cor índigo + checkmark
- Hover: Scale 1.05
- Emoji no CTA cria esperança

---

##### 2.5 SUCESSO (/onboarding/success)
```
┌──────────────────────────────┐
│                              │
│  ✅ Seu perfil está criado!  │
│                              │
│  Bem-vindo, Maria! 👋        │
│                              │
│  Próximos passos:            │
│  □ Veja vagas sugeridas      │
│  □ Complete seu perfil       │
│  □ Converse com IA           │
│                              │
│ [Ver Vagas] [Chat] [Dashboard]
│                              │
└──────────────────────────────┘
```

**Animações:**
- Checkmark bounce (confetti opcional)
- Cards entram em cascata
- Transição suave para dashboard

---

#### 3. DASHBOARD (/dashboard)

**Layout:**
```
┌─────────────────────────────┐
│ [Menu] IMIGRA.AI [🤖 Chat]  │
├─────────────────────────────┤
│ Bem-vindo, Maria! 👋        │
│ ⭐ Perfil 40% completo      │
│                             │
│ [SEÇÃO 1: VAGAS SUGERIDAS]  │
│ Encontramos 12 vagas para   │
│ você nesta semana           │
│                             │
│ Card 1: Médico - Hospital X │
│ Card 2: Médico - Clínica Y  │
│ Card 3: Enfermeira - Hosp Z │
│ ... mais 9 vagas             │
│                             │
│ [SEÇÃO 2: COMUNIDADE]       │
│ Conecte com imigrantes      │
│ - Grupo Médicos Brasil      │
│ - Salas Crioulo Haitiano    │
│ - Engenheiros em SP         │
│                             │
│ [SEÇÃO 3: PROGRESSO]        │
│ Seu caminho até o emprego:  │
│ ✓ Perfil criado             │
│ ○ Documentos validados      │
│ ○ Primeira entrevista       │
│                             │
└─────────────────────────────┘
```

**Cards de Vagas:**
- Título + Empresa + Localização
- Salário (se disponível)
- Nível de match (95%, 87%, etc)
- Botões: "Candidatar" + "Salvar"
- Hover: Elevação + shadow

**Componentes:**
- Top bar com nome do usuário + menu + botão chat
- Seções com títulos
- Cards em grid responsivo
- CTA buttons destacados

---

#### 4. PÁGINA DE VAGA (/jobs/[id])

**Estrutura:**
```
[← Voltar]

[HEADER]
- Título grande: "Médico - Clínica ABC"
- Empresa + Logo
- Localização + Salário
- Nível de match: 95%

[CORPO]
- Descrição da vaga
- Requisitos
- Diferenciais
- Como se candidatar

[SIDEBAR]
- "Seu perfil combina porque:"
  - ✓ Formado em Medicina
  - ✓ Experiência 8 anos
  - ✓ Fala português

[BOTÕES]
- [Candidatar agora]
- [Chat com IA sobre vaga]
```

---

#### 5. CHAT COM IA (/chat)

**Layout:**
```
┌────────────────────────────┐
│ 🤖 Assistente IA           │
├────────────────────────────┤
│ Olá Maria! 👋              │
│ Como posso ajudar?         │
│                            │
│ Perguntas populares:       │
│ • Como validar diploma?    │
│ • Documentos necessários   │
│ • Direitos trabalhistas    │
│ • Currículo para Brasil    │
│                            │
│ [Campo de entrada do chat] │
│ [Enviar] [Microfone]       │
└────────────────────────────┘
```

**Features:**
- Histórico de conversa
- Respostas em tempo real
- Botões de ações rápidas
- Suporte a 8 idiomas
- IA responde sobre revalidação, documentos, etc

---

#### 6. PERFIL DE USUÁRIO (/profile)

**Seções:**
- Foto de perfil + Nome + Profissão
- Resumo: "Médico com 8 anos de experiência"
- Campos editáveis:
  - Experiência profissional
  - Idiomas falados
  - Certificados
  - Disponibilidade
  - Localização preferida

**Botões:**
- Editar perfil
- Fazer upload de documentos
- Configurações

---

### FLUXO DE USUÁRIO ESPERADO:

1. **Landing** → "Que site legal! Tem vagas de verdade"
2. **Onboarding** → "Rápido, só 3 passos!" → Confiança construída
3. **Success** → "Pronto! Vejo vagas já!"
4. **Dashboard** → "12 vagas encontradas! Combina comigo!"
5. **Vaga** → "Vou candidatar aqui"
6. **Chat** → "Preciso dica de currículo, vou perguntar à IA"
7. **Retorno** → "Voltei para ver mais vagas e comunidade"

---

### INTERAÇÕES IMPORTANTES:

**Micro-interações:**
- Validação de campo: ✓ com checkmark
- Erro de campo: ✗ com mensagem em vermelho
- Loading: Skeleton + spinner
- Success: Toast com checkmark
- Hover em botões: Scale + cor mais clara
- Clique em botões: Scale 0.95 (feedback tátil)

**Transições:**
- Entre páginas: Fade + Slide up (300ms)
- Entre passos: Fade + Slide (direction based)
- Modais: Fade + Scale (200ms)

**Animações:**
- Progress bar: Anima de 0 → 100%
- Cards: Stagger entrada (100ms)
- Confetti: Sucesso do onboarding (opcional)
- Lottie animations: Loading, sucesso, erro

---

### REQUISITOS VISUAIS:

**Responsividade:**
- Mobile first (375px)
- Tablet (768px)
- Desktop (1024px+)

**Acessibilidade:**
- Contraste ≥ 4.5:1
- Focus states visíveis
- Aria-labels em botões
- Dark mode suportado
- Reduced motion suportado

**Performance:**
- Imagens otimizadas (WebP)
- Lazy loading
- Code splitting
- Lighthouse ≥ 80

---

### RESULTADO ESPERADO:

Crie uma visualização/mockup/protótipo do site IMIGRA.AI mostrando:
1. ✅ Todas as páginas listadas acima
2. ✅ Design system aplicado (cores, tipografia, espaçamento)
3. ✅ Animações e transições
4. ✅ Estados diferentes (loading, error, success)
5. ✅ Responsividade (mobile + desktop)
6. ✅ Fluxo de usuário completo

**Formato preferido:**
- Usando Gamma.app (apresentação interativa)
- Ou Figma design (wireframes detalhados)
- Ou HTML/Framer (protótipo funcional)
- Ou descrição visual detalhada com ASCII art/wireframes

**Tom:**
- Profissional mas acolhedor
- Confiável (construir confiança)
- Moderno (dark mode, animações suaves)
- Inclusivo (8 idiomas, acessível)

---

### PERGUNTAS PARA GUIAR:

1. Como o usuário sente confiança ao entrar no site?
2. Qual é a experiência visual do onboarding?
3. Como o dashboard motiva o usuário a explorar vagas?
4. Como o chat com IA fica acessível?
5. Como as animações guiam o usuário sem distrair?

Crie uma visualização completa que responda essas perguntas!
```

---

## 🎯 Como Usar Este Prompt:

### Opção 1: Com Gamma.app
```
1. Abra https://gamma.app
2. Clique em "Nova apresentação"
3. Cole o prompt acima
4. Deixa a IA gerar slides visuais
5. Customize cores e layout
```

### Opção 2: Com Figma
```
1. Abra https://figma.com
2. Novo arquivo
3. Cole o prompt em um comment
4. Crie wireframes conforme descrição
5. Use Figma para design final
```

### Opção 3: Com Claude (Esta IA)
```
1. Cole o prompt completo
2. Peça para gerar descrição visual detalhada
3. Peça para gerar wireframes em ASCII
4. Peça para elaborar cada página
5. Salve e revise
```

---

## ✅ Checklist Antes de Codificar:

- [ ] Visualização do site completo pronta
- [ ] Todas as 6 páginas criadas
- [ ] Design system aplicado
- [ ] Animações e interações definidas
- [ ] Responsividade verificada
- [ ] Fluxo de usuário testado
- [ ] Stakeholders aprovaram
- [ ] Pronto para codificar!

---

**Próximo passo:** Cole este prompt em uma ferramenta de design/prototipagem e visualize como ficará o site antes de codificar! 🎨
