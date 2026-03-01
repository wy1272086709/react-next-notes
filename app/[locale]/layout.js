import '../style.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import Providers from '@/components/Providers'
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales} from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params: {locale}
}) {
  // 启用静态渲染
  setRequestLocale(locale);

  // 验证 locale
  if (!locales.includes(locale)) {
    notFound();
  }

  // 提供所有消息给客户端组件
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <div className="container">
              {children}
            </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata({params: {locale}}) {
  const messages = (await import(`@/messages/${locale}.json`)).default;
  return {
    title: messages.meta.title,
    description: messages.meta.description,
  }
}
