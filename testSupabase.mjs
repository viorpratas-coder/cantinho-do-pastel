// Script para testar a conexão com o Supabase
import { createClient } from '@supabase/supabase-js';

// Carregar variáveis de ambiente do arquivo .env
import dotenv from 'dotenv';

dotenv.config();

// Configuração do Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('URL do Supabase:', supabaseUrl);
console.log('Anon Key:', supabaseAnonKey ? 'Carregada' : 'Não encontrada');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Erro: Variáveis de ambiente não encontradas');
  process.exit(1);
}

// Criar cliente Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Testando conexão com Supabase...');
  
  try {
    // Testar conexão básica
    const { data, error } = await supabase
      .from('customers')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Erro ao conectar com a tabela customers:', error);
      return false;
    }
    
    console.log('Conexão com Supabase estabelecida com sucesso!');
    console.log('Tabela customers acessível.');
    return true;
  } catch (error) {
    console.error('Erro ao conectar com Supabase:', error);
    return false;
  }
}

async function checkTables() {
  console.log('Verificando tabelas necessárias...');
  
  const tables = ['customers', 'fidelity_codes'];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.error(`Erro ao acessar tabela ${table}:`, error);
      } else {
        console.log(`Tabela ${table} acessível.`);
      }
    } catch (error) {
      console.error(`Erro ao verificar tabela ${table}:`, error);
    }
  }
}

async function main() {
  console.log('Iniciando verificação do banco de dados...');
  
  const isConnected = await testConnection();
  if (isConnected) {
    await checkTables();
  }
  
  console.log('Verificação concluída.');
}

// Executar a verificação
main().catch(console.error);