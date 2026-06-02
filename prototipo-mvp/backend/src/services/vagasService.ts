import axios from 'axios';

// Mock job database
export const mockJobs: any[] = [
  {
    id: 'job_1',
    titulo: 'Desenvolvedor Backend Senior',
    empresa: 'Tech Solutions',
    localidade: 'São Paulo, SP',
    regime: 'CLT',
    salario_min: 8000,
    salario_max: 12000,
    descricao: 'Procuramos um desenvolvedor backend com experiência em Node.js',
    skills_exigidas: ['Node.js', 'PostgreSQL', 'REST API'],
    area: 'Tecnologia',
    nivel: 'senior',
    fonte: 'mock',
    amigavel_imigrante: true,
    created_at: new Date(),
  },
  {
    id: 'job_2',
    titulo: 'Engenheiro Civil - Projetos',
    empresa: 'Construções Brasil',
    localidade: 'Rio de Janeiro, RJ',
    regime: 'CLT',
    salario_min: 6000,
    salario_max: 9000,
    descricao: 'Engenheiro com experiência em projetos residenciais e comerciais',
    skills_exigidas: ['AutoCAD', 'Revit', 'Orçamento'],
    area: 'Engenharia',
    nivel: 'pleno',
    fonte: 'mock',
    amigavel_imigrante: true,
    created_at: new Date(),
  },
  {
    id: 'job_3',
    titulo: 'Desenvolvedor Frontend React',
    empresa: 'Digital Agency',
    localidade: 'Remoto',
    regime: 'PJ',
    salario_min: 5000,
    salario_max: 8000,
    descricao: 'Desenvolvedor React para trabalho remoto',
    skills_exigidas: ['React', 'TypeScript', 'Tailwind'],
    area: 'Tecnologia',
    nivel: 'pleno',
    fonte: 'remotive',
    amigavel_imigrante: true,
    created_at: new Date(),
  },
];

export const vagasJobScheduler = async () => {
  try {
    console.log('🔍 Buscando vagas em APIs...');

    // Buscar vagas de APIs reais (comentado para não usar crédito da IA desnecessariamente)
    // const novasVagas = await buscarVagasRemotive();
    // novasVagas.push(...await buscarVagasJooble());

    // Para o protótipo, usamos mock data
    console.log(`✅ Encontradas ${mockJobs.length} vagas`);

    return mockJobs;
  } catch (error) {
    console.error('❌ Erro ao buscar vagas:', error);
    return [];
  }
};

// Função para buscar vagas do Remotive (100% gratuita)
export const buscarVagasRemotive = async () => {
  try {
    const response = await axios.get('https://remotive.com/api/remote-jobs', {
      params: {
        limit: 50,
      },
    });

    return response.data.jobs.map((job: any) => ({
      titulo: job.title,
      empresa: job.company_name,
      localidade: 'Remoto',
      regime: 'remoto',
      descricao: job.description,
      url_original: job.url,
      fonte: 'remotive',
      amigavel_imigrante: true,
    }));
  } catch (error) {
    console.error('Erro ao buscar vagas Remotive:', error);
    return [];
  }
};

// Função para buscar vagas do Jooble (requer API key)
export const buscarVagasJooble = async () => {
  const apiKey = process.env.JOOBLE_API_KEY;
  if (!apiKey) {
    console.warn('⚠️ JOOBLE_API_KEY não configurada');
    return [];
  }

  try {
    const response = await axios.post(`https://br.jooble.org/api/${apiKey}`, {
      keywords: 'desenvolvedor',
      location: 'São Paulo',
      page: 1,
    });

    return response.data.jobs.map((job: any) => ({
      titulo: job.title,
      empresa: job.company,
      localidade: job.location,
      descricao: job.snippet,
      url_original: job.link,
      fonte: 'jooble',
      amigavel_imigrante: true,
    }));
  } catch (error) {
    console.error('Erro ao buscar vagas Jooble:', error);
    return [];
  }
};

export default vagasJobScheduler;
