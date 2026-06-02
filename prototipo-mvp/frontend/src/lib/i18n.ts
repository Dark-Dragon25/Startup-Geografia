import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const detectLanguage = () => {
  if (typeof window === 'undefined') return 'pt-BR';

  const browserLang = navigator.language || 'pt-BR';
  const supportedLangs = ['pt-BR', 'es', 'en', 'fr', 'ht', 'ar', 'uk', 'ru'];

  const lang = browserLang.split('-')[0];
  const fullLang = `${lang}-${browserLang.split('-')[1] || ''}`.replace(/-$/, '');

  if (supportedLangs.includes(fullLang)) return fullLang;
  if (supportedLangs.includes(lang)) return lang;

  return 'en';
};

const resources = {
  'pt-BR': { translation: require('../../public/locales/pt-BR/common.json') },
  'es': { translation: require('../../public/locales/es/common.json') },
  'en': { translation: require('../../public/locales/en/common.json') },
  'fr': { translation: require('../../public/locales/fr/common.json') },
  'ht': { translation: require('../../public/locales/ht/common.json') },
  'ar': { translation: require('../../public/locales/ar/common.json') },
  'uk': { translation: require('../../public/locales/uk/common.json') },
  'ru': { translation: require('../../public/locales/ru/common.json') },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: detectLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
