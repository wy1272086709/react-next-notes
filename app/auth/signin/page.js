import { headers } from 'next/headers';

export default async function SignIn() {
  const headersList = await headers();
  const host = headersList.get('host');
  const response = await fetch(`https://${host}/api/auth/csrf`);
  const {csrfToken} = await response.json()
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