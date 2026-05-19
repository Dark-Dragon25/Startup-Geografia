# 💾 BANCO DE DADOS — IMIGRA.AI

## 🎯 Objetivo

Documentar a estrutura completa do banco de dados PostgreSQL para o IMIGRA.AI.

---

## 📊 SCHEMA SQL COMPLETO

### Tabela: USUARIOS

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    pais_origem VARCHAR(100),
    idiomas JSONB DEFAULT '{}', -- {"en": "avançado", "pt": "intermediário"}
    profissao VARCHAR(200),
    anos_experiencia INT,
    habilidades JSONB DEFAULT '[]', -- ["Python", "Java", "UML"]
    foto_url VARCHAR(500),
    cidades_preferidas JSONB DEFAULT '[]', -- ["São Paulo", "Rio de Janeiro"]
    salario_esperado DECIMAL(10, 2),
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_profissao ON usuarios(profissao);
```

---

### Tabela: VAGAS

```sql
CREATE TABLE vagas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(300) NOT NULL,
    empresa VARCHAR(200) NOT NULL,
    descricao TEXT,
    salario_minimo DECIMAL(10, 2),
    salario_maximo DECIMAL(10, 2),
    localizacao VARCHAR(200),
    skills_requeridas JSONB DEFAULT '[]', -- ["Python", "Django", "PostgreSQL"]
    anos_experiencia_minima INT DEFAULT 0,
    idioma_requerido VARCHAR(50),
    data_postagem TIMESTAMP DEFAULT NOW(),
    fonte VARCHAR(50), -- 'indeed', 'sine', 'manual'
    url_externa VARCHAR(500),
    ativa BOOLEAN DEFAULT TRUE,
    criada_em TIMESTAMP DEFAULT NOW(),
    atualizada_em TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_vagas_localizacao ON vagas(localizacao);
CREATE INDEX idx_vagas_ativa ON vagas(ativa);
CREATE INDEX idx_vagas_empresa ON vagas(empresa);
CREATE INDEX idx_vagas_skills ON vagas USING GIN(skills_requeridas);
```

---

### Tabela: APLICACOES

```sql
CREATE TABLE aplicacoes (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    vaga_id INT NOT NULL REFERENCES vagas(id) ON DELETE CASCADE,
    data_aplicacao TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'aplicado', -- 'aplicado', 'rejeitado', 'aceito', 'pendente'
    score_compatibilidade INT CHECK (score_compatibilidade >= 0 AND score_compatibilidade <= 100),
    feedback_usuario TEXT,
    criada_em TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_aplicacoes_usuario ON aplicacoes(usuario_id);
CREATE INDEX idx_aplicacoes_vaga ON aplicacoes(vaga_id);
CREATE INDEX idx_aplicacoes_status ON aplicacoes(status);
CREATE UNIQUE INDEX idx_aplicacoes_unica ON aplicacoes(usuario_id, vaga_id);
```

---

### Tabela: VAGAS_FAVORITAS

```sql
CREATE TABLE vagas_favoritas (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    vaga_id INT NOT NULL REFERENCES vagas(id) ON DELETE CASCADE,
    criada_em TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_favoritas_usuario ON vagas_favoritas(usuario_id);
CREATE UNIQUE INDEX idx_favoritas_unica ON vagas_favoritas(usuario_id, vaga_id);
```

---

### Tabela: COMUNIDADES

```sql
CREATE TABLE comunidades (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL UNIQUE,
    tipo VARCHAR(50) NOT NULL, -- 'cidade', 'profissao', 'nacionalidade'
    descricao TEXT,
    imagem_url VARCHAR(500),
    criada_em TIMESTAMP DEFAULT NOW(),
    membros_count INT DEFAULT 0
);

CREATE INDEX idx_comunidades_tipo ON comunidades(tipo);
CREATE INDEX idx_comunidades_nome ON comunidades(nome);
```

---

### Tabela: COMUNIDADE_MEMBROS

```sql
CREATE TABLE comunidade_membros (
    id SERIAL PRIMARY KEY,
    comunidade_id INT NOT NULL REFERENCES comunidades(id) ON DELETE CASCADE,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    criada_em TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_membros_comunidade ON comunidade_membros(comunidade_id);
CREATE INDEX idx_membros_usuario ON comunidade_membros(usuario_id);
CREATE UNIQUE INDEX idx_membros_unica ON comunidade_membros(comunidade_id, usuario_id);
```

---

### Tabela: POSTS

```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    comunidade_id INT NOT NULL REFERENCES comunidades(id) ON DELETE CASCADE,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    texto TEXT NOT NULL,
    imagem_url VARCHAR(500),
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW(),
    curtidas INT DEFAULT 0
);

CREATE INDEX idx_posts_comunidade ON posts(comunidade_id);
CREATE INDEX idx_posts_usuario ON posts(usuario_id);
CREATE INDEX idx_posts_data ON posts(criado_em DESC);
```

---

### Tabela: COMENTARIOS

```sql
CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    texto TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comentarios_post ON comentarios(post_id);
CREATE INDEX idx_comentarios_usuario ON comentarios(usuario_id);
```

---

### Tabela: CONVERSAS_IA

```sql
CREATE TABLE conversas_ia (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    mensagem_usuario TEXT NOT NULL,
    resposta_ia TEXT,
    topico VARCHAR(100), -- 'documentacao', 'cursos', 'visto', 'revalidacao'
    tokens_usados INT DEFAULT 0,
    criada_em TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversas_usuario ON conversas_ia(usuario_id);
CREATE INDEX idx_conversas_topico ON conversas_ia(topico);
CREATE INDEX idx_conversas_data ON conversas_ia(criada_em DESC);
```

---

### Tabela: CURTIDAS_POST

```sql
CREATE TABLE curtidas_post (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    criada_em TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_curtidas_post ON curtidas_post(post_id);
CREATE INDEX idx_curtidas_usuario ON curtidas_post(usuario_id);
CREATE UNIQUE INDEX idx_curtidas_unica ON curtidas_post(post_id, usuario_id);
```

---

## 🔐 VIEWS ÚTEIS (SQL)

### View: Usuario com habilidades

```sql
CREATE VIEW usuarios_com_skills AS
SELECT 
    u.id,
    u.nome,
    u.email,
    u.profissao,
    u.anos_experiencia,
    json_array_length(u.habilidades) as total_habilidades,
    u.criado_em
FROM usuarios u;
```

### View: Vagas em alta demanda

```sql
CREATE VIEW vagas_populares AS
SELECT 
    v.id,
    v.titulo,
    v.empresa,
    COUNT(a.id) as total_aplicacoes,
    AVG(a.score_compatibilidade) as score_medio
FROM vagas v
LEFT JOIN aplicacoes a ON v.id = a.vaga_id
WHERE v.ativa = TRUE
GROUP BY v.id, v.titulo, v.empresa
ORDER BY total_aplicacoes DESC;
```

### View: Usuarios ativos

```sql
CREATE VIEW usuarios_ativos AS
SELECT 
    u.id,
    u.nome,
    COUNT(DISTINCT a.id) as total_aplicacoes,
    COUNT(DISTINCT p.id) as total_posts,
    u.atualizado_em
FROM usuarios u
LEFT JOIN aplicacoes a ON u.id = a.usuario_id
LEFT JOIN posts p ON u.id = p.usuario_id
WHERE u.atualizado_em > NOW() - INTERVAL '30 days'
GROUP BY u.id, u.nome, u.atualizado_em
ORDER BY total_aplicacoes DESC;
```

---

## 🔄 RELACIONAMENTOS

```
usuarios
├── (1:N) → aplicacoes
├── (1:N) → posts
├── (1:N) → comentarios
├── (1:N) → conversas_ia
├── (1:N) → curtidas_post
└── (1:N) → vagas_favoritas

vagas
├── (1:N) → aplicacoes
└── (1:N) → vagas_favoritas

comunidades
├── (1:N) → posts
└── (1:N) → comunidade_membros

posts
├── (1:N) → comentarios
└── (1:N) → curtidas_post
```

---

## 🎯 TRIGGERS ÚTEIS

### Atualizar membros_count ao entrar em comunidade

```sql
CREATE OR REPLACE FUNCTION atualizar_membros_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE comunidades
    SET membros_count = (
        SELECT COUNT(*) FROM comunidade_membros 
        WHERE comunidade_id = NEW.comunidade_id
    )
    WHERE id = NEW.comunidade_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_membros
AFTER INSERT ON comunidade_membros
FOR EACH ROW
EXECUTE FUNCTION atualizar_membros_count();
```

### Atualizar curtidas ao curtir post

```sql
CREATE OR REPLACE FUNCTION atualizar_curtidas()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE posts
    SET curtidas = (
        SELECT COUNT(*) FROM curtidas_post 
        WHERE post_id = NEW.post_id
    )
    WHERE id = NEW.post_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_curtidas
AFTER INSERT ON curtidas_post
FOR EACH ROW
EXECUTE FUNCTION atualizar_curtidas();
```

---

## 🧪 DADOS DE TESTE

```sql
-- Inserir comunidades padrão
INSERT INTO comunidades (nome, tipo, descricao) VALUES
('Imigrantes em São Paulo', 'cidade', 'Comunidade de imigrantes em SP'),
('Engenheiros no Brasil', 'profissao', 'Para engenheiros imigrantes'),
('Venezuelanos', 'nacionalidade', 'Comunidade de venezuelanos'),
('Professores Imigrantes', 'profissao', 'Para professores do exterior'),
('Médicos do Exterior', 'profissao', 'Para profissionais de saúde');

-- Inserir vagas de exemplo
INSERT INTO vagas (titulo, empresa, localizacao, salario_minimo, salario_maximo, skills_requeridas) VALUES
('Desenvolvedor Python', 'Tech Corp', 'São Paulo', 5000, 8000, '["Python", "Django", "PostgreSQL"]'),
('Engenheiro Mecânico', 'Industrial Ltd', 'São Paulo', 6000, 10000, '["CAD", "ANSYS", "Gestão"]'),
('Professor de Matemática', 'Escola Brasil', 'Manaus', 3000, 5000, '["Didática", "Paciência"]'),
('Designer Gráfico', 'Creative Studio', 'São Paulo', 4500, 7000, '["Figma", "Adobe", "UX/UI"]');
```

---

## 📋 MIGRATIONS (Script de Setup)

```bash
# Criar arquivo: backend/migrations/001_initial.sql

psql -U postgres -d imigra_ai -f 001_initial.sql
```

---

## 🔒 BACKUP E RECOVERY

```bash
# Backup completo
pg_dump -U postgres imigra_ai > backup.sql

# Restore
psql -U postgres imigra_ai < backup.sql

# Backup apenas dados (sem schema)
pg_dump -U postgres --data-only imigra_ai > backup_data.sql
```

---

**Versão:** 1.0  
**Status:** ✅ Schema Definido  
**Próximo:** API Endpoints
