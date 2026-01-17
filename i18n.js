import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// 支持的语言列表
export const locales = ['zh', 'en'];
export const defaultLocale = 'zh';

export default getRequestConfig(async ({locale}) => {
  // 验证传入的 locale 参数
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});

