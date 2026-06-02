'use client';

import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

interface Props {
  data: any;
  onChange: (data: any) => void;
  onSubmit: () => void;
}

export default function Step4DocumentUpload({ data, onChange, onSubmit }: Props) {
  const { t } = useTranslation();

  const handleFileChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({ [field]: file });
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((field: string) => (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onChange({ [field]: file });
    }
  }, [onChange]);

  return (
    <div className="space-y-6">
      {/* Curriculum Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('form.curriculum')} *
        </label>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop('cv')}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer"
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange('cv')}
            className="hidden"
            id="cv-input"
          />
          <label htmlFor="cv-input" className="cursor-pointer block">
            <div className="text-5xl mb-2">📄</div>
            <p className="text-gray-600 font-medium">
              {data.cv
                ? data.cv.name
                : t('form.selectFile')}
            </p>
            <p className="text-gray-500 text-sm mt-2">PDF, DOC ou DOCX (máx. 5MB)</p>
          </label>
        </div>
      </div>

      {/* Diploma Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('form.diploma')} (opcional)
        </label>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop('diploma')}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer"
        >
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange('diploma')}
            className="hidden"
            id="diploma-input"
          />
          <label htmlFor="diploma-input" className="cursor-pointer block">
            <div className="text-5xl mb-2">🎓</div>
            <p className="text-gray-600 font-medium">
              {data.diploma
                ? data.diploma.name
                : t('form.selectFile')}
            </p>
            <p className="text-gray-500 text-sm mt-2">PDF, JPG ou PNG (máx. 10MB)</p>
          </label>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-700 text-sm">
          <strong>ℹ️ Informação:</strong> Seus documentos serão analisados por IA para extrair informações automaticamente. Um administrador confirmará a autenticidade em até 48 horas.
        </p>
      </div>

      {!data.cv && (
        <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-sm">
          Você precisa fazer upload do currículo para continuar
        </div>
      )}
    </div>
  );
}
