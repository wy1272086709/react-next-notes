'use client'

import Link from 'next/link'
import {useLocale} from 'next-intl';
import { useSession } from 'next-auth/react';

export default function EditButton({noteId, children}) {
  const isDraft = noteId == null;
  const locale = useLocale();
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const handleClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      window.location.href = `/${locale}/login`;
    }
  };

  return (
    <Link
      href={`/${locale}/note/edit/${noteId || ''}`}
      className="link--unstyled"
      onClick={handleClick}
    >
      <button
        className={[
          'edit-button',
          isDraft ? 'edit-button--solid' : 'edit-button--outline',
        ].join(' ')}
        role="menuitem">
        {children}
      </button>
    </Link>
  );
}