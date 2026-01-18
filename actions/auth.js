'use server'

import { signIn, signOut } from "auth"

export async function handleSignIn(provider) {
  await signIn(provider, { callbackUrl: "/auth/signin" })
}

export async function handleSignOut() {
  await signOut({ redirectTo: '/' })
}
