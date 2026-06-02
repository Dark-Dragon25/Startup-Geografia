# Fluxo de Onboarding — 4 Passos

## Visão Geral do Fluxo

```
[Tela de Boas-Vindas]
        │
        ▼ clica em "Vamos Começar"
[Passo 1: Dados Pessoais]
        │
        ▼
[Passo 2: Contato & Descoberta]
        │
        ▼
[Passo 3: Perfil Profissional]
        │
        ▼
[Passo 4: Upload de Documentos]
        │
        ▼
[Dashboard de Vagas Recomendadas]
```

---

## Tela 0 — Boas-Vindas Automática

### Comportamento
- O site detecta `navigator.language` do dispositivo **antes de qualquer interação**
- A mensagem completa é exibida imediatamente na língua detectada
- Nenhum menu de "escolha seu idioma" — a experiência é fluida e automática

### Conteúdo da Tela
```
[Logo IMIGRA.AI]

[Mensagem em PT]:
"Bem-vindo ao IMIGRA.AI.
Conectamos imigrantes qualificados com as melhores oportunidades de emprego no Brasil."

[Submensagem]:
"Encontre vagas que valorizam seu histórico e experiência, independente de onde você veio."

[Botão Principal]: "Vamos Começar →"
[Link secundário]: "Já tem conta? Entrar"
```

### Traduções das Mensagens de Boas-Vindas

| Idioma | Mensagem Principal |
|--------|-------------------|
| PT | "Bem-vindo ao IMIGRA.AI. Conectamos imigrantes qualificados com as melhores oportunidades de emprego no Brasil." |
| ES | "Bienvenido a IMIGRA.AI. Conectamos inmigrantes calificados con las mejores oportunidades de empleo en Brasil." |
| EN | "Welcome to IMIGRA.AI. We connect qualified immigrants with the best job opportunities in Brazil." |
| FR | "Bienvenue sur IMIGRA.AI. Nous connectons les immigrants qualifiés avec les meilleures opportunités d'emploi au Brésil." |
| HT | "Byenveni nan IMIGRA.AI. Nou konekte imigran kalifyé yo avèk pi bon opòtinite travay nan Brezil." |
| AR | "مرحباً بك في IMIGRA.AI. نربط المهاجرين المؤهلين بأفضل فرص العمل في البرازيل." |
| UK | "Ласкаво просимо до IMIGRA.AI. Ми з'єднуємо кваліфікованих іммігрантів з найкращими можливостями працевлаштування в Бразилії." |
| RU | "Добро пожаловать в IMIGRA.AI. Мы соединяем квалифицированных иммигрантов с лучшими возможностями трудоустройства в Бразилии." |

---

## Passo 1 — Dados Pessoais

### Campos obrigatórios
- **Nome completo** — texto livre
- **Data de nascimento** — date picker (formato DD/MM/AAAA)
- **País de origem** — dropdown com lista de países (200+ países, com busca)
- **Idiomas que fala** — multi-select: PT, ES, EN, FR, HT, AR, UK, RU, + "Outro"
- **Gênero** — Masculino / Feminino / Outro / Prefiro não informar
- **Cidade de residência atual** — texto com autocomplete das cidades brasileiras principais

### Validações
- Data de nascimento: usuário deve ter 16 ou mais anos
- Pelo menos 1 idioma selecionado

### Interface
- Barra de progresso no topo: "1 de 4"
- Botões: "Próximo →" (desabilitado até campos obrigatórios preenchidos)

---

## Passo 2 — Contato & Como Descobriu

### Campos obrigatórios
- **E-mail** — validação de formato + verificação de unicidade no banco
- **Senha** — mínimo 8 caracteres, com confirmação de senha
- **Celular/WhatsApp** — opcional, com DDD (para possíveis notificações futuras)

### Campos opcionais
- **Como descobriu o IMIGRA.AI** — single select:
  - Redes sociais (Instagram, Facebook, TikTok)
  - Indicação de amigo ou familiar
  - ONG / organização de apoio a imigrantes
  - Google / busca na internet
  - Evento ou palestra
  - Outro

### Interface
- Barra de progresso: "2 de 4"
- Botões: "← Voltar" e "Próximo →"

---

## Passo 3 — Perfil Profissional

### Campos obrigatórios
- **Área profissional** — dropdown categorizado:
  - Saúde (médico, enfermeiro, fisioterapeuta, psicólogo...)
  - Engenharia e Tecnologia
  - Educação e Pedagogia
  - Direito e Ciências Sociais
  - Economia e Administração
  - Design e Comunicação
  - Gastronomia e Hospitalidade
  - Construção Civil
  - Outra área
- **Nível de experiência** — radio button:
  - Júnior (0-2 anos)
  - Pleno (3-5 anos)
  - Sênior (6+ anos)
- **Cidade onde quer trabalhar** — dropdown multi-select:
  - São Paulo
  - Rio de Janeiro
  - Brasília
  - Curitiba
  - Porto Alegre
  - Belo Horizonte
  - Recife
  - Salvador
  - Remoto (qualquer cidade)
  - Outra cidade (texto livre)

### Campos opcionais
- **Expectativa salarial (R$)** — range slider ou texto
- **Regime preferido** — CLT / PJ / Remoto / Indiferente

### Interface
- Barra de progresso: "3 de 4"
- Botões: "← Voltar" e "Próximo →"

---

## Passo 4 — Upload de Documentos

### Documento 1: Currículo (obrigatório)
- **Formatos aceitos:** PDF, DOCX, DOC (máx. 5MB)
- **Drag-and-drop ou clique para selecionar**
- Após upload: IA extrai e exibe os dados identificados para o usuário confirmar:
  ```
  ✓ Formação: Engenharia Civil — Universidad Central de Venezuela (2018)
  ✓ Experiência: 5 anos como Engenheiro de Projetos
  ✓ Skills detectadas: AutoCAD, BIM, Gestão de Obras, Excel
  ```
- Usuário pode editar qualquer campo extraído incorretamente

### Documento 2: Comprovante de Formação (opcional mas recomendado)
- **Formatos aceitos:** PDF, JPG, PNG (máx. 10MB)
- Exemplos aceitos: diploma universitário, certificado de conclusão, histórico escolar
- Após upload: IA lê o documento e extrai:
  - Tipo de documento
  - Instituição
  - Curso/área
  - Ano de conclusão
- Status inicial: `Em verificação` (admin IMIGRA.AI revisará em até 48h)
- Badge no perfil: 🔵 "Em verificação" → 🟢 "Verificado" → 🔴 "Não verificado"

### Interface
- Barra de progresso: "4 de 4"
- Botões: "← Voltar" e "Criar Conta e Ver Vagas →"
- Aviso: "Você pode pular o comprovante agora e adicionar depois no seu perfil"

---

## Pós-Cadastro — Dashboard de Vagas

Imediatamente após o cadastro:
1. Exibe mensagem de confirmação: "Conta criada! Analisando seu perfil..."
2. Loading de 2-3 segundos enquanto o algoritmo roda o matching
3. Redireciona para o dashboard com vagas ordenadas por score de compatibilidade
4. Score 80-100% = badge verde "Ótima compatibilidade"
5. Score 50-79% = badge amarelo "Boa compatibilidade"
6. Score abaixo de 50% = badge cinza "Compatibilidade parcial"
