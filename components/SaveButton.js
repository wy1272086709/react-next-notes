'use client'

import { useFormStatus } from 'react-dom'
import {useTranslations} from 'next-intl';

export default function SaveButton({ formAction }) {
  const { pending } = useFormStatus()
  const t = useTranslations('common');
  return (
    <button
      className="note-editor-done"
      type="submit"
      formAction={formAction}
      disabled={pending}
      role="menuitem"
    >
      <img
        src="/checkmark.svg"
        width="14px"
        height="10px"
        alt=""
        role="presentation"
      />
      {pending ? t('saving') : t('done')}
    </button>
  );
}