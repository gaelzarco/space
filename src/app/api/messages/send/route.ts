import { randomUUID } from 'crypto'
import type { NextRequest } from 'next/server'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { pusherServer } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
import { fetchRedis } from '@/helpers/fetchredis'
import { db } from '@/lib/db'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  const session: Session | null = await getServerSession(authOptions)

  if (!session) return new Response('Unauthorized', { status: 401 })

  try {
    const { text, chatId }: { text: string; chatId: string } = await req.json()

    const splitChatId: Array<string> = chatId.split('--')

    const userId = splitChatId.find((id) => id === session.user.id)
    const friendId = splitChatId.find((id) => id !== session.user.id) as string

    if (session.user.id !== userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    const friendList = (await fetchRedis(
      'smembers',
      `user:${session.user.id}:friends`
    )) as string[]
    const isFriend = friendList.includes(friendId)

    if (!isFriend) {
      return new Response('You must be friends to chat', { status: 401 })
    }

    const sender = (await fetchRedis(
      'get',
      `user:${session.user.id}`
    )) as string
    const parsedSender = JSON.parse(sender) as User

    const timestamp = Date.now()

    const messageData = {
      id: randomUUID(),
      senderId: session.user.id,
      text,
      timestamp
    }

    // notify connected chat room clients
    await pusherServer.trigger(
      toPusherKey(`chat:${chatId}`),
      'incoming-message',
      messageData
    )

    await pusherServer.trigger(
      toPusherKey(`chat:${friendId}:chats`),
      'new_message',
      {
        ...messageData,
        senderImg: parsedSender.image,
        senderName: parsedSender.name
      }
    )

    await db.zadd(`chat:${chatId}:messages`, {
      score: timestamp,
      member: JSON.stringify(messageData)
    })

    return new Response(text, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request payload', { status: 422 })
    }

    return new Response('Invalid request', { status: 400 })
  }
}
