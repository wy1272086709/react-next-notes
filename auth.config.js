export const authConfig = {
  // 1. 移除非数据库的核心配置到这里
  providers: [], // 注意：这里先留空，主要放OAuth等配置
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/note/edit")) return !!auth;
      return true;
    },
    // 注意：jwt和session回调如果涉及数据库，也先移到这里
  },
  trustHost: true,
};