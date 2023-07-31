import { type FC } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchRedis } from '@/helpers/fetchredis'

import ChatInput from '@/components/chatinput'
import { CaretLeftIcon } from '@radix-ui/react-icons'

interface ChatProps {
  params: {
    friendId: string
  }
}

const Chat: FC<ChatProps> = async ({ params }) => {
  const session: Session | null = await getServerSession(authOptions)
  if (!session) return notFound()

  const friend = (await fetchRedis('get', `user:${params.friendId}`)) as string
  const parsedFriend = JSON.parse(friend) as User

  return (
    <div className='flex flex-col items-center w-full h-full'>
      <div className='flex flex-col items-center w-full h-full'>
        <div className='flex flex-row text-sm items-center justify-between w-full py-2 px-3 backdrop-blur-xl bg-neutral-200/30 dark:bg-neutral-800/30'>
          <div className='text-2xl flex flex-row items-center w-full font-bold  dark:text-white p-2 m-2 transition-all ease-in-out duration-200'>
            <Link
              className='flex items-center mr-4 bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-900 rounded-full transition-all ease-in-out duration-200'
              href='/dashboard'
              shallow
            >
              <CaretLeftIcon height={20} width={20} />
            </Link>
            {parsedFriend.name}
          </div>
        </div>
      </div>
      <ChatInput friend={parsedFriend} />
    </div>
  )
}

export default Chat
