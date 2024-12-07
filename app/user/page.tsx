import UserCard from "@/components/UserCard";
import { auth } from "@/auth";
import SignInRedirect from "@/components/SignInRedirect";
import SignOutButton from "@/components/SignOutButton";
import UserAccordion from "@/components/UserPageComponents/UserAccordion";

export default async function User() {
  const session = await auth();

  if (!session) return <SignInRedirect />;

  return (
    <div className="px-4 pt-10">
      <div className="flex flex-row items-center justify-between pb-4">
        <UserCard user={session.user} userId={undefined} />
        <SignOutButton buttonProps={{ color: "primary", size: "sm" }} />
      </div>
      {!session.user.name ? (
        <p className="text-sm text-red-400 pb-4 animate-pulse">
          你还没有设置用户名！请前往“更新信息”设置一个！
        </p>
      ) : null}
      <UserAccordion session={session} />
    </div>
  );
}
