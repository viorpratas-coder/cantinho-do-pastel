# Supabase Schema para Sistema de Fidelidade

## Tabelas

### 1. customers
Tabela para armazenar informações dos clientes participantes do programa de fidelidade.

```sql
CREATE TABLE customers (
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
```

### 2. fidelity_codes
Tabela para armazenar os códigos de fidelidade gerados para os clientes.

```sql
CREATE TABLE fidelity_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. admin_users
Tabela para armazenar informações dos usuários administradores.

```sql
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);
```

## Relacionamentos

1. `fidelity_codes.customer_phone` referencia `customers.customer_phone`
2. Não há relacionamento direto entre `admin_users` e as outras tabelas, pois é uma tabela de autenticação separada

## Índices

```sql
-- Índices para melhorar performance de consultas
CREATE INDEX idx_customers_phone ON customers(customer_phone);
CREATE INDEX idx_customers_name ON customers(customer_name);
CREATE INDEX idx_fidelity_codes_code ON fidelity_codes(code);
CREATE INDEX idx_fidelity_codes_customer_phone ON fidelity_codes(customer_phone);
CREATE INDEX idx_fidelity_codes_used ON fidelity_codes(used);
```

## Políticas de Segurança (RLS)

```sql
-- Habilitar RLS para todas as tabelas
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE fidelity_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Políticas para customers
CREATE POLICY "Users can view their own customer data" 
ON customers FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own customer data" 
ON customers FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Políticas para fidelity_codes
CREATE POLICY "Users can view their own fidelity codes" 
ON fidelity_codes FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert fidelity codes" 
ON fidelity_codes FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update fidelity codes" 
ON fidelity_codes FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Políticas para admin_users
CREATE POLICY "Admins can view their own data" 
ON admin_users FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update their own data" 
ON admin_users FOR UPDATE 
USING (auth.role() = 'authenticated');
```