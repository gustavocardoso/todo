import { Signal, useComputed } from '@preact/signals-react'
import { Todo } from './Todos'
import Check from './ui/Check'

const CompletedTodos = ({ todos }: { todos: Signal<Todo[]> }) => {
  const completedTodos = useComputed(() => todos.value.filter((todo: Todo) => todo.completed))

  return (
    <>
      {completedTodos.value.length > 0 && (
        <div className='bg-light-hover p-8 rounded-lg'>
          <h2 className='text-2xl font-bold'>
            Completed Tasks{' '}
            <span className='text-primary font-light text-lg'>({completedTodos.value.length})</span>
          </h2>
          <ul className='mt-4 flex flex-col gap-4'>
            {completedTodos.value.map(todo => (
              <li
                key={todo.id}
                className='p-4 line-through text-dark-light decoration-secondary flex items-center gap-2 bg-light rounded'
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
