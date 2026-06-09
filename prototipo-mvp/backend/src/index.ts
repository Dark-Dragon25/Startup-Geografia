import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as cron from 'node-cron';

import authRoutes from './routes/auth';
import jobRoutes from './routes/jobs';
import cvRoutes from './routes/cv';
import chatRoutes from './routes/chat';
import userRoutes from './routes/users';
import { vagasJobScheduler } from './services/vagasService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vagas', jobRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Cron job para buscar vagas a cada 6 horas
cron.schedule('0 */6 * * *', () => {
  console.log('⏰ Iniciando busca de vagas...');
  vagasJobScheduler().catch(err => console.error('Erro no scheduler:', err));
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro:', err);
  res.status(500).json({
    error: err.message || 'Erro interno do servidor',
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});
