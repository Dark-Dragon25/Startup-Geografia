'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { jobService, userService, cvService } from '@/services/api';
import JobCard from './JobCard';

interface Job {
  id: string;
  titulo: string;
  empresa: string;
  localidade: string;
  regime: string;
  salario_min?: number;
  salario_max?: number;
  score_compatibilidade?: number;
}

const countriesList = [
  'Venezuela', 'Colômbia', 'Peru', 'Haiti', 'Bolívia', 'Paraguai',
  'Uruguai', 'Argentina', 'Chile', 'Equador', 'Brasil', 'Síria',
  'Ucrânia', 'Rússia', 'Portugal', 'Angola', 'Moçambique',
];

const languagesOptions = ['Português', 'Espanhol', 'Inglês', 'Francês', 'Árabe', 'Ucraniano', 'Russo', 'Italiano'];

const areasOptions = [
  'Saúde', 'Engenharia', 'Tecnologia', 'Educação', 'Administração',
  'Design', 'Direito', 'Gastronomia', 'Construção', 'Outro'
];

const citiesOptions = [
  'São Paulo', 'Rio de Janeiro', 'Brasília', 'Curitiba', 'Porto Alegre',
  'Belo Horizonte', 'Recife', 'Salvador', 'Remoto', 'Outra'
];

export default function Dashboard() {
  const { t } = useTranslation();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    area: '',
    city: '',
    regime: '',
  });

  // Profile states
  const [profile, setProfile] = useState<any>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');

  // Form states for profile completion
  const [birthDate, setBirthDate] = useState('');
  const [originCountry, setOriginCountry] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [professionalArea, setProfessionalArea] = useState('');
  const [experience, setExperience] = useState('junior');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [phone, setPhone] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [diplomaFile, setDiplomaFile] = useState<File | null>(null);

  const fetchProfile = async () => {
    try {
      const response = await userService.getProfile();
      setProfile(response.data);
    } catch (err) {
      console.warn('Falha ao carregar perfil:', err);
    }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobService.getRecommendations();
      setJobs(response.data?.vagas || response.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || t('errors.server'));
      // Mock data for fallback
      setJobs([
        {
          id: 'job_1',
          titulo: 'Desenvolvedor Backend Senior',
          empresa: 'Tech Solutions',
          localidade: 'São Paulo, SP',
          regime: 'CLT',
          salario_min: 8000,
          salario_max: 12000,
          score_compatibilidade: 92,
        },
        {
          id: 'job_2',
          titulo: 'Engenheiro Civil - Projetos',
          empresa: 'Construções Brasil',
          localidade: 'Rio de Janeiro, RJ',
          regime: 'CLT',
          salario_min: 6000,
          salario_max: 9000,
          score_compatibilidade: 78,
        },
        {
          id: 'job_3',
          titulo: 'Desenvolvedor Frontend React',
          empresa: 'Digital Agency',
          localidade: 'Remoto',
          regime: 'PJ',
          salario_min: 5000,
          salario_max: 8000,
          score_compatibilidade: 65,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check authentication
    if (!localStorage.getItem('token')) {
      router.push('/login');
      return;
    }

    fetchProfile();
    fetchJobs();
  }, []);

  // Filter jobs locally or call API
  useEffect(() => {
    const applyFilters = async () => {
      try {
        setLoading(true);
        const queryParams: any = {};
        if (filters.area) queryParams.area = filters.area;
        if (filters.city) queryParams.cidade = filters.city;
        if (filters.regime) queryParams.regime = filters.regime;

        const response = await jobService.getAll(queryParams);
        setJobs(response.data?.vagas || response.data || []);
      } catch (err) {
        console.warn('Erro ao filtrar vagas', err);
      } finally {
        setLoading(false);
      }
    };

    if (filters.area || filters.city || filters.regime) {
      applyFilters();
    } else {
      fetchJobs();
    }
  }, [filters]);

  const isProfileComplete = (userProfile: any) => {
    return (
      userProfile &&
      userProfile.originCountry &&
      userProfile.professionalArea &&
      userProfile.experience &&
      userProfile.languages &&
      userProfile.languages.length > 0 &&
      (userProfile.cvUrl || cvFile)
    );
  };

  const handleApply = async (jobId: string) => {
    try {
      // Fetch fresh profile
      let currentProfile = profile;
      try {
        const response = await userService.getProfile();
        currentProfile = response.data;
        setProfile(currentProfile);
      } catch (e) {
        // Fallback to local profile state
      }

      if (isProfileComplete(currentProfile)) {
        await jobService.apply(jobId);
        alert('Candidatura enviada com sucesso!');
      } else {
        setSelectedJobId(jobId);
        setModalError('');
        
        // Prefill modal
        setBirthDate(currentProfile?.birthDate || '');
        setOriginCountry(currentProfile?.originCountry || '');
        setSelectedLanguages(currentProfile?.languages || []);
        setProfessionalArea(currentProfile?.professionalArea || '');
        setExperience(currentProfile?.experience || 'junior');
        setSelectedCities(currentProfile?.preferredCities || []);
        setPhone(currentProfile?.phone || '');
        setCvFile(null);
        setDiplomaFile(null);

        setShowProfileModal(true);
      }
    } catch (err) {
      alert('Erro ao iniciar candidatura');
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError('');

    if (!originCountry || !professionalArea || !experience || selectedLanguages.length === 0 || selectedCities.length === 0) {
      setModalError('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }

    if (!profile?.cvUrl && !cvFile) {
      setModalError('Você precisa carregar o seu currículo para se candidatar.');
      return;
    }

    setModalLoading(true);
    try {
      let cvUrl = profile?.cvUrl || '';
      
      // Upload CV
      if (cvFile) {
        const uploadRes = await cvService.upload(cvFile);
        cvUrl = uploadRes.data.filename || cvFile.name;
      }

      // Upload Diploma (Optional)
      if (diplomaFile) {
        await cvService.upload(diplomaFile);
      }

      // Update Profile on Backend
      const updatedProfileRes = await userService.updateProfile({
        birthDate,
        originCountry,
        languages: selectedLanguages,
        professionalArea,
        experience,
        preferredCities: selectedCities,
        phone,
        cvUrl,
      });

      const updatedProfile = updatedProfileRes.data.profile || updatedProfileRes.data;
      setProfile(updatedProfile);

      // Submit Application
      if (selectedJobId) {
        await jobService.apply(selectedJobId);
        alert('Perfil atualizado e candidatura enviada com sucesso!');
      }

      setShowProfileModal(false);
      setSelectedJobId(null);
    } catch (err: any) {
      setModalError(err.response?.data?.error || err.response?.data?.message || 'Erro ao atualizar perfil.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleLanguageToggle = (lang: string) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const handleCityToggle = (city: string) => {
    setSelectedCities(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">IMIGRA.AI</h1>
            <p className="text-gray-600 text-sm">{t('dashboard.title')}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/chat')}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-2 px-4 rounded-lg transition flex items-center gap-2"
            >
              🤖 {t('dashboard.chat')}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('dashboard.filters')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('dashboard.area')}
              </label>
              <select
                value={filters.area}
                onChange={(e) => setFilters({ ...filters, area: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas as áreas</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Saúde">Saúde</option>
                <option value="Engenharia">Engenharia</option>
                <option value="Educação">Educação</option>
                <option value="Administração">Administração</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('dashboard.city')}
              </label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas as cidades</option>
                <option value="São Paulo">São Paulo</option>
                <option value="Rio de Janeiro">Rio de Janeiro</option>
                <option value="Brasília">Brasília</option>
                <option value="Curitiba">Curitiba</option>
                <option value="Remoto">Remoto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('dashboard.regime')}
              </label>
              <select
                value={filters.regime}
                onChange={(e) => setFilters({ ...filters, regime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos os regimes</option>
                <option value="clt">CLT</option>
                <option value="pj">PJ</option>
                <option value="remoto">Remoto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin text-3xl">⏳</div>
            <p className="mt-4 text-gray-600">{t('form.loading')}</p>
          </div>
        )}

        {/* Jobs List */}
        {!loading && jobs.length > 0 && (
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleApply}
              />
            ))}
          </div>
        )}

        {/* No Jobs */}
        {!loading && jobs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg">{t('dashboard.noJobs')}</p>
            <p className="text-gray-500 text-sm mt-2">
              Tente ajustar seus filtros ou volte mais tarde
            </p>
          </div>
        )}
      </div>

      {/* Progressive Onboarding Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 flex flex-col transition-all transform scale-100 duration-300">
            {/* Modal Header */}
            <div className="bg-blue-600 text-white p-6 sticky top-0 flex justify-between items-center rounded-t-2xl shadow">
              <div>
                <h3 className="text-xl font-bold">Complete seu Perfil</h3>
                <p className="text-blue-100 text-sm mt-1">Precisamos de algumas informações para enviar sua candidatura</p>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-white hover:text-blue-200 font-bold text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleProfileSubmit} className="p-8 space-y-6">
              {modalError && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-sm">
                  {modalError}
                </div>
              )}

              {/* Seção 1: Dados Pessoais */}
              <div className="border-b border-gray-100 pb-6">
                <h4 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">1</span>
                  Dados Pessoais
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('form.birthDate')} *
                    </label>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('form.originCountry')} *
                    </label>
                    <select
                      value={originCountry}
                      onChange={(e) => setOriginCountry(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Selecione o país</option>
                      {countriesList.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('form.phone')}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: (11) 99999-9999"
                    />
                  </div>
                </div>
              </div>

              {/* Seção 2: Idiomas */}
              <div className="border-b border-gray-100 pb-6">
                <h4 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">2</span>
                  Idiomas que fala * (selecione pelo menos um)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {languagesOptions.map(lang => {
                    const isSelected = selectedLanguages.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => handleLanguageToggle(lang)}
                        className={`py-2 px-3 text-sm font-medium rounded-lg border transition text-center ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white shadow'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Seção 3: Profissional */}
              <div className="border-b border-gray-100 pb-6">
                <h4 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">3</span>
                  Perfil Profissional
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('form.professionalArea')} *
                    </label>
                    <select
                      value={professionalArea}
                      onChange={(e) => setProfessionalArea(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Selecione uma área</option>
                      {areasOptions.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('form.experience')} *
                    </label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="junior">Junior</option>
                      <option value="pleno">Pleno</option>
                      <option value="senior">Senior</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Cidades onde quer trabalhar * (selecione pelo menos uma)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {citiesOptions.map(city => {
                      const isSelected = selectedCities.includes(city);
                      return (
                        <button
                          key={city}
                          type="button"
                          onClick={() => handleCityToggle(city)}
                          className={`py-2 px-1 text-xs font-semibold rounded-lg border transition text-center ${
                            isSelected
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {city}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Seção 4: Documentos */}
              <div>
                <h4 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center text-xs">4</span>
                  Upload de Documentos
                </h4>

                <div className="space-y-4">
                  {/* CV Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.curriculum')} *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer relative bg-gray-50">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="text-3xl mb-1">📄</div>
                      <p className="text-gray-700 font-medium text-sm">
                        {cvFile ? cvFile.name : profile?.cvUrl ? `Currículo atual: ${profile.cvUrl}` : t('form.selectFile')}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">PDF, DOC ou DOCX (máx. 5MB)</p>
                    </div>
                  </div>

                  {/* Diploma Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.diploma')} (opcional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer relative bg-gray-50">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setDiplomaFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="text-3xl mb-1">🎓</div>
                      <p className="text-gray-700 font-medium text-sm">
                        {diplomaFile ? diplomaFile.name : t('form.selectFile')}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">PDF, JPG ou PNG (máx. 10MB)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões do Modal */}
              <div className="flex gap-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-3 px-6 rounded-lg transition"
                  disabled={modalLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  disabled={modalLoading}
                >
                  {modalLoading ? (
                    <>
                      <span className="animate-spin">⏳</span> Salvando...
                    </>
                  ) : (
                    'Salvar e Candidatar'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
