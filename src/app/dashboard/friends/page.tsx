import { type FC } from 'react'
import { notFound } from 'next/navigation'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchRedis } from '@/helpers/fetchredis'
import { getFriendsByUserId } from '@/helpers/getFriendsByUserId'
import { getIncomingFriendRequests } from '@/helpers/getIncomingFriendRequests'

import FriendRequests from '@/components/friendrequests'

const Friends: FC = async () => {
  const session: Session | null = await getServerSession(authOptions)
  if (!session) return notFound()

  const friends = await getFriendsByUserId(session.user.id)

  const incomingSenderIds = (await fetchRedis(
    'smembers',
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[]

  const incomingFriendRequests = await getIncomingFriendRequests(
    incomingSenderIds
  )

  return (
    <div className='flex flex-col h-full w-full items-center justify-center content-center'>
      <div className='fixed bottom-0 mb-8'></div>
      {friends.length > 1 || incomingFriendRequests.length > 0 ? (
        <div>
          <FriendRequests
            incomingFriendRequests={incomingFriendRequests}
            sessionId={session.user.id}
          />
        </div>
      ) : (
        <h1 className='text-lg mb-2 text-neutral-400 dark:text-neutral-500'>
          You could use a friend or two
        </h1>
      )}
    </div>
  )
}

export default Friends
