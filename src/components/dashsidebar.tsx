'use client'

import { type FC, useState } from 'react'
import Link from 'next/link'

import Button from '@/components/ui/button'
import { ChatBubbleIcon } from '@radix-ui/react-icons'

type Conversation = {
  avatar: string
  name: string
  lastMessage: string
  lastMessageTime: string
}

const DashSideBar: FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([])

  return (
    <div className="flex flex-col items-center min-w-[400px] min-h-[93.8vh] border-r border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-row text-sm items-center justify-between w-full py-4 px-3 border-b border-neutral-200 dark:border-neutral-800">
        <Link
          href="/dashboard"
          className="text-2xl font-bold justify-self-start hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300 p-2 m-2 transition-all ease-in-out duration-200"
        >
          <h1>Chats</h1>
        </Link>
        <Button className="mx-0">
          <ChatBubbleIcon className="mr-2" />
          New
        </Button>
      </div>

      {conversations.length > 1 ? (
        conversations.map((conversation) => (
          <div className="flex flex-row items-center justify-between w-full py-4 px-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-row items-center">
              <img
                src={conversation.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div className="flex flex-col">
                <p className="font-semibold">{conversation.name}</p>
                <p className="text-sm">{conversation.lastMessage}</p>
              </div>
            </div>
            <p className="text-sm">{conversation.lastMessageTime}</p>
          </div>
        ))
      ) : (
        <div className="flex flex-row items-center justify-center w-full h-full text-sm text-neutral-400 dark:text-neutral-500">
          <p>No conversations yet</p>
        </div>
      )}
    </div>
  )
}

export default DashSideBar
