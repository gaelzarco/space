import { fetchRedis } from '@/helpers/fetchredis'

export async function getIncomingFriendRequests(incomingSenderIds: string[]) {
  const senders = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis('get', `user:${senderId}`)) as string
      const senderParsed = JSON.parse(sender) as User

      return {
        senderId,
        senderEmail: senderParsed.email,
        senderName: senderParsed.name,
        senderImage: senderParsed.image
      }
    })
  )

  return senders
}
