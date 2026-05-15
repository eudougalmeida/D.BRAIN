# Guia Passo-a-Passo: Deploy no Vercel

## Pré-requisitos
- ✅ Conta no Vercel (você já tem)
- ✅ Conta no GitHub (ou GitLab/Bitbucket)
- ✅ ClickUp API Key
- ✅ Notion API Key

---

## Passo 1: Obter as Chaves

### ClickUp API Key
1. Acesse https://app.clickup.com/settings/integrations
2. Clique em "API" → "Generate"
3. Copie a chave (começa com `pk_`)

### Notion API Key
1. Acesse https://www.notion.so/my-integrations
2. Clique "New integration"
3. Preencha os dados (nome: "D.BRAIN API")
4. Clique "Submit" → copie o "Internal Integration Token"

---

## Passo 2: Criar Repositório no GitHub

### Opção A: Novo Repo (recomendado - mais limpo)

```bash
# Criar pasta e entrar
mkdir dbrain-api
cd dbrain-api

# Iniciar git
git init

# Copiar os arquivos que criei para essa pasta:
# - api/index.js
# - api/clickup.js
# - api/notion.js
# - package.json
# - vercel.json
# - .env.example
# - .gitignore
# - README.md

# Adicionar ao git
git add .
git commit -m "Initial commit: D.BRAIN API"

# Criar repo no GitHub em https://github.com/new
# Depois:
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/dbrain-api.git
git push -u origin main
```

### Opção B: Dentro do projeto Gestão do Segundo Cérebro (menos recomendado)

Se quiser manter junto, tudo bem. Crie a pasta `dbrain-api/` dentro do projeto e siga os mesmos passos de git.

---

## Passo 3: Deploy no Vercel

### 1. Conectar GitHub ao Vercel
- Acesse https://vercel.com
- Click no seu avatar → "Settings"
- "Connected Git Repositories"
- Click "Connect GitHub" (já deve estar conectado, mas verifique)

### 2. Importar Projeto
- Na dashboard do Vercel, click "Add New..." → "Project"
- Selecione o repo `dbrain-api`
- Click "Import"

### 3. Configurar Variáveis de Ambiente
Antes de fazer deploy:

- Na página "Environment Variables", adicione:
  - `CLICKUP_API_KEY` = `pk_xxxxx` (Cole aqui!)
  - `NOTION_API_KEY` = `ntn_xxxxx` (Cole aqui!)

**⚠️ IMPORTANTE:** Não committar essas chaves no `.env` — são secrets!

### 4. Fazer Deploy
- Click "Deploy"
- Aguarde 2-3 minutos
- Vercel te dará uma URL: `https://dbrain-api-xxxx.vercel.app`

---

## Passo 4: Testar a API

```bash
# Health check
curl https://seu-projeto.vercel.app/health

# Deve retornar:
# {"status":"ok","message":"D.BRAIN API is running"}
```

Se não funcionar, veja os logs em:
Vercel Dashboard → Seu projeto → "Deployments" → "Logs"

---

## Passo 5: Usar com Gemini

Agora você pode usar essa URL no Gemini:

Prompt exemplo:
```
Você tem acesso a uma API em https://seu-dbrain-api.vercel.app

Faça uma busca nas tarefas da lista INBOX do ClickUp:
GET https://seu-dbrain-api.vercel.app/api/clickup/tasks/901111100187

Resuma o que encontrou.
```

---

## Troubleshooting

**"Build failed"**
- Verifique se `package.json` está correto
- Verifique se Node.js version é 18.x

**"401 Unauthorized"**
- API Keys estão erradas
- Revise as Environment Variables no Vercel

**"Cannot GET /api/clickup/tasks/..."**
- List ID incorreto
- Use o ID correto do ClickUp

**Logs detalhados**
- Dashboard Vercel → Seu projeto → "Functions" → Veja os logs

---

## URLs Úteis Depois

- Dashboard Vercel: https://vercel.com/dashboard
- Seu projeto: https://vercel.com/seu-usuario/dbrain-api
- API rodando: https://seu-projeto.vercel.app
- Logs: https://vercel.com/seu-usuario/dbrain-api/deployments

---

## Próximos Passos

1. ✅ Deploy concluído
2. → Testar todos os endpoints
3. → Adicionar mais funcionalidades
4. → Considerear VPS próprio se crescer muito

Qualquer dúvida, é só chamar!
