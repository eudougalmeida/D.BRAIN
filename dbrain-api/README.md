# D.BRAIN API

Backend centralizado para integração ClickUp + Notion. Permite que qualquer IA (Gemini, Claude, ChatGPT, etc) acesse seus dados de segunda mente.

## Setup Local

### 1. Clonar e instalar
```bash
git clone https://github.com/seu-usuario/dbrain-api.git
cd dbrain-api
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env
```

Preencha no `.env`:
- `CLICKUP_API_KEY`: pegue em https://app.clickup.com/settings/integrations (Tokens)
- `NOTION_API_KEY`: pegue em https://www.notion.so/my-integrations (crie uma integration)

### 3. Rodar localmente
```bash
npm run dev
```

Acesse: `http://localhost:3000/health`

---

## Deploy no Vercel

### 1. Conectar GitHub
- Push seu código para GitHub
- Acesse https://vercel.com
- Click "New Project" → conecte seu repo

### 2. Configurar variáveis no Vercel
Dashboard → Settings → Environment Variables

Adicione:
- `CLICKUP_API_KEY` = sua chave
- `NOTION_API_KEY` = sua chave

### 3. Deploy
Click "Deploy" — Vercel faz tudo automaticamente

Sua API estará em: `https://seu-projeto.vercel.app`

---

## Endpoints Disponíveis

### CLICKUP

**GET** `/api/clickup/lists/:spaceId`
- Lista todas as listas de um space

**GET** `/api/clickup/tasks/:listId`
- Busca tarefas de uma lista
- Query params: `?status=to-do&assignee=123`

**GET** `/api/clickup/task/:taskId`
- Detalhes de uma tarefa específica

**POST** `/api/clickup/task`
```json
{
  "listId": "123",
  "name": "Nome da tarefa",
  "description": "Descrição",
  "assignees": [123],
  "dueDate": 1234567890,
  "priority": 1,
  "status": "open"
}
```

**PATCH** `/api/clickup/task/:taskId`
```json
{
  "name": "Novo nome",
  "status": "completed",
  "priority": 2
}
```

**DELETE** `/api/clickup/task/:taskId`
- Deleta a tarefa

---

### NOTION

**GET** `/api/notion/page/:pageId`
- Detalhes de uma página

**PATCH** `/api/notion/page/:pageId`
```json
{
  "properties": {
    "Title": { "title": [{ "text": { "content": "Novo título" } }] }
  }
}
```

**POST** `/api/notion/search`
```json
{
  "query": "string de busca"
}
```

**GET** `/api/notion/database/:databaseId`
- Detalhes do banco de dados

**POST** `/api/notion/database/:databaseId/query`
```json
{
  "filter": {},
  "sorts": [],
  "page_size": 100
}
```

---

## Como Usar com Gemini

Exemplo de prompt:
```
Você tem acesso a uma API em https://seu-projeto.vercel.app

Para buscar tarefas do ClickUp, faça:
GET https://seu-projeto.vercel.app/api/clickup/tasks/LISTA_ID

Para criar uma tarefa:
POST https://seu-projeto.vercel.app/api/clickup/task
Body: { "listId": "...", "name": "...", "assignees": [...] }

Agora, busque todas as tarefas da lista Inbox e resuma.
```

---

## Estrutura do Projeto

```
dbrain-api/
├── api/
│   ├── index.js      (Express app principal)
│   ├── clickup.js    (endpoints ClickUp)
│   └── notion.js     (endpoints Notion)
├── package.json
├── vercel.json
├── .env.example
├── .gitignore
└── README.md
```

---

## Próximas Melhorias

- [ ] Autenticação/rate limiting
- [ ] Cache de respostas
- [ ] Webhooks do ClickUp
- [ ] Sincronização automática
- [ ] Observabilidade (logs, métricas)

---

## Troubleshooting

**"401 Unauthorized"** → Verifique se a API key está correta

**"500 Internal Server Error"** → Veja os logs no Vercel Dashboard

**"CORS error"** → Já está configurado, mas se precisar, edite `api/index.js`

---

Mantido por Douglas | D.BRAIN Project
