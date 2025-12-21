//import { headers } from 'next/headers';
import { signIn } from 'auth';
export default async function SignIn() {
  // const headersList = await headers();
  // const host = headersList.get('host');
  // const response = await fetch(`https://${host}/api/auth/csrf`);
  // const {csrfToken} = await response.json()
  return (
    <form method="post" action={async (formData) => {
      'use server'; // 关键：声明这是一个 Server Action
      try {
        // 调用服务器端的 signIn 函数
        await signIn('credentials', {
          username: formData.get('username'),
          password: formData.get('password'),
          // 成功则重定向
          redirectTo: '/',
        });
      } catch (error) {
        // 这里可以更精细地处理错误，例如返回错误信息给页面
        console.error('登录错误:', error);
        // 可以根据错误类型重定向到带错误信息的页面
        redirect('/auth/signin?error=CredentialsSignin');
      }
    }}>
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