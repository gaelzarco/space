'use client'

import { type FC, type ChangeEvent, type FormEvent, useState } from 'react'
import { z } from 'zod'
import { addFriendValidator } from '@/lib/validators'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import Button from '@/components/ui/button'
import { PersonIcon } from '@radix-ui/react-icons'

const AddFriendsDialog: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setError(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (email.length < 1) return setError('Email cannot be empty')
      const validatedEmail = addFriendValidator.parse({ email })

      const res = await fetch('/api/friends/add', {
        method: 'POST',
        body: JSON.stringify({ email: validatedEmail.email })
      })

      if (res.status === 200) {
        setError(null)
        return setSuccess('Friend request sent!')
      } else {
        const errMsg = await res.text()
        setError(errMsg)
        return
      }
    } catch (err) {
      if (err instanceof z.ZodError) return setError(err.issues[0].message)

      if (err instanceof Error) return setError(err.message)

      return setError('Something went wrong')
    } finally {
      setIsLoading(false)
      setTimeout(() => {
        setSuccess(null)
        return
      }, 3000)
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        className='inline-flex items-center w-[142px] h-8 justify-center content-center bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-white px-6 py-5 m-0 rounded-full transition-all duration-200 ease-in-out'
        onClick={() => setError(null)}
      >
        Add
        <PersonIcon className='ml-2' />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a friend</DialogTitle>
          <DialogDescription>
            Enter an email address and we&apos;ll see if they&apos;re on sSpace.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className='inline-flex items-center w-full mx-auto mt-4 mb-6'>
            <div className='flex justify-end w-[80px] font-medium mx-4'>
              Email
            </div>
            <Input onChange={handleInputChange} />
          </div>

          <DialogFooter className='flex items-center'>
            {error && (
              <div
                key={error}
                className='text-sm mr-2 text-red-500 dark:text-red-400'
              >
                {error}
              </div>
            )}
            {success && (
              <div
                key={success}
                className='text-sm mr-2 text-green-500 dark:text-green-400'
              >
                {success}
              </div>
            )}
            <Button type='submit' isLoading={isLoading} className='m-0'>
              Send
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddFriendsDialog
