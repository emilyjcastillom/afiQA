import { supabase } from './supabaseClient'

const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL || `${window.location.origin}/afiQA/`

export async function signInWithGoogle() {
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: REDIRECT_URL,
    },
  })
}

export async function signOut() {
  return await supabase.auth.signOut()
}

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}