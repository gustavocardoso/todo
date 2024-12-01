import List from '../../assets/icons/list.svg?react'

const Logo = () => {
  return (
    <div className='flex items-end justify-start gap-2 flex-1'>
      <h1 className='text-5xl font-extrabold flex items-center gap-1'>
        Todo{' '}
        <span className='w-8 h-8 p-1 flex items-center justify-center bg-secondary rounded mt-2'>
          <List />
        </span>{' '}
        List
      </h1>
    </div>
  )
}

export default Logo
