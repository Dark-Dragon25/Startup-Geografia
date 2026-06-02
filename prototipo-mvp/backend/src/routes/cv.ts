import { Router, Response } from 'express';
import multer from 'multer';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// Configurar multer para upload de arquivos
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo inválido'));
    }
  },
});

// POST /api/cv/upload - Upload e análise de CV
router.post('/upload', authenticateToken, upload.single('file'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo não fornecido' });
    }

    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;

    // Mock: simular extração de CV (sem IA real, economizando crédito)
    const mockExtraction = {
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 99999-9999',
      formacao: [
        {
          curso: 'Engenharia de Software',
          instituicao: 'Universidade XYZ',
          ano_conclusao: 2020,
          pais: 'Brasil',
        },
      ],
      experiencias: [
        {
          cargo: 'Desenvolvedor Senior',
          empresa: 'Tech Company',
          periodo: '2021 - Presente',
          descricao: 'Desenvolvimento de aplicações backend',
        },
      ],
      skills: ['Node.js', 'PostgreSQL', 'React', 'TypeScript', 'AWS'],
      idiomas: ['Português', 'Inglês', 'Espanhol'],
      nivel_experiencia: 'senior',
    };

    console.log(`📄 CV recebido: ${fileName} (${req.userId})`);

    res.json({
      success: true,
      filename: fileName,
      extracted_data: mockExtraction,
      status: 'processado',
      message: 'CV analisado com sucesso',
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Erro ao processar CV' });
  }
});

// POST /api/cv/analyze - Analisar CV com IA (opcional, comentado para economizar crédito)
router.post('/analyze', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Texto do CV não fornecido' });
    }

    // Aqui iria a chamada da IA (OpenAI/Claude) para extrair dados
    // Para o protótipo, retornamos mock data

    res.json({
      success: true,
      analysis: {
        skills: ['Node.js', 'React', 'TypeScript'],
        languages: ['English', 'Portuguese'],
        experience_years: 5,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
