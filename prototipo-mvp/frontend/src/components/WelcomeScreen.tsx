'use client';

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleStart = () => {
    router.push('/onboarding');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-4"
    >
      <div className="text-center max-w-2xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold text-blue-600 mb-8"
        >
          IMIGRA.AI
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          {t('welcome.title')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl text-gray-700 mb-6"
        >
          {t('welcome.subtitle')}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg text-gray-600 mb-12"
        >
          {t('welcome.description')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="space-y-4"
        >
          <button
            onClick={handleStart}
            className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105"
          >
            {t('welcome.cta')}
          </button>

          <button
            onClick={handleLogin}
            className="w-full max-w-md bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-4 px-6 rounded-lg transition duration-300"
          >
            {t('welcome.login')}
          </button>
        </motion.div>

        {/* Features highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: 'IA Inteligente', desc: 'Matching automático de vagas' },
            { title: 'Comunidade', desc: 'Conecte-se com outros imigrantes' },
            { title: '100% Gratuito', desc: 'Sem taxa de inscrição' },
          ].map((feature) => (
            <div key={feature.title} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
