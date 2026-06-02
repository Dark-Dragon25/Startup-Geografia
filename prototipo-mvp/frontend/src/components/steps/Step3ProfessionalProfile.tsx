'use client';

import { useTranslation } from 'react-i18next';

const areas = [
  'Saúde', 'Engenharia', 'Tecnologia', 'Educação', 'Administração',
  'Design', 'Direito', 'Gastronomia', 'Construção', 'Outro'
];

const cities = [
  'São Paulo', 'Rio de Janeiro', 'Brasília', 'Curitiba', 'Porto Alegre',
  'Belo Horizonte', 'Recife', 'Salvador', 'Remoto', 'Outra'
];

interface Props {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}

export default function Step3ProfessionalProfile({ data, onChange }: Props) {
  const { t } = useTranslation();

  const handleCityToggle = (city: string) => {
    const newCities = data.preferredCities?.includes(city)
      ? data.preferredCities.filter((c: string) => c !== city)
      : [...(data.preferredCities || []), city];
    onChange({ preferredCities: newCities });
  };

  const isValid = data.professionalArea && data.experience && data.preferredCities?.length > 0;

  return (
    <div className="space-y-6">
      {/* Professional Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.professionalArea')} *
        </label>
        <select
          value={data.professionalArea}
          onChange={(e) => onChange({ professionalArea: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione uma área</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('form.experience')} *
        </label>
        <div className="space-y-2">
          {['junior', 'pleno', 'senior'].map((level) => (
            <label key={level} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="experience"
                value={level}
                checked={data.experience === level}
                onChange={(e) => onChange({ experience: e.target.value })}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700 capitalize">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Preferred Cities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('form.preferredCity')} * (selecione pelo menos uma)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {cities.map((city) => (
            <label
              key={city}
              className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={data.preferredCities?.includes(city) || false}
                onChange={() => handleCityToggle(city)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700 text-sm">{city}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary Expectation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Expectativa salarial (opcional)
        </label>
        <input
          type="text"
          value={data.salary}
          onChange={(e) => onChange({ salary: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="R$ 3.000 - R$ 5.000"
        />
      </div>

      {!isValid && (
        <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-sm">
          Preencha os campos obrigatórios para continuar
        </div>
      )}
    </div>
  );
}
