# 📋 ESPECIFICAÇÕES TÉCNICAS — IMIGRA.AI

## 🎯 O que será construído?

Um **aplicativo mobile (iOS + Android)** que permite imigrantes buscar vagas de emprego compatíveis com suas habilidades usando inteligência artificial.

---

## 📱 FUNCIONALIDADES PRINCIPAIS (6 Features)

### ✅ 1. AUTENTICAÇÃO E PERFIL

**O que faz:** Permitir que imigrante crie conta e configure seu perfil profissional.

**Fluxo do Usuário:**
```
App abre → Tela de Login → Clica "Criar Conta" 
→ Preenche Email + Senha → Confirma email 
→ Vai para Perfil (4 telas de setup)
```

**Campos do Perfil:**
- Nome completo
- Email
- Telefone
- País de origem
- Idiomas (com fluência: básico/intermediário/avançado)
- Profissão anterior
- Anos de experiência
- Habilidades técnicas (até 10)
- Foto de perfil
- Cidades onde quer trabalhar (multi-select)

**Dados armazenados:** PostgreSQL (tabela `usuarios`)

**Telas:**
- `LoginScreen.js` - Login (email + senha)
- `SignupScreen.js` - Cadastro (4 telas de formulário)
- `ProfileScreen.js` - Editar informações

---

### ✅ 2. MOTOR DE MATCHING COM IA

**O que faz:** Analisar o perfil do imigrante e buscar vagas compatíveis.

**Processo:**
```
INPUT: Perfil do imigrante (habilidades, experiência, idioma)
   ↓
PROCESSAMENTO: IA analisa e "traduz" competências
   ↓
BUSCA: Procura em base de vagas (Indeed API, dados locais)
   ↓
MATCHING: Calcula score 0-100 para cada vaga
   ↓
SAÍDA: Lista de vagas ordenadas por compatibilidade
```

**Score de Compatibilidade (0-100):**
- **30%** = Match de habilidades técnicas
- **25%** = Experiência em anos
- **20%** = Localização (está na cidade desejada?)
- **15%** = Idioma (precisa português? Imigrante tem?)
- **10%** = Nível salarial

**Exemplo:**
```
Vaga: Desenvolvedor Python (São Paulo)
Imigrante: Carlos, engenheiro de software, 5 anos, 
           fala espanhol+português intermediário

Score = 25 (habilidades) + 20 (experiência) + 20 (localização) 
       + 15 (idioma) + 10 (salário) = 90/100 ✅ MUITO COMPATÍVEL
```

**Componente:** `matchingService.js` (backend)

---

### ✅ 3. FEED DE VAGAS

**O que faz:** Mostrar vagas compatíveis de forma clara e acionável.

**Layout da vaga:**
```
┌─────────────────────────────────┐
│ Desenvolvedor Python Pleno      │
│ Empresa: Tech Company            │
│                                  │
│ 📍 São Paulo, SP                │
│ 💰 R$ 5.000 - R$ 8.000/mês      │
│ ⭐ 87% compatibilidade           │
│                                  │
│ Skills requeridas:              │
│ • Python ✓ (você tem)           │
│ • Django ✓ (você tem)           │
│ • PostgreSQL ✗ (falta)          │
│                                  │
│ [Aplicar] [Salvar] [Detalhes]  │
└─────────────────────────────────┘
```

**Funcionalidades:**
- ✓ Listar vagas com score de compatibilidade
- ✓ Filtrar por: cidade, nível, salário, área
- ✓ Salvar vaga como favorita
- ✓ Ver detalhes completos da vaga
- ✓ Aplicar para vaga (registra interesse)
- ✓ Ver histórico de aplicações

**Dados necessários:**
- ID da vaga
- Título
- Empresa
- Descrição
- Salário
- Localização
- Skills requeridas
- Data de postagem

**Telas:**
- `VagasScreen.js` - Feed de vagas
- `VagaDetailScreen.js` - Detalhe da vaga
- `FiltersScreen.js` - Filtros
- `ApplicationsScreen.js` - Minhas aplicações

---

### ✅ 4. REDE SOCIAL — COMUNIDADES

**O que faz:** Conectar imigrantes por cidade, profissão ou nacionalidade.

**Tipos de comunidades:**
- **Por Cidade:** "Imigrantes em São Paulo", "Imigrantes no Rio"
- **Por Profissão:** "Desenvolvedores", "Médicos", "Professores"
- **Por Nacionalidade:** "Venezuelanos no Brasil", "Haitianos"

**Funcionalidades:**
- ✓ Ver comunidades disponíveis
- ✓ Entrar em uma comunidade
- ✓ Ver membros da comunidade
- ✓ Ver histórico de posts
- ✓ Criar post (texto + imagem opcional)
- ✓ Curtir e comentar posts
- ✓ Compartilhar vagas na comunidade

**Layout de Post:**
```
┌──────────────────────────────────┐
│ Carlos (Engenheiro, Venezuela)   │
│ "Consegui emprego como dev! 🎉"  │
│ Dica: vocês acharam difícil o    │
│ processo do CREA?"               │
│                                  │
│ ❤️ 23  💬 5  ↗️ 2                │
└──────────────────────────────────┘
```

**Telas:**
- `ComunidadesScreen.js` - Listagem de comunidades
- `ComunidadeFeedScreen.js` - Feed de comunidade
- `CreatePostScreen.js` - Criar post
- `PostDetailScreen.js` - Detalhes do post

---

### ✅ 5. CHAT COM IA PARA DOCUMENTAÇÃO

**O que faz:** Tirar dúvidas sobre documentação, revalidação de diploma, etc.

**Exemplos de perguntas:**
- "Como revalidar diploma de Engenharia aqui no Brasil?"
- "Que documentos preciso para trabalhar como médico?"
- "Como funciona o visto de trabalho?"
- "Quais cursos você recomenda para melhorar meu português?"

**Fluxo:**
```
Usuário: "Sou médico vindo da Síria, como faço para trabalhar?"
     ↓
IA processa com contexto (é médico, sírio)
     ↓
IA responde com passos específicos para médicos no Brasil
     ↓
IA sugere: CREMESP, revalidação, cursos preparatórios
```

**Integração:** OpenAI API / Claude API

**Telas:**
- `ChatScreen.js` - Chat com IA
- `ChatHistoryScreen.js` - Histórico de conversas

---

### ✅ 6. DASHBOARD DE PROGRESSO

**O que faz:** Mostrar progresso do imigrante no mercado de trabalho.

**Métricas mostradas:**
- Vagas aplicadas (total)
- Vagas salvas
- Taxa de compatibilidade média
- Habilidades para trabalhar (% completo)
- Certificações adicionadas
- Dias como membro

**Layout:**
```
┌────────────────────────────┐
│ Seu Progresso              │
│                            │
│ Vagas vistas: 47           │
│ Vagas aplicadas: 8         │
│ Taxa compatibilidade: 72%  │
│                            │
│ Habilidades:               │
│ ████████░░ 80% completo    │
│                            │
│ Próximos passos:           │
│ • Adicionar certificado    │
│ • Melhorar português       │
└────────────────────────────┘
```

**Tela:**
- `DashboardScreen.js` - Home com progresso

---

## 🎨 FLUXO DE NAVEGAÇÃO

```
LOGIN
  ↓
PERFIL (setup inicial)
  ↓
HOME (Dashboard + feed de vagas)
  ├─→ FEED DE VAGAS
  │     ├─→ Detalhe da vaga
  │     ├─→ Minhas aplicações
  │     └─→ Favoritos
  ├─→ COMUNIDADES
  │     ├─→ Feed de comunidade
  │     ├─→ Criar post
  │     └─→ Membros
  ├─→ CHAT COM IA
  │     └─→ Histórico
  └─→ PERFIL
        ├─→ Editar informações
        ├─→ Meus certificados
        └─→ Configurações
```

---

## 💾 ESTRUTURA DE DADOS

### Tabela: USUARIOS
```
id (PK)
email
senha (hash bcrypt)
nome
pais_origem
idiomas (JSON: {en: 'avançado', pt: 'intermediário'})
profissao
anos_experiencia
habilidades (JSON: ['Python', 'Java', 'UML'])
foto_url
cidades_preferidas (JSON: ['São Paulo', 'Rio de Janeiro'])
data_cadastro (TIMESTAMP)
data_ultimo_acesso (TIMESTAMP)
```

### Tabela: VAGAS
```
id (PK)
titulo
empresa
descricao (TEXT)
salario_min (DECIMAL)
salario_max (DECIMAL)
localizacao
skills_requeridas (JSON)
data_postagem (TIMESTAMP)
fonte (VARCHAR: 'indeed', 'sine', 'manual')
url_externa
ativa (BOOLEAN)
criada_em (TIMESTAMP)
```

### Tabela: APLICACOES
```
id (PK)
usuario_id (FK → usuarios)
vaga_id (FK → vagas)
data_aplicacao (TIMESTAMP)
status (VARCHAR: 'aplicado', 'rejeitado', 'aceito', 'pendente')
score_compatibilidade (INT)
```

### Tabela: COMUNIDADES
```
id (PK)
nome
tipo (VARCHAR: 'cidade', 'profissao', 'nacionalidade')
descricao
imagem_url
data_criacao (TIMESTAMP)
membros_count (INT)
```

### Tabela: POSTS
```
id (PK)
comunidade_id (FK → comunidades)
usuario_id (FK → usuarios)
texto (TEXT)
imagem_url
data_criacao (TIMESTAMP)
curtidas (INT)
comentarios (JSON)
```

### Tabela: CONVERSAS_IA
```
id (PK)
usuario_id (FK → usuarios)
mensagem_usuario (TEXT)
resposta_ia (TEXT)
data (TIMESTAMP)
topico (VARCHAR: 'documentacao', 'cursos', 'visto', 'outro')
```

---

## 🔐 SEGURANÇA

- ✓ Senha armazenada com hash (bcrypt)
- ✓ Autenticação por JWT (token)
- ✓ HTTPS em todas as requisições
- ✓ Validação de input (prevenir SQL injection)
- ✓ Rate limiting no chat com IA
- ✓ Dados de usuário privados (encryption)

---

## ⚡ PERFORMANCE

- ✓ Cache de vagas (atualiza a cada 12h)
- ✓ Lazy loading em feeds
- ✓ Compressão de imagens
- ✓ Banco de dados indexado
- ✓ API otimizada (máx 500ms de resposta)

---

## 📱 PLATAFORMA ALVO

| Aspecto | Especificação |
|---|---|
| **iOS** | Mínimo iOS 14 |
| **Android** | Mínimo Android 8 (API 28) |
| **Framework** | React Native |
| **Tela mín.** | 5.0 polegadas |
| **Tela máx.** | 6.5 polegadas |

---

## 🔧 INTEGRAÇÕES EXTERNAS

| Serviço | Função | Essencial? |
|---|---|---|
| **Indeed API** | Buscar vagas em tempo real | Sim (MVP) |
| **SINE API** | Vagas do governo brasileiro | Sim (MVP) |
| **OpenAI/Claude API** | Respostas da IA | Sim |
| **Firebase** | Notificações push | Não (MVP) |
| **Google Maps** | Geolocalização | Não (MVP) |

---

## ✅ CRITÉRIO DE ACEITAÇÃO

O MVP será considerado **pronto** quando:

### ✅ Funcionalidade:
- [ ] Login e cadastro funcionam sem erros
- [ ] Perfil salva dados corretamente
- [ ] Motor de matching calcula scores corretos
- [ ] Feed mostra vagas ordenadas por score
- [ ] Usuário consegue aplicar para vaga
- [ ] Comunidades funcionam (criar post, curtir)
- [ ] Chat com IA responde perguntas
- [ ] Dashboard mostra progresso correto

### ✅ Usabilidade:
- [ ] App roda em iOS e Android
- [ ] Interface é intuitiva
- [ ] Sem crashes ou travamentos
- [ ] Tempo de carregamento < 2 segundos

### ✅ Dados:
- [ ] Banco de dados com 10+ vagas reais
- [ ] 5+ comunidades criadas
- [ ] Sistema de autenticação funciona

---

**Versão:** 1.0  
**Status:** ✅ Especificações Definidas  
**Próximo:** Arquitetura Técnica
