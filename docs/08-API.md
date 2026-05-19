# 📡 API REST ENDPOINTS — IMIGRA.AI

## 🎯 Objetivo

Documentar todos os endpoints da API REST que o frontend consome.

---

## 🔐 AUTENTICAÇÃO

### POST `/api/auth/signup`

**Descrição:** Criar nova conta de usuário

**Request:**
```json
{
  "email": "carlos@email.com",
  "senha": "segura123",
  "nome": "Carlos García"
}
```

**Response (201):**
```json
{
  "id": 1,
  "email": "carlos@email.com",
  "nome": "Carlos García",
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### POST `/api/auth/login`

**Descrição:** Login do usuário

**Request:**
```json
{
  "email": "carlos@email.com",
  "senha": "segura123"
}
```

**Response (200):**
```json
{
  "id": 1,
  "email": "carlos@email.com",
  "nome": "Carlos García",
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### POST `/api/auth/refresh-token`

**Descrição:** Renovar access token

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### POST `/api/auth/logout`

**Descrição:** Fazer logout

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

---

## 👤 USUÁRIOS

### GET `/api/users/:id`

**Descrição:** Obter perfil do usuário

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200):**
```json
{
  "id": 1,
  "email": "carlos@email.com",
  "nome": "Carlos García",
  "pais_origem": "Venezuela",
  "profissao": "Engenheiro Mecânico",
  "anos_experiencia": 10,
  "idiomas": {
    "es": "avançado",
    "pt": "intermediário"
  },
  "habilidades": ["CAD", "ANSYS", "Gestão"],
  "foto_url": "https://...",
  "cidades_preferidas": ["São Paulo", "Rio de Janeiro"],
  "salario_esperado": 8000,
  "criado_em": "2024-05-19T10:00:00Z"
}
```

---

### PUT `/api/users/:id`

**Descrição:** Atualizar perfil do usuário

**Request:**
```json
{
  "nome": "Carlos García",
  "profissao": "Engenheiro Mecânico",
  "anos_experiencia": 10,
  "habilidades": ["CAD", "ANSYS", "Gestão", "Python"],
  "cidades_preferidas": ["São Paulo", "Brasília"]
}
```

**Response (200):**
```json
{
  "id": 1,
  "message": "Perfil atualizado com sucesso"
}
```

---

### GET `/api/users/:id/habilidades`

**Descrição:** Listar habilidades do usuário

**Response (200):**
```json
{
  "habilidades": ["CAD", "ANSYS", "Gestão"],
  "total": 3,
  "taxa_completo": 60
}
```

---

## 💼 VAGAS

### GET `/api/vagas`

**Descrição:** Listar vagas com paginação

**Query Parameters:**
```
?page=1
&limit=20
&cidade=São Paulo
&nivel=pleno
&salario_min=5000
&salario_max=10000
&area=tecnologia
```

**Response (200):**
```json
{
  "vagas": [
    {
      "id": 1,
      "titulo": "Desenvolvedor Python Pleno",
      "empresa": "Tech Corp",
      "salario_minimo": 5000,
      "salario_maximo": 8000,
      "localizacao": "São Paulo, SP",
      "skills_requeridas": ["Python", "Django", "PostgreSQL"],
      "data_postagem": "2024-05-19T10:00:00Z"
    }
  ],
  "total": 45,
  "pagina": 1,
  "total_paginas": 3
}
```

---

### GET `/api/vagas/:id`

**Descrição:** Obter detalhes de uma vaga

**Response (200):**
```json
{
  "id": 1,
  "titulo": "Desenvolvedor Python Pleno",
  "empresa": "Tech Corp",
  "descricao": "Procuramos um desenvolvedor Python com experiência...",
  "salario_minimo": 5000,
  "salario_maximo": 8000,
  "localizacao": "São Paulo, SP",
  "skills_requeridas": ["Python", "Django", "PostgreSQL"],
  "anos_experiencia_minima": 3,
  "idioma_requerido": "Português",
  "data_postagem": "2024-05-19T10:00:00Z",
  "url_externa": "https://indeed.com/...",
  "ativa": true
}
```

---

### GET `/api/vagas/recomendadas`

**Descrição:** Vagas recomendadas para o usuário logado (com score)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200):**
```json
{
  "vagas": [
    {
      "id": 1,
      "titulo": "Desenvolvedor Python Pleno",
      "empresa": "Tech Corp",
      "score_compatibilidade": 87,
      "skills_match": {
        "tem": ["Python", "Django"],
        "falta": ["PostgreSQL"]
      },
      "razoes": {
        "habilidades": 25,
        "experiencia": 20,
        "localizacao": 20,
        "idioma": 15,
        "salario": 7
      }
    }
  ],
  "total": 15
}
```

---

### GET `/api/vagas/favoritas`

**Descrição:** Vagas salvas pelo usuário

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200):**
```json
{
  "vagas": [
    {
      "id": 1,
      "titulo": "Desenvolvedor Python Pleno",
      "empresa": "Tech Corp",
      "score_compatibilidade": 87,
      "salvo_em": "2024-05-19T15:30:00Z"
    }
  ],
  "total": 5
}
```

---

### POST `/api/vagas/:id/aplicar`

**Descrição:** Aplicar para uma vaga

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (201):**
```json
{
  "id": 1,
  "usuario_id": 1,
  "vaga_id": 1,
  "status": "aplicado",
  "score_compatibilidade": 87,
  "data_aplicacao": "2024-05-19T16:00:00Z"
}
```

---

### POST `/api/vagas/:id/salvar`

**Descrição:** Salvar vaga como favorita

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (201):**
```json
{
  "id": 1,
  "vaga_id": 1,
  "message": "Vaga salva com sucesso"
}
```

---

### DELETE `/api/vagas/:id/salvar`

**Descrição:** Remover vaga dos favoritos

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200):**
```json
{
  "message": "Vaga removida dos favoritos"
}
```

---

## 🎯 MATCHING

### POST `/api/matching/calcular`

**Descrição:** Calcular score de compatibilidade

**Request:**
```json
{
  "usuario_id": 1,
  "vaga_id": 1
}
```

**Response (200):**
```json
{
  "score": 87,
  "detalhes": {
    "habilidades": 25,
    "experiencia": 20,
    "localizacao": 20,
    "idioma": 15,
    "salario": 7
  },
  "skills_match": {
    "tem": ["Python", "Django"],
    "falta": ["PostgreSQL"]
  }
}
```

---

### POST `/api/matching/recomendacoes`

**Descrição:** Gerar lista de vagas recomendadas

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request:**
```json
{
  "limite": 20
}
```

**Response (200):**
```json
{
  "vagas": [
    {
      "id": 1,
      "titulo": "Desenvolvedor Python Pleno",
      "score": 87
    }
  ],
  "total": 15
}
```

---

## 🏘️ COMUNIDADES

### GET `/api/comunidades`

**Descrição:** Listar todas as comunidades

**Query Parameters:**
```
?tipo=cidade
&limite=20
&pagina=1
```

**Response (200):**
```json
{
  "comunidades": [
    {
      "id": 1,
      "nome": "Imigrantes em São Paulo",
      "tipo": "cidade",
      "descricao": "Comunidade de imigrantes em SP",
      "imagem_url": "https://...",
      "membros_count": 234
    }
  ],
  "total": 12
}
```

---

### GET `/api/comunidades/:id`

**Descrição:** Obter detalhes de uma comunidade

**Response (200):**
```json
{
  "id": 1,
  "nome": "Imigrantes em São Paulo",
  "tipo": "cidade",
  "descricao": "Comunidade de imigrantes em SP",
  "imagem_url": "https://...",
  "membros_count": 234,
  "eh_membro": true
}
```

---

### GET `/api/comunidades/:id/posts`

**Descrição:** Posts de uma comunidade

**Query Parameters:**
```
?pagina=1
&limite=20
```

**Response (200):**
```json
{
  "posts": [
    {
      "id": 1,
      "usuario_id": 1,
      "usuario_nome": "Carlos García",
      "texto": "Consegui emprego como engenheiro! 🎉",
      "imagem_url": "https://...",
      "curtidas": 23,
      "comentarios": 5,
      "criado_em": "2024-05-19T10:00:00Z"
    }
  ],
  "total": 150
}
```

---

### POST `/api/comunidades/:id/entrar`

**Descrição:** Entrar em uma comunidade

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (201):**
```json
{
  "message": "Você entrou na comunidade",
  "comunidade_id": 1
}
```

---

## 📝 POSTS

### POST `/api/comunidades/:id/posts`

**Descrição:** Criar novo post em uma comunidade

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data
```

**Request:**
```
texto: "Consegui emprego como engenheiro! 🎉"
imagem: [binary]
```

**Response (201):**
```json
{
  "id": 1,
  "usuario_id": 1,
  "comunidade_id": 1,
  "texto": "Consegui emprego como engenheiro! 🎉",
  "criado_em": "2024-05-19T16:00:00Z"
}
```

---

### POST `/api/posts/:id/curtir`

**Descrição:** Curtir um post

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (201):**
```json
{
  "message": "Post curtido",
  "curtidas": 24
}
```

---

### POST `/api/posts/:id/comentar`

**Descrição:** Comentar em um post

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request:**
```json
{
  "texto": "Parabéns! Qual foi o processo de revalidação?"
}
```

**Response (201):**
```json
{
  "id": 1,
  "post_id": 1,
  "usuario_id": 1,
  "texto": "Parabéns! Qual foi o processo de revalidação?",
  "criado_em": "2024-05-19T16:10:00Z"
}
```

---

## 🤖 CHAT COM IA

### POST `/api/chat/message`

**Descrição:** Enviar mensagem para IA

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request:**
```json
{
  "mensagem": "Sou médico, como revalidar diploma no Brasil?",
  "topico": "documentacao"
}
```

**Response (200):**
```json
{
  "id": 1,
  "usuario_id": 1,
  "mensagem_usuario": "Sou médico, como revalidar diploma no Brasil?",
  "resposta_ia": "Para revalidar seu diploma de medicina no Brasil, você precisa:\n\n1. Registre-se no CREMESP...",
  "topico": "documentacao",
  "tokens_usados": 150,
  "criada_em": "2024-05-19T16:15:00Z"
}
```

---

### GET `/api/chat/historico`

**Descrição:** Ver histórico de conversa com IA

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
```
?topico=documentacao
&limite=20
&pagina=1
```

**Response (200):**
```json
{
  "conversas": [
    {
      "id": 1,
      "mensagem_usuario": "Como revalidar diploma?",
      "resposta_ia": "Para revalidar...",
      "topico": "documentacao",
      "criada_em": "2024-05-19T16:15:00Z"
    }
  ],
  "total": 15
}
```

---

## 🚨 TRATAMENTO DE ERROS

### Erro 400 (Bad Request)
```json
{
  "erro": "Email é obrigatório",
  "codigo": "VALIDATION_ERROR"
}
```

### Erro 401 (Unauthorized)
```json
{
  "erro": "Token inválido ou expirado",
  "codigo": "INVALID_TOKEN"
}
```

### Erro 404 (Not Found)
```json
{
  "erro": "Vaga não encontrada",
  "codigo": "NOT_FOUND"
}
```

### Erro 429 (Too Many Requests)
```json
{
  "erro": "Limite de requisições atingido",
  "codigo": "RATE_LIMITED"
}
```

### Erro 500 (Server Error)
```json
{
  "erro": "Erro interno do servidor",
  "codigo": "INTERNAL_ERROR"
}
```

---

## 🔄 PAGINAÇÃO

Todos os endpoints que retornam listas suportam paginação:

```
?pagina=1
&limite=20
```

Response inclui:
```json
{
  "dados": [...],
  "total": 100,
  "pagina": 1,
  "limite": 20,
  "total_paginas": 5
}
```

---

## ⏱️ RATE LIMITING

- **Autenticação:** 5 requisições por minuto
- **API Geral:** 60 requisições por minuto
- **Chat IA:** 10 requisições por minuto

Headers de resposta:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1621532400
```

---

**Versão:** 1.0  
**Status:** ✅ API Documentada  
**Próximo:** Frontend Screens
