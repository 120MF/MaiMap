import { auth } from "@/auth";
import LoginRedirect from "@/components/LoginRedirect";
import SignOutButton from "@/components/SignOutButton";
import CompleteProfileForm from "@/components/CompleteProfileForm";

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
        <CompleteProfileForm session={session} />
      </div>
    </div>
  );
}
