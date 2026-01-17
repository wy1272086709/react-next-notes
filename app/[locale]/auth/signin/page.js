'use client'

import { useEffect, useState } from "react";
import {useTranslations} from 'next-intl';

export default function SignIn() {
  const [token, setToken] = useState('')
  const t = useTranslations('common');

  useEffect(() => {
    async function fetchData() {
      const response =  await fetch(`//${location.host}/api/auth/csrf`);
      const { csrfToken } = await response.json();
      setToken(csrfToken)
    }
    fetchData();
  }, [])
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input type="hidden" name="csrfToken" value={token} />
      <label>
        {t('username')}
        <input name="username" type="text" />
      </label>
      <label>
        {t('password')}
        <input name="password" type="password" />
      </label>
      <button type="submit">{t('signInButton')}</button>
    </form>
  )
}