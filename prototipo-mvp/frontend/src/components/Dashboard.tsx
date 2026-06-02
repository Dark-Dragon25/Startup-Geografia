'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { jobService } from '@/services/api';
import JobCard from './JobCard';

interface Job {
  id: string;
  titulo: string;
  empresa: string;
  localidade: string;
  regime: string;
  salario_min?: number;
  salario_max?: number;
  score_compatibilidade?: number;
}

export default function Dashboard() {
  const { t } = useTranslation();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    area: '',
    city: '',
    regime: '',
  });

  useEffect(() => {
    // Check authentication
    if (!localStorage.getItem('token')) {
      router.push('/login');
      return;
    }

    // Fetch jobs
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await jobService.getRecommendations();
        setJobs(response.data || []);
      } catch (err: any) {
        setError(err.response?.data?.message || t('errors.server'));
        // Mock data para demonstração
        setJobs([
          {
            id: '1',
            titulo: 'Desenvolvedor Senior',
            empresa: 'Tech Company',
            localidade: 'São Paulo, SP',
            regime: 'CLT',
            salario_min: 8000,
            salario_max: 12000,
            score_compatibilidade: 92,
          },
          {
            id: '2',
            titulo: 'Engenheiro de Sistemas',
            empresa: 'Industrial Corp',
            localidade: 'Rio de Janeiro, RJ',
            regime: 'CLT',
            salario_min: 6000,
            salario_max: 9000,
            score_compatibilidade: 78,
          },
          {
            id: '3',
            titulo: 'Analista de Dados',
            empresa: 'Data Solutions',
            localidade: 'Remoto',
            regime: 'PJ',
            salario_min: 5000,
            salario_max: 8000,
            score_compatibilidade: 65,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (jobId: string) => {
    try {
      await jobService.apply(jobId);
      // Show success message
      alert('Candidatura enviada com sucesso!');
    } catch (err) {
      alert('Erro ao enviar candidatura');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">IMIGRA.AI</h1>
            <p className="text-gray-600 text-sm">{t('dashboard.title')}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('dashboard.filters')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('dashboard.area')}
              </label>
              <select
                value={filters.area}
                onChange={(e) => setFilters({ ...filters, area: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas as áreas</option>
                <option value="tech">Tecnologia</option>
                <option value="saude">Saúde</option>
                <option value="engenharia">Engenharia</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('dashboard.city')}
              </label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas as cidades</option>
                <option value="sp">São Paulo</option>
                <option value="rj">Rio de Janeiro</option>
                <option value="remoto">Remoto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('dashboard.regime')}
              </label>
              <select
                value={filters.regime}
                onChange={(e) => setFilters({ ...filters, regime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos os regimes</option>
                <option value="clt">CLT</option>
                <option value="pj">PJ</option>
                <option value="remoto">Remoto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">⏳</div>
            <p className="mt-4 text-gray-600">{t('form.loading')}</p>
          </div>
        )}

        {/* Jobs List */}
        {!loading && jobs.length > 0 && (
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleApply}
              />
            ))}
          </div>
        )}

        {/* No Jobs */}
        {!loading && jobs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg">{t('dashboard.noJobs')}</p>
            <p className="text-gray-500 text-sm mt-2">
              Tente ajustar seus filtros ou volte mais tarde
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
