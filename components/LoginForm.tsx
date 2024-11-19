import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function LoginForm() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col gap-2">
      {session ? (
        <button onClick={() => signOut()}>登出</button>
      ) : (
        <button onClick={() => signIn()}>用Github登录</button>
      )}
    </div>
  );
}

export default LoginForm;
