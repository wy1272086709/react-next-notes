'use client'

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {useTransition} from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale) => {
    // 从路径中提取当前路径（去掉 locale 部分）
    // 例如：/zh/note/123 -> /note/123
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
      <button
        onClick={() => switchLocale('zh')}
        disabled={locale === 'zh' || isPending}
        style={{
          padding: '5px 10px',
          cursor: locale === 'zh' ? 'default' : 'pointer',
          opacity: locale === 'zh' ? 0.5 : 1,
        }}
      >
        中文
      </button>
      <button
        onClick={() => switchLocale('en')}
        disabled={locale === 'en' || isPending}
        style={{
          padding: '5px 10px',
          cursor: locale === 'en' ? 'default' : 'pointer',
          opacity: locale === 'en' ? 0.5 : 1,
        }}
      >
        English
      </button>
    </div>
  );
}

