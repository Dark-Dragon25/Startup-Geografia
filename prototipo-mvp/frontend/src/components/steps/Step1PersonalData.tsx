'use client';

import { useTranslation } from 'react-i18next';

const countries = [
  'Venezuela', 'Colombia', 'Peru', 'Haiti', 'Bolivia', 'Paraguai',
  'Uruguai', 'Argentina', 'Chile', 'Equador', 'Brasil', 'Síria',
  'Ucrânia', 'Rússia', 'Portugal', 'Angola', 'Moçambique',
];

const languages = ['Português', 'Espanhol', 'Inglês', 'Francês', 'Árabe', 'Ucraniano', 'Russo', 'Italiano'];

interface Props {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}

export default function Step1PersonalData({ data, onChange, onNext }: Props) {
  const { t } = useTranslation();

  const handleLanguageToggle = (lang: string) => {
    const newLangs = data.languages?.includes(lang)
      ? data.languages.filter((l: string) => l !== lang)
      : [...(data.languages || []), lang];
    onChange({ languages: newLangs });
  };

  const isValid = data.fullName && data.birthDate && data.originCountry && data.languages?.length > 0;

  return (
    <div className="space-y-6">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.fullName')} *
        </label>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="João Silva"
        />
      </div>

      {/* Birth Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.birthDate')} *
        </label>
        <input
          type="date"
          value={data.birthDate}
          onChange={(e) => onChange({ birthDate: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Country of Origin */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.originCountry')} *
        </label>
        <select
          value={data.originCountry}
          onChange={(e) => onChange({ originCountry: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Selecione um país</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Languages */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('form.languages')} *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {languages.map((lang) => (
            <label
              key={lang}
              className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={data.languages?.includes(lang) || false}
                onChange={() => handleLanguageToggle(lang)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{lang}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Current City */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cidade atual
        </label>
        <input
          type="text"
          value={data.currentCity}
          onChange={(e) => onChange({ currentCity: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="São Paulo"
        />
      </div>

      {!isValid && (
        <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-sm">
          Preencha todos os campos obrigatórios para continuar
        </div>
      )}
    </div>
  );
}
