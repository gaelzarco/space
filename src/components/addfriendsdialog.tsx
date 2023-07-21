'use client'

import {
  type FC,
  type ChangeEvent,
  type MouseEventHandler,
  useState
} from 'react'

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

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    setIsLoading(true)

    setTimeout(() => {
      try {
        console.log(email)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }, 5000)
  }

  return (
    <Dialog>
      <DialogTrigger className='inline-flex items-center min-w-[100px] h-8 justify-center content-center bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-white px-6 py-5 m-0 rounded-full transition-all duration-200 ease-in-out'>
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

        <div className='inline-flex items-center w-full mx-auto mt-4 mb-2'>
          <div className='flex justify-end w-[80px] font-medium mx-4'>
            Email
          </div>
          <Input onChange={handleEmailChange} />
        </div>

        <DialogFooter>
          <Button
            type='submit'
            onClick={handleSubmit}
            isLoading={isLoading}
            className='m-0'
          >
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddFriendsDialog
