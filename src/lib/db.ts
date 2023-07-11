import { Redis } from '@upstash/redis'

export const db = new Redis({
  url: process.env.DATABASE_URL as string,
  token: process.env.DATABASE_TOKEN as string,
})
