'use client'

import { type FC, useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
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
  const scrollDownRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    scrollDownRef.current?.scrollIntoView()
  }

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${chatId}`))

    const messageHandler = (message: Message) => {
      setMessages((prev) => [...prev, message])
    }

    pusherClient.bind('incoming-message', messageHandler)

    scrollToBottom()

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`))
      pusherClient.unbind('incoming-message', messageHandler)
    }
  }, [chatId, messages])

  return (
    <div className='flex flex-col w-full max-h-full overflow-y-auto'>
      <div className='flex flex-col justify-end w-full p-2'>
        {messages.map((message) => {
          const isSender: boolean = message.senderId === userId

          return (
            <div
              key={`${message.id}-${message.timestamp}`}
              className={`flex flex-row w-full items-center p-1 ${
                isSender && 'justify-end'
              }`}
            >
              {isSender === false && (
                <Image
                  className='rounded-full mr-2'
                  src={chatFriend.image}
                  alt='profile image'
                  height={40}
                  width={40}
                />
              )}
              <div
                className={`
                max-w-sm rounded-3xl py-3 px-4
                ${
                  isSender
                    ? 'text-white bg-blue-400 dark:bg-blue-400'
                    : ' bg-neutral-200 dark:bg-neutral-900'
                }
                `}
              >
                <p className='break-words'>{message.text}</p>
              </div>
            </div>
          )
        })}
      </div>
      <div ref={scrollDownRef}></div>
    </div>
  )
}

export default Messages
