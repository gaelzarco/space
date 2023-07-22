import { type FC } from 'react'

import Button from '@/components/ui/button'
import { ChatBubbleIcon } from '@radix-ui/react-icons'

const Dashboard: FC = () => {
  return (
    <>
      <h1 className='text-lg mb-2 text-neutral-400 dark:text-neutral-500'>
        Start a conversation
      </h1>
      <Button className='m-0'>
        New
        <ChatBubbleIcon className='ml-2' />
      </Button>
    </>
  )
}

export default Dashboard
