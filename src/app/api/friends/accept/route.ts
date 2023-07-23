import { NextRequest } from 'next/server'
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
    const body = await req.json()

    const { id: friendId } = z.object({ id: z.string() }).parse(body)

    // verify both users are not already friends
    const alreadyFriends = await fetchRedis(
      'sismember',
      `user:${session.user.id}:friends`,
      friendId
    )

    if (alreadyFriends)
      return new Response('You are already friends', { status: 400 })

    const hasFriendRequest = await fetchRedis(
      'sismember',
      `user:${session.user.id}:incoming_friend_requests`,
      friendId
    )

    if (!hasFriendRequest)
      return new Response('No friend request', { status: 400 })

    const [userRaw, friendRaw] = (await Promise.all([
      fetchRedis('get', `user:${session.user.id}`),
      fetchRedis('get', `user:${friendId}`)
    ])) as [string, string]

    const user = JSON.parse(userRaw) as User
    const friend = JSON.parse(friendRaw) as User

    await Promise.all([
      pusherServer.trigger(
        toPusherKey(`user:${friendId}:friends`),
        'new_friend',
        user
      ),
      pusherServer.trigger(
        toPusherKey(`user:${session.user.id}:friends`),
        'new_friend',
        friend
      ),
      db.sadd(`user:${session.user.id}:friends`, friendId),
      db.sadd(`user:${friendId}:friends`, session.user.id),
      db.srem(`user:${session.user.id}:incoming_friend_requests`, friendId)
    ])

    return new Response(`You are now friends with ${friend.name}`, {
      status: 200
    })
  } catch (error) {
    if (error instanceof z.ZodError)
      return new Response('Invalid request payload', { status: 422 })

    return new Response('Invalid request', { status: 400 })
  }
}
