# 📱 FRONTEND — IMIGRA.AI

## 🎯 Objetivo

Documentar as telas, componentes e fluxos do aplicativo mobile.

---

## 📱 TELAS PRINCIPAIS (8 Telas)

### 1. LoginScreen

**Arquivo:** `src/screens/auth/LoginScreen.js`

**Funcionalidades:**
- Campo de email com validação
- Campo de senha
- Botão "Login"
- Link "Criar Conta"
- Link "Esqueci a Senha" (futuro)

**Componentes:**
```javascript
<TextInput 
  placeholder="Email"
  value={email}
  onChangeText={setEmail}
/>
<TextInput 
  placeholder="Senha"
  secureTextEntry={true}
  value={password}
  onChangeText={setPassword}
/>
<Button 
  title="Login"
  onPress={handleLogin}
/>
```

**State:**
```javascript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
```

**Integração:**
- Chama `POST /api/auth/login`
- Armazena token em AsyncStorage
- Navega para HomeScreen

---

### 2. SignupScreen

**Arquivo:** `src/screens/auth/SignupScreen.js`

**Funcionalidades (4 telas):**

**Tela 1: Dados Básicos**
- Email
- Senha
- Confirmação de Senha
- Nome

**Tela 2: Dados Profissionais**
- País de origem
- Profissão anterior
- Anos de experiência

**Tela 3: Habilidades**
- Seleção de habilidades (até 10)
- Idiomas
- Nível de português

**Tela 4: Cidades**
- Seleção de cidades preferidas
- Salário esperado

**State Management:**
```javascript
const [step, setStep] = useState(1);
const [formData, setFormData] = useState({
  email: '',
  password: '',
  nome: '',
  pais_origem: '',
  profissao: '',
  anos_experiencia: 0,
  habilidades: [],
  idiomas: {},
  cidades_preferidas: [],
  salario_esperado: 0
});
```

---

### 3. DashboardScreen (Home)

**Arquivo:** `src/screens/dashboard/DashboardScreen.js`

**Componentes:**
- Header com foto + saudação
- Card de progresso
- Botão rápido "Procurar Vagas"
- Botão rápido "Ver Comunidades"
- Botão rápido "Chat com IA"

**Dados exibidos:**
```javascript
{
  vagas_vistas: 47,
  vagas_aplicadas: 8,
  taxa_compatibilidade: 72,
  dias_membro: 34
}
```

**Layout:**
```
┌─────────────────────────┐
│ Olá, Carlos!            │
│ Você está progredindo! 📈│
├─────────────────────────┤
│ Seu Progresso           │
│ ████████░░ 80% completo │
├─────────────────────────┤
│ Vagas vistas: 47        │
│ Vagas aplicadas: 8      │
│ Compatibilidade: 72%    │
├─────────────────────────┤
│ [Procurar Vagas] [Chat] │
└─────────────────────────┘
```

---

### 4. VagasScreen (Feed)

**Arquivo:** `src/screens/vagas/VagasScreen.js`

**Componentes:**
- `FlatList` com VagaCards
- Bar de filtros
- Barra de busca

**VagaCard Props:**
```javascript
{
  id: 1,
  titulo: "Desenvolvedor Python",
  empresa: "Tech Corp",
  score: 87,
  localizacao: "São Paulo",
  salario: "R$ 5-8k",
  skills: ["Python", "Django"],
  onPress: () => navigateToDetail(id),
  onSave: () => saveVaga(id),
  onApply: () => applyForVaga(id)
}
```

**Filtros:**
- Cidade
- Nível
- Área
- Salário
- Skills

---

### 5. VagaDetailScreen

**Arquivo:** `src/screens/vagas/VagaDetailScreen.js`

**Seções:**
- Informações gerais (título, empresa, local)
- Descrição completa
- Análise de compatibilidade
- Skills (tem vs falta)
- Botões: Aplicar, Salvar, Compartilhar

**Layout:**
```
┌─────────────────────────┐
│ Desenvolvedor Python... │
│ Tech Corp               │
│ ⭐ 87% compatibilidade  │
├─────────────────────────┤
│ Descrição               │
│ Lorem ipsum...          │
├─────────────────────────┤
│ Skills que você tem:    │
│ ✓ Python ✓ Django      │
│                         │
│ Skills que faltam:      │
│ ✗ PostgreSQL            │
├─────────────────────────┤
│ [Aplicar] [Salvar]      │
└─────────────────────────┘
```

---

### 6. ComunidadesScreen

**Arquivo:** `src/screens/comunidades/ComunidadesScreen.js`

**Componentes:**
- `SectionList` com comunidades agrupadas por tipo
- Badge com número de membros
- Botão "Entrar" ou "Ver"

**Tipos:**
- Por Cidade
- Por Profissão
- Por Nacionalidade

**Layout:**
```
┌─────────────────────────┐
│ POR CIDADE              │
├─────────────────────────┤
│ Imigrantes em SP   234  │
│ Imigrantes no Rio  156  │
├─────────────────────────┤
│ POR PROFISSÃO           │
├─────────────────────────┤
│ Engenheiros       89    │
│ Médicos           67    │
└─────────────────────────┘
```

---

### 7. ComunidadeFeedScreen

**Arquivo:** `src/screens/comunidades/ComunidadeFeedScreen.js`

**Componentes:**
- Header da comunidade
- `FlatList` com PostCards
- Botão flutuante "Criar Post"

**PostCard:**
```javascript
{
  usuario_nome: "Carlos García",
  usuario_foto: "https://...",
  texto: "Consegui emprego! 🎉",
  imagem: "https://...",
  curtidas: 23,
  comentarios: 5,
  onCurtir: () => curtirPost(id),
  onComentarPress: () => abrirComentarios(id)
}
```

---

### 8. ChatScreen

**Arquivo:** `src/screens/chat/ChatScreen.js`

**Componentes:**
- `FlatList` com mensagens
- Input com botão enviar
- Loading indicator enquanto aguarda IA

**Mensagem:**
```javascript
{
  id: 1,
  tipo: 'usuario' | 'ia',
  texto: "Como revalidar diploma?",
  timestamp: "16:30",
  lendo: false
}
```

**Layout:**
```
┌─────────────────────────┐
│ Chat com IA             │
├─────────────────────────┤
│ [Usuário] 16:30         │
│ Como revalidar diploma? │
│                         │
│ [IA] 16:31              │
│ Para revalidar você     │
│ precisa...              │
├─────────────────────────┤
│ [Input] [Enviar]        │
└─────────────────────────┘
```

---

## 🧩 COMPONENTES REUTILIZÁVEIS

### VagaCard

```javascript
// src/components/VagaCard.js
export const VagaCard = ({ vaga, onPress, onSave, onApply }) => (
  <TouchableOpacity onPress={onPress}>
    <View>
      <Text>{vaga.titulo}</Text>
      <Text>{vaga.empresa}</Text>
      <Text>{vaga.score}% compatibilidade</Text>
      <Button title="Aplicar" onPress={onApply} />
      <Button title="Salvar" onPress={onSave} />
    </View>
  </TouchableOpacity>
);
```

### PostCard

```javascript
// src/components/PostCard.js
export const PostCard = ({ post, onCurtir, onComentarPress }) => (
  <View>
    <Text>{post.usuario_nome}</Text>
    <Text>{post.texto}</Text>
    <TouchableOpacity onPress={() => onCurtir(post.id)}>
      <Text>❤️ {post.curtidas}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onComentarPress(post.id)}>
      <Text>💬 {post.comentarios}</Text>
    </TouchableOpacity>
  </View>
);
```

### MatchScore

```javascript
// src/components/MatchScore.js
export const MatchScore = ({ score }) => {
  const cor = score >= 80 ? 'green' : score >= 60 ? 'orange' : 'red';
  return (
    <View>
      <ProgressBar 
        progress={score / 100} 
        color={cor} 
      />
      <Text>{score}% compatibilidade</Text>
    </View>
  );
};
```

---

## 🗂️ NAVEGAÇÃO

### React Navigation Setup

```javascript
// src/App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <TabNavigator />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen 
      name="Home" 
      component={DashboardScreen}
      options={{ tabBarIcon: () => <Icon name="home" /> }}
    />
    <Tab.Screen 
      name="Vagas" 
      component={VagasScreen}
      options={{ tabBarIcon: () => <Icon name="briefcase" /> }}
    />
    <Tab.Screen 
      name="Comunidades" 
      component={ComunidadesScreen}
      options={{ tabBarIcon: () => <Icon name="users" /> }}
    />
    <Tab.Screen 
      name="Chat" 
      component={ChatScreen}
      options={{ tabBarIcon: () => <Icon name="message" /> }}
    />
    <Tab.Screen 
      name="Perfil" 
      component={ProfileScreen}
      options={{ tabBarIcon: () => <Icon name="user" /> }}
    />
  </Tab.Navigator>
);
```

---

## 🎨 DESIGN SYSTEM

### Cores

```javascript
// src/styles/colors.js
export const Colors = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#1F2937',
  textLight: '#6B7280',
  border: '#E5E7EB'
};
```

### Tipografia

```javascript
// src/styles/typography.js
export const Typography = {
  H1: { fontSize: 32, fontWeight: 'bold' },
  H2: { fontSize: 24, fontWeight: 'bold' },
  H3: { fontSize: 20, fontWeight: '600' },
  Body: { fontSize: 16, fontWeight: '400' },
  Small: { fontSize: 14, fontWeight: '400' },
  Caption: { fontSize: 12, fontWeight: '400' }
};
```

### Espaçamento

```javascript
// src/styles/spacing.js
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};
```

---

## 🔄 STATE MANAGEMENT (Redux)

### Store

```javascript
// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import vagasSlice from './slices/vagasSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    vagas: vagasSlice,
    user: userSlice
  }
});
```

### Auth Slice

```javascript
// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => { state.loading = true; },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
    },
    loginError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    }
  }
});

export default authSlice.reducer;
```

---

## 🧪 TESTES

```javascript
// src/screens/LoginScreen.test.js
import { render, screen, fireEvent } from '@testing-library/react-native';
import { LoginScreen } from './LoginScreen';

describe('LoginScreen', () => {
  it('should render login form', () => {
    render(<LoginScreen />);
    expect(screen.getByPlaceholderText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Senha')).toBeTruthy();
  });

  it('should call login on submit', async () => {
    const mockLogin = jest.fn();
    render(<LoginScreen onLogin={mockLogin} />);
    
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      nativeEvent: { text: 'test@example.com' }
    });
    fireEvent.press(screen.getByText('Login'));
    
    expect(mockLogin).toHaveBeenCalled();
  });
});
```

---

**Versão:** 1.0  
**Status:** ✅ Frontend Documentado  
**Próximo:** Integração IA
