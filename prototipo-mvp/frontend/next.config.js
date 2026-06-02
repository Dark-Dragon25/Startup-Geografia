/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['pt-BR', 'es', 'en', 'fr', 'ht', 'ar', 'uk', 'ru'],
    defaultLocale: 'pt-BR',
  },
};

module.exports = nextConfig;
