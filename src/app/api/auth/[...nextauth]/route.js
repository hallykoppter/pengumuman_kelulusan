import { getUserAuth } from "@/libs/UsersService"
import nextAuth from "next-auth"
import CretdentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CretdentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
        role: { label: "credentials", type: "text" },
      },
      async authorize(credentials, req) {
        const user = await getUserAuth({
          username: credentials?.username,
          password: credentials?.password,
          role: credentials?.role,
        })
        if (user.status == 404) {
          return null
        } else return user
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: ["/login", "/"],
  },
  callbacks: {
    async jwt({ token, user, account }) {
      return { ...token, ...user, ...account }
    },
    async session({ session, token, user }) {
      session.user = token
      return session
    },
  },
}

const handler = nextAuth(authOptions)

export { handler as GET, handler as POST }
