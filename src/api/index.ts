interface TodoInput {
  title: string
}

interface NewTodoResponse {
  id: string
}

interface CompletedTodoInput {
  id: string
}

interface deleteTodoInput {
  id: string
}

interface CompletedTodoResponse {
  id: string
  title: string
  completed: boolean
}

interface DeletedTodoResponse {
  id: string
}

interface DeletedAllTodosResponse {
  success: boolean
  message: string
}

interface TodoQuery {
  completed?: boolean
}

const apiUrl = import.meta.env.VITE_API_URL

export async function getTodos({ completed }: TodoQuery) {
  const completedString = completed === undefined ? '' : `?completed=${completed}`
  const queryString = completedString ? `${completedString}&order=desc` : '?order=desc'

  const response = await fetch(`${apiUrl}/api/todos${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  const todos = await response.json()

  return todos
}

export async function createTodo({ title }: TodoInput): Promise<NewTodoResponse> {
  const response = await fetch(`${apiUrl}/api/todos`, {
    method: 'POST',
    body: JSON.stringify({ title }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  const { id } = await response.json()

  return id
}

export async function completeTodo({ id }: CompletedTodoInput): Promise<CompletedTodoResponse> {
  const response = await fetch(`${apiUrl}/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ completed: true }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  const completedTodo: CompletedTodoResponse = await response.json()

  return { id: completedTodo.id, title: completedTodo.title, completed: completedTodo.completed }
}

export async function deleteTodo({ id }: deleteTodoInput): Promise<DeletedTodoResponse> {
  const response = await fetch(`${apiUrl}/api/todos/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })

  const deletedTodo: DeletedTodoResponse = await response.json()

  return { id: deletedTodo.id }
}

export async function deleteCompletedTodos(): Promise<DeletedAllTodosResponse> {
  const response = await fetch(`${apiUrl}/api/todos/clear-completed`, {
    method: 'DELETE',
    credentials: 'include'
  })

  const deletedTodos: DeletedAllTodosResponse = await response.json()
  const { success, message } = deletedTodos
  console.log(deletedTodos)

  return { success, message }
}
