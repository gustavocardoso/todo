import { effect, signal } from '@preact/signals-react'
import { useSignals } from '@preact/signals-react/runtime'
import CompletedTodos from './components/CompletedTodos'
import Todos, { Todo } from './components/Todos'
import Logo from './components/ui/Logo'

const LOCAL_STORAGE_KEY = 'todos'

export function getTodos() {
  try {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  } catch (error) {
    return []
  }
}

export const todos = signal<Todo[]>(getTodos())

effect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos.value))
})

function App() {
  useSignals()

  const handleReset = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    todos.value = []
  }

  return (
    <>
      <header className='flex justify-between items-center border-b border-dark/20 dark:border-light/20 pb-4 text-primary'>
        <Logo />
        <button
          onClick={handleReset}
          className='bg-secondary hover:bg-secondary-hover text-light transition-colors font-medium rounded py-2 px-6 border-0 flex items-center gap-2 hover:text-white'
        >
          Reset List
        </button>
      </header>

      <main className='app pt-8 lg:grid lg:grid-cols-12 lg:gap-12'>
        <div className='w-full lg:col-span-8'>
          <Todos todos={todos} />
        </div>
        <div className='w-full lg:col-span-4'>
          <CompletedTodos todos={todos} />
        </div>
      </main>
    </>
  )
}

export default App
