import { type FC } from 'react'

import Button from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'

type PageProps = {}

const Dashboard: FC<PageProps> = ({}) => {
  return (
    <main className="cursor-default flex flex-col items-center min-w-full min-h-full">
      <div className="inline-flex items-center justify-between w-full h-full my-10">
        <h1 className="text-4xl font-bold">Conversations</h1>
        <Button className="mx-0">
          <PlusIcon className="mr-2" />
          New Conversation
        </Button>
      </div>
    </main>
  )
}

export default Dashboard
