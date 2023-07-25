import { NextRequest } from 'next/server'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { db } from '@/lib/db'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  const session: Session | null = await getServerSession(authOptions)

  if (!session) return new Response('Unauthorized', { status: 401 })

  try {
    const body = await req.json()

    const { id: idToDeny } = z.object({ id: z.string() }).parse(body)

    await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToDeny)

    return new Response('Friend request denied', { status: 200 })
  } catch (err) {
    if (err instanceof z.ZodError)
      return new Response('Invalid request payload', { status: 422 })

    return new Response('Invalid request', { status: 400 })
  }
}
