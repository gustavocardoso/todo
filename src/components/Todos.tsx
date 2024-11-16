import { Signal, useComputed } from '@preact/signals-react'
import Trash from './ui/Trash'

export type Todo = {
  id: string
  title: string
  completed: boolean
}

// type TodoProps = {
//   handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
//   handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
//   handleDelete: (id: string) => void
// }

const Todos = ({ todos }: { todos: Signal<Todo[]> }) => {
  const incompleteTodos = useComputed(() => todos.value.filter(todo => !todo.completed))

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

    todos.value = [...todos.value, newTodo]
    event.currentTarget.reset()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    const id = event.target.value
    // wait 500 milliseconds before updating the todos
    setTimeout(() => {
      todos.value = todos.value.map(todo =>
        todo.id === id ? { ...todo, completed: checked } : todo
      )
    }, 300)
  }

  const handleDelete = (id: string) => {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='flex gap-2 bg-light-hover p-4 rounded-lg mb-8'>
        <input
          type='text'
          name='title'
          placeholder='Add a new task'
          className='p-2 rounded border-2 border-transparent focus:border-primary transition-colors outline-0 w-full flex-1'
        />
        <button
          type='submit'
          className='bg-primary hover:bg-primary-hover text-light transition-colors font-medium rounded py-2 px-6 border-0 flex items-center gap-2 hover:text-white'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-6'
          >
            <path
              fillRule='evenodd'
              d='M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z'
              clipRule='evenodd'
            />
          </svg>
          Add
        </button>
      </form>
      {incompleteTodos.value.length > 0 && (
        <div className='todos-container mb-12 lg:mb-0'>
          <ul className='mt-8 flex flex-col gap-4'>
            {incompleteTodos.value.map(todo => (
              <li
                key={todo.id}
                className='bg-white hover:bg-highlight transition-colors shadow py-4 px-6 rounded-lg group'
              >
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-3'>
                    <input
                      type='checkbox'
                      onChange={handleChange}
                      value={todo.id}
                      name='completed'
                      className='w-5 h-5'
                    />
                    <span className='text-dark'>{todo.title}</span>
                  </div>
                  <button onClick={() => handleDelete(todo.id)}>
                    <Trash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Todos
