import {getTranslations, setRequestLocale} from 'next-intl/server';
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default async function Page({params: {locale}}) {
  // 启用静态渲染
  setRequestLocale(locale);

  const t = await getTranslations('note');
  return (
    <>
      <Header />
      <div className="main">
        <Sidebar />
        <section className="col note-viewer">
          <div className="note--empty-state">
            <span className="note-text--empty-state">
              {t('emptyState')}
            </span>
          </div>
        </section>
      </div>
    </>
  )
}
