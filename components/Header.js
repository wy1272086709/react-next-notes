import { signIn, signOut } from "auth"
import { auth } from "auth"
import Link from 'next/link'
import {SignInButton, SignOutButton} from '@/components/HeaderButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {getTranslations} from 'next-intl/server';

function SignIn({
  provider,
  ...props
}) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider, { callbackUrl: "/auth/signin" })
      }}
    >
      <SignInButton {...props} />
    </form>
  )
}

function SignOut(props) {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: '/' })
      }}
    >
      <SignOutButton {...props} />
    </form>
  )
}

export default async function Header() {
  const session = await auth()
  const t = await getTranslations('common');
  
  return (
    <header style={{
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      padding: "16px 24px",
      width: "100%"
    }}>
      <h1 style={{
        margin: 0,
        fontSize: "20px",
        fontWeight: "600",
        color: "inherit"
      }}>
      </h1>
      
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "24px"
      }}>
        <LanguageSwitcher />
        {
          !session?.user ? (
            <SignIn />
          ) : (
            <span style={{
              display: "flex", 
              alignItems: "center",
              gap: "12px"
            }}>
              {session?.user.name}
              <SignOut />
            </span>
          )
        }
      </div>
    </header>
  )
}