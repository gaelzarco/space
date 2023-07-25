'use client'

import { type FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
import Button from './ui/button'

type IncomingFriendRequest = {
  senderId: string
  senderEmail: string
  senderName: string
  senderImage: string
}

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[]
  sessionId: string
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId
}) => {
  const router = useRouter()
  const [mounted, setMounted] = useState<boolean>(false)
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  )

  useEffect(() => {
    setMounted(true)
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    )

    const friendRequestHandler = ({
      senderId,
      senderEmail,
      senderName,
      senderImage
    }: IncomingFriendRequest) => {
      setFriendRequests((prev) => [
        ...prev,
        { senderId, senderEmail, senderName, senderImage }
      ])
    }

    pusherClient.bind('incoming_friend_requests', friendRequestHandler)

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      )
      pusherClient.unbind('incoming_friend_requests', friendRequestHandler)
    }
  }, [sessionId])

  const acceptFriend = async (senderId: string) => {
    try {
      const res = await fetch('/api/friends/add', {
        method: 'POST',
        body: JSON.stringify({ id: senderId })
      })

      if (res.status === 200) {
        setFriendRequests((prev) =>
          prev.filter((request) => request.senderId !== senderId)
        )
        router.refresh()
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (!mounted) return null

  return (
    <div className='flex flex-wrap items-center content-center justify-center'>
      {friendRequests.map((friend) => {
        return (
          <div
            key={friend.senderId}
            className='flex flex-col items-center justify-center content-center leading-8'
          >
            <Image
              src={friend.senderImage}
              alt='Profile image'
              height={100}
              width={100}
              className='rounded-full py-2'
            />
            <p>{friend.senderEmail}</p>
            <p>{friend.senderName}</p>
            <Button
              onClick={() => acceptFriend(friend.senderId)}
              aria-label='accept friend'
            >
              Accept
            </Button>
          </div>
        )
      })}
    </div>
  )
}

export default FriendRequests
