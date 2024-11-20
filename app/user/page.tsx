import { auth } from "@/auth";
import LoginRedirect from "@/components/LoginRedirect";
import SignOutButton from "@/components/SignOutButton";

export default async function User() {
  const session = await auth();

  if (!session) return <LoginRedirect />;

  return (
    <div>
      <p>User Page</p>
      <p>{session?.user?.email}</p>
      <SignOutButton />
    </div>
  );
}
