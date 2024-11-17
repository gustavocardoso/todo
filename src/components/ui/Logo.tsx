import List from '../../assets/icons/list.svg?react'

const Logo = () => {
  return (
    <div className='flex items-end justify-end gap-2'>
      <div className='w-8 h-8 p-1 flex items-center justify-center bg-secondary rounded mb-[3.5px]'>
        <List />
      </div>
      <h1 className='text-5xl tracking-tighter font-extrabold'>Todo List</h1>
    </div>
  )
}

export default Logo
