# Guia de Configuração do Supabase

## Passo 1: Acessar o Painel do Supabase

1. Acesse [https://app.supabase.com](https://app.supabase.com)
2. Faça login com sua conta
3. Selecione o projeto "cantinho do pastel"

## Passo 2: Criar as Tabelas

### Tabela customers

1. No menu lateral, clique em "Table Editor"
2. Clique em "New Table"
3. Nome da tabela: `customers`
4. Adicione os seguintes campos:

| Nome do Campo | Tipo | Configurações |
|---------------|------|---------------|
| id | UUID | Primary Key, Default: gen_random_uuid() |
| customer_name | varchar | Not null |
| customer_phone | varchar | Not null, Unique |
| stamps | int4 | Default: 0 |
| last_reward_date | timestamptz | Nullable |
| profile_image | text | Nullable |
| level | int4 | Default: 1 |
| points | int4 | Default: 0 |
| total_spent | numeric | Default: 0 |
| rewards_claimed | int4 | Default: 0 |
| last_activity_date | timestamptz | Nullable |
| registration_date | timestamptz | Default: now() |
| created_at | timestamptz | Default: now() |
| updated_at | timestamptz | Default: now() |

### Tabela fidelity_codes

1. Clique em "New Table"
2. Nome da tabela: `fidelity_codes`
3. Adicione os seguintes campos:

| Nome do Campo | Tipo | Configurações |
|---------------|------|---------------|
| id | UUID | Primary Key, Default: gen_random_uuid() |
| code | varchar | Not null, Unique |
| customer_name | varchar | Not null |
| customer_phone | varchar | Not null |
| used | bool | Default: false |
| used_date | timestamptz | Nullable |
| created_at | timestamptz | Default: now() |

### Tabela admin_users

1. Clique em "New Table"
2. Nome da tabela: `admin_users`
3. Adicione os seguintes campos:

| Nome do Campo | Tipo | Configurações |
|---------------|------|---------------|
| id | UUID | Primary Key, Default: gen_random_uuid() |
| email | varchar | Not null, Unique |
| password_hash | text | Not null |
| created_at | timestamptz | Default: now() |
| last_login | timestamptz | Nullable |

## Passo 3: Criar Índices

Vá para a aba "SQL Editor" e execute os seguintes comandos:

```sql
-- Índices para melhorar performance de consultas
CREATE INDEX idx_customers_phone ON customers(customer_phone);
CREATE INDEX idx_customers_name ON customers(customer_name);
CREATE INDEX idx_fidelity_codes_code ON fidelity_codes(code);
CREATE INDEX idx_fidelity_codes_customer_phone ON fidelity_codes(customer_phone);
CREATE INDEX idx_fidelity_codes_used ON fidelity_codes(used);
```

## Passo 4: Configurar Políticas de Segurança (RLS)

Para cada tabela, habilite o RLS e adicione as políticas:

### Para a tabela customers:

```sql
-- Habilitar RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Users can view their own customer data" 
ON customers FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own customer data" 
ON customers FOR UPDATE 
USING (auth.role() = 'authenticated');
```

### Para a tabela fidelity_codes:

```sql
-- Habilitar RLS
ALTER TABLE fidelity_codes ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Users can view their own fidelity codes" 
ON fidelity_codes FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert fidelity codes" 
ON fidelity_codes FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update fidelity codes" 
ON fidelity_codes FOR UPDATE 
USING (auth.role() = 'authenticated');
```

### Para a tabela admin_users:

```sql
-- Habilitar RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Admins can view their own data" 
ON admin_users FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update their own data" 
ON admin_users FOR UPDATE 
USING (auth.role() = 'authenticated');
```

## Passo 5: Testar a Conexão

Após criar todas as tabelas e configurar as políticas, teste a conexão do seu aplicativo com o Supabase para garantir que tudo está funcionando corretamente.