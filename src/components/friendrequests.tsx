'use client'

import { type FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { z } from 'zod'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdownmenu'
import Button from '@/components/ui/button'
import { CaretDownIcon } from '@radix-ui/react-icons'

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
  const { toast } = useToast()
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  )

  useEffect(() => {
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
      const res = await fetch('/api/friends/accept', {
        method: 'POST',
        body: JSON.stringify({ id: senderId })
      })

      if (res.status === 200) {
        toast({
          title: `Friend request accepted`,
          description: `${friendRequests.find(
            (request) => request.senderId === senderId
          )?.senderName} is now your friend`
        })

        setFriendRequests((prev) =>
          prev.filter((request) => request.senderId !== senderId)
        )
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: `Error`,
          description: `${err.issues[0].message}`,
          variant: 'destructive'
        })
      }

      if (err instanceof Error) {
        toast({
          title: `Error`,
          description: `${err.message}`,
          variant: 'destructive'
        })
      }
    }
  }

  const denyFriend = async (senderId: string) => {
    try {
      const res = await fetch('/api/friends/decline', {
        method: 'POST',
        body: JSON.stringify({ id: senderId })
      })

      if (res.status === 200) {
        toast({
          title: `Friend request declined`,
          description: `${friendRequests.find(
            (request) => request.senderId === senderId
          )?.senderName}'s request denied`
        })

        setFriendRequests((prev) =>
          prev.filter((request) => request.senderId !== senderId)
        )
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: `Error`,
          description: `${err.issues[0].message}`,
          variant: 'destructive'
        })
      }

      if (err instanceof Error) {
        toast({
          title: `Error`,
          description: `${err.message}`,
          variant: 'destructive'
        })
      }
    }
  }

  return (
    <div className='flex items-center content-center justify-center'>
      <DropdownMenu>
        <DropdownMenuTrigger className='font-medium inline-flex max-xl:min-w-[100px] min-w-[142px] items-center justify-center rounded-full dark:text-white h-8 py-5 px-6 xl:mr-2 transition-all duration-200 ease-in-out hover:text-neutral-700 dark:hover:text-neutral-300'>
          <CaretDownIcon className='w-4 h-4 mr-1 xl:mr-2' />
          <p className='max-xl:hidden'>Requests</p>
          <div
            className={`font-normal flex items-center content-center justify-center xl:ml-2 rounded-full w-7 h-7 bg-neutral-200/70 dark:bg-neutral-800/70 
            ${
              friendRequests.length > 0 &&
              'bg-green-500/10 dark:bg-green-500/20 animate-pulse'
            }
            `}
          >
            {friendRequests.length}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='box-content'>
          {friendRequests.length > 0 ? (
            friendRequests.map((friend) => {
              return (
                <DropdownMenuItem
                  key={friend.senderId}
                  className='flex flex-row items-center justify-between content-center focus:bg-white dark:focus:bg-neutral-950'
                >
                  <div className='flex flex-row items-center mr-6'>
                    <div className='flex items-center content-center justify-center flex-row mr-4'>
                      <Image
                        src={friend.senderImage}
                        alt='Profile image'
                        height={50}
                        width={50}
                        className='rounded-full'
                      />
                    </div>

                    <div className='flex flex-col'>
                      <p>{friend.senderEmail}</p>
                      <p>{friend.senderName}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => acceptFriend(friend.senderId)}
                    aria-label='accept friend'
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => denyFriend(friend.senderId)}
                    aria-label='deny friend'
                  >
                    Decline
                  </Button>
                </DropdownMenuItem>
              )
            })
          ) : (
            <div className='text-sm my-2 px-2 text-neutral-400 dark:text-neutral-500 '>
              Empty
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default FriendRequests
