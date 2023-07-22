import { type FC } from 'react'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getFriendsByUserId } from '@/helpers/getFriendsByUserId'

import AddFriendsDialog from '@/components/addfriendsdialog'

const Friends: FC = async () => {
  const session: Session | null = await getServerSession(authOptions)
  if (!session) return null

  const friends = await getFriendsByUserId(session.user.id)

  return (
    <>
      {friends.length > 1 ? (
        <h1 className='text-lg mb-2 text-neutral-400 dark:text-neutral-500'>
          You have friends!
        </h1>
      ) : (
        <h1 className='text-lg mb-2 text-neutral-400 dark:text-neutral-500'>
          You could use a friend or two
        </h1>
      )}

      <AddFriendsDialog />
    </>
  )
}

export default Friends
