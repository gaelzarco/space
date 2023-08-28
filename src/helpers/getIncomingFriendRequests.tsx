import { fetchRedis } from '@/helpers/fetchredis'

export async function getIncomingFriendRequests(incomingSenderIds: string[]) {
  const senders = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis('get', `user:${senderId}`)) as string
      const parsedSender = JSON.parse(sender) as User

      return {
        senderId,
        senderEmail: parsedSender.email,
        senderName: parsedSender.name,
        senderImage: parsedSender.image
      }
    })
  )

  return senders
}
