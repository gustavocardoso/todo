import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Toaster, toast } from 'sonner'
import { completeTodo, createTodo, deleteCompletedTodos, deleteTodo, getTodos } from './api'
import CompletedTodos from './components/CompletedTodos'
import Todos from './components/Todos'
import Logo from './components/ui/Logo'
import useAuth from './hooks/auth'

export type Todo = {
  id: string
  title: string
  completed: boolean
}

interface NewTodo {
  id: string
}

function App() {
  const navigate = useNavigate()
  const { isAuthenticated, loading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate('/login')
      }
    }
  }, [isAuthenticated, authLoading, navigate])

  const [todos, setTodos] = useState<Todo[]>([])

  async function getAllTodos() {
    try {
      const savedTodos: Todo[] = await getTodos({})
      setTodos(savedTodos)
    } catch (error) {
      console.error('Error loading todos:', error)
      return []
    }
  }

  useEffect(() => {
    getAllTodos()
  }, [])

  const [lastAddedId, setLastAddedId] = useState<string | null>(null)

  const incompleteTodos = todos.filter((todo: Todo) => !todo.completed)
  const completedTodos = todos.filter((todo: Todo) => todo.completed)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const title = formData.get('title') as string

    if (!title.trim()) return

    const newTodo: NewTodo = await createTodo({ title })

    setLastAddedId(newTodo.id ?? null)
    toast.success('New task created!')
    ;(event.target as HTMLFormElement).reset()
    await getAllTodos()
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value

    setTimeout(async () => {
      await completeTodo({ id })
      toast.success('Task has been completed!')
      await getAllTodos()
    }, 200)
  }

  const handleDelete = async (id: string) => {
    await deleteTodo({ id })
    toast.success('Task has been deleted!')
    await getAllTodos()
  }

  const handleDeleteCompletedTodos = async () => {
    await deleteCompletedTodos()
    toast.info('Completed task list has been emptied!')
    await getAllTodos()
  }

  if (authLoading)
    return (
      <>
        <div className='loader-container flex items-center gap-4'>
          <div className='loader-spinner border-8 w-8 h-8 rounded-full border-secondary border-r-transparent animate-spin'></div>
          <p className='font-medium animate-pulse'>Checking authentication...</p>
        </div>
      </>
    )

  return isAuthenticated ? (
    <>
      <header className='flex justify-between items-center border-b border-dark/20 dark:border-light/20 pb-4'>
        <Logo />
      </header>

      <main className='app pt-8 lg:grid lg:grid-cols-12 lg:gap-12'>
        <div className='w-full lg:col-span-8'>
          <Todos
            incompleteTodos={incompleteTodos}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleDelete={handleDelete}
            lastAddedId={lastAddedId}
          />
        </div>
        <div className='w-full lg:col-span-4'>
          <CompletedTodos
            completedTodos={completedTodos}
            handleDelete={handleDeleteCompletedTodos}
          />
        </div>

        <Toaster expand richColors />
      </main>
    </>
  ) : null
}

export default App
