'use client'

import { type FC, type FormEvent, type ChangeEvent, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import Button from '@/components/ui/button'

interface ChatInputProps {
  friend: User
}

const ChatInput: FC<ChatInputProps> = () => {
  const { toast } = useToast()
  const [message, setMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (message.length < 1)
        return toast({
          title: 'Error',
          description: 'Please enter atleast 1 character.',
          variant: 'destructive'
        })

      // const res = await fetch('/api/friends/add', {
      //   method: 'POST',
      //   body: JSON.stringify({ message: message })
      // })

      // if (res.status === 200) {
      //   toast({
      //     title: 'Success',
      //     description: `Message sent succesfully`
      //  })
      // } else {
      //   const errMessage = await res.text()
      //   return toast({
      //     title: 'Error',
      //     description: `${errMessage}`,
      //     variant: 'destructive'
      //   })
      // }
    } catch (err) {
      if (err instanceof z.ZodError)
        return toast({
          title: 'Error',
          description: `${err.issues[0].message}`,
          variant: 'destructive'
        })

      if (err instanceof Error)
        return toast({
          title: 'Error',
          description: `${err.message}`,
          variant: 'destructive'
        })

      return toast({
        title: 'Error',
        description: 'Something went wrong...',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='bottom-0 flex flex-col items-center justify-center w-full h-28 border-t border-neutral-300 dark:border-neutral-800'>
      <div className='flex flex-row items-center w-full'>
        <Input className='ml-4' onChange={handleInputChange} />
        <Button
          className='mr-4'
          type='submit'
          aria-label='send message'
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </div>
    </div>
  )
}

export default ChatInput
