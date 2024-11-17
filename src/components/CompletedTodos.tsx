import { Todo } from '../App'
import Check from '../assets/icons/check.svg?react'

type CompletedTodosProps = {
  completedTodos: Todo[]
}

const CompletedTodos = ({ completedTodos }: CompletedTodosProps) => {
  return (
    <>
      {completedTodos.length > 0 && (
        <div className='bg-light-hover p-8 rounded-lg'>
          <h2 className='text-2xl font-bold'>Completed Tasks</h2>
          <ul className='mt-4 flex flex-col gap-4'>
            {completedTodos.map(todo => (
              <li
                key={todo.id}
                className='p-4 line-through flex items-center gap-2 bg-light rounded'
              >
                <div className='text-tertiary'>
                  <Check />
                </div>
                {todo.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default CompletedTodos
