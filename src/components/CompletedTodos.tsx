import { Todo } from '../App'
import Check from '../assets/icons/check.svg?react'

type CompletedTodosProps = {
  completedTodos: Todo[]
  handleDelete: () => void
}

const CompletedTodos = ({ completedTodos, handleDelete }: CompletedTodosProps) => {
  return (
    <>
      <div
        className={`bg-light-hover p-8 rounded-lg transition-opacity ${
          completedTodos.length > 0 ? 'opacity-100' : 'opacity-50'
        }`}
      >
        <h2 className='text-2xl font-bold'>Completed Tasks</h2>
        {completedTodos.length > 0 && (
          <ul className='mt-4 flex flex-col gap-4'>
            {completedTodos.map(todo => (
              <li
                key={todo.id}
                className='p-4 text-dark-hover decoration-dark line-through flex items-center gap-2 bg-light rounded'
              >
                <div className='text-tertiary'>
                  <Check />
                </div>
                {todo.title}
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleDelete}
          className='bg-dark-hover hover:bg-secondary-hover text-light transition-colors rounded py-4 px-6 border-0 flex justify-center items-center gap-2 hover:text-white font-bold w-full mt-8'
          type='button'
        >
          Clear Completed Tasks
        </button>
      </div>
    </>
  )
}

export default CompletedTodos
