# Sistema de Fidelidade - Cantinho do Pastel

## Visão Geral

Este projeto implementa um sistema de fidelidade por carimbos para a Cantinho do Pastel, permitindo que os clientes coletem carimbos ao fazer compras e resgatem recompensas.

## Tecnologias Utilizadas

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Autenticação e Banco de Dados)

## Funcionalidades

### Para Clientes
- Área de fidelidade pessoal em `/fidelidade`
- Login com nome e número do WhatsApp
- Inserção de códigos únicos recebidos da padaria para ganhar carimbos
- Visualização do progresso de carimbos coletados
- Resgate de recompensas ao completar 5 carimbos
- Sistema de níveis e pontos

### Para Administradores
- Painel administrativo seguro em `/admin`
- Login/registro de administradores com autenticação via Supabase
- Geração de códigos de fidelidade únicos para clientes
- Acompanhamento de códigos utilizados e não utilizados
- Visualização de estatísticas de fidelidade
- Gestão de clientes e recompensas

## Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd "cantinho do pastel"
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as credenciais do Supabase:
   ```
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Como Fazer Deploy

### Opção 1: Deploy via Lovable

1. Abra [Lovable](https://lovable.dev/projects/dcd048d6-1b56-4107-adba-7fe7e5b5e1a6)
2. Clique em Share -> Publish

### Opção 2: Deploy Manual

1. Construa o projeto:
   ```bash
   npm run build
   ```

2. Faça upload da pasta `dist` para seu serviço de hospedagem preferido (Vercel, Netlify, etc.)

## Configuração do Banco de Dados (Supabase)

O sistema utiliza o Supabase para autenticação e armazenamento de dados. Certifique-se de:

1. Criar um projeto no Supabase
2. Configurar as tabelas necessárias:
   - `customers`: Armazena informações dos clientes
   - `fidelity_codes`: Armazena os códigos de fidelidade
3. Configurar as políticas de segurança apropriadas
4. Adicionar as credenciais no arquivo `.env`

## Estrutura do Projeto

- `src/`
  - `components/`: Componentes reutilizáveis
  - `contexts/`: Contextos do React para gerenciamento de estado
  - `layouts/`: Layouts da aplicação
  - `lib/`: Configurações e tipos compartilhados
  - `pages/`: Páginas da aplicação
  - `services/`: Serviços para comunicação com APIs
  - `ui/`: Componentes de interface do usuário

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request