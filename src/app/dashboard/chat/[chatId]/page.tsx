import { type FC } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchRedis } from '@/helpers/fetchredis'

import Messages from '@/components/messages'
import ChatInput from '@/components/chatinput'
import { CaretLeftIcon } from '@radix-ui/react-icons'

export async function generateMetadata({
  params
}: {
  params: { chatId: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  const [userId1, userId2] = params.chatId.split('--')
  const { user } = session

  const chatFriendId = user.id === userId1 ? userId2 : userId1
  const chatFriend = (await fetchRedis('get', `user:${chatFriendId}`)) as string
  const parsedChatFriend = JSON.parse(chatFriend) as User

  return { title: `sSpace | ${parsedChatFriend.name} chat` }
}

interface ChatProps {
  params: {
    chatId: string
  }
}

async function getChatMessages(chatId: string) {
  try {
    const messages: string[] = await fetchRedis(
      'zrange',
      `chat:${chatId}:messages`,
      0,
      -1
    )

    const dbMessages = messages.map((message) => JSON.parse(message))

    return dbMessages
  } catch (err) {
    notFound()
  }
}

const Chat: FC<ChatProps> = async ({ params }) => {
  const session: Session | null = await getServerSession(authOptions)
  if (!session) return notFound()

  const { user } = session
  const { chatId } = params

  const [userId1, userId2] = chatId.split('--')

  if (user.id !== userId1 && user.id !== userId2) {
    notFound()
  }

  const chatFriendId = user.id === userId1 ? userId2 : userId1

  const chatFriend = (await fetchRedis('get', `user:${chatFriendId}`)) as string
  const parsedChatFriend = JSON.parse(chatFriend) as User
  const initialMessages = await getChatMessages(chatId)

  return (
    <div className='flex flex-col items-center w-full h-full overflow-y-auto'>
      <div className='sticky flex flex-row text-sm items-center justify-between w-full h-22 py-2 px-3 backdrop-blur-3xl bg-neutral-200/30 dark:bg-neutral-800/30 border-b border-neutral-200 dark:border-neutral-800'>
        <div className='text-2xl flex flex-row items-center w-full h-full font-bold dark:text-white p-2 m-2 transition-all ease-in-out duration-200'>
          <Link
            className='flex items-center mr-4 bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-900 rounded-full transition-all ease-in-out duration-200'
            href='/dashboard'
            shallow
          >
            <CaretLeftIcon height={20} width={20} />
          </Link>
          {parsedChatFriend.name}
        </div>
      </div>

      <div className='flex flex-col w-full h-full'>
        <div className='flex h-full'>
          <Messages
            chatId={chatId}
            userId={session.user.id}
            chatFriend={parsedChatFriend}
            initialMessages={initialMessages}
          />
        </div>
        <div className='sticky bottom-0 flex min-h-[60px]'>
          <ChatInput userId={session.user.id} friend={parsedChatFriend} />
        </div>
      </div>
    </div>
  )
}

export default Chat
