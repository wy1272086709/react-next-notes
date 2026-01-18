import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales} from '@/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function AuthLayout({
  children,
  params: {locale}
}) {
  setRequestLocale(locale);

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <div className="auth-container">
      <div className="auth-header">
        <LanguageSwitcher />
      </div>
      {children}
    </div>
  )
}
