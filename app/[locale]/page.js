import {getTranslations} from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('note');
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">
        {t('emptyState')}
      </span>
    </div>
  )
}
