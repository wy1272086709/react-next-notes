'use client'

import dayjs from 'dayjs';
import NotePreview from '@/components/NotePreview'
import EditButton from '@/components/EditButton'
import {useTranslations} from 'next-intl';

export default function Note({ noteId, note }) {

  const { title, content, updateTime } = note
  const t = useTranslations('note');
  const tCommon = useTranslations('common');

  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        <div className="note-menu" role="menubar">
          <small className="note-updated-at" role="status">
            {t('lastUpdated')} {dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}
          </small>
            <EditButton noteId={noteId}>{tCommon('edit')}</EditButton>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  )
}
