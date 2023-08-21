import { type FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getFriendsByUserId } from '@/helpers/getFriendsByUserId'
import { chatHrefConstructor } from '@/lib/utils'

import AddFriendsDialog from './addfriendsdialog'

const DashSideBar: FC = async () => {
  const session: Session | null = await getServerSession(authOptions)
  if (!session) return notFound()

  const friends = await getFriendsByUserId(session.user.id)

  return (
    <div className='flex flex-col items-center h-full min-w-[400px] border-r border-neutral-200 dark:border-neutral-800'>
      <div className='flex flex-row text-sm h-22 py-2 items-center justify-between w-full px-3 border-b border-neutral-200 dark:border-neutral-800'>
        <Link
          href='/dashboard'
          className='text-2xl font-bold justify-self-start hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300 p-2 m-2 transition-all ease-in-out duration-200'
        >
          <h1>Friends</h1>
        </Link>
        <AddFriendsDialog />
      </div>

      <div className='flex flex-col w-full mx-4 overflow-y-auto'>
        {friends.length > 0 ? (
          friends.map((friend) => {
            return (
              <Link
                key={friend.id}
                href={`/dashboard/chat/${chatHrefConstructor(
                  session.user.id,
                  friend.id
                )}`}
                className='cursor-pointer inline-flex items-center w-inherit h-16 content-center hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:text-white px-6 py-5 m-2 rounded-xl transition-all duration-200 ease-in-out'
                shallow
              >
                <div className='flex flex-row items-center mr-6'>
                  <div className='flex items-center content-center justify-center flex-row mr-4'>
                    <Image
                      src={friend.image}
                      alt='Profile image'
                      height={45}
                      width={45}
                      className='rounded-full'
                    />
                  </div>

                  <div className='flex flex-col'>
                    <p>{friend.name}</p>
                  </div>
                </div>
              </Link>
            )
          })
        ) : (
          <div className='flex flex-col justify-center w-full text-neutral-400 dark:text-neutral-500 flex-grow'>
            <p>No friends yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashSideBar
