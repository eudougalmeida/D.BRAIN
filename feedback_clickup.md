---
name: Regras ClickUp
description: Padrão obrigatório para criação de tarefas no ClickUp ao processar a ENTRADA do D.BRAIN
type: feedback
---
Sempre seguir estas regras ao criar tarefas no ClickUp:

1. **Assignee obrigatório**: sempre atribuir ao Doug (user ID: 49185278) para aparecer nos filtros
2. **Data obrigatória**: sempre definir due_date — usar contexto para escolher data razoável; se não houver contexto, usar 7 dias a partir de hoje
3. **Ações GTD, não projetos**: nome da tarefa deve ser verbo + objeto concreto (ex: "Ligar para fulano", "Escrever intro do artigo"). Nunca criar tarefas que são projetos inteiros
4. **Space correto**: tarefas pessoais do Doug → Dougmind; tarefas de clientes/operação → space correspondente da Funew
5. **Lista correta no Dougmind**: usar lista temática (ex: Doug Almeida, Someday, Agentes infinitos) conforme o contexto da tarefa

**Why:** filtros de tarefas do Doug dependem de assignee + data para funcionar. Tarefas sem esses campos somem dos filtros.
**How to apply:** em todo clickup_create_task para o Dougmind, verificar que assignees=["49185278"] e due_date está preenchido.
