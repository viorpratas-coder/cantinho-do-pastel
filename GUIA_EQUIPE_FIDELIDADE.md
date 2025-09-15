# Guia da Equipe - Programa de Fidelidade

## Visão Geral

O programa de fidelidade do Cantinho do Pastel permite que os clientes coletem carimbos a cada compra e ganhem recompensas exclusivas. O sistema foi atualizado para maior segurança e controle.

## Nova Funcionalidade - Sistema de Códigos Únicos

Implementamos um novo sistema de fidelidade mais seguro:
- Códigos únicos gerados pela pastelaria (formato: FID-XXXXXX)
- Clientes precisam provar posse do WhatsApp cadastrado
- Prevenção total de fraudes
- Controle absoluto sobre quem recebe carimbos

## Como Usar o Sistema (Administrador)

### 1. Gerar Código de Fidelidade

1. Acesse a página de administração: `/admin/fidelidade`
2. Na seção "Gerar Código de Fidelidade":
   - Preencha o nome completo do cliente
   - Preencha o telefone (WhatsApp) do cliente
   - Clique em "Gerar Código de Fidelidade"
3. Um código único será gerado (ex: FID-A1B2C3)
4. Clique em "Copiar" e envie o código ao cliente via WhatsApp

### 2. Confirmar Pagamento (Sistema Antigo)

1. Acesse a página de administração: `/admin/fidelidade`
2. Na seção "Confirmar Pagamento e Conceder Carimbo":
   - Insira o código do pedido fornecido pelo cliente
   - Preencha as informações do cliente (opcional)
   - Clique em "Confirmar Pagamento e Adicionar Carimbo"

## Como Funciona para os Clientes

### Acessar o Programa de Fidelidade

1. O cliente acessa: `/fidelidade/cliente`
2. Faz login com nome completo e telefone (WhatsApp)
3. Visualiza seu cartão de fidelidade atualizado
4. Insere códigos recebidos para ganhar carimbos

### Receber Recompensas

1. Após coletar 5 carimbos, o cliente ganha um pastel grátis
2. A recompensa fica disponível no cartão de fidelidade
3. O cliente apresenta o cartão na próxima visita para resgatar

## Instruções para a Equipe

### Ao Atender um Cliente

1. **Registrar Informações**:
   - Nome completo do cliente
   - Telefone (WhatsApp) do cliente

2. **Após Confirmar Pagamento**:
   - Gere um código de fidelidade exclusivo
   - Envie o código ao cliente via WhatsApp imediatamente
   - Explique como acessar o programa de fidelidade

3. **Para Pagamentos Antigos**:
   - Use o sistema antigo de confirmação de pagamento
   - Este sistema continuará funcionando para clientes existentes

### Em Caso de Problemas

1. **Código Não Funciona**:
   - Verifique se o código foi digitado corretamente
   - Confirme se o código já foi utilizado
   - Gere um novo código se necessário

2. **Cliente Não Encontra seus Carimbos**:
   - Verifique se o cliente está usando o mesmo nome e telefone
   - Confirme se os códigos foram utilizados corretamente

## Benefícios do Novo Sistema

### Para a Pastelaria
- Controle total sobre quem recebe carimbos
- Sistema totalmente rastreável
- Zero possibilidade de fraude
- Histórico completo de códigos gerados

### Para os Clientes
- Área pessoal de fidelidade
- Histórico completo de carimbos
- Sistema justo e transparente
- Recompensas reais por fidelidade

## Dúvidas Frequentes

### O sistema antigo ainda funciona?
Sim, o sistema antigo continua funcionando para clientes que já o utilizavam.

### O que acontece se um cliente perder o código?
Gere um novo código para o cliente e envie novamente via WhatsApp.

### Como verificar se um código foi utilizado?
Acesse a página de administração e consulte as estatísticas de fidelidade.

## Suporte

Em caso de dúvidas técnicas ou problemas não resolvidos:
- Consulte o desenvolvedor responsável
- Verifique o histórico de códigos gerados
- Contate o suporte técnico