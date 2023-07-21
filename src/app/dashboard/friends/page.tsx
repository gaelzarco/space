import { type FC } from 'react'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getFriendsByUserId } from '@/helpers/getFriendsByUserId'

import AddFriendsDialog from '@/components/addfriendsdialog'

const Dashboard: FC = async () => {
  const session: Session | null = await getServerSession(authOptions)
  if (!session) return null

  const friends = await getFriendsByUserId(session.user.id)

  return (
    <div className='flex flex-col items-center content-center justify-center w-full text-sm flex-grow'>
      {friends.length > 1 ? (
        <div></div>
      ) : (
        <h1 className='text-lg mb-2 text-neutral-400 dark:text-neutral-500'>
          You could use a friend or two
        </h1>
      )}

      <AddFriendsDialog />
    </div>
  )
}

export default Dashboard
