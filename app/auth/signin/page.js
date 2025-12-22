'use client';

import { useEffect, useState } from "react";

export default function SignIn() {
  const [csrfToken, setCsrfToken] = useState('');
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const response = await fetch(`/api/auth/csrf`);
      const {csrfToken} = await response.json()
      setCsrfToken(csrfToken)
    };
    fetchCsrfToken();
  }, []);
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <label>
        Username
        <input name="username" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign in</button>
    </form>
  )
}