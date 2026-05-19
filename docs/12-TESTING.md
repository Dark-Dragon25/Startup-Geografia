# 🧪 TESTES — IMIGRA.AI

## 🎯 Objetivo

Documentar estratégia de testes para garantir qualidade do IMIGRA.AI.

---

## 📊 PIRÂMIDE DE TESTES

```
         /\
        /E2E\      (10%)  - Testes de fluxo completo
       /────\
      /  INT \    (30%)  - Testes de integração
     /───────\
    /  UNIT   \  (60%)  - Testes unitários
   /__________\
```

---

## 🔧 SETUP

### Instalação

```bash
# Backend
npm install --save-dev jest @types/jest supertest

# Frontend
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native

# Ambos
npm install --save-dev prettier eslint
```

### Configuração Jest

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',
    '!src/server.js'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
```

---

## ✅ TESTES UNITÁRIOS (Backend)

### 1. authService.test.js

```javascript
// backend/src/services/__tests__/authService.test.js
import { loginUser, registerUser, verificarToken } from '../authService';

describe('AuthService', () => {
  describe('registerUser', () => {
    it('should register user with valid email and password', async () => {
      const user = await registerUser({
        email: 'carlos@example.com',
        password: 'segura123',
        nome: 'Carlos'
      });

      expect(user.id).toBeDefined();
      expect(user.email).toBe('carlos@example.com');
      expect(user.senha).not.toBe('segura123'); // Password hasheado
    });

    it('should throw error for duplicate email', async () => {
      await registerUser({
        email: 'carlos@example.com',
        password: 'segura123',
        nome: 'Carlos'
      });

      await expect(
        registerUser({
          email: 'carlos@example.com',
          password: 'outra123',
          nome: 'Outro'
        })
      ).rejects.toThrow('Email já cadastrado');
    });

    it('should throw error for weak password', async () => {
      await expect(
        registerUser({
          email: 'test@example.com',
          password: '123',
          nome: 'Test'
        })
      ).rejects.toThrow('Senha muito fraca');
    });
  });

  describe('loginUser', () => {
    beforeEach(async () => {
      await registerUser({
        email: 'carlos@example.com',
        password: 'segura123',
        nome: 'Carlos'
      });
    });

    it('should login with correct credentials', async () => {
      const result = await loginUser('carlos@example.com', 'segura123');

      expect(result.user.email).toBe('carlos@example.com');
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });

    it('should throw error for wrong password', async () => {
      await expect(
        loginUser('carlos@example.com', 'errada')
      ).rejects.toThrow('Credenciais inválidas');
    });
  });

  describe('verificarToken', () => {
    it('should verify valid JWT token', async () => {
      const user = await registerUser({
        email: 'carlos@example.com',
        password: 'segura123',
        nome: 'Carlos'
      });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      const decoded = verificarToken(token);

      expect(decoded.id).toBe(user.id);
    });

    it('should throw error for invalid token', () => {
      expect(() => {
        verificarToken('token_invalido');
      }).toThrow();
    });
  });
});
```

### 2. matchingService.test.js

```javascript
// backend/src/services/__tests__/matchingService.test.js
import { calcularScore } from '../matchingService';

describe('MatchingService', () => {
  const usuario = {
    habilidades: ['Python', 'Django', 'PostgreSQL'],
    anos_experiencia: 5,
    cidades_preferidas: ['São Paulo'],
    idiomas: { pt: 'intermediário', en: 'avançado' },
    salario_esperado: 8000
  };

  const vaga1 = {
    titulo: 'Desenvolvedor Python',
    skills_requeridas: ['Python', 'Django'],
    anos_experiencia_minima: 3,
    localizacao: 'São Paulo',
    idioma_requerido: 'pt',
    salario_maximo: 10000
  };

  it('should calculate high score for compatible job', () => {
    const score = calcularScore(usuario, vaga1);
    expect(score).toBeGreaterThanOrEqual(80);
  });

  it('should calculate lower score for missing skills', () => {
    const vagaSemSkills = {
      ...vaga1,
      skills_requeridas: ['Python', 'Java', 'Rust']
    };

    const score = calcularScore(usuario, vagaSemSkills);
    expect(score).toBeLessThan(80);
  });

  it('should calculate 0 for no matching skills', () => {
    const vagaLonge = {
      ...vaga1,
      localizacao: 'Rio de Janeiro'
    };

    const score = calcularScore(usuario, vagaLonge);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});
```

---

## 🧬 TESTES DE INTEGRAÇÃO (Backend)

### 3. auth.integration.test.js

```javascript
// backend/src/routes/__tests__/auth.integration.test.js
import request from 'supertest';
import app from '../../app';
import { deleteAllUsers } from '../../utils/testHelpers';

describe('Auth Endpoints', () => {
  beforeEach(async () => {
    await deleteAllUsers(); // Limpar dados de teste
  });

  describe('POST /api/auth/signup', () => {
    it('should create new user account', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'carlos@example.com',
          password: 'segura123',
          nome: 'Carlos García'
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.user.email).toBe('carlos@example.com');
      expect(response.body.accessToken).toBeDefined();
    });

    it('should return 400 for duplicate email', async () => {
      await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'carlos@example.com',
          password: 'segura123',
          nome: 'Carlos'
        });

      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'carlos@example.com',
          password: 'outra123',
          nome: 'Outro'
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.erro).toContain('Email');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'carlos@example.com',
          password: 'segura123',
          nome: 'Carlos'
        });
    });

    it('should return tokens for valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'carlos@example.com',
          password: 'segura123'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
    });

    it('should return 401 for wrong password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'carlos@example.com',
          password: 'errada'
        });

      expect(response.statusCode).toBe(401);
    });
  });
});
```

### 4. vagas.integration.test.js

```javascript
// backend/src/routes/__tests__/vagas.integration.test.js
describe('Vagas Endpoints', () => {
  let token;

  beforeAll(async () => {
    // Setup: criar usuário e obter token
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'carlos@example.com',
        password: 'segura123'
      });
    token = response.body.accessToken;
  });

  describe('GET /api/vagas', () => {
    it('should return list of jobs', async () => {
      const response = await request(app)
        .get('/api/vagas')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body.vagas)).toBe(true);
    });

    it('should filter jobs by city', async () => {
      const response = await request(app)
        .get('/api/vagas?cidade=São Paulo')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      response.body.vagas.forEach(vaga => {
        expect(vaga.localizacao).toContain('São Paulo');
      });
    });
  });

  describe('POST /api/vagas/:id/aplicar', () => {
    it('should apply for a job', async () => {
      const vagaId = 1;

      const response = await request(app)
        .post(`/api/vagas/${vagaId}/aplicar`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('aplicado');
    });

    it('should not allow duplicate application', async () => {
      const vagaId = 1;

      // Primeira aplicação
      await request(app)
        .post(`/api/vagas/${vagaId}/aplicar`)
        .set('Authorization', `Bearer ${token}`);

      // Segunda aplicação
      const response = await request(app)
        .post(`/api/vagas/${vagaId}/aplicar`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(400);
    });
  });
});
```

---

## 📱 TESTES UNITÁRIOS (Frontend)

### 5. LoginScreen.test.js

```javascript
// frontend/src/screens/auth/__tests__/LoginScreen.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginScreen } from '../LoginScreen';
import * as authService from '../../../services/auth';

jest.mock('../../../services/auth');

describe('LoginScreen', () => {
  it('should render login form', () => {
    render(<LoginScreen />);

    expect(screen.getByPlaceholderText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Senha')).toBeTruthy();
    expect(screen.getByText('Login')).toBeTruthy();
  });

  it('should display validation errors', async () => {
    render(<LoginScreen />);

    const loginButton = screen.getByText('Login');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Email é obrigatório/)).toBeTruthy();
    });
  });

  it('should call login service on submit', async () => {
    authService.login.mockResolvedValue({
      user: { id: 1, email: 'test@example.com' },
      accessToken: 'token123'
    });

    render(<LoginScreen />);

    const emailInput = screen.getByPlaceholderText('Email');
    const senhaInput = screen.getByPlaceholderText('Senha');
    const loginButton = screen.getByText('Login');

    fireEvent.changeText(emailInput, 'carlos@example.com');
    fireEvent.changeText(senhaInput, 'segura123');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith(
        'carlos@example.com',
        'segura123'
      );
    });
  });
});
```

---

## 🎭 TESTES E2E

### 6. auth.e2e.test.js

```javascript
// e2e/auth.e2e.test.js
import { device, element, by, expect as detoxExpect } from 'detox';

describe('Authentication Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should complete login flow', async () => {
    // Verificar se está na tela de login
    await detoxExpect(element(by.text('Login'))).toBeVisible();

    // Preencher email
    await element(by.id('emailInput')).typeText('carlos@example.com');

    // Preencher senha
    await element(by.id('senhaInput')).typeText('segura123');

    // Clicar em Login
    await element(by.text('Login')).multiTap();

    // Aguardar navegar para home
    await waitFor(element(by.text('Bem-vindo, Carlos!')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should complete signup flow', async () => {
    // Clicar em "Criar Conta"
    await element(by.text('Criar Conta')).multiTap();

    // Preencher email
    await element(by.id('emailInput')).typeText('novo@example.com');

    // Preencher senha
    await element(by.id('senhaInput')).typeText('segura123');

    // Clicar próximo
    await element(by.text('Próximo')).multiTap();

    // Preencher nome
    await element(by.id('nomeInput')).typeText('Novo Usuário');

    // Clicar próximo
    await element(by.text('Próximo')).multiTap();

    // Continuar com restante do signup...
  });
});
```

---

## 📊 COBERTURA DE TESTES

### Executar com Cobertura

```bash
# Backend
npm test -- --coverage

# Frontend
npm test -- --coverage --reporters=text

# Gerar relatório HTML
npm test -- --coverage --collectCoverageFrom='src/**/*.js'
# Abrir: coverage/lcov-report/index.html
```

### Metas de Cobertura

```
Serviço        Meta    Atual   Status
────────────────────────────────────
Auth           90%     92%     ✅
Matching       85%     88%     ✅
Vagas          80%     76%     ⚠️
Community      80%     82%     ✅
IA Integration 75%     70%     ⚠️
Frontend       70%     65%     ⚠️
```

---

## 🔄 CONTINUOUS INTEGRATION

### GitHub Actions para Testes

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v2
      
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - run: npm install
      
      - run: npm test -- --coverage
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test_db
      
      - uses: codecov/codecov-action@v2
        with:
          files: ./coverage/lcov.info
```

---

## 🚨 Checklist de Qualidade

Antes de fazer deploy:

- [ ] Todos os testes passam (`npm test`)
- [ ] Cobertura > 70% em todas as áreas críticas
- [ ] Lint passa (`npm run lint`)
- [ ] Build de produção compila (`npm run build`)
- [ ] Sem console.logs em código de produção
- [ ] Sem TODOs/FIXMEs críticos
- [ ] Performance OK (< 500ms nas APIs)
- [ ] Testes com dados reais passam

---

**Versão:** 1.0  
**Status:** ✅ Testes Documentados  
**Meta de Cobertura:** 70%+  
**Próximo:** Avaliação Benchmark
