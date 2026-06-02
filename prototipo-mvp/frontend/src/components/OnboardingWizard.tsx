'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api';
import Step1PersonalData from './steps/Step1PersonalData';
import Step2ContactDiscovery from './steps/Step2ContactDiscovery';
import Step3ProfessionalProfile from './steps/Step3ProfessionalProfile';
import Step4DocumentUpload from './steps/Step4DocumentUpload';

export default function OnboardingWizard() {
  const { t } = useTranslation();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    birthDate: '',
    originCountry: '',
    languages: [],
    gender: '',
    currentCity: '',

    // Step 2
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    howDiscovered: '',

    // Step 3
    professionalArea: '',
    experience: '',
    preferredCities: [],
    salary: '',
    regime: '',

    // Step 4
    cv: null,
    diploma: null,
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      setError('');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setError('E-mail e senha são obrigatórios');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.signup({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        birthDate: formData.birthDate,
        originCountry: formData.originCountry,
        languages: formData.languages,
        professionalArea: formData.professionalArea,
        experience: formData.experience,
        preferredCities: formData.preferredCities,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || t('errors.server'));
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (data: any) => {
    setFormData({ ...formData, ...data });
  };

  const steps = [
    {
      title: t('onboarding.step1'),
      component: (
        <Step1PersonalData
          data={formData}
          onChange={updateFormData}
          onNext={handleNext}
        />
      ),
    },
    {
      title: t('onboarding.step2'),
      component: (
        <Step2ContactDiscovery
          data={formData}
          onChange={updateFormData}
          onNext={handleNext}
        />
      ),
    },
    {
      title: t('onboarding.step3'),
      component: (
        <Step3ProfessionalProfile
          data={formData}
          onChange={updateFormData}
          onNext={handleNext}
        />
      ),
    },
    {
      title: t('onboarding.step4'),
      component: (
        <Step4DocumentUpload
          data={formData}
          onChange={updateFormData}
          onSubmit={handleSubmit}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              {t('onboarding.progress', {
                current: step,
                total: 4,
              })}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{steps[step - 1].title}</h1>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Step component */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          {steps[step - 1].component}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-4">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition duration-300"
              disabled={loading}
            >
              {t('onboarding.back')}
            </button>
          )}

          {step < 4 && (
            <button
              onClick={handleNext}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {t('onboarding.next')}
            </button>
          )}

          {step === 4 && (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? t('form.loading') : t('onboarding.complete')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
