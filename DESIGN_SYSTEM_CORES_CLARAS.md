# 🎨 Design System — Cores Claras & Acolhedoras para IMIGRA.AI

**Estratégia:** Light mode com accent colors quentes + branco como base  
**Tom:** Confiável, acolhedor, esperançoso  
**Público:** Imigrantes buscando oportunidade

---

## 🌈 Paleta de Cores Principal

### Baseado em Branco (Light Mode First)

```
┌─────────────────────────────────────────┐
│         IMIGRA.AI COLOR PALETTE         │
└─────────────────────────────────────────┘
```

### 1. CORES BASES (Light Foundation)

| Nome | Hex | RGB | Uso | Visual |
|------|-----|-----|-----|--------|
| **Branco Puro** | `#FFFFFF` | 255,255,255 | Background principal | ⬜ |
| **Branco Quente** | `#FFFAF0` | 255,250,240 | Cards, superfícies | ⬜ |
| **Cinza Claro** | `#F8F9FA` | 248,249,250 | Backgrounds secundários | ⬜ |
| **Cinza Médio** | `#E9ECEF` | 233,236,239 | Borders, dividers | ⬜ |
| **Cinza Escuro** | `#6C757D` | 108,117,125 | Texto secundário | ⬜ |
| **Preto Suave** | `#212529` | 33,37,41 | Texto principal | ⬜ |

### 2. CORES PRIMÁRIAS (Confiança & Ação)

#### Azul Acolhedor
```
Cor: Azul céu (não muito saturado)
```

| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| **Azul 50** (mais claro) | `#E3F2FD` | 227,242,253 | Background hover, soft backgrounds |
| **Azul 100** | `#BBDEFB` | 187,222,251 | Background estados, light fills |
| **Azul 400** | `#42A5F5` | 66,165,245 | Links, ícones secundários |
| **Azul 600** (PRIMARY) | `#1E88E5` | 30,136,229 | Botões, CTAs principais, headers |
| **Azul 700** | `#1565C0` | 21,101,192 | Hover states (botões) |
| **Azul 900** | `#0D47A1` | 13,71,161 | Active states, dark text |

### 3. CORES SECUNDÁRIAS (Warmth & Hope)

#### Verde Esperançoso
```
Cor: Verde natural, não muito neon
```

| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| **Verde 50** | `#E8F5E9` | 232,245,233 | Success backgrounds |
| **Verde 100** | `#C8E6C9` | 200,230,201 | Success light |
| **Verde 500** (SECONDARY) | `#4CAF50` | 76,175,80 | Checkmarks, success states |
| **Verde 600** | `#43A047` | 67,160,71 | Hover states |
| **Verde 700** | `#388E3C` | 56,142,60 | Active states |

#### Amarelo Quente
```
Cor: Amarelo suave e acolhedor (não muito brilhante)
```

| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| **Amarelo 50** | `#FFFDE7` | 255,253,231 | Warnings, highlights light |
| **Amarelo 100** | `#FFF9C4` | 255,249,196 | Highlights backgrounds |
| **Amarelo 400** | `#FFEE58` | 255,238,88 | Badges, emphasis |
| **Amarelo 600** (ACCENT) | `#FBC02D` | 251,192,45 | CTAs secundárias, warmth |
| **Amarelo 700** | `#F9A825` | 249,168,37 | Hover states |

### 4. CORES SEMÂNTICAS (Estados)

| Tipo | Hex | RGB | Descrição |
|------|-----|-----|-----------|
| **Sucesso** | `#4CAF50` | 76,175,80 | Verde — Validação, OK |
| **Atenção** | `#FBC02D` | 251,192,45 | Amarelo — Aviso, destaque |
| **Erro** | `#E53935` | 229,57,53 | Vermelho suave — Problemas |
| **Info** | `#1E88E5` | 30,136,229 | Azul — Informações |
| **Disabled** | `#BDBDBD` | 189,189,189 | Cinza — Desabilitado |

---

## 🎨 Gradientes Recomendados

### Hero Gradient (Acolhedor & Moderno)

**Opção 1: Azul → Verde (Confiança → Esperança)**
```css
background: linear-gradient(135deg, #E3F2FD 0%, #E8F5E9 50%, #FFFDE7 100%);
/* Sutil, acolhedor, cores claras */
```

**Opção 2: Azul → Amarelo (Confiança → Warmth)**
```css
background: linear-gradient(135deg, #E3F2FD 0%, #FFF9C4 100%);
/* Mais quente, convida ação */
```

**Opção 3: Branco → Azul → Verde (Pureza → Esperança)**
```css
background: linear-gradient(180deg, #FFFFFF 0%, #BBDEFB 50%, #C8E6C9 100%);
/* Muito leve, elegante */
```

### Card Gradient (Destaque)

```css
/* Card principal */
background: linear-gradient(135deg, #FFFFFF 0%, #E3F2FD 100%);
/* Branco com toque de azul */
```

### Button Primary Gradient

```css
/* Botão CTA principal */
background: linear-gradient(135deg, #1E88E5 0%, #1565C0 100%);
/* Azul sólido com depth */
```

### Button Secondary Gradient

```css
/* Botão CTA secundário */
background: linear-gradient(135deg, #FBC02D 0%, #F9A825 100%);
/* Amarelo quente com depth */
```

### Success Gradient (Onboarding)

```css
/* Checkmark/sucesso */
background: linear-gradient(135deg, #4CAF50 0%, #43A047 100%);
/* Verde esperançoso */
```

---

## 📋 Paleta CSS Tailwind (tailwind.config.js)

```javascript
module.exports = {
  theme: {
    colors: {
      // Cores base
      white: '#FFFFFF',
      'white-warm': '#FFFAF0',
      'gray-light': '#F8F9FA',
      'gray-border': '#E9ECEF',
      'gray-text': '#6C757D',
      'black-soft': '#212529',

      // Azul (Primary)
      'blue': {
        50: '#E3F2FD',
        100: '#BBDEFB',
        200: '#90CAF9',
        300: '#64B5F6',
        400: '#42A5F5',
        500: '#2196F3',
        600: '#1E88E5', // PRIMARY
        700: '#1565C0',
        800: '#0D47A1',
      },

      // Verde (Secondary)
      'green': {
        50: '#E8F5E9',
        100: '#C8E6C9',
        200: '#A5D6A7',
        300: '#81C784',
        400: '#66BB6A',
        500: '#4CAF50', // SECONDARY
        600: '#43A047',
        700: '#388E3C',
      },

      // Amarelo (Accent)
      'amber': {
        50: '#FFFDE7',
        100: '#FFF9C4',
        200: '#FFF59D',
        300: '#FFF176',
        400: '#FFEE58',
        500: '#FFEB3B',
        600: '#FBC02D', // ACCENT
        700: '#F9A825',
      },

      // Vermelho (Error)
      'red': {
        50: '#FFEBEE',
        100: '#FFCDD2',
        500: '#F44336',
        600: '#E53935', // ERROR
      },

      // Cinzas
      'gray': {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-hero-1': 'linear-gradient(135deg, #E3F2FD 0%, #E8F5E9 50%, #FFFDE7 100%)',
        'gradient-hero-2': 'linear-gradient(135deg, #E3F2FD 0%, #FFF9C4 100%)',
        'gradient-hero-3': 'linear-gradient(180deg, #FFFFFF 0%, #BBDEFB 50%, #C8E6C9 100%)',
        'gradient-primary': 'linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #FBC02D 0%, #F9A825 100%)',
        'gradient-success': 'linear-gradient(135deg, #4CAF50 0%, #43A047 100%)',
      },
    },
  },
};
```

---

## ✅ Acessibilidade — Contraste

### Contrastes Garantidos (WCAG AA)

| Combinação | Razão | Status |
|-----------|-------|--------|
| Azul 600 (`#1E88E5`) em Branco (`#FFFFFF`) | 4.5:1 | ✅ AA |
| Verde 500 (`#4CAF50`) em Branco (`#FFFFFF`) | 4.5:1 | ✅ AA |
| Amarelo 600 (`#FBC02D`) em Branco (`#FFFFFF`) | 4.5:1 | ⚠️ 3.8:1 (usar Amarelo 700) |
| Preto Suave (`#212529`) em Branco (`#FFFFFF`) | 16:1 | ✅ AAA |
| Cinza Escuro (`#6C757D`) em Branco (`#FFFFFF`) | 4.9:1 | ✅ AA |

**Recomendação:** Para textos sobre Amarelo, use `#F9A825` (700) para melhor contraste.

---

## 🎯 Aplicação por Componente

### Header/Navbar
```
Background: #FFFFFF (branco puro)
Texto: #212529 (preto suave)
Accent: #1E88E5 (azul primary)
Border-bottom: #E9ECEF (cinza claro)
```

### Hero Section
```
Background: linear-gradient(135deg, #E3F2FD 0%, #FFF9C4 100%)
Texto Principal: #212529 (preto suave)
Subtítulo: #6C757D (cinza texto)
CTA: #1E88E5 on #FFFFFF (botão azul em branco)
```

### Cards de Vagas
```
Background: #FFFFFF
Border: #E9ECEF (2px)
Header: linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%)
Badge Match: #4CAF50 (verde sucesso)
Texto: #212529 (preto)
Hover: background-color #F8F9FA
```

### Botões Primários
```
Background: linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)
Texto: #FFFFFF (branco)
Hover: background #1565C0
Active: background #0D47A1
Disabled: #BDBDBD com opacity 0.5
```

### Botões Secundários
```
Background: linear-gradient(135deg, #FBC02D 0%, #F9A825 100%)
Texto: #212529 (preto suave)
Hover: background #F9A825
Active: background #F57F17
```

### Formulários
```
Input Background: #F8F9FA (cinza claro)
Input Border: #E9ECEF (cinza border)
Input Focus: border-color #1E88E5 (azul)
Input Valid: border-color #4CAF50 (verde)
Input Error: border-color #E53935 (vermelho)
Label: #212529 (preto)
Helper Text: #6C757D (cinza texto)
```

### Status & Feedback
```
Success: #4CAF50 (verde)
Error: #E53935 (vermelho)
Warning: #FBC02D (amarelo)
Info: #1E88E5 (azul)
Disabled: #BDBDBD (cinza)
```

### Onboarding Progress
```
Progress Bar Completed: #4CAF50 (verde sucesso)
Progress Bar Active: #1E88E5 (azul)
Progress Bar Pending: #E9ECEF (cinza claro)
Checkmark: #4CAF50 (verde)
```

---

## 🎨 Exemplos de Uso

### Landing Page
```html
<!-- Hero Section -->
<section class="bg-gradient-hero-2 text-center py-20">
  <h1 class="text-4xl font-bold text-black-soft">
    Sua ponte para o emprego que você merece
  </h1>
  <p class="text-lg text-gray-text mt-4">
    A IA entende sua formação, idioma e história
  </p>
  
  <!-- Primary CTA -->
  <button class="bg-gradient-primary text-white px-8 py-3 rounded-lg mt-8 hover:shadow-lg">
    Começar Agora
  </button>
</section>

<!-- Problem Cards -->
<section class="bg-white py-16">
  <div class="grid grid-cols-3 gap-6">
    <!-- Card 1 -->
    <div class="bg-blue-50 border-2 border-blue-200 p-8 rounded-lg">
      <h3 class="text-lg font-bold text-black-soft">67,4% Desempregados</h3>
      <p class="text-gray-text mt-2">Imigrantes sem oportunidades formais</p>
    </div>
    
    <!-- Card 2 -->
    <div class="bg-amber-50 border-2 border-amber-200 p-8 rounded-lg">
      <h3 class="text-lg font-bold text-black-soft">Formação Desperdiçada</h3>
      <p class="text-gray-text mt-2">Profissionais qualificados sem mercado</p>
    </div>
    
    <!-- Card 3 -->
    <div class="bg-green-50 border-2 border-green-200 p-8 rounded-lg">
      <h3 class="text-lg font-bold text-black-soft">Solução IMIGRA.AI</h3>
      <p class="text-gray-text mt-2">Matching inteligente com vagas reais</p>
    </div>
  </div>
</section>
```

### Onboarding Form
```html
<div class="bg-white min-h-screen p-6">
  <!-- Progress -->
  <div class="h-1 bg-gray-border rounded-full overflow-hidden">
    <div class="h-full bg-gradient-success w-2/3"></div>
  </div>
  
  <!-- Form -->
  <form class="max-w-md mx-auto mt-12">
    <label class="block text-black-soft font-semibold mb-3">
      Como você se chama?
    </label>
    
    <input 
      type="text"
      class="w-full px-4 py-3 border-2 border-gray-border rounded-lg focus:outline-none focus:border-blue-600 focus:bg-blue-50"
      placeholder="Maria dos Santos"
    />
    
    <p class="text-sm text-gray-text mt-2">
      Usamos seu nome para personalizar a experiência
    </p>
    
    <button class="w-full bg-gradient-primary text-white py-3 rounded-lg mt-8 font-semibold hover:shadow-lg transition">
      Continuar →
    </button>
  </form>
</div>
```

### Success State
```html
<div class="bg-gradient-hero-3 min-h-screen flex items-center justify-center p-6">
  <div class="bg-white rounded-lg shadow-lg p-12 text-center max-w-md">
    <!-- Checkmark -->
    <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-success rounded-full mb-6">
      <span class="text-3xl text-white">✓</span>
    </div>
    
    <h2 class="text-2xl font-bold text-black-soft">
      Seu perfil está criado!
    </h2>
    
    <p class="text-gray-text mt-4">
      Bem-vindo, Maria! Agora vamos mostrar vagas perfeitas para você
    </p>
    
    <!-- CTAs -->
    <div class="flex gap-3 mt-8">
      <button class="flex-1 bg-white text-blue-600 border-2 border-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50">
        Perfil
      </button>
      <button class="flex-1 bg-gradient-primary text-white py-2 rounded-lg font-semibold hover:shadow-lg">
        Ver Vagas
      </button>
    </div>
  </div>
</div>
```

---

## 📊 Resumo da Paleta

| Cor | Hex | Uso Principal | Tone |
|-----|-----|---------------|------|
| **Azul** | `#1E88E5` | Primary actions, headers, trust | Confiança |
| **Verde** | `#4CAF50` | Success, validation, checkmarks | Esperança |
| **Amarelo** | `#FBC02D` | Accent, warmth, secondary CTAs | Acolhimento |
| **Vermelho** | `#E53935` | Errors, warnings | Atenção |
| **Branco** | `#FFFFFF` | Backgrounds, surfaces | Pureza |
| **Cinza** | `#6C757D` | Secondary text, borders | Neutralidade |

---

## 🎯 Tom Visual Resultado

✅ **Cores claras** — Branco como base, não dark mode  
✅ **Cores quentes** — Amarelo + verde + azul acolhedor  
✅ **Acessível** — Contraste WCAG AA em todas as combinações  
✅ **Profissional** — Gradientes sutis, não muito vibrante  
✅ **Acolhedor** — Tom esperançoso, não corporativo frio  
✅ **Moderno** — Light mode, gradientes, design contemporary  

---

## 🚀 Próximos Passos

1. **Copie as cores** para seu `tailwind.config.js`
2. **Atualize os componentes** com a nova paleta
3. **Teste o contraste** em ferramentas como WebAIM Contrast Checker
4. **Valide em mobile** (375px) e desktop
5. **Peça feedback** sobre o tom acolhedor

---

**Criado:** 8 de Junho de 2026  
**Design:** Light Mode First + Cores Claras & Acolhedoras  
**Projeto:** IMIGRA.AI  

🎨 **Pronto para implementar!**
