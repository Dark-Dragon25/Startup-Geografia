'use client';

import { useTranslation } from 'react-i18next';

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

interface Props {
  job: Job;
  onApply: (jobId: string) => void;
}

export default function JobCard({ job, onApply }: Props) {
  const { t } = useTranslation();
  const score = job.score_compatibilidade || 0;

  const getScoreBadge = () => {
    if (score >= 80) return { bg: 'bg-green-100', text: 'text-green-800', label: 'Ótima compatibilidade' };
    if (score >= 60) return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Boa compatibilidade' };
    if (score >= 40) return { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Compatibilidade parcial' };
    return { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Baixa compatibilidade' };
  };

  const badge = getScoreBadge();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{job.titulo}</h3>
          <p className="text-gray-600 text-sm">{job.empresa}</p>
        </div>
        <div className={`${badge.bg} ${badge.text} px-3 py-1 rounded-full text-sm font-medium`}>
          {score}% - {badge.label}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center text-gray-600">
          <span className="mr-2">📍</span> {job.localidade}
        </div>
        <div className="flex items-center text-gray-600">
          <span className="mr-2">💼</span> {job.regime}
        </div>
      </div>

      {job.salario_min && (
        <div className="mb-4 text-sm text-gray-700">
          <span className="font-semibold">Salário:</span> R$ {job.salario_min.toLocaleString('pt-BR')} - R$ {job.salario_max?.toLocaleString('pt-BR')}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => onApply(job.id)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {t('dashboard.apply')}
        </button>
        <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded-lg transition">
          {t('dashboard.viewDetails')}
        </button>
      </div>
    </div>
  );
}
