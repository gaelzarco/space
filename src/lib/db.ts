import { Redis } from '@upstash/redis'

function getDbCredentials() {
  const dbUrl = process.env.DATABASE_URL
  const dbToken = process.env.DATABASE_TOKEN
  if (!dbUrl || !dbToken) {
    throw new Error('DATABASE_URL and DATABASE_TOKEN must be set')
  }
  return {
    dbUrl,
    dbToken,
  }
}

export const db = new Redis({
  url: getDbCredentials().dbUrl,
  token: getDbCredentials().dbToken,
})
