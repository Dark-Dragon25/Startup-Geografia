'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api';
import { useTranslation } from 'react-i18next';

// Modern Custom SVG Logo Component
function LogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#logo-grad-1)" />
      <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="url(#logo-grad-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="logo-grad-1" x1="2" y1="7" x2="22" y2="7" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="logo-grad-2" x1="2" y1="12" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'E-mail ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log('Social login with:', provider);
    localStorage.setItem('token', 'mock-social-jwt-token');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#E3F2FD] via-white to-[#FFF9C4] relative overflow-hidden">
      {/* Círculo sutil de luz amarela no fundo */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#FFF9C4] opacity-30 blur-[100px] pointer-events-none"></div>
      {/* Círculo sutil de luz azul no fundo */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#E3F2FD] opacity-50 blur-[100px] pointer-events-none"></div>

      {/* Card Principal - Limpo e Acolhedor */}
      <div className="max-w-md w-full bg-white border border-[#E9ECEF] rounded-3xl p-8 shadow-[0_10px_30px_rgba(30,136,229,0.08)] hover-lift z-10">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="flex items-center gap-3 font-extrabold text-3xl mb-3">
            <LogoIcon className="w-8 h-8" />
            <span className="tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              IMIGRA.AI
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Bem-vindo de volta!
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Entre na sua conta para continuar buscando vagas
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Endereço de E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-[#E9ECEF] bg-gray-50 text-gray-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#1E88E5] focus:border-[#1E88E5] transition-all duration-200 outline-none font-medium placeholder-gray-400"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Senha
              </label>
              <a
                href="#"
                className="text-xs text-[#1E88E5] hover:underline font-semibold"
              >
                Esqueceu a senha?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[#E9ECEF] bg-gray-50 text-gray-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#1E88E5] focus:border-[#1E88E5] transition-all duration-200 outline-none font-medium placeholder-gray-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-bold py-4 rounded-xl transition-all duration-300 shadow-md text-white mt-2 bg-gradient-to-r from-[#1E88E5] to-[#1565C0] hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-3 bg-white text-gray-400 font-bold">Ou continue com</span>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="w-full flex items-center justify-center py-3 px-4 bg-white border border-[#E9ECEF] hover:bg-gray-50 rounded-xl font-semibold transition-all duration-300 text-sm text-gray-700 hover:shadow-sm"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 2.43-4.53 6.16-4.53z"
              />
            </svg>
            Entrar com o Google
          </button>
        </div>

        <div className="text-center mt-8">
          <div className="text-sm text-gray-600">
            Novo por aqui?{' '}
            <a href="/" className="text-[#1E88E5] hover:underline font-bold">
              Criar Conta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
