import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { addUser, getUser } from "@/lib/prisma";
import { authConfig } from "auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "密码登录",
      credentials: {
        username: { label: "账号", type: "text", placeholder: "输入您的账号" },
        password: { label: "密码", type: "password", placeholder: "输入您的密码" },
      },
      async authorize(credentials, req) {
        // 1. 记录开始和接收到的凭据（密码会显示为 [HIDDEN]）
        console.log('[AUTH] 授权开始，收到的用户名:', credentials?.username);
        console.log('[AUTH] 收到的密码长度:', credentials?.password?.length || 0);
      
        if (!credentials?.username || !credentials?.password) {
          console.error('[AUTH] 错误：用户名或密码为空');
          return null;
        }
        try {
          // 2. 动态导入数据库模块（避免Edge环境问题）
          console.log('[AUTH] 开始导入数据库模块...');
          console.log('[AUTH] 数据库模块导入成功');      
          // 3. 调用 getUser
          console.log('[AUTH] 调用 getUser...');
          let user = await getUser(credentials.username, credentials.password);
          console.log('[AUTH] getUser 返回结果:', JSON.stringify(user));
      
          if (user === 1) {
            console.log('[AUTH] 结果：用户未找到 (返回码 1)');
            return null;
          }
      
          if (user === 0) {
            console.log('[AUTH] 结果：用户不存在，尝试创建 (返回码 0)');
            user = await addUser(credentials.username, credentials.password);
            console.log('[AUTH] addUser 创建结果:', JSON.stringify(user));
          }
      
          if (!user) {
            console.error('[AUTH] 致命：用户未找到且创建失败');
            throw new Error('User was not found and could not be created.');
          }
      
          console.log('[AUTH] 授权成功，返回用户:', { id: user.id, name: user.name });
          return user;
          
        } catch (error) {
          // 4. 捕获并记录所有可能的错误
          console.error('[AUTH] 授权过程中发生未捕获的异常:');
          console.error('[AUTH] 错误名称:', error.name);
          console.error('[AUTH] 错误信息:', error.message);
          console.error('[AUTH] 完整错误堆栈:', error.stack);
          // 重新抛出，让Auth.js将其转化为CredentialsSignin错误
          throw error;
        }
      }
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    ...authConfig.callbacks,
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
});