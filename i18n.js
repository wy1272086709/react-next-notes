import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// 支持的语言列表
export const locales = ['zh', 'en'];
export const defaultLocale = 'zh';

export default getRequestConfig(async ({requestLocale}) => {
  // 验证传入的 locale 参数
  let locale = await requestLocale;

  if (!locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});








