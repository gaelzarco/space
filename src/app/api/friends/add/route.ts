import type { NextRequest } from 'next/server'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { pusherServer } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
import { fetchRedis } from '@/helpers/fetchredis'
import { db } from '@/lib/db'
import { addFriendValidator } from '@/lib/validators'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  const session: Session | null = await getServerSession(authOptions)

  if (!session) return new Response('Unauthorized', { status: 401 })

  try {
    const body = await req.json()

    const { email: friendEmail } = addFriendValidator.parse(body)

    const friendId = (await fetchRedis('get', `user:email:${friendEmail}`)) as
      | string
      | null

    if (!friendId)
      return new Response('The person you looked for does not exist.', {
        status: 404
      })

    if (friendId === session.user.id)
      return new Response('Make a friend besides yourself 🤡', { status: 400 })

    const alreadySentFriendRequest = (await fetchRedis(
      'sismember',
      `user:${friendId}:incoming_friend_requests`,
      session.user.id
    )) as true | false

    if (alreadySentFriendRequest)
      return new Response('You already sent a friend request', {
        status: 400
      })

    const friends = await fetchRedis(
      'smembers',
      `user:${session.user.id}:friends`
    )

    if (friends && friends.includes(`${friendId}`))
      return new Response('You are already friends', {
        status: 400
      })

    await pusherServer.trigger(
      toPusherKey(`user:${friendId}:incoming_friend_requests`),
      'incoming_friend_requests',
      {
        senderId: session.user.id,
        senderEmail: session.user.email,
        senderName: session.user.name,
        senderImage: session.user.image
      }
    )

    await db.sadd(`user:${friendId}:incoming_friend_requests`, session.user.id)

    return new Response('Friend request sent', { status: 200 })
  } catch (err) {
    if (err instanceof z.ZodError)
      return new Response('Invalid request payload', { status: 422 })

    return new Response('Invalid request', { status: 400 })
  }
}
