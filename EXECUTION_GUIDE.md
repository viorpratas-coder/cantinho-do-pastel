# Guia de Execução em Produção

## Como Executar o Sistema Localmente

### 1. Pré-requisitos
- Node.js instalado (versão 16 ou superior)
- npm ou yarn instalado
- Conta no Supabase configurada

### 2. Clonar o Repositório
```bash
git clone https://github.com/viorpratas-coder/cantinho-do-pastel.git
cd "cantinho do pastel"
```

### 3. Instalar Dependências
```bash
npm install
```

### 4. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### 5. Executar em Modo de Desenvolvimento
```bash
npm run dev
```
O sistema estará disponível em http://localhost:8083

### 6. Build para Produção
```bash
npm run build
```
Os arquivos de produção serão gerados na pasta `dist/`

### 7. Preview do Build
```bash
npm run preview
```
O sistema estará disponível em http://localhost:4173

## Deploy em Serviços de Hospedagem

### Opção 1: Vercel
1. Faça login no Vercel
2. Crie um novo projeto
3. Importe o repositório GitHub
4. Configure as variáveis de ambiente
5. Faça o deploy

### Opção 2: Netlify
1. Faça login no Netlify
2. Clique em "New site from Git"
3. Selecione o repositório
4. Configure os seguintes comandos:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Adicione as variáveis de ambiente
6. Faça o deploy

### Opção 3: Servidor Próprio
1. Execute o build: `npm run build`
2. Copie a pasta `dist/` para seu servidor
3. Configure seu servidor web (Nginx, Apache, etc.) para servir os arquivos estáticos

## URLs de Acesso

- **Área do Cliente**: `/fidelidade`
- **Área Administrativa**: `/admin`
- **Login Administrativo**: `/admin/login`

## Credenciais de Acesso

### Administrador
- Para criar um administrador, acesse `/admin/login`
- Clique em "Criar nova conta administrativa"
- Preencha email e senha
- Faça login com as credenciais criadas

### Cliente
- Para acessar a área do cliente, acesse `/fidelidade`
- Faça login com nome e número de WhatsApp
- Se não tiver cadastro, será criado automaticamente

## Configuração do Supabase

### Tabelas Necessárias
1. **customers**
   - id (UUID)
   - customer_name (TEXT)
   - customer_phone (TEXT)
   - stamps (INTEGER)
   - level (INTEGER)
   - points (INTEGER)
   - total_spent (INTEGER)
   - rewards_claimed (INTEGER)
   - profile_image (TEXT)
   - last_reward_date (TIMESTAMP)
   - last_activity_date (TIMESTAMP)
   - registration_date (TIMESTAMP)
   - created_at (TIMESTAMP)
   - updated_at (TIMESTAMP)

2. **fidelity_codes**
   - id (UUID)
   - code (TEXT)
   - customer_name (TEXT)
   - customer_phone (TEXT)
   - used (BOOLEAN)
   - used_date (TIMESTAMP)
   - created_at (TIMESTAMP)

### Políticas de Segurança
Configure as seguintes políticas no painel do Supabase:

1. **Para a tabela customers**:
   - SELECT: Para usuários autenticados
   - INSERT: Para todos (para registro de novos clientes)
   - UPDATE: Para o próprio usuário

2. **Para a tabela fidelity_codes**:
   - SELECT: Para usuários autenticados (administradores)
   - INSERT: Para usuários autenticados (administradores)
   - UPDATE: Para usuários autenticados (administradores)

## Monitoramento e Manutenção

### Logs
- Verifique os logs do servidor web
- Monitore erros no console do navegador
- Utilize ferramentas de analytics para acompanhar o uso

### Atualizações
- Mantenha as dependências atualizadas
- Faça backup regular do banco de dados
- Teste atualizações em ambiente de desenvolvimento antes de aplicar em produção

### Backup
- Configure backups automáticos no Supabase
- Faça backup do código fonte regularmente
- Mantenha cópias de segurança das variáveis de ambiente

## Suporte
Para suporte adicional, entre em contato com a equipe de desenvolvimento.