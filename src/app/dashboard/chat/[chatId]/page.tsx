import { type FC } from 'react'

import { fetchRedis } from '@/helpers/fetchredis'

interface ConversationProps {
  params: {
    chatId: string
  }
}

type Message = {}

const Conversation: FC<ConversationProps> = async ({ params }) => {
  return <h1>{params.chatId}</h1>
}

export default Conversation
