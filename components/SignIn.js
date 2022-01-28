import { useSession, signIn, signOut } from "next-auth/react";

function SignIn() {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}
    </div>
  );
}

export default SignIn;
