'use client'

import {useTranslations} from 'next-intl';

export function SignInButton({children, ...props}) {
  const t = useTranslations('common');
  return (
    <button {...props}>{children || t('signIn')}</button>
  );
}

export function SignOutButton({children, ...props}) {
  const t = useTranslations('common');
  return (
    <button {...props}>{children || t('signOut')}</button>
  );
}







