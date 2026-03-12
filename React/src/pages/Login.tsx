import { signInWithGoogle } from "../lib/auth"

export default function Login() {
  return (
    <div>
      <h1>Login</h1>

      <button onClick={signInWithGoogle}>
        Login with Google
      </button>
    </div>
  )
}