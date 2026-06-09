import supabase from '../config/supabase';

// Shared mock database for demo
export const mockUsers: Record<string, any> = {
  'user_1': {
    id: 'user_1',
    email: 'imigrante1@example.com',
    fullName: 'Juan Perez',
    birthDate: '1990-05-15',
    originCountry: 'Venezuela',
    languages: ['Espanhol', 'Português'],
    professionalArea: 'Tecnologia',
    experience: 'pleno',
    preferredCities: ['São Paulo'],
    skills: ['Node.js', 'PostgreSQL', 'React', 'TypeScript'],
  },
  'user_2': {
    id: 'user_2',
    email: 'imigrante2@example.com',
    fullName: 'Marie Dubois',
    birthDate: '1988-10-20',
    originCountry: 'Haiti',
    languages: ['Francês', 'Haitiano', 'Português'],
    professionalArea: 'Engenharia',
    experience: 'senior',
    preferredCities: ['Rio de Janeiro'],
    skills: ['AutoCAD', 'Revit', 'Excel'],
  }
};

export async function getUserProfile(userId: string) {
  // Try Supabase first
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', userId)
      .single();

    if (data && !error) {
      return {
        id: data.id,
        email: data.email,
        fullName: data.nome,
        birthDate: data.data_nascimento,
        originCountry: data.pais_origem,
        languages: data.idiomas || [],
        professionalArea: data.area_profissional,
        experience: data.nivel_experiencia,
        preferredCities: data.cidades_preferidas || [],
        phone: data.telefone,
        cvUrl: data.cv_url,
      };
    }
  } catch (err) {
    console.warn('Supabase fetch failed, falling back to mock:', err);
  }

  // Fallback to mock: Search by ID in mockUsers
  const user = Object.values(mockUsers).find((u: any) => u.id === userId);
  if (user) {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      birthDate: user.birthDate || '',
      originCountry: user.originCountry || '',
      languages: user.languages || [],
      professionalArea: user.professionalArea || '',
      experience: user.experience || 'junior',
      preferredCities: user.preferredCities || [],
      phone: user.phone || '',
      cvUrl: user.cvUrl || '',
    };
  }
  return null;
}

export async function updateUserProfile(userId: string, profileData: any) {
  // Update mock
  const userKey = Object.keys(mockUsers).find(key => mockUsers[key].id === userId);
  if (userKey) {
    mockUsers[userKey] = {
      ...mockUsers[userKey],
      ...profileData,
    };
  } else {
    // If not found by key, find the user object and update it, or add it
    const existingUser = Object.values(mockUsers).find((u: any) => u.id === userId);
    if (existingUser) {
      const existingKey = Object.keys(mockUsers).find(key => mockUsers[key].id === userId)!;
      mockUsers[existingKey] = {
        ...existingUser,
        ...profileData,
      };
    } else {
      mockUsers[profileData.email || userId] = {
        id: userId,
        ...profileData,
      };
    }
  }

  // Try Supabase
  try {
    const dbData: any = {};
    if (profileData.fullName) dbData.nome = profileData.fullName;
    if (profileData.birthDate) dbData.data_nascimento = profileData.birthDate;
    if (profileData.originCountry) dbData.pais_origem = profileData.originCountry;
    if (profileData.languages) dbData.idiomas = profileData.languages;
    if (profileData.professionalArea) dbData.area_profissional = profileData.professionalArea;
    if (profileData.experience) dbData.nivel_experiencia = profileData.experience;
    if (profileData.preferredCities) dbData.cidades_preferidas = profileData.preferredCities;
    if (profileData.phone) dbData.telefone = profileData.phone;
    if (profileData.cvUrl) dbData.cv_url = profileData.cvUrl;

    await supabase
      .from('usuarios')
      .update(dbData)
      .eq('id', userId);
  } catch (err) {
    console.warn('Supabase update failed:', err);
  }

  return getUserProfile(userId);
}
