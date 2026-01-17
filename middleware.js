import createMiddleware from 'next-intl/middleware';
import {auth as authMiddleware} from "auth";

const intlMiddleware = createMiddleware({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
  localePrefix: 'always'
});

export default async function middleware(request) {
  // 先运行 next-intl 中间件
  const response = intlMiddleware(request);
  
  // Auth 中间件会在需要时自动处理
  // 如果需要结合使用，可以在这里添加逻辑
  
  return response;
}

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}