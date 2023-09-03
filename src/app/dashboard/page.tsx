import { type FC } from 'react'

const Dashboard: FC = () => {
  return (
    <div className='flex flex-col h-full w-full'>
      <div className='flex flex-row items-center justify-between w-full h-22 py-2 px-3 bg-neutral-200/30 dark:bg-neutral-800/30 border-b border-neutral-200 dark:border-neutral-800'>
        <div className='text-2xl flex flex-row items-center w-full h-full font-bold dark:text-white p-2 m-2 transition-all ease-in-out duration-200'>
          Dashboard
        </div>
      </div>

      <div className='w-full h-full flex items-center content-center justify-center'>
        <h1 className='text-md mb-2 text-neutral-400 dark:text-neutral-500'>
          See what your friends are saying
        </h1>
      </div>
    </div>
  )
}

export default Dashboard
