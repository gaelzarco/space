'use client'

import { type FC, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { chatHrefConstructor } from '@/lib/utils'
import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'

interface FriendsProps {
  userId: string
  initialChatFriends: User[]
}

const Friends: FC<FriendsProps> = ({ initialChatFriends, userId }) => {
  const [friends, setFriends] = useState<User[]>(initialChatFriends)

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${userId}:friends`))

    const friendsHandler = (friend: User) => {
      setFriends((prev) => [...prev, { ...friend }])
    }

    pusherClient.bind('new_friend', friendsHandler)

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${userId}:friends`))
      pusherClient.unbind('new_friend', friendsHandler)
    }
  }, [friends])

  return (
    <>
      {friends.length > 0 ? (
        friends.map((friend) => {
          return (
            <Link
              key={friend.id}
              href={`/dashboard/chat/${chatHrefConstructor(userId, friend.id)}`}
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
        <div className='flex flex-col h-full w-full items-center justify-center content-center text-neutral-400 dark:text-neutral-500'>
          <p>No friends yet</p>
        </div>
      )}
    </>
  )
}

export default Friends
