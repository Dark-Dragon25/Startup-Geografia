// Algoritmo de matching por keywords (sem uso de IA para economizar crédito)
export const calcularScore = (user: any, job: any): number => {
  let score = 0;

  // 40% - Skills em comum
  const skillsUser = (user.skills || []).map((s: string) => s.toLowerCase());
  const skillsJob = (job.skills_exigidas || []).map((s: string) => s.toLowerCase());

  if (skillsJob.length > 0) {
    const skillsMatches = skillsJob.filter((skill: string) =>
      skillsUser.some((us: string) => us.includes(skill) || skill.includes(us))
    );
    const skillsScore = (skillsMatches.length / skillsJob.length) * 40;
    score += skillsScore;
  } else {
    score += 20; // Se job não especifica skills, dá 50%
  }

  // 25% - Nível de experiência
  const nivelMap: any = {
    'junior-junior': 1,
    'junior-pleno': 0.5,
    'junior-senior': 0.1,
    'pleno-junior': 0.7,
    'pleno-pleno': 1,
    'pleno-senior': 0.6,
    'senior-junior': 0.5,
    'senior-pleno': 0.8,
    'senior-senior': 1,
  };
  const nivelKey = `${user.experience}-${job.nivel || 'pleno'}`;
  const nivelScore = (nivelMap[nivelKey] || 0.5) * 25;
  score += nivelScore;

  // 20% - Localidade
  const remoto = job.regime === 'remoto' || job.localidade?.toLowerCase().includes('remoto');
  const cidadeMatch = user.preferredCities?.some((city: string) =>
    job.localidade?.toLowerCase().includes(city.toLowerCase())
  );
  score += (remoto || cidadeMatch) ? 20 : 0;

  // 15% - Idiomas
  const idiomas = user.languages || [];
  const jobRequiresLanguage = job.descricao?.toLowerCase().includes('inglês');
  const hasEnglish = idiomas.includes('Inglês') || idiomas.includes('English');

  if (!jobRequiresLanguage) {
    score += 15; // Sem requisito de idioma, dá ponto completo
  } else if (hasEnglish) {
    score += 15;
  }

  return Math.round(score);
};

export const recomendarVagas = (user: any, vagas: any[], limit = 20) => {
  return vagas
    .map((vaga) => ({
      ...vaga,
      score_compatibilidade: calcularScore(user, vaga),
    }))
    .sort((a, b) => b.score_compatibilidade - a.score_compatibilidade)
    .slice(0, limit);
};

export default { calcularScore, recomendarVagas };
