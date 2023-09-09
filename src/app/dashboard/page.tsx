import { type FC } from 'react'
import { getServerSession, Session } from 'next-auth'
import { notFound } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import ThemeSwitch from '@/components/themeswitch'

const Dashboard: FC = async () => {
  const session: Session | null = await getServerSession(authOptions)
  if (!session) return notFound()

  return (
    <div className='flex flex-col h-full w-full'>
      <div className='static top-0 flex flex-row text-sm items-center justify-between w-full py-2 px-3 backdrop-blur-xl bg-neutral-100/70 dark:bg-neutral-950/70 z-10'>
        <div className='text-2xl flex flex-row items-center justify-between w-full h-full font-bold dark:text-white p-2 m-2 transition-all ease-in-out duration-200'>
          Dashboard
        </div>
        <div className='xl:hidden'>
          <ThemeSwitch />
        </div>
      </div>

      <div className='w-full h-full flex items-center content-center justify-center'>
        <h1 className=' text-md mb-2 text-neutral-400 dark:text-neutral-500'>
          See what your friends are saying
        </h1>
      </div>
    </div>
  )
}

export default Dashboard
