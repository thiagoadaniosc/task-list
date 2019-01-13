# Aplicação para teste de conhecimento - Programador PHP

* Linguagens: PHP, CSS3, HTML5, Javascript (Jquery).
* Framework PHP: Laravel
* Banco de Dados: MYSQL
* Ordenação de prioridade com drag and drop
* Interface Gráfica (Utilizando Bootstrap)
* Interface Responsiva

# ROTAS

- As rotas da API devem ser precedidas pela uri **/api** 

| Método | URI                            | Descrição                                                                    |
|--------|--------------------------------|------------------------------------------------------------------------------|
| GET    | /tasks-lists                   | Retornar todas as "listas de tarefas"                                        |
| GET    | /tasks-lists/{id}              | Retorna informações de uma "lista de tarefas" identificada por {id}          |
| PUT    | /tasks-lists/update-positions  | Rota utilizada para atualizar as posições.                                   |
| PUT    | /tasks-lists/{id}              | Rota utilizada para alterar informações de uma "lista de tarefas";           |
| POST   | /tasks-lists                   | Rota utilizada para cadastrar uma nova "Lista de tarefas"                    |
| DELETE | /tasks-lists/{id}              | Rota utilizada para deletar determinada "lista de tarefa"                    |
|        |                                |                                                                              |
| GET    | /tasks-lists/{id}/tasks        | Retornar todas as "tarefas" de determinada "lista de tarefas"                |
| POST   | /tasks-lists/{id}/tasks        | Rota utilizada para cadastrar uma nova "tarefa"                              |
| PUT    | /tasks-lists/{id}/tasks        | Rota utilizada para alterar informações de uma "tarefa"                      |
| PUT    | /tasks-lists/tasks/{id}/status | Rota utilizada para alterar o status de uma "tarefa" (concluido ou pendente) |
| DELETE | /tasks-lists/tasks/{id}/       | Rota utilizada para deletar determinada "tarefa"                             |
|        |                                |                                                                              |
| GET    | /                              | Rota de Acesso a aplicação                                                   |