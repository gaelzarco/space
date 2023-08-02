import type { NextRequest } from 'next/server'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchRedis } from '@/helpers/fetchredis'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  const session: Session | null = await getServerSession(authOptions)

  if (!session) return new Response('Unauthorized', { status: 401 })

  try {
    const { message, chatId }: { message: string; chatId: string } =
      await req.json()

    const [userId, friendId] = chatId.split('--')

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

    return new Response(message, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request payload', { status: 422 })
    }

    return new Response('Invalid request', { status: 400 })
  }
}
