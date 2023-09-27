'use client'

import { type FC, useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { pusherClient } from '@/lib/pusher'
import { toPusherKey, checkIfPastDay } from '@/lib/utils'
import { Message } from '@/lib/validators'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

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
  const [parent] = useAutoAnimate()

  const scrollToBottom = () => {
    scrollDownRef.current?.scrollIntoView()
  }

  const messageHandler = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }

  useEffect(() => {
    scrollToBottom()

    pusherClient.subscribe(toPusherKey(`chat:${chatId}`))
    pusherClient.bind('incoming-message', messageHandler)

    setTimeout(scrollToBottom, 280)

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`))
      pusherClient.unbind('incoming-message', messageHandler)
    }
  }, [chatId, messages])

  return (
    <div className='absolute flex flex-col h-full max-md:h-[100dvh] w-full overflow-y-auto py-20 max-md:py-18 scrollbar-hide'>
      <div ref={parent} className='flex flex-col justify-end w-full p-2'>
        {messages.map((message, i) => {
          const nextMessage: Message = messages[i + 1]

          const isSender: boolean = message.senderId === userId
          const isSameUser: boolean = message.senderId === nextMessage?.senderId
          const ifPastDay: boolean = checkIfPastDay(
            message.timestamp,
            nextMessage?.timestamp
          )

          return (
            <div
              key={`${message.id}-${message.timestamp}`}
              className='flex flex-col w-full items-center p-1'
            >
              <div
                className={`flex flex-row w-full items-center ${
                  isSender && 'justify-end'
                }`}
              >
                {isSender === false && (
                  <Image
                    className='justify-start self-start rounded-full mr-4 mt-1'
                    src={chatFriend.image}
                    alt='profile image'
                    height={40}
                    width={40}
                  />
                )}
                <div
                  className={`
                  flex flex-col max-md:max-w-[290px] lg:max-lg:max-w-xs max-w-lg rounded-3xl py-3 px-4
                  ${
                    isSender
                      ? 'text-white bg-blue-400 dark:bg-blue-400'
                      : ' bg-neutral-200 dark:bg-neutral-800'
                  }
                  `}
                >
                  <p className='break-words'>{message.text}</p>
                </div>
              </div>

              {(!isSameUser || ifPastDay) && (
                <p
                  className={`text-sm text-neutral-400 mt-1 ${
                    isSender
                      ? 'self-end justify-end mr-3'
                      : 'self-start justify-start ml-16'
                  } ${ifPastDay && 'pb-4'}`}
                >
                  {dayjs().to(dayjs(message.timestamp))}
                </p>
              )}
            </div>
          )
        })}
      </div>
      <div ref={scrollDownRef}></div>
    </div>
  )
}

export default Messages
