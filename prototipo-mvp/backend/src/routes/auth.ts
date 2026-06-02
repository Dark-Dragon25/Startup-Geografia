import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth';
import supabase from '../config/supabase';

const router = Router();

// Mock user database for demo
const mockUsers: any = {};

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password, fullName, birthDate, originCountry, languages, professionalArea, experience, preferredCities } = req.body;

    // Validation
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    // Check if user exists
    const existingUser = mockUsers[email];
    if (existingUser) {
      return res.status(409).json({ error: 'E-mail já cadastrado' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (mock)
    const userId = `user_${Date.now()}`;
    mockUsers[email] = {
      id: userId,
      email,
      password: hashedPassword,
      fullName,
      birthDate,
      originCountry,
      languages,
      professionalArea,
      experience,
      preferredCities,
      createdAt: new Date(),
    };

    // Try to save to Supabase
    try {
      await supabase.from('usuarios').insert({
        id: userId,
        email,
        senha_hash: hashedPassword,
        nome: fullName,
        data_nascimento: birthDate,
        pais_origem: originCountry,
        idiomas: languages,
        area_profissional: professionalArea,
        nivel_experiencia: experience,
        cidades_preferidas: preferredCities,
      });
    } catch (dbErr) {
      console.warn('Falha ao salvar no Supabase, usando mock:', dbErr);
    }

    // Generate token
    const token = generateToken(userId);

    res.status(201).json({
      userId,
      email,
      token,
      message: 'Usuário cadastrado com sucesso',
    });
  } catch (error: any) {
    console.error('Erro no signup:', error);
    res.status(500).json({ error: error.message || 'Erro ao cadastrar usuário' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    // Mock login
    const user = mockUsers[email];
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = generateToken(user.id);

    res.json({
      userId: user.id,
      email: user.email,
      token,
    });
  } catch (error: any) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: error.message || 'Erro ao fazer login' });
  }
});

export default router;
