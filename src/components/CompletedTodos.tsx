import { Todo } from '../App'
import Check from './ui/Check'

type CompletedTodosProps = {
  completedTodos: Todo[]
}

const CompletedTodos = ({ completedTodos }: CompletedTodosProps) => {
  console.log('CompletedTodos rendered')
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
                <Check /> {todo.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default CompletedTodos
