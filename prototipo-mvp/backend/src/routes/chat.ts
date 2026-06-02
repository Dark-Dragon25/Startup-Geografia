import { Router, Response } from 'express';
import axios from 'axios';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// Contexto do sistema que a IA recebe — define o comportamento dela
const SYSTEM_PROMPT = `Você é um assistente especializado do IMIGRA.AI, uma plataforma que ajuda imigrantes a encontrar emprego no Brasil.

Seu nome é "Migra" e você:
- Responde sempre no idioma em que o usuário escrever (português, espanhol, inglês, francês, etc.)
- Conhece profundamente o mercado de trabalho brasileiro
- Sabe orientar sobre revalidação de diplomas (CFM para médicos, CREA para engenheiros, etc.)
- Conhece os tipos de visto de trabalho no Brasil (VITEM V, RNM, etc.)
- Orienta sobre carteira de trabalho, INSS, direitos trabalhistas
- Ajuda a melhorar currículos para o padrão brasileiro
- É empático, paciente e encorajador com imigrantes

Regras importantes:
- Seja CONCISO — resposta máxima de 200 palavras
- Nunca invente leis ou documentos que não existem
- Quando não souber com certeza, diga claramente e sugira consultar um advogado ou órgão oficial
- Não fale sobre temas fora de emprego, documentação, vida do imigrante no Brasil
- Se perguntarem sobre vagas específicas, diga para usar o dashboard da plataforma`;

// POST /api/chat - Enviar mensagem para a IA
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Mensagem não pode estar vazia' });
    }

    if (message.length > 500) {
      return res.status(400).json({ error: 'Mensagem muito longa (máx. 500 caracteres)' });
    }

    // Montar histórico da conversa (limitar a 10 mensagens para economizar tokens)
    const recentHistory = history.slice(-10);
    const messages = [
      ...recentHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    let aiResponse = '';

    // Tentar OpenRouter primeiro (tem modelos gratuitos como mistral-7b)
    const openrouterKey = process.env.OPENROUTER_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (openrouterKey) {
      // OpenRouter — suporta modelos gratuitos
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: process.env.AI_MODEL || 'mistralai/mistral-7b-instruct:free', // Gratuito
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages,
          ],
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${openrouterKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
            'X-Title': 'IMIGRA.AI',
          },
        }
      );
      aiResponse = response.data.choices[0]?.message?.content || '';

    } else if (openaiKey) {
      // OpenAI (gpt-4o-mini — mais barato)
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages,
          ],
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${openaiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      aiResponse = response.data.choices[0]?.message?.content || '';

    } else if (anthropicKey) {
      // Claude API (Anthropic)
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages,
        },
        {
          headers: {
            'x-api-key': anthropicKey,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json',
          },
        }
      );
      aiResponse = response.data.content[0]?.text || '';

    } else {
      // Fallback: resposta local sem IA (para testes sem API key)
      aiResponse = getFallbackResponse(message);
    }

    res.json({
      message: aiResponse,
      role: 'assistant',
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Erro no chat:', error.response?.data || error.message);

    // Se a API falhou, usar fallback local
    const fallback = getFallbackResponse(req.body.message || '');
    res.json({
      message: fallback,
      role: 'assistant',
      timestamp: new Date().toISOString(),
      fallback: true,
    });
  }
});

// Respostas de fallback para quando não há API key configurada
function getFallbackResponse(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes('diploma') || msg.includes('revalid')) {
    return 'Para revalidar seu diploma no Brasil, cada profissão tem um caminho diferente. Médicos devem contatar o CFM, engenheiros o CREA, advogados a OAB. O processo geral envolve: tradução juramentada do diploma, reconhecimento consular, e avaliação pelo órgão regulador da profissão. Recomendo verificar o site do MEC (mec.gov.br) para diplomas de nível superior.';
  }
  if (msg.includes('visto') || msg.includes('documento') || msg.includes('rnm')) {
    return 'Para trabalhar formalmente no Brasil, você precisará do RNM (Registro Nacional Migratório) ou visto de trabalho válido. O processo envolve: pedido na Polícia Federal, documentos do empregador, passaporte válido e taxa. Acesse o site da Polícia Federal (pf.gov.br) ou consulte o SINCRE para verificar sua situação migratória.';
  }
  if (msg.includes('currículo') || msg.includes('cv') || msg.includes('resume')) {
    return 'Para o mercado brasileiro, seu currículo deve ter: nome e contato no topo (sem foto obrigatória), objetivo profissional, experiências em ordem cronológica inversa, formação acadêmica e habilidades. Mantenha em 1-2 páginas. Destacar conhecimento do português e experiências internacionais é um diferencial muito valorizado!';
  }
  if (msg.includes('direito') || msg.includes('clt') || msg.includes('trabalhis')) {
    return 'Imigrantes regularizados têm os mesmos direitos trabalhistas que brasileiros: carteira assinada (CTPS), 13º salário, férias remuneradas, FGTS, licença maternidade/paternidade e mais. Seu empregador deve registrar seu contrato. Em caso de problemas, procure o Ministério do Trabalho ou um sindicato da sua categoria.';
  }

  return 'Olá! Sou o assistente do IMIGRA.AI. Posso ajudar você com dúvidas sobre revalidação de diplomas, documentação para trabalhar no Brasil, como melhorar seu currículo e seus direitos trabalhistas. Qual é sua dúvida?';
}

export default router;
