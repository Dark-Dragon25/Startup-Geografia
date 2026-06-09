'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Dynamic blur words in Portuguese for the Hero
const words = ['merece', 'reconhece', 'valoriza', 'espera'];

function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split('');
  const STAGGER = 40;      // ms between letters
  const DURATION = 400;    // animation duration per letter
  const [letterStates, setLetterStates] = useState<{ opacity: number; blur: number }[]>(
    letters.map(() => ({ opacity: 0, blur: 15 }))
  );
  
  useEffect(() => {
    setLetterStates(letters.map(() => ({ opacity: 0, blur: 15 })));
    letters.forEach((_, i) => {
      setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
          setLetterStates(prev => {
            const next = [...prev];
            next[i] = { opacity: eased, blur: 15 * (1 - eased) };
            return next;
          });
          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };
        requestAnimationFrame(tick);
      }, i * STAGGER);
    });
  }, [trigger, word]);

  return (
    <span className="inline-block whitespace-nowrap">
      {letters.map((char, i) => (
        <span
          key={i}
          className="font-extrabold"
          style={{
            display: 'inline-block',
            opacity: letterStates[i]?.opacity ?? 0,
            filter: `blur(${letterStates[i]?.blur ?? 15}px)`,
            color: '#2563EB', // Vibrant Blue
            transition: 'color 0.4s ease',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

// Particle Visualization configured for Light Theme with Saturated Vibrant Particles
function LightParticleVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 60;
    const particles = Array.from({ length: COUNT }, (_, i) => {
      const seed = i * 1.618;
      return {
        bx: (seed * 127.1) % 1,
        by: (seed * 311.7) % 1,
        phase: seed * Math.PI * 2,
        speed: 0.15 + (seed % 0.25),
        radius: 1.8 + (seed % 2.5),
      };
    });

    let time = 0;
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p, i) => {
        const flowX = Math.sin(time * p.speed * 0.4 + p.phase) * 30;
        const flowY = Math.cos(time * p.speed * 0.3 + p.phase * 0.7) * 20;
        const x = p.bx * w + flowX;
        const y = p.by * h + flowY;
        const pulse = Math.sin(time * p.speed + p.phase) * 0.5 + 0.5;
        const alpha = 0.08 + pulse * 0.18;

        ctx.beginPath();
        ctx.arc(x, y, p.radius + pulse * 0.8, 0, Math.PI * 2);
        // Rich vibrant blue (#2563EB) and amber (#F59E0B) colors
        ctx.fillStyle = i % 2 === 0 ? `rgba(37, 99, 235, ${alpha})` : `rgba(245, 158, 11, ${alpha})`;
        ctx.fill();
      });

      time += 0.016;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }} />;
}

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

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [wordIndex, setWordIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStart = () => router.push('/onboarding');
  const handleLogin = () => router.push('/login');

  const steps = [
    {
      number: '01',
      title: 'Cadastro Rápido',
      subtitle: 'Em 30 segundos',
      description: 'Informe apenas Nome, E-mail e crie sua senha segura. Sem formulários longos no início.'
    },
    {
      number: '02',
      title: 'IA Analisa Seu Perfil',
      subtitle: 'Estruturação inteligente',
      description: 'Nosso algoritmo analisa seu currículo, formação de origem e readequação de títulos.'
    },
    {
      number: '03',
      title: 'Match de Vagas',
      subtitle: 'Oportunidades ideais',
      description: 'Veja vagas que correspondem com exatidão à sua formação e competências técnicas.'
    },
    {
      number: '04',
      title: 'Guia de Documentos',
      subtitle: 'Auxílio na revalidação',
      description: 'Receba caminhos claros e orientações inteligentes para revalidar seu diploma no Brasil.'
    },
    {
      number: '05',
      title: 'Comece a Trabalhar',
      subtitle: 'Recomeço garantido',
      description: 'Realize candidaturas rápidas e seguras e seja entrevistado por empresas acolhedoras.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#E3F2FD] overflow-x-hidden relative">
      
      {/* 1. NAVIGATION BAR */}
      <header className={`fixed z-50 transition-all duration-500 w-full ${isScrolled ? 'top-4 px-4' : 'top-0'}`}>
        <nav
          className={`mx-auto transition-all duration-500 flex items-center justify-between px-6 lg:px-12 w-full ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.04)] max-w-[1200px] h-16'
              : 'bg-transparent max-w-[1400px] h-20'
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group font-extrabold text-xl text-slate-900">
            <LogoIcon className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
            <span className="tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              IMIGRA.AI
            </span>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Diferenciais</a>
            <a href="#process" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Como Funciona</a>
            <a href="#cta" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Contato</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-5">
            <button
              onClick={handleLogin}
              className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"
            >
              Login
            </button>
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white text-xs lg:text-sm font-bold px-6 py-2.5 rounded-full hover:shadow-[0_4px_20px_rgba(37,99,235,0.25)] hover:scale-105 transition-all duration-300 active:scale-95"
            >
              Começar Agora
            </button>
          </div>
        </nav>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
        {/* Soft Grid Lines Background with Vibrant Saturated Glows */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-amber-50/20" />
          {/* Vertical Grid Lines */}
          <div className="flex justify-between w-full h-full px-12">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-[1px] h-full bg-slate-100/80" />
            ))}
          </div>
          {/* Horizontal Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between h-full">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-[1px] w-full bg-slate-100/80" />
            ))}
          </div>
        </div>

        {/* Ambient Vibrant Glows */}
        <div className="absolute top-[15%] left-[5%] w-[450px] h-[450px] rounded-full bg-blue-300/30 opacity-60 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[15%] right-[5%] w-[450px] h-[450px] rounded-full bg-amber-300/20 opacity-50 blur-[120px] pointer-events-none" />
        <div className="absolute top-[40%] right-[25%] w-[350px] h-[350px] rounded-full bg-violet-300/20 opacity-40 blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-20 flex flex-col items-center text-center">
          {/* Tagline Eyebrow with Rich Borders */}
          <div className="mb-8 inline-flex items-center gap-3 bg-white border border-slate-200/80 py-2 px-5 rounded-full shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              IA + Acolhimento Humano para Imigrantes no Brasil
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-left md:text-center text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold tracking-tight leading-[0.96] text-slate-900 max-w-5xl mb-8 font-sans">
            Sua ponte para o emprego que você{' '}
            <span className="relative inline-block min-w-[160px] md:min-w-[300px]">
              <BlurWord word={words[wordIndex]} trigger={wordIndex} />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed mb-14">
            {t('welcome.subtitle')} O IMIGRA.AI simplifica a busca de emprego estruturando seu histórico profissional internacional de acordo com o mercado nacional.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 w-full"
            >
              {t('welcome.cta')}
            </button>
            <button
              onClick={handleLogin}
              className="bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-4 px-10 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 w-full"
            >
              Entrar na Conta
            </button>
          </div>

          {/* Metrics bar */}
          <div className="mt-28 w-full border-t border-slate-200/80 pt-12 grid grid-cols-3 gap-6 text-center max-w-4xl">
            {[
              { value: '47k+', label: 'Vagas Mapeadas' },
              { value: '95%', label: 'Taxa de Compatibilidade' },
              { value: '30s', label: 'Cadastro Ultra Rápido' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURES BENTO GRID */}
      <section id="features" className="py-32 bg-[#F8F9FA] border-y border-slate-200/60 relative overflow-hidden">
        <LightParticleVisualization />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="mb-24 max-w-3xl">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-blue-600 font-extrabold uppercase tracking-wider mb-5">
              <span className="w-10 h-[2px] bg-blue-600" />
              Diferenciais Tecnológicos
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Tecnologia de ponta com foco em acolhimento.
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Card 1: Large Bento Card (span 2) */}
            <div className="md:col-span-2 relative bg-white border border-slate-200/60 rounded-3xl p-8 md:p-12 overflow-hidden hover-lift shadow-sm flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mt-6 mb-3 text-slate-900">Matching Inteligente por IA</h3>
                <p className="text-slate-600 leading-relaxed max-w-md">
                  Nossa inteligência artificial analisa seu currículo, formação no país de origem e competências para encontrar a vaga ideal respeitando seu histórico técnico.
                </p>
              </div>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="text-6xl font-extrabold text-emerald-600">95%</span>
                <span className="text-sm font-bold text-slate-500">precisão nas recomendações</span>
              </div>
            </div>

            {/* Card 2: Medium Bento Card */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-8 hover-lift shadow-sm flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mt-6 mb-3 text-slate-900">Revalidação de Diploma</h3>
                <p className="text-slate-600 leading-relaxed">
                  Passo a passo interativo e orientações automatizadas sobre como obter a validação de seus diplomas no Brasil sem complicações.
                </p>
              </div>
              <span className="text-sm font-bold text-blue-600 inline-flex items-center gap-1.5 cursor-pointer mt-6 hover:underline">
                Saiba Mais ➔
              </span>
            </div>

            {/* Card 3: Medium Bento Card */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-8 hover-lift shadow-sm flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-100">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mt-6 mb-3 text-slate-900">Comunidades por Área</h3>
                <p className="text-slate-600 leading-relaxed">
                  Conecte-se com imigrantes na mesma área de atuação, trocando contatos, dicas profissionais e informações de moradia.
                </p>
              </div>
              <span className="text-sm font-bold text-blue-600 inline-flex items-center gap-1.5 cursor-pointer mt-6 hover:underline">
                Explorar Comunidade ➔
              </span>
            </div>

            {/* Card 4: Large Bento Card (span 2) */}
            <div className="md:col-span-2 bg-white border border-slate-200/60 rounded-3xl p-8 md:p-12 hover-lift shadow-sm flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center border border-violet-100">
                  <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mt-6 mb-3 text-slate-900">Suporte Multilíngue 24/7</h3>
                <p className="text-slate-600 leading-relaxed max-w-lg">
                  Tire dúvidas em tempo real sobre burocracias, leis de trabalho e documentação básica (CPF, CTPS) no idioma em que você se sente mais confortável.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {['Português', 'Espanhol', 'English', 'Français', 'Kreyòl', 'العربية'].map((lang) => (
                  <span key={lang} className="bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 text-xs font-bold text-slate-600">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION (PROCESS) */}
      <section id="process" className="py-32 relative overflow-hidden bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          
          {/* Section Header */}
          <div className="mb-24">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-blue-600 font-extrabold uppercase tracking-wider mb-5">
              <span className="w-10 h-[2px] bg-blue-600" />
              O Processo
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Como o IMIGRA.AI funciona
            </h2>
          </div>

          {/* Steps Horizontal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                onClick={() => setActiveStep(index)}
                className={`relative p-8 border-2 rounded-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[260px] ${
                  activeStep === index
                    ? 'bg-blue-50/20 border-blue-600 shadow-md scale-105'
                    : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
              >
                {/* Step Top */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-3xl font-extrabold font-mono ${activeStep === index ? 'text-blue-600' : 'text-slate-300'}`}>
                      {step.number}
                    </span>
                    <div className="flex-1 h-[2px] bg-slate-100 ml-4 overflow-hidden">
                      {activeStep === index && (
                        <div className="h-full bg-blue-600 w-full origin-left" style={{ animation: 'progress-bar 4s linear forwards' }} />
                      )}
                    </div>
                  </div>

                  {/* Step Content */}
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                  <span className="text-xs text-slate-400 font-semibold block mb-4">{step.subtitle}</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>

                {/* Base highlighting bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-blue-600 transition-transform duration-500 origin-left ${
                  activeStep === index ? 'scale-x-100' : 'scale-x-0'
                }`} />
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes progress-bar {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
        `}</style>
      </section>

      {/* 5. CTA SECTION */}
      <section id="cta" className="py-32 relative overflow-hidden bg-gradient-to-br from-blue-50/40 via-white to-amber-50/30 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
            Pronto para recomeçar sua carreira no Brasil?
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Seja qual for a sua área de atuação: conectamos você de forma inteligente a empresas que buscam profissionais globais.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center max-w-lg mx-auto">
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:scale-105 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 w-full"
            >
              Criar Conta Grátis
            </button>
            <button
              onClick={handleLogin}
              className="bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-4 px-10 rounded-2xl hover:scale-105 transition-all duration-300 w-full"
            >
              Entrar no Sistema
            </button>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-white border-t border-slate-200/80 py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <a href="#" className="flex items-center gap-3 font-bold text-slate-900 text-lg">
            <LogoIcon className="w-6 h-6 text-blue-600" />
            <span className="tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-extrabold">
              IMIGRA.AI
            </span>
          </a>

          <p className="text-sm text-slate-400 font-medium">
            Parceria para inclusão socioeconômica de imigrantes qualificados.
          </p>

          <div className="flex gap-8">
            <a href="#" className="text-sm font-semibold text-slate-400 hover:text-blue-600 transition-colors">Privacidade</a>
            <a href="#" className="text-sm font-semibold text-slate-400 hover:text-blue-600 transition-colors">Termos</a>
            <a href="#" className="text-sm font-semibold text-slate-400 hover:text-blue-600 transition-colors">Contato</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
