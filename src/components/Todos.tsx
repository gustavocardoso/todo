import { Todo } from '../App'
import Plus from '../assets/icons/plus.svg?react'
import Trash from '../assets/icons/trash.svg?react'

type TodoProps = {
  incompleteTodos: Todo[]
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleDelete: (id: string) => void
}

const Todos = ({ incompleteTodos, handleSubmit, handleChange, handleDelete }: TodoProps) => {
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
          <Plus />
          Add
        </button>
      </form>

      {incompleteTodos.length > 0 && (
        <div className='todos-container mb-12 lg:mb-0'>
          <ul className='mt-8 flex flex-col gap-4'>
            {incompleteTodos.map(todo => (
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
                      checked={todo.completed}
                      className='w-5 h-5'
                    />
                    <span className='text-dark'>{todo.title}</span>
                  </div>
                  <button onClick={() => handleDelete(todo.id)}>
                    <div className='text-light-hover group-hover:text-secondary'>
                      <Trash />
                    </div>
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
