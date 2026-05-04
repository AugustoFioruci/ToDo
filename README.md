# Todo App

Uma aplicação full-stack de gerenciamento de tarefas construída com Node.js, React e PostgreSQL, containerizada com Docker.

## 📋 Descrição

O Todo App é uma aplicação web que permite aos usuários:
- Criar, atualizar e deletar tarefas
- Autenticar com JWT
- Gerenciar usuários com diferentes níveis de acesso
- Interface responsiva e intuitiva

## 🛠️ Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **Prisma** - ORM para gerenciamento de banco de dados
- **JWT** - Autenticação e autorização

### Frontend
- **React 18** - Biblioteca UI
- **Vite** - Build tool
- **ESLint** - Linter

### Infraestrutura
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers

## 🚀 Como Executar

### Pré-requisitos

- Docker e Docker Compose instalados
- (Ou Node.js 18+ e PostgreSQL para desenvolvimento local)

### Com Docker (Recomendado)

1. Clone o repositório:
```bash
git clone https://github.com/AugustoFioruci/ToDo.git
cd ToDo
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Inicie os containers:
```bash
docker-compose up -d
```

4. Acesse a aplicação:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Banco de dados: localhost:5432

### Desenvolvimento Local

#### Backend

```bash
cd back
npm install
npm run dev
```

#### Frontend

```bash
cd front
npm install
npm run dev
```

## 📁 Estrutura do Projeto

```
ToDo/
├── back/                    # Backend Node.js
│   ├── src/
│   │   ├── modules/        # Módulos (auth, user, task)
│   │   ├── middleware/     # Middlewares de autenticação
│   │   ├── config/         # Configurações
│   │   ├── routes/         # Rotas principais
│   │   ├── utils/          # Utilitários
│   │   ├── app.js          # Aplicação Express
│   │   └── server.js       # Inicialização do servidor
│   ├── prisma/
│   │   ├── schema.prisma   # Schema do banco de dados
│   │   └── migrations/     # Migrações do Prisma
│   ├── Dockerfile
│   └── package.json
├── front/                   # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/          # Páginas
│   │   ├── context/        # Context API
│   │   ├── services/       # Serviços (API)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # Orquestração dos containers
└── .env.example            # Exemplo de variáveis de ambiente
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (use `.env.example` como referência):

```env
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sua_senha_aqui
POSTGRES_DB=todo_api
DATABASE_URL=postgresql://postgres:sua_senha_aqui@db:5432/todo_api

# JWT
JWT_SECRET=sua_chave_secreta_aqui
```

## 📡 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/logout` - Fazer logout

### Usuários
- `GET /api/users` - Listar usuários (admin)
- `GET /api/users/:id` - Obter usuário por ID
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Tarefas
- `GET /api/tasks` - Listar tarefas do usuário
- `POST /api/tasks` - Criar nova tarefa
- `PUT /api/tasks/:id` - Atualizar tarefa
- `DELETE /api/tasks/:id` - Deletar tarefa

## 🔧 Comandos Úteis

```bash
# Iniciar containers
docker-compose up

# Parar containers
docker-compose down

# Reconstruir containers
docker-compose up --build

# Ver logs
docker-compose logs -f

# Acessar terminal do container backend
docker-compose exec back sh
```

## 🧪 Testes

Para executar testes do banco de dados:

```bash
docker-compose exec back npm run test:db
```

## 📝 Migrações do Banco de Dados

As migrações são executadas automaticamente ao iniciar os containers. Para criar novas migrações:

```bash
docker-compose exec back npx prisma migrate dev --name nome_da_migracao
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

[AugustoFioruci](https://github.com/AugustoFioruci)
