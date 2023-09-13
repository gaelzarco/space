'use client'

import { type FC, useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Message } from '@/lib/validators'
import { chatHrefConstructor } from '@/lib/utils'
import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { useToast } from '@/components/ui/use-toast'

interface FriendsProps {
  userId: string
  initialFriends: User[]
}

interface ExtendedMessage extends Message {
  senderImage: string
  senderName: string
}

const Friends: FC<FriendsProps> = ({ initialFriends, userId }) => {
  const [friends, setFriends] = useState<User[]>(initialFriends)
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([])
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [parent] = useAutoAnimate()

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${userId}:chats`))
    pusherClient.subscribe(toPusherKey(`user:${userId}:friends`))

    const friendsHandler = (friend: User) => {
      setFriends((prev) => [...prev, { ...friend }])
    }

    const chatHandler = (message: ExtendedMessage) => {
      const currentRoute = `/dashboard/chat/${chatHrefConstructor(
        userId,
        message.senderId
      )}`
      const shouldNotify: boolean = pathname !== currentRoute

      if (!shouldNotify) return
      setUnseenMessages((prev) => [...prev, message])

      toast({
        title: `${message.senderName} sent you a message.`,
        description: `${
          message.text.length > 50
            ? message.text.slice(0, 50) + '...'
            : message.text
        }`
      })
    }

    pusherClient.bind('new_message', chatHandler)
    pusherClient.bind('new_friend', friendsHandler)

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${userId}:chats`))
      pusherClient.unsubscribe(toPusherKey(`user:${userId}:friends`))

      pusherClient.unbind('new_message', chatHandler)
      pusherClient.unbind('new_friend', friendsHandler)
    }
  }, [pathname, userId, friends, router])

  useEffect(() => {
    if (pathname?.includes('chat')) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId))
      })
    }
  }, [pathname])

  return (
    <div ref={parent} className='flex flex-col h-full w-full overflow-y-auto'>
      {friends.length > 0 ? (
        friends.map((friend) => {
          const unseenMessagesLength = unseenMessages.filter(
            (msg) => msg.senderId === friend.id
          ).length
          const currentRoute = `/dashboard/chat/${chatHrefConstructor(
            userId,
            friend.id
          )}`
          return (
            <Link
              key={friend.id}
              href={`/dashboard/chat/${chatHrefConstructor(userId, friend.id)}`}
              className={`cursor-pointer inline-flex justify-between items-center w-inherit h-16 content-center hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:text-white px-6 py-5 m-2 rounded-xl transition-all duration-200 ease-in-out ${
                currentRoute === pathname &&
                'bg-neutral-200 dark:bg-neutral-900 dark:text-white'
              }`}
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

              {unseenMessagesLength > 0 && (
                <div className='flex items-center justify-center content-center rounded-full w-7 h-7 bg-blue-400/20 dark:bg-blue-400/20'>
                  {unseenMessagesLength}
                </div>
              )}
            </Link>
          )
        })
      ) : (
        <div className='flex flex-col h-full w-full items-center justify-center content-center text-neutral-400 dark:text-neutral-500'>
          <p>No friends yet</p>
        </div>
      )}
    </div>
  )
}

export default Friends
