import { type FC, type HTMLAttributes } from 'react'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { notFound } from 'next/navigation'
import { fetchRedis } from '@/helpers/fetchredis'
import { getIncomingFriendRequests } from '@/helpers/getIncomingFriendRequests'
import { cn } from '@/lib/utils'

import AddFriendsDialog from '@/components/addfriendsdialog'
import UserOptions from '@/components/useroptions'

import FriendRequests from '@/components/friendrequests'

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {}

const DashNavBar: FC<NavBarProps> = async ({
  children,
  className,
  onClick,
  ...props
}) => {
  const session: Session | null = await getServerSession(authOptions)
  if (!session) return notFound()

  const incomingSenderIds = (await fetchRedis(
    'smembers',
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[]

  const incomingFriendRequests = await getIncomingFriendRequests(
    incomingSenderIds
  )

  return (
    <nav
      className={cn(
        'inline-flex w-max min-h-[80px] items-center text-black dark:text-white px-5',
        className
      )}
      {...props}
    >
      {!!session && (
        <div className='inline-flex items-center justify-self-end'>
          <FriendRequests
            incomingFriendRequests={incomingFriendRequests}
            sessionId={session.user.id}
          />

          <AddFriendsDialog />

          <div>
            <UserOptions session={session} />
          </div>
        </div>
      )}
    </nav>
  )
}

export default DashNavBar
