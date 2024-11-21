import { auth } from "@/auth";
import LoginRedirect from "@/components/LoginRedirect";
import SignOutButton from "@/components/SignOutButton";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export default async function User() {
  const session = await auth();

  if (!session) return <LoginRedirect />;

  return (
    <div>
      <p>欢迎！</p>
      <p>{!!session.user.name ? session.user.name : session.user.email}</p>
      <SignOutButton />
      <div>
        <p>补充信息</p>
        <UpdateProfileForm session={session} />
      </div>
    </div>
  );
}
