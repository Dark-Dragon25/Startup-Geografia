import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { getUserProfile, updateUserProfile } from '../services/userService';

const router = Router();

// GET /api/users/profile - Get profile of authenticated user
router.get('/profile', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const profile = await getUserProfile(userId);
    if (!profile) {
      return res.status(404).json({ error: 'Perfil não encontrado' });
    }
    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Erro ao carregar perfil' });
  }
});

// PUT /api/users/profile - Update profile details of authenticated user
router.put('/profile', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const updated = await updateUserProfile(userId, req.body);
    res.json({ success: true, profile: updated });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Erro ao atualizar perfil' });
  }
});

export default router;
