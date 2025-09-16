import { createClient } from '@supabase/supabase-js'

// Tipos para as variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Validação das variáveis de ambiente
if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable')
}

// Criação do cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)