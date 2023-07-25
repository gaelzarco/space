import { type FC } from 'react'
import Link from 'next/link'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import AddFriendsDialog from './addfriendsdialog'

const DashSideBar: FC = async () => {
  const session: Session | null = await getServerSession(authOptions)
  if (!session) return null

  return (
    <div className='flex flex-col items-center min-w-[400px] border-r border-neutral-200 dark:border-neutral-800 overflow-y-scroll flex-grow'>
      <div className='flex flex-row text-sm items-center justify-between w-full py-2 px-3 border-b border-neutral-200 dark:border-neutral-800'>
        <Link
          href='/dashboard'
          className='text-2xl font-bold justify-self-start hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300 p-2 m-2 transition-all ease-in-out duration-200'
        >
          <h1>Friends</h1>
        </Link>
        <AddFriendsDialog />
      </div>

      <div className='flex flex-col items-center justify-center w-full text-neutral-400 dark:text-neutral-500 flex-grow'>
        <p>No friends yet</p>
      </div>
    </div>
  )
}

export default DashSideBar
