import { type FC } from 'react'
import { notFound } from 'next/navigation'
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
  if (!session) return notFound()

  const messages = await fetchRedis(
    'get',
    `user:${session.user.id}:chat:${params.chatId}`
  )
  console.log(messages)

  return <>{params.chatId}</>
}

export default Chat
