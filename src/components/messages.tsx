'use client'

import { type FC, useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { pusherClient } from '@/lib/pusher'
import { cn, toPusherKey } from '@/lib/utils'
import { Message } from '@/lib/validators'

interface MessageProps {
  initialMessages: Message[]
  userId: string
  chatId: string
  chatFriend: User
}

const Messages: FC<MessageProps> = ({
  initialMessages,
  userId,
  chatId,
  chatFriend
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${chatId}`))

    const messageHandler = (message: Message) => {
      setMessages((prev) => [message, ...prev])
    }

    pusherClient.bind('incoming-message', messageHandler)

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`))
      pusherClient.unbind('incoming-message', messageHandler)
    }
  }, [chatId])

  // const scrollDownRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className='flex flex-col w-full h-full overflow-y-auto'>
      <h1>Messages</h1>
      {messages.map((message, i) => {
        return (
          <div key={i}>
            <h1>{message.text}</h1>
          </div>
        )
      })}
    </div>
  )
}

export default Messages
