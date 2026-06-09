'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api';

export default function OnboardingWizard() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError(t('form.required'));
      return;
    }

    if (formData.password.length < 8) {
      setError(t('form.passwordTooShort'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t('form.passwordMismatch'));
      return;
    }

    setLoading(true);
    try {
      const response = await authService.signup({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || t('errors.server'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">IMIGRA.AI</h1>
          <p className="text-gray-600">{t('welcome.subtitle')}</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t('welcome.cta')}
          </h2>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.fullName')} *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Ex: Juan Perez"
                required
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.email')} *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="seu@email.com"
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.password')} *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.confirmPassword')} *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50 mt-6"
              disabled={loading}
            >
              {loading ? t('form.loading') : t('onboarding.complete')}
            </button>
          </form>
        </div>

        {/* Footnote */}
        <p className="text-center text-sm text-gray-600">
          {t('welcome.login')}{' '}
          <a href="/login" className="text-blue-600 hover:underline font-semibold">
            {t('welcome.login').includes('?') ? t('welcome.login').split('?')[1]?.trim() || 'Entrar' : 'Entrar'}
          </a>
        </p>
      </div>
    </div>
  );
}
