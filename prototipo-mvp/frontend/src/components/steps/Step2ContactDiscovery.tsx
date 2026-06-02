'use client';

import { useTranslation } from 'react-i18next';

const discoveryOptions = [
  'Instagram',
  'Facebook',
  'LinkedIn',
  'Indicação de amigo',
  'ONG / Organização',
  'Google',
  'Evento / Palestra',
  'Outro',
];

interface Props {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}

export default function Step2ContactDiscovery({ data, onChange }: Props) {
  const { t } = useTranslation();

  const isValid = data.email && data.password && data.confirmPassword && data.password === data.confirmPassword && data.password.length >= 8;

  return (
    <div className="space-y-6">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.email')} *
        </label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="seu@email.com"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.password')} * (mínimo 8 caracteres)
        </label>
        <input
          type="password"
          value={data.password}
          onChange={(e) => onChange({ password: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.confirmPassword')} *
        </label>
        <input
          type="password"
          value={data.confirmPassword}
          onChange={(e) => onChange({ confirmPassword: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {data.password && data.confirmPassword && data.password !== data.confirmPassword && (
          <p className="text-red-600 text-sm mt-1">As senhas não correspondem</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.phone')}
        </label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="(11) 99999-9999"
        />
      </div>

      {/* How Discovered */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('form.howDiscovered')}
        </label>
        <select
          value={data.howDiscovered}
          onChange={(e) => onChange({ howDiscovered: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione uma opção</option>
          {discoveryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {!isValid && (
        <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-sm">
          Verifique se todos os campos estão preenchidos corretamente
        </div>
      )}
    </div>
  );
}
