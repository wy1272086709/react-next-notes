import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { addUser, getUser } from "@/lib/prisma";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "密码登录",
      credentials: {
        username: { label: "账号", type: "text", placeholder: "输入您的账号" },
        password: { label: "密码", type: "password", placeholder: "输入您的密码" },
      },
      async authorize(credentials, req) {
        let user = await getUser(credentials.username, credentials.password);
        if (user === 1) return null;
        if (user === 0) {
          user = await addUser(credentials.username, credentials.password);
        }
        if (!user) {
          throw new Error("User was not found and could not be created.");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/note/edit")) return !!auth;
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && account.type === "credentials" && user) {
        token.userId = user.userId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.userId = token.userId;
      return session;
    },
  },
  trustHost: true,
};

export default NextAuth(authOptions);