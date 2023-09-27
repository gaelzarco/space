import { type FC } from 'react'
import { notFound } from 'next/navigation'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getFriendsByUserId } from '@/helpers/getFriendsByUserId'

import MobileNavBar from '@/components/mobilenavbar'
import Friends from '@/components/friends'
import AddFriendsDialog from '@/components/addfriendsdialog'

const Dashboard: FC = async () => {
  const session: Session | null = await getServerSession(authOptions)
  if (!session) return notFound()

  const friends = await getFriendsByUserId(session.user.id)

  return (
    <div className='flex flex-col h-full w-full'>
      <div className='static top-0 flex flex-row text-sm items-center justify-between w-full py-2 px-3 backdrop-blur-xl bg-neutral-100/70 dark:bg-neutral-950/70 z-10'>
        <div className='cursor-default text-2xl flex flex-row items-center justify-between w-full h-full font-bold dark:text-white p-2 max-md:px-0 m-2 max-md:mx-0'>
          Dashboard
        </div>

        <div className='md:hidden flex items-center'>
          <AddFriendsDialog />
        </div>
      </div>

      <div className='w-full h-full max-md:h-auto max-md:flex-grow flex items-center content-center justify-center'>
        <h1 className='max-md:hidden text-md mb-2 text-neutral-400 dark:text-neutral-500'>
          See what your friends are saying
        </h1>

        <div className='w-full h-full flex items-center md:hidden'>
          <Friends userId={session.user.id} initialFriends={friends} />
        </div>

        <div className='w-full bottom-0 fixed'>
          <MobileNavBar />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
