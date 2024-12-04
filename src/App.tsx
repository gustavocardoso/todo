import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Toaster, toast } from 'sonner'
import CompletedTodos from './components/CompletedTodos'
import Todos from './components/Todos'
import Logo from './components/ui/Logo'
import useAuth from './hooks/auth'

export type Todo = {
  id: string
  title: string
  completed: boolean
}

const LOCAL_STORAGE_KEY = 'todos'

function App() {
  const navigate = useNavigate()
  const { isAuthenticated, loading: authLoading } = useAuth()

  useEffect(() => {
    // Log the authentication state and loading status
    console.log('Loading:', authLoading)
    console.log('Is Authenticated:', isAuthenticated)

    // Only navigate if loading is complete
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate('/login')
      }
    }
  }, [isAuthenticated, authLoading, navigate])

  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY)
      return savedTodos ? JSON.parse(savedTodos) : []
    } catch (error) {
      console.error('Error loading todos:', error)
      return []
    }
  })

  const [lastAddedId, setLastAddedId] = useState<string | null>(null)

  const incompleteTodos = todos.filter((todo: { completed: boolean }) => !todo.completed)
  const completedTodos = todos.filter((todo: { completed: boolean }) => todo.completed)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const title = formData.get('title') as string

    if (!title.trim()) return

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }

    setTodos([newTodo, ...todos])
    setLastAddedId(newTodo.id)
    toast.success('New task created!')
    event.currentTarget.reset()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    const id = event.target.value

    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, completed: checked } : todo))
    )
  }

  const handleDelete = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
    toast.success('Task has been deleted!')
  }

  const handleReset = () => {
    if (!todos.length) return
    setTodos([])
    toast.info('Task list has been reset!')
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

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
        <button
          onClick={handleReset}
          className='bg-dark hover:bg-dark-hover text-light transition-colors font-medium rounded py-2 px-6 border-0 flex items-center gap-2 hover:text-white'
        >
          Reset List
        </button>
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
          <CompletedTodos completedTodos={completedTodos} />
        </div>

        <Toaster expand richColors />
      </main>
    </>
  ) : null
}

export default App
