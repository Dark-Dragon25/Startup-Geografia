import type { Metadata } from 'next';
import { I18nextProvider } from 'react-i18next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'IMIGRA.AI - Oportunidades de Emprego para Imigrantes',
  description: 'Conecta imigrantes qualificados com as melhores oportunidades de emprego no Brasil',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
