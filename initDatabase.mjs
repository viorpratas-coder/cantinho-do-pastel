// Script para inicializar o banco de dados Supabase
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Configuração do Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Para operações administrativas

console.log('URL do Supabase:', supabaseUrl);

if (!supabaseUrl) {
  console.error('Erro: VITE_SUPABASE_URL não encontrada');
  process.exit(1);
}

// Usar service key se disponível, caso contrário usar anon key
const supabaseKey = supabaseServiceKey || supabaseAnonKey;

if (!supabaseKey) {
  console.error('Erro: Chave do Supabase não encontrada');
  process.exit(1);
}

// Criar cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
  console.log('Criando tabelas...');
  
  // SQL para criar as tabelas
  const sqlCommands = [
    `
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(20) UNIQUE NOT NULL,
        stamps INTEGER DEFAULT 0,
        last_reward_date TIMESTAMP WITH TIME ZONE,
        profile_image TEXT,
        level INTEGER DEFAULT 1,
        points INTEGER DEFAULT 0,
        total_spent DECIMAL(10, 2) DEFAULT 0,
        rewards_claimed INTEGER DEFAULT 0,
        last_activity_date TIMESTAMP WITH TIME ZONE,
        registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS fidelity_codes (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        code VARCHAR(20) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(20) NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        used_date TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        last_login TIMESTAMP WITH TIME ZONE
      );
    `
  ];
  
  // Criar tabelas
  for (const sql of sqlCommands) {
    try {
      // Extrair o nome da tabela do comando SQL
      const tableNameMatch = sql.match(/CREATE TABLE IF NOT EXISTS (\w+)/i);
      const tableName = tableNameMatch ? tableNameMatch[1] : 'desconhecida';
      
      console.log(`Criando tabela ${tableName}...`);
      
      const { error } = await supabase.rpc('exec_sql', { sql });
      
      if (error) {
        // Se rpc não funcionar, tentar outra abordagem
        console.warn(`Aviso ao criar tabela ${tableName}:`, error.message);
        console.log('Tentando abordagem alternativa...');
        break;
      } else {
        console.log(`Tabela ${tableName} criada com sucesso!`);
      }
    } catch (error) {
      console.error('Erro ao executar SQL:', error);
      break;
    }
  }
  
  // Criar índices
  const indexes = [
    'CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(customer_phone);',
    'CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(customer_name);',
    'CREATE INDEX IF NOT EXISTS idx_fidelity_codes_code ON fidelity_codes(code);',
    'CREATE INDEX IF NOT EXISTS idx_fidelity_codes_customer_phone ON fidelity_codes(customer_phone);',
    'CREATE INDEX IF NOT EXISTS idx_fidelity_codes_used ON fidelity_codes(used);'
  ];
  
  console.log('Criando índices...');
  for (const index of indexes) {
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: index });
      
      if (error) {
        console.warn('Aviso ao criar índice:', error.message);
      } else {
        console.log('Índice criado com sucesso');
      }
    } catch (error) {
      console.error('Erro ao criar índice:', error);
    }
  }
}

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
    return true;
  } catch (error) {
    console.error('Erro ao conectar com Supabase:', error);
    return false;
  }
}

async function main() {
  console.log('Iniciando criação do banco de dados...');
  
  const isConnected = await testConnection();
  if (isConnected) {
    await createTables();
  }
  
  console.log('Criação do banco de dados concluída.');
}

// Executar a criação
main().catch(console.error);