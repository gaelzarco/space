'use client'

import {
  type FC,
  type FormEvent,
  type ChangeEvent,
  useState,
  useRef,
  useEffect
} from 'react'
import { useToast } from '@/components/ui/use-toast'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import Button from '@/components/ui/button'
import { chatHrefConstructor } from '@/lib/utils'

interface ChatInputProps {
  userId: string
  friend: User
}

const ChatInput: FC<ChatInputProps> = ({ userId, friend }) => {
  const { toast } = useToast()
  const [message, setMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (isSending) return
    setIsLoading(true)

    try {
      setIsSending(true)

      if (message.length < 1)
        return toast({
          title: 'Error',
          description: 'Please enter atleast 1 character.',
          variant: 'destructive'
        })

      const res = await fetch('/api/messages/send', {
        method: 'POST',
        body: JSON.stringify({
          chatId: chatHrefConstructor(userId, friend.id),
          text: message
        })
      })

      if (res.status === 200) {
        setMessage('')
      } else {
        const errMessage = await res.text()
        setMessage('')

        return toast({
          title: 'Error',
          description: `${errMessage}`,
          variant: 'destructive'
        })
      }
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
      setIsSending(false)
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  useEffect(() => {
    focusInput()
  }, [])

  return (
    <div className='sticky flex flex-col items-center justify-center w-full py-2 bg-neutral-100/70 dark:bg-neutral-950/70 backdrop-blur-xl z-20'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-row items-center w-full h-full'
      >
        <Input
          className='ml-4'
          ref={inputRef}
          onChange={handleInputChange}
          value={message}
        />
        <Button
          className='mr-4'
          type='submit'
          aria-label='send message'
          isLoading={isLoading}
        >
          Send
        </Button>
      </form>
    </div>
  )
}

export default ChatInput
