import { auth } from "auth"
import {SignInButton, SignOutButton} from '@/components/HeaderButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {handleSignIn, handleSignOut} from '@/actions/auth';

function SignIn({
  provider,
  ...props
}) {
  return (
    <form action={handleSignIn.bind(null, provider)}>
      <SignInButton {...props} />
    </form>
  )
}

function SignOut(props) {
  return (
    <form action={handleSignOut}>
      <SignOutButton {...props} />
    </form>
  )
}

export default async function Header() {
  const session = await auth()

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