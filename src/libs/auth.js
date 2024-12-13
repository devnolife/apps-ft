import CredentialProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'

export const authOptions = {
  providers: [
    CredentialProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { username, password } = credentials

        console.log("🚀 ~ authorize ~ sername, password:", sername, password)

        if (username === 'admin' && password === 'admin') {
          return { id: 1, name: 'Admin', role: 'admin' }
        }

        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name
        session.user.role = token.role
      }
      return session
    }
  },
  events: {
    async error(message) {
      if (message.status === 405) {
        console.error('Method Not Allowed: ', message);
      }
    }
  }
}

export default NextAuth(authOptions)
