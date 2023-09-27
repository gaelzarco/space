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

  return { title: `sSpace | ${parsedChatFriend.name} Chat` }
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
  let initialMessages = await getChatMessages(chatId)

  return (
    <div className='relative flex flex-col items-center justify-between w-full h-full max-md:h-auto max-md:flex-grow max-h-screen'>
      <div className='sticky max-md:fixed max-md:mobile-fixed flex flex-row text-sm items-center justify-between w-full py-2 px-3 backdrop-blur-xl bg-neutral-100/70 dark:bg-neutral-950/70 z-10'>
        <div className='text-2xl flex flex-row items-center bg-transparent w-full h-full font-bold dark:text-white p-2 max-md:px-0 m-2 max-md:mx-0 transition-all ease-in-out duration-200'>
          <Link
            className='flex items-center content-center justify-center mr-4 h-7 w-7 bg-neutral-200/70 dark:bg-neutral-800/70 hover:bg-neutral-300/70 dark:hover:bg-neutral-900/70 rounded-full '
            href='/dashboard'
            shallow
          >
            <CaretLeftIcon height={24} width={24} />
          </Link>
          <h1 className='cursor-default'>{parsedChatFriend.name}</h1>
        </div>
      </div>

      <Messages
        chatId={chatId}
        userId={session.user.id}
        chatFriend={parsedChatFriend}
        initialMessages={initialMessages}
      />

      <div className='max-md:fixed bottom-0 w-full'>
        <ChatInput userId={session.user.id} friend={parsedChatFriend} />
      </div>
    </div>
  )
}

export default Chat
