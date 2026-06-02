import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Variáveis SUPABASE_URL ou SUPABASE_SERVICE_KEY não configuradas');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getTables = async () => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .limit(0);

  if (error && error.code !== 'PGRST116') {
    console.error('Erro ao conectar ao banco:', error);
  }
};

// Initialize database tables on startup
getTables().then(() => {
  console.log('✅ Conexão com Supabase estabelecida');
}).catch(err => {
  console.warn('⚠️ Não foi possível conectar ao Supabase. Rodando em modo mock.');
});

export default supabase;
