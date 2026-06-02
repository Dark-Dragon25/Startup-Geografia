import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { mockJobs } from '../services/vagasService';
import { recomendarVagas } from '../services/matchingService';

const router = Router();

// Mock user data
const mockUserData: any = {
  user_1: {
    skills: ['Node.js', 'PostgreSQL', 'React', 'TypeScript'],
    experience: 'pleno',
    languages: ['Português', 'Inglês'],
    preferredCities: ['São Paulo', 'Remoto'],
  },
  user_2: {
    skills: ['AutoCAD', 'Revit', 'Excel'],
    experience: 'senior',
    languages: ['Português', 'Espanhol'],
    preferredCities: ['Rio de Janeiro', 'Remoto'],
  },
};

// GET /api/vagas - Listar todas as vagas com filtros
router.get('/', (req: any, res: Response) => {
  try {
    let vagas = mockJobs;

    // Aplicar filtros se fornecidos
    if (req.query.area) {
      vagas = vagas.filter((job: any) =>
        job.area?.toLowerCase().includes(req.query.area.toLowerCase())
      );
    }

    if (req.query.cidade) {
      vagas = vagas.filter((job: any) =>
        job.localidade?.toLowerCase().includes(req.query.cidade.toLowerCase())
      );
    }

    if (req.query.regime) {
      vagas = vagas.filter((job: any) =>
        job.regime?.toLowerCase() === req.query.regime.toLowerCase()
      );
    }

    res.json({
      count: vagas.length,
      vagas,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/vagas/:id - Obter detalhes de uma vaga
router.get('/:id', (req: any, res: Response) => {
  try {
    const vaga = mockJobs.find((j: any) => j.id === req.params.id);

    if (!vaga) {
      return res.status(404).json({ error: 'Vaga não encontrada' });
    }

    res.json(vaga);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/vagas/recomendadas - Vagas recomendadas para o usuário (autenticado)
router.get('/recomendadas', authenticateToken, (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const userData = mockUserData[userId] || {
      skills: [],
      experience: 'junior',
      languages: ['Português'],
      preferredCities: ['São Paulo'],
    };

    const vagas = recomendarVagas(userData, mockJobs, 20);

    res.json({
      count: vagas.length,
      vagas,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/vagas/:id/apply - Candidatar a uma vaga (autenticado)
router.post('/:id/apply', authenticateToken, (req: AuthRequest, res: Response) => {
  try {
    const vagaId = req.params.id;
    const userId = req.userId;

    const vaga = mockJobs.find((j: any) => j.id === vagaId);
    if (!vaga) {
      return res.status(404).json({ error: 'Vaga não encontrada' });
    }

    // Mock: registrar candidatura
    res.status(201).json({
      success: true,
      candidatura_id: `app_${Date.now()}`,
      usuario_id: userId,
      vaga_id: vagaId,
      status: 'enviada',
      timestamp: new Date(),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
