# 🎨 Estilo Visual Final — IMIGRA.AI

**Design:** Light Mode + Cores Claras, Quentes e Acolhedoras  
**Paleta:** Branco, Azul (#1E88E5), Verde (#4CAF50), Amarelo (#FBC02D)

---

## 📁 ESTRUTURA: 3 PASTAS PRINCIPAIS

```
imigra-ai/
├── 📂 SITE DE DIVULGAÇÃO (/home, /about, /)
│   └── Landing Page pública
│
├── 📂 LOGIN & CADASTRO (/auth, /onboarding)
│   └── Autenticação + Onboarding progressivo
│
└── 📂 SISTEMA (/dashboard, /jobs, /chat, /profile)
    └── App completo para imigrantes
```

---

# 🌐 SEÇÃO 1: SITE DE DIVULGAÇÃO

## Visual Geral

```
┌─────────────────────────────────────────────────┐
│           IMIGRA.AI — Landing Page              │
│         (Light Mode, Cores Acolhedoras)         │
└─────────────────────────────────────────────────┘
```

### Header/Navbar
```
┌────────────────────────────────────────────────────┐
│  🤖 IMIGRA.AI    [Sobre] [Funcionalidades] [Blog]  │
│                                    [Login] [Cadastro]
└────────────────────────────────────────────────────┘

Cores:
- Background: #FFFFFF (branco puro)
- Texto: #212529 (preto suave)
- Links: #1E88E5 (azul primary)
- Botões: Azul degradado
```

### Hero Section
```
╔════════════════════════════════════════════════╗
║                                                ║
║     Sua ponte para o emprego                   ║
║     que você merece                            ║
║                                                ║
║     A IA entende sua formação, idioma          ║
║     e história                                 ║
║                                                ║
║     [Começar Agora] [Saiba Mais]              ║
║                                                ║
╚════════════════════════════════════════════════╝

Estilo:
- Background: linear-gradient(135deg, #E3F2FD 0%, #FFF9C4 100%)
  (Azul claro → Amarelo quente, muito sutil)
- Texto Principal: #212529 (bold, grande)
- Subtítulo: #6C757D (cinza, leve)
- Botão 1 (Primary): #1E88E5 em #FFFFFF
- Botão 2 (Secondary): Border azul, fundo branco
- Animação: Fade in + slide up suave
```

### Seção: O Problema
```
┌─────────────────────────────────────────────────┐
│  POR QUE IMIGRA.AI?                             │
├─────────────────────────────────────────────────┤
│                                                 │
│  [Card 1]          [Card 2]        [Card 3]    │
│  ┌──────────┐      ┌──────────┐    ┌──────────┐│
│  │          │      │          │    │          ││
│  │ 67,4%    │      │Formação  │    │ Sem      ││
│  │Desempreg│      │Desperdiç│    │Guia      ││
│  │          │      │          │    │          ││
│  └──────────┘      └──────────┘    └──────────┘│
│                                                 │
│  Cores dos Cards:                              │
│  - Card 1: bg-blue-50 (azul muito claro)      │
│  - Card 2: bg-amber-50 (amarelo muito claro)  │
│  - Card 3: bg-green-50 (verde muito claro)    │
│                                                 │
│  Borders: 2px sólida (azul/amarelo/verde)     │
└─────────────────────────────────────────────────┘
```

### Seção: Como Funciona (5 Passos)
```
┌──────────────────────────────────────────┐
│  COMO FUNCIONA                           │
├──────────────────────────────────────────┤
│                                          │
│  ① Cadastro       ② IA Analisa  ③ Match│
│    Rápido          Seu Perfil    Vagas  │
│    (30s)                                 │
│      ↓               ↓             ↓     │
│  ④ Guia Doc      ⑤ Comece        │
│    Revalidação    Trabalhar       │
│                                          │
│  Ícones com cores:                      │
│  - ① Azul (#1E88E5)                    │
│  - ② Verde (#4CAF50)                   │
│  - ③ Amarelo (#FBC02D)                 │
│  - ④ Azul (#1E88E5)                    │
│  - ⑤ Verde (#4CAF50)                   │
│                                          │
└──────────────────────────────────────────┘
```

### Seção: Funcionalidades (4 Cards Grande)
```
┌─────────────────────────────────────────────┐
│ NOSSAS FUNCIONALIDADES                      │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────┐  ┌──────────────┐       │
│  │ 🧠 Matching  │  │ 👥 Comunidade│       │
│  │ Inteligente  │  │ de Imigrantes│       │
│  │              │  │              │       │
│  │ Descrição... │  │ Descrição... │       │
│  │ [Saiba Mais] │  │ [Saiba Mais] │       │
│  └──────────────┘  └──────────────┘       │
│                                             │
│  ┌──────────────┐  ┌──────────────┐       │
│  │ 📋 Guia Docs │  │ 💬 Chat IA   │       │
│  │ Revalidação  │  │ 24/7         │       │
│  │              │  │              │       │
│  │ Descrição... │  │ Descrição... │       │
│  │ [Saiba Mais] │  │ [Saiba Mais] │       │
│  └──────────────┘  └──────────────┘       │
│                                             │
│  Estilo dos Cards:                         │
│  - Background: #FFFFFF (branco)            │
│  - Border: 1px solid #E9ECEF              │
│  - Shadow: sutil (0 4px 12px rgba...)     │
│  - Hover: bg-light-gray, shadow maior     │
│  - Ícones: cores diferentes por card      │
│                                             │
└─────────────────────────────────────────────┘
```

### Seção: Segmentos (Vagas por Área)
```
┌──────────────────────────────────────────┐
│ VAGAS PARA PROFISSIONAIS                 │
├──────────────────────────────────────────┤
│                                          │
│  [🍽️ Restaurante]  [💇 Salão]          │
│   47 vagas         32 vagas              │
│                                          │
│  [🏋️ Academia]    [🏗️ Construção]      │
│   18 vagas         156 vagas             │
│                                          │
│  Cores:                                  │
│  - Cada card tem cor diferente          │
│  - Fundo gradiente suave (não saturado) │
│  - Números grandes em verde sucesso     │
│                                          │
└──────────────────────────────────────────┘
```

### CTA Final
```
╔════════════════════════════════════════╗
║                                        ║
║  Pronto para começar?                  ║
║                                        ║
║  [🚀 COMECE AGORA]                     ║
║                                        ║
║  Ou entenda melhor:                    ║
║  [Ver Demo] [Agendar Conversa]         ║
║                                        ║
╚════════════════════════════════════════╝

Fundo: Azul claro degradado (#E3F2FD → #FFFFFF)
Botão: Azul primary (#1E88E5)
```

### Footer
```
┌─────────────────────────────────────────┐
│ IMIGRA.AI © 2026                        │
│                                         │
│ [Sobre] [Termos] [Privacidade]         │
│ [Twitter] [LinkedIn] [WhatsApp]        │
│                                         │
│ Desenvolvido com ❤️ para imigrantes    │
└─────────────────────────────────────────┘

Fundo: #FFFFFF (branco)
Texto: #6C757D (cinza)
```

---

## Resumo Cores Seção 1 (Landing)

| Elemento | Cor | Hex |
|----------|-----|-----|
| **Header BG** | Branco | `#FFFFFF` |
| **Hero BG** | Gradiente Azul→Amarelo | `linear-gradient(135deg, #E3F2FD, #FFF9C4)` |
| **Texto Principal** | Preto suave | `#212529` |
| **Botão Primary** | Azul | `#1E88E5` |
| **Cards BG** | Branco/Cinza | `#FFFFFF` / `#F8F9FA` |
| **Borders** | Cinza claro | `#E9ECEF` |

---

---

# 🔐 SEÇÃO 2: LOGIN & CADASTRO

## Fluxo de Autenticação

### Página: Login (/auth/login)
```
┌─────────────────────────────────────────┐
│                                         │
│  🤖 IMIGRA.AI                           │
│                                         │
│  Bem-vindo de volta!                   │
│                                         │
│  Email:                                 │
│  [_____________________]                │
│                                         │
│  Senha:                                 │
│  [_____________________]  👁️            │
│                                         │
│  [Esqueci a senha]                     │
│                                         │
│  [ENTRAR]                              │
│                                         │
│  Ou [Google Sign In]                   │
│                                         │
│  Novo por aqui? [Criar Conta]          │
│                                         │
└─────────────────────────────────────────┘

Estilo:
- BG: #FFFFFF (branco)
- Input Border: #E9ECEF (cinza claro)
- Input Focus: border-color #1E88E5 (azul)
- Button: bg-gradient-primary (azul gradiente)
- Links: #1E88E5 (azul)
```

---

## Onboarding (4 Passos Progressivos)

### Passo 1: Welcome
```
╔════════════════════════════════════════╗
║                                        ║
║        Olá! 👋                          ║
║                                        ║
║   Vamos montar seu perfil              ║
║   em 3 passos simples                  ║
║                                        ║
║   Leva menos de 2 minutos              ║
║                                        ║
║   [Começar] [Voltar ao Login]          ║
║                                        ║
╚════════════════════════════════════════╝

Fundo: linear-gradient(180deg, #FFFFFF → #E3F2FD)
Animação: Fade in + Slide up (300ms)
```

### Passo 2: Dados Essenciais
```
┌─────────────────────────────────────────┐
│ Passo 1 de 3                            │
│ ███░░░░░░░░░░░░░░░░░░░░░░  33%        │
├─────────────────────────────────────────┤
│                                         │
│ Como você se chama?                    │
│ ┌─────────────────────────────────┐   │
│ │ Maria dos Santos            ✓   │   │
│ └─────────────────────────────────┘   │
│ Helper text: Usamos seu nome...       │
│                                         │
│ Seu e-mail?                            │
│ ┌─────────────────────────────────┐   │
│ │ maria@example.com               │   │
│ └─────────────────────────────────┘   │
│                                         │
│                      [Continuar →]     │
│                                         │
└─────────────────────────────────────────┘

Cores:
- Progress Bar: #4CAF50 (verde sucesso)
- Input Valid: border-color #4CAF50
- Input Focus: bg-blue-50, border #1E88E5
- Button: bg-gradient-primary
- Checkmark: #4CAF50 (verde)
```

### Passo 3: Profissão
```
┌─────────────────────────────────────────┐
│ Passo 2 de 3                            │
│ ██████░░░░░░░░░░░░░░░░░░░░░░  66%     │
├─────────────────────────────────────────┤
│                                         │
│ Qual era sua profissão?                │
│ Helper: Traduzimos seu título...      │
│                                         │
│ ┌─────────────────────────────────┐   │
│ │ [Selecione...               ▼] │   │
│ │ • Médico/a                      │   │
│ │ • Engenheiro/a                  │   │
│ │ • Professor/a                   │   │
│ │ • Contador/a                    │   │
│ └─────────────────────────────────┘   │
│                                         │
│ Feedback: "Perfeito! Temos 47 vagas   │
│ para Médicos"                          │
│ [Cor: #4CAF50 verde + ícone ✓]        │
│                                         │
│  [← Voltar]        [Continuar →]      │
│                                         │
└─────────────────────────────────────────┘
```

### Passo 4: Idioma
```
┌─────────────────────────────────────────┐
│ Passo 3 de 3                            │
│ ███████████████░░░░░░░░░░░░░  100%    │
├─────────────────────────────────────────┤
│                                         │
│ Qual seu idioma preferido?             │
│ Helper: Você pode mudar depois         │
│                                         │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│ │PT-BR │ │ ES   │ │ EN   │ │ FR   │  │
│ └──────┘ └──────┘ └──────┘ └──────┘  │
│                                         │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│ │ HT   │ │ AR   │ │ UK   │ │ RU   │  │
│ └──────┘ └──────┘ └──────┘ └──────┘  │
│                                         │
│ Cores dos botões:                      │
│ - Default: bg-white, border #E9ECEF  │
│ - Selected: bg-gradient-primary       │
│ - Hover: bg-gray-light, scale 1.05   │
│                                         │
│  [← Voltar]   [🚀 Começar a usar!]    │
│                                         │
└─────────────────────────────────────────┘
```

### Tela de Sucesso
```
╔════════════════════════════════════════╗
║                                        ║
║              ✅                        ║
║  (Checkmark animado em círculo verde) ║
║                                        ║
║  Seu perfil está criado!              ║
║                                        ║
║  Bem-vindo, Maria! 👋                 ║
║                                        ║
║  Agora vamos mostrar vagas             ║
║  perfeitas para você                  ║
║                                        ║
║  [Ver Vagas] [Dashboard] [Chat IA]   ║
║                                        ║
╚════════════════════════════════════════╝

Cores:
- Checkmark BG: #4CAF50 (verde sucesso)
- Fundo: linear-gradient(180deg, #E3F2FD, #E8F5E9)
- Botões: Azul primary + secundários
- Animação: Confetti opcional, bounce checkmark
```

---

## Resumo Cores Seção 2 (Auth)

| Elemento | Cor | Hex |
|----------|-----|-----|
| **Fundo** | Branco | `#FFFFFF` |
| **Progress Bar** | Verde | `#4CAF50` |
| **Input Focus** | Azul claro | `#E3F2FD` |
| **Input Valid** | Verde | `#4CAF50` |
| **Botão Primary** | Azul | `#1E88E5` |
| **Checkmark** | Verde | `#4CAF50` |

---

---

# 🎯 SEÇÃO 3: SISTEMA (Dashboard & App)

## Página: Dashboard (/dashboard)

### Header/Top Bar
```
┌──────────────────────────────────────────────────┐
│  [≡ Menu]  IMIGRA.AI     Bem-vindo, Maria!  [🤖] │
└──────────────────────────────────────────────────┘

Cores:
- Background: #FFFFFF (branco puro)
- Texto: #212529 (preto)
- Ícone Chat: #1E88E5 (azul)
- Border-bottom: #E9ECEF (cinza)
```

### Seção: Profile Status
```
┌─────────────────────────────────────────────────┐
│                                                 │
│  ⭐ Seu perfil está 40% completo               │
│  ┌──────────────────────────────────┐          │
│  │████████░░░░░░░░░░░░░░░░░░░░░░░░│ 40%      │
│  └──────────────────────────────────┘          │
│                                                 │
│  Próximos: Adicione experiência e idiomas     │
│  [Editar Perfil]                               │
│                                                 │
└─────────────────────────────────────────────────┘

Cores:
- Progress Bar: #1E88E5 (azul)
- Background: #F8F9FA (cinza muito claro)
- Button: #1E88E5 (azul)
```

### Seção: Vagas Sugeridas
```
┌─────────────────────────────────────────────────┐
│ VAGAS SUGERIDAS PARA VOCÊ                       │
│ Encontramos 12 vagas que combinam com seu perfil
├─────────────────────────────────────────────────┤
│                                                 │
│ ┌──────────────────────────────────────────┐  │
│ │ Médico — Clínica ABC                     │  │
│ │ São Paulo, SP                            │  │
│ │                                          │  │
│ │ Seu match: 95% ██████████░░░░░░░░ ✓     │  │
│ │ Salário: R$ 4.000 - R$ 6.000             │  │
│ │                                          │  │
│ │ Seu perfil combina porque:               │  │
│ │ ✓ Formado em Medicina                   │  │
│ │ ✓ Experiência 8 anos                    │  │
│ │ ✓ Fala português fluente                │  │
│ │                                          │  │
│ │ [Candidatar]  [Salvar]  [Saiba Mais]    │  │
│ └──────────────────────────────────────────┘  │
│                                                 │
│ ┌──────────────────────────────────────────┐  │
│ │ Médico — Hospital XYZ                    │  │
│ │ (Similar...)                             │  │
│ └──────────────────────────────────────────┘  │
│                                                 │
│ [Carregar Mais Vagas]                          │
│                                                 │
└─────────────────────────────────────────────────┘

Cores dos Cards de Vagas:
- Background: #FFFFFF (branco)
- Border: 1px solid #E9ECEF (cinza)
- Match: #4CAF50 (verde — sucesso)
- Salary: #212529 (preto — destaque)
- Hover: shadow maior, scale 1.02
- Buttons:
  - Candidatar: bg-gradient-primary (azul)
  - Salvar: bg-white, border #1E88E5
  - Saiba Mais: text-blue-600, sem background
```

### Seção: Comunidade
```
┌──────────────────────────────────────────────┐
│ COMUNIDADE IMIGRA.AI                         │
│ Conecte com outros imigrantes                │
├──────────────────────────────────────────────┤
│                                              │
│ ┌────────────┐  ┌────────────┐ ┌──────────┐│
│ │👥 Médicos  │  │👥 Salão    │ │👥 Eng    ││
│ │ 234 membros│  │ 156 membros│ │ 89 memb. ││
│ │ 47 vagas   │  │ 18 vagas   │ │ 12 vagas ││
│ └────────────┘  └────────────┘ └──────────┘│
│                                              │
│ [Entrar] [Entrar] [Entrar]                  │
│                                              │
└──────────────────────────────────────────────┘

Cores:
- Card BG: Degradiente sutil (cada card diferente)
- Card 1: blue-50 (#E3F2FD)
- Card 2: amber-50 (#FFFDE7)
- Card 3: green-50 (#E8F5E9)
- Números: verde (#4CAF50)
```

### Seção: Seu Progresso
```
┌──────────────────────────────────────────┐
│ SEU CAMINHO ATÉ O EMPREGO                │
├──────────────────────────────────────────┤
│                                          │
│ ✓ Perfil criado         ━━━━━━         │
│ ○ Documentos validados  ━━━━           │
│ ○ Primeira entrevista   ━━             │
│ ○ Oferta recebida       ─              │
│                                          │
│ Estimado: 30 dias para primeira oferta │
│                                          │
└──────────────────────────────────────────┘

Cores:
- Done (✓): #4CAF50 (verde)
- Pending (○): #E9ECEF (cinza claro)
- Line: Gradiente verde → cinza
```

---

## Página: Detalhes de Vaga (/jobs/[id])

```
[← Voltar]

┌─────────────────────────────────────────────┐
│ Médico                                      │
│ Clínica ABC · São Paulo, SP                 │
│                                             │
│ R$ 4.000 - R$ 6.000                         │
│ Seu match: 95% ██████████░░░░░░░░ ✓        │
│                                             │
│ ┌─────────────────────────────────────────┐│
│ │                                         ││
│ │ DESCRIÇÃO                               ││
│ │ Procuramos médico com experiência...    ││
│ │                                         ││
│ │ REQUISITOS                              ││
│ │ • Formação em Medicina                  ││
│ │ • Experiência 5+ anos                   ││
│ │ • Português fluente                     ││
│ │                                         ││
│ │ POR QUE VOCÊ COMBINA                    ││
│ │ ✓ Formado em Medicina                   ││
│ │ ✓ Experiência 8 anos                    ││
│ │ ✓ Fala português fluente                ││
│ │                                         ││
│ └─────────────────────────────────────────┘│
│                                             │
│ [Candidatar Agora] [Chat com IA Sobre Vaga]│
│ [Salvar Vaga]      [Compartilhar]          │
│                                             │
└─────────────────────────────────────────────┘

Cores:
- Header: bg-gradient (azul claro ao branco)
- Match: verde (#4CAF50)
- Checkmarks: verde (#4CAF50)
- CTA: bg-gradient-primary (azul)
```

---

## Página: Chat com IA (/chat)

```
┌────────────────────────────────────────────┐
│  🤖 Assistente IA                [⚙️]      │
├────────────────────────────────────────────┤
│                                            │
│  IA: Olá Maria! 👋                         │
│  Como posso ajudar?                       │
│                                            │
│  [Como validar diploma?]                   │
│  [Documentos necessários]                  │
│  [Direitos trabalhistas]                   │
│  [Dicas de currículo]                      │
│                                            │
│  Maria: Como faço para validar meu       │
│  diploma?                                 │
│                                            │
│  IA: Ótimo! A revalidação de diplomas    │
│  é essencial. No Brasil, o processo     │
│  varia por profissão...                   │
│                                            │
│  [Saiba mais sobre revalidação]           │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ Sua mensagem... [Enviar]  [🎤]       │ │
│  └──────────────────────────────────────┘ │
│                                            │
└────────────────────────────────────────────┘

Cores:
- Header: #FFFFFF (branco)
- IA Message: bg-blue-50 (#E3F2FD)
- User Message: bg-gradient-primary (#1E88E5)
- Text IA: #212529 (preto)
- Text User: #FFFFFF (branco)
- Input: bg-gray-light (#F8F9FA), border #E9ECEF
- Quick Actions: border #1E88E5, text #1E88E5
```

---

## Página: Perfil (/profile)

```
┌────────────────────────────────────────────┐
│  MEU PERFIL                                │
├────────────────────────────────────────────┤
│                                            │
│  [👤] Maria dos Santos                    │
│  Médica com 8 anos de experiência         │
│                                            │
│  ⭐ 40% completo                          │
│  ┌─────────────────────────────────────┐ │
│  │████████░░░░░░░░░░░░░░░░░░░░░░░░░││
│  └─────────────────────────────────────┘ │
│                                            │
│  DADOS BÁSICOS                             │
│  Nome: Maria dos Santos ✓                 │
│  Email: maria@example.com ✓               │
│  Telefone: (11) 98765-4321 ✓              │
│                                            │
│  PROFISSIONAL                              │
│  Profissão: Médica                        │
│  Experiência: 8 anos                      │
│  [Editar]                                  │
│                                            │
│  IDIOMAS                                   │
│  • Português (fluente)                    │
│  • Espanhol (básico)                      │
│  [Adicionar]                               │
│                                            │
│  DOCUMENTOS                                │
│  □ Diploma (validar)                      │
│  □ Antecedentes                           │
│  [Fazer Upload]                            │
│                                            │
│  [Editar Perfil] [Sair]                   │
│                                            │
└────────────────────────────────────────────┘

Cores:
- Header: #FFFFFF (branco)
- Sections: bg-gray-light (#F8F9FA)
- Checkmarks: #4CAF50 (verde)
- Botões: azul (#1E88E5)
```

---

## Resumo Cores Seção 3 (System)

| Elemento | Cor | Hex |
|----------|-----|-----|
| **Header** | Branco | `#FFFFFF` |
| **Fundo** | Branco/Cinza | `#FFFFFF` / `#F8F9FA` |
| **Progress** | Azul | `#1E88E5` |
| **Match/Success** | Verde | `#4CAF50` |
| **Botão Primary** | Azul Gradiente | `linear-gradient(...)` |
| **Botão Secondary** | Amarelo | `#FBC02D` |
| **Card BG** | Branco | `#FFFFFF` |
| **Borders** | Cinza | `#E9ECEF` |

---

---

## 📊 RESUMO GERAL: 3 SEÇÕES

| Seção | Foco | Cores Principais | Tom |
|-------|------|------------------|-----|
| **1. Site Divulgação** | Convencer | Azul + Verde + Amarelo + Branco | Acolhedor |
| **2. Login/Cadastro** | Onboarding | Verde + Azul + Branco | Esperançoso |
| **3. Sistema** | Usar Diariamente | Azul + Verde + Amarelo | Profissional |

---

## 🎯 Características Visuais Gerais

✅ **Light Mode** — Branco como base em tudo  
✅ **Cores Claras** — Paleta suave, não saturada  
✅ **Acolhedor** — Azul céu + Verde esperança + Amarelo warmth  
✅ **Moderno** — Gradientes sutis, cards limpos, spacing generoso  
✅ **Acessível** — Contraste WCAG AA garantido  
✅ **Responsivo** — Mobile-first, funciona em 375px até 1440px  
✅ **Animado** — Transições suaves (150-300ms), feedback visual  

---

**Design criado:** 8 de Junho de 2026  
**Projeto:** IMIGRA.AI  
**Paleta:** Light Mode + Cores Quentes e Acolhedoras  

🎨 **Pronto para desenvolvimento!**
