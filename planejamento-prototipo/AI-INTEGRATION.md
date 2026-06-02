# Integração com IA — Protótipo IMIGRA.AI

## Usos da IA no Protótipo

A IA é usada em 4 pontos críticos do sistema:

| Uso | Quando | Modelo | Custo |
|-----|--------|--------|-------|
| Extração de CV | Upload do currículo | GPT-4o-mini ou Claude Haiku | ~$0.01/CV |
| Análise de Comprovante | Upload do diploma | GPT-4o-mini (visão) | ~$0.02/doc |
| Filtro de Vagas | Cron job a cada 6h | GPT-4o-mini | ~$0.015/dia |
| Score de Match | A cada login | Lógica local (sem IA) | $0 |

**Custo total de IA estimado: menos de R$ 5/mês** para o protótipo.

---

## 1. Extração de Currículo (CV → JSON)

### Fluxo
1. Usuário faz upload do PDF/DOCX
2. Backend converte para texto plano (biblioteca `pdf-parse` ou `mammoth`)
3. Texto é enviado para a IA com prompt estruturado
4. IA retorna JSON com os dados extraídos
5. Dados são exibidos para o usuário revisar e confirmar

### Prompt
```
Você é um assistente especializado em análise de currículos.
Extraia os dados do currículo abaixo e retorne SOMENTE um JSON válido, sem explicações.

Formato esperado:
{
  "nome": "...",
  "email": "...",
  "telefone": "...",
  "formacao": [
    {
      "curso": "...",
      "instituicao": "...",
      "ano_conclusao": "...",
      "pais": "..."
    }
  ],
  "experiencias": [
    {
      "cargo": "...",
      "empresa": "...",
      "periodo": "...",
      "descricao": "..."
    }
  ],
  "skills": ["...", "..."],
  "idiomas": ["...", "..."],
  "nivel_experiencia": "junior|pleno|senior"
}

Currículo:
{TEXTO_DO_CV}
```

### Normalização de Skills
Após extração, o sistema normaliza os nomes das skills para um vocabulário padrão:
- "AutoCAD" = "autocad"
- "Microsoft Excel" = "excel"
- "Python 3" = "python"
- "Gestão de Projetos" = "gestao_projetos"

Isso garante que o matching por keyword funcione corretamente.

---

## 2. Análise de Comprovante de Formação

### Fluxo
1. Usuário faz upload da imagem/PDF do diploma
2. Se imagem: enviada diretamente para IA com visão
3. Se PDF: convertido para imagem primeiro (`pdf2pic`)
4. IA extrai informações do documento

### Prompt
```
Analise o documento educacional na imagem e extraia as informações.
Retorne SOMENTE um JSON válido:

{
  "tipo_documento": "diploma|certificado|historico|outro",
  "nome_completo": "...",
  "curso": "...",
  "instituicao": "...",
  "pais_instituicao": "...",
  "ano_conclusao": "...",
  "confianca": "alta|media|baixa",
  "observacoes": "..."
}

Se não conseguir identificar algum campo, use null.
Se o documento não for um comprovante de formação, retorne {"tipo_documento": "invalido"}.
```

### Status de Verificação
- `pendente` — documento enviado, aguardando revisão do admin
- `aprovado` — admin confirmou autenticidade
- `reprovado` — documento ilegível ou inválido
- `requerido` — usuário precisou reenviar

Admin recebe notificação por e-mail quando novos documentos são enviados.

---

## 3. Filtro de Vagas por Relevância

### Fluxo no Cron Job
Para cada vaga nova buscada nas APIs:
1. Formata título + empresa + descrição (primeiros 500 caracteres)
2. Envia para IA em lote (batch de 10 vagas por requisição para economizar tokens)
3. IA classifica cada vaga

### Prompt (batch)
```
Para cada vaga abaixo, responda em JSON. Considere "amigavel_imigrante" = true se:
- NÃO exige registro profissional brasileiro como pré-requisito absoluto (ex: CRM, CREA obrigatório sem menção a revalidação)
- NÃO menciona "somente brasileiros" ou "RNE não aceito"
- Empresa não tem histórico conhecido de discriminação

Responda com um array JSON:
[
  {
    "id_temp": 1,
    "amigavel_imigrante": true/false,
    "area": "saude|engenharia|educacao|tecnologia|administracao|design|gastronomia|outro",
    "nivel": "junior|pleno|senior|nao_especificado"
  }
]

Vagas:
1. {titulo} | {empresa} | {descricao_curta}
2. {titulo} | {empresa} | {descricao_curta}
...
```

---

## 4. Algoritmo de Matching (Lógica Local — sem IA)

O score de compatibilidade entre usuário e vaga é calculado localmente, sem custo de IA:

```javascript
function calcularScore(usuario, vaga) {
  let score = 0;

  // 40% — Skills em comum
  const skillsUsuario = new Set(usuario.skills);
  const skillsVaga = new Set(vaga.skills_exigidas);
  const intersecao = [...skillsVaga].filter(s => skillsUsuario.has(s));
  const skillsScore = skillsVaga.size > 0
    ? (intersecao.length / skillsVaga.size) * 40
    : 20; // se vaga não especifica skills, dá 50% deste critério
  score += skillsScore;

  // 25% — Nível de experiência
  const nivelMatch = {
    'junior-junior': 1, 'junior-pleno': 0.5, 'junior-senior': 0.1,
    'pleno-junior': 0.7, 'pleno-pleno': 1,   'pleno-senior': 0.6,
    'senior-junior': 0.5, 'senior-pleno': 0.8, 'senior-senior': 1
  };
  const chaveNivel = `${usuario.nivel_experiencia}-${vaga.nivel || 'pleno'}`;
  score += (nivelMatch[chaveNivel] || 0.5) * 25;

  // 20% — Localidade
  const remoto = vaga.regime === 'remoto' || vaga.localidade?.toLowerCase().includes('remot');
  const cidadeMatch = usuario.cidade_preferida &&
    vaga.localidade?.toLowerCase().includes(usuario.cidade_preferida.toLowerCase());
  score += (remoto || cidadeMatch) ? 20 : 0;

  // 15% — Idiomas
  const idiomasVaga = extrairIdiomasRequeridos(vaga.descricao); // detecta "inglês obrigatório" etc.
  if (idiomasVaga.length === 0) {
    score += 15; // vaga não especifica idioma, não penaliza
  } else {
    const idiomasOk = idiomasVaga.every(lang => usuario.idiomas.includes(lang));
    score += idiomasOk ? 15 : 0;
  }

  return Math.round(score);
}
```

### Classificação por Score

| Score | Badge | Cor | Significado |
|-------|-------|-----|-------------|
| 80-100 | Ótima compatibilidade | Verde | Candidato forte |
| 60-79 | Boa compatibilidade | Amarelo | Vale a pena tentar |
| 40-59 | Compatibilidade parcial | Laranja | Algumas lacunas |
| 0-39 | Baixa compatibilidade | Cinza | Exibir apenas se não houver melhores opções |

---

## Evolução Futura do Matching

### Matching Semântico com Embeddings
Em vez de comparar keywords exatas, usar vetores semânticos:
- "construction engineer" → similar a "engenheiro civil"
- "software developer" → similar a "desenvolvedor de software"

```javascript
// Futuro: usar OpenAI Embeddings
const embeddingUsuario = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: usuario.skills.join(', ') + ' ' + usuario.experiencias.map(e => e.descricao).join(' ')
});

const embeddingVaga = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: vaga.descricao
});

const similaridade = cosineSimilarity(embeddingUsuario.data[0].embedding, embeddingVaga.data[0].embedding);
```

**Custo:** ~$0.02 por 1000 comparações usuário-vaga com text-embedding-3-small.

---

## Configuração de Chaves de API

Variáveis de ambiente necessárias:
```env
# IA
OPENAI_API_KEY=sk-...           # ou ANTHROPIC_API_KEY=sk-ant-...

# Vagas
JOOBLE_API_KEY=...
ADZUNA_APP_ID=...
ADZUNA_API_KEY=...
# Remotive e The Muse não precisam de chave

# Banco
SUPABASE_URL=https://....supabase.co
SUPABASE_SERVICE_KEY=...
SUPABASE_ANON_KEY=...

# Auth
JWT_SECRET=...

# App
NODE_ENV=production
PORT=3001
```
