import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import CompletedTodos from './components/CompletedTodos'
import Todos from './components/Todos'
import Logo from './components/ui/Logo'

export type Todo = {
  id: string
  title: string
  completed: boolean
}

const LOCAL_STORAGE_KEY = 'todos'

function App() {
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

  let navigate = useNavigate()

  const isLogged = false

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

    console.log(newTodo.id)

    setTodos([newTodo, ...todos])
    setLastAddedId(newTodo.id)
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
  }

  const handleReset = () => {
    setTodos([])
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // useEffect(() => {
  //   if (!isLogged) {
  //     navigate('/login')
  //   }
  // }, [isLogged])

  return (
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
      </main>
    </>
  )
}

export default App
