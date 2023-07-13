import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter'
import { db } from '@/lib/db'

function getGithubCredential() {
  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    throw new Error('GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET must be set')
  }
  return {
    clientId,
    clientSecret,
  }
}

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set')
  }
  return {
    clientId,
    clientSecret,
  }
}

const handler = NextAuth({
  adapter: UpstashRedisAdapter(db),
  providers: [
    GitHubProvider({
      clientId: getGithubCredential().clientId,
      clientSecret: getGithubCredential().clientSecret,
    }),
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = (await db.get(`user: ${token.id}`)) as User | null

      if (!dbUser) {
        token.id = user.id
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
      }
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },

    redirect() {
      return '/dashboard'
    },
  },
})

export { handler as GET, handler as POST }
