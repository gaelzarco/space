import { type FC } from 'react'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchRedis } from '@/helpers/fetchredis'

interface ChatProps {
  params: {
    chatId: string
  }
}

const Chat: FC<ChatProps> = async ({ params }) => {
  const session: Session | null = await getServerSession(authOptions)
  if (!session) return null

  const messages = await fetchRedis(
    'get',
    `user:${session.user.id}:chat:${params.chatId}`
  )
  console.log(messages)

  return <div className='flex flex-col justify-end content-end w-full'></div>
}

export default Chat
