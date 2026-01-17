'use client'

import { useFormStatus } from 'react-dom'
import {useTranslations} from 'next-intl';

export default function DeleteButton({ isDraft, formAction }) {
  const { pending } = useFormStatus()
  const t = useTranslations('common');
  return !isDraft && (
      <button
        className="note-editor-delete"
        disabled={pending}
        formAction={formAction}
        role="menuitem"
      >
        <img
          src="/cross.svg"
          width="10px"
          height="10px"
          alt=""
          role="presentation"
        />
        {t('delete')}
      </button>
    )
}