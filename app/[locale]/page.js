import {getTranslations, setRequestLocale} from 'next-intl/server';

export default async function Page({params: {locale}}) {
  // 启用静态渲染
  setRequestLocale(locale);

  const t = await getTranslations('note');
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">
        {t('emptyState')}
      </span>
    </div>
  )
}
